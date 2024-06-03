import { Alert } from "react-native";
import { auth, storage, firebaseApp } from "../firebaseService"
import { ref, get, getDatabase, set, remove, orderByChild } from "firebase/database";

const db = getDatabase(firebaseApp)

const getFeedbackId = async () => {
    try {
        const feedbackRef = ref(db, 'Feedback/data');
        const snapshot = await get(feedbackRef);
        const data = snapshot.val();
        return data.length;
    } catch (error) {
        console.error("Error getting feedback:", error);
        throw error;
    }
};

const getAllFeedback = async () => {
    try {
        const feedbackRef = ref(db, 'Feedback/data');
        const cusRef = ref(db, 'customer/data');
        const snapshot = await get(feedbackRef);
        const userSnapshot = await get(cusRef);

        let foundList = []

        snapshot.forEach((childSnapshot) => {
            let childData = childSnapshot.val();
            // console.log(childData.user)
            userSnapshot.forEach((child_) => {
                const child_data = child_.val();
                if (child_data && child_data.email && child_data.email === childData.user) {
                    childData.avatar = child_data.avatar
                }
            })

            const foundData = childData;
            foundList.push(foundData);
        });



        return foundList;
    } catch (error) {
        console.error("Error getting feedback:", error);
        throw error;
    }
};


export { getFeedbackId, getAllFeedback }
