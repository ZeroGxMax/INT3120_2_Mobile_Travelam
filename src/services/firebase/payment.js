import { storage, firebaseApp } from "../firebaseService"
import { ref, get, getDatabase, set, push } from "firebase/database";

const db = getDatabase(firebaseApp)

const getLastPaymentId = async (paymentSnapshot) => {
    let lastPaymentId = 0;

    paymentSnapshot.forEach((payment) => {
        let paymentData = payment.val();
        if (paymentData.paymentId > lastPaymentId) {
            lastPaymentId = paymentData.paymentId;
        }
    });

    return lastPaymentId;
};

const addNewPayment = async (userId, creditCard, amount, tourName, startDate, paymentDetail) => {
    try {
        const paymentRef = ref(db, 'payment/data');
        const newPaymentRef = push(paymentRef);
        const snapshot = await get(paymentRef);
        const lastPaymentId = await getLastPaymentId(snapshot);

        const newPayment = {
            paymentId: lastPaymentId,
            userId: userId,
            tourName: tourName,
            startDate: startDate,
            creditCard: creditCard,
            payDate: new Date().toISOString(),
            amount: amount,
            paymentDetail: paymentDetail,
        };

        await set(newPaymentRef, newPayment);
        console.log("Payment added successfully");
    } catch (error) {
        console.error("Error adding payment:", error);
        throw error;
    }
}

export {addNewPayment}