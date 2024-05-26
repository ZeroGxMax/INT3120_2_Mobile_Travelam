import { firebaseApp } from "../firebaseService"
import { ref, get, getDatabase } from "firebase/database";

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

export { getCustomerFromId }
