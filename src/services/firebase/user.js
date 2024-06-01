import { firebaseApp } from "../firebaseService"
import { ref, get, getDatabase, set, child } from "firebase/database";

const db = getDatabase(firebaseApp)

const getCustomerFromId = async (userId) => {
    try {
        const cusRef = ref(db, 'customer/data');
        const snapshot = await get(cusRef);

        let foundData = null;

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();

            if (childData && childData.userId && childData.userId == userId) {
                foundData = childData;
                console.log("Node with userId =", userId, "found!");
            }
        });

        if (!foundData) {
            console.log("Node with userId =", userId, "not found.");
        }

        return foundData;
    } catch (error) {
        console.error("Error finding user:", error);
        throw error;
    }
};

const getAllCustomerData = async () => {
    try {
        const cusRef = ref(db, 'customer/data');
        const snapshot = await get(cusRef);

        let foundList = [];

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            const foundData = childData;
            foundList.push(foundData);
        });

        if (!foundList) {
            console.log("Cannot get all customers data");
        }

        return foundList;
    } catch (error) {
        console.error("Error finding user:", error);
    }
}

const getRefFromId = async (userId) => {
    try {
        const customerRef = ref(db, 'customer/data');
        const snapshot = await get(customerRef);

        let customerRefFound;


        snapshot.forEach((customerChild) => {
            const customerData = customerChild.val();
            if (customerData && customerData.userId == userId) {
                customerRefFound = customerChild.ref;
            }
        });
        
        return customerRefFound;
    } catch (error) {
        console.error("Error getting customer reference:", error);
        throw error;
    }
};

const addNewCreditCard = async (userId, cardHolder, cardNumber, expiryDate, cvc) => {
    try {
        const customerRef = await getRefFromId(userId);
        const snapshot = await get(customerRef)
        const customerData = snapshot.val();
        // console.log(customerRef)
        const creditCard = {
            "cardHolder": cardHolder,
            "cardNumber": cardNumber,
            "expiryDate": expiryDate,
            "cvc": cvc
        };

        const newCreditCardRef = child(customerRef, "creditCard")
        if (customerData.creditCard) {
            const childrenCount = `${customerData.creditCard.length}`
            addRef = child(newCreditCardRef, childrenCount)
            console.log("New credit card: " + JSON.stringify(creditCard, null, 2));
            await set(addRef, creditCard);
            console.log("Credit card added successfully");
        } else {
            const newCreditCardList = [creditCard]
            console.log("New credit card list: " + JSON.stringify(creditCard, null, 2));
            await set(newCreditCardRef, newCreditCardList);
        }
    } catch (error) {
        console.error("Error adding new credit card:", error);
        throw error;
    }
}

const getCustomerCreditCard = async (userId) => {
    try {
        const customerRef = await getRefFromId(userId);
        const snapshot = await get(customerRef)
        const customerData = snapshot.val();

        if (customerData.creditCard) {
            return customerData.creditCard
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error retrieving credit card information:", error);
        throw error;
    }
}

export { getCustomerFromId, addNewCreditCard, getCustomerCreditCard, getAllCustomerData }
