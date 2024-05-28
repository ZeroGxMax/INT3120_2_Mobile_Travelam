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

export { getFeedbackId }
