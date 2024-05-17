import { storage, firebaseApp } from "../firebaseService"
import { ref, get, getDatabase, set, remove, orderByChild } from "firebase/database";

const db = getDatabase(firebaseApp)

const getAllTransportation = async () => {
    try {
        const transportationRef = ref(db, 'transportation/data'); 
        const snapshot = await get(transportationRef);

        // console.log("Reference:", transportationRef.toString());
        // console.log("Transportation data:", snapshot.val());

        return snapshot.val();
    } catch (error) {
        console.error("Error getting transportation:", error);
        throw error;
    }
};

export {getAllTransportation}