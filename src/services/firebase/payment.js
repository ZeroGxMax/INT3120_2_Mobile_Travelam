import { storage, firebaseApp } from "../firebaseService"
import { ref, get, getDatabase, set, push } from "firebase/database";

const db = getDatabase(firebaseApp)

const getAllPayment = async () => {
    try {
        const paymentRef = ref(db, 'payment/data');
        const paySnapshot = await get(paymentRef);

        const cusRef = ref(db, 'customer/data')
        const cusSnapshot = await get(cusRef)

        let foundList = []

        paySnapshot.forEach((payment) => {
            let paydata = payment.val();
            if (paydata) {
                cusSnapshot.forEach((cus) => {
                    const cusdata = cus.val();
                    if (cusdata && cusdata.userId === paydata.userId) {
                        paydata.userName = cusdata.name
                        paydata.avatar = cusdata.avatar
                        paydata.amount = paydata.amount.toString();
                        paydata.cardNumber = paydata.creditCard.cardNumber
                        paydata.cardHolder = paydata.creditCard.cardHolder
                    }
                })

                foundList.push(paydata);
            }
        })

        return foundList;
    } catch (error) {
        console.error("Error finding user:", error);
        throw error;
    }
};

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

        console.log(startDate)

        const newPayment = {
            paymentId: lastPaymentId + 1,
            userId: userId,
            tourName: tourName,
            startDate: new Date(startDate).toISOString(),
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

export {addNewPayment, getAllPayment}