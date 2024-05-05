import { storage, firebaseApp } from "../firebaseService"
import { ref, get, getDatabase, set, remove, orderByChild } from "firebase/database";

const db = getDatabase(firebaseApp)

const getAllTours = async (tourId) => {
    try {
        const toursRef = ref(db, 'tour');
        const snapshot = await get(toursRef);

        console.log("Reference:", toursRef.toString());
        console.log("Data inside '10' node:", snapshot.val());

        return snapshot.val();
    } catch (error) {
        console.error("Error getting tours:", error);
        throw error;
    }
};

const getTourById = async (tourId) => {
    try {
        // Reference to the 'tour' node
        const tourRef = ref(db, 'tour/data');

        // Fetch the data of tours matching the query
        const snapshot = await get(tourRef);

        let foundData = null; // Variable to store the found data

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val(); // Get the data of the current child node

            // Check if the current child node has a 'tourId' property
            if (childData && childData.id && childData.id == tourId) {
                foundData = childData; // Store the found data
                console.log("Node with tourId =", tourId, "found:", foundData);
            }
        });

        // If no node with the specified tourId is found
        if (!foundData) {
            console.log("Node with tourId =", tourId, "not found.");
        }

        return foundData; // Return the found data (or null if not found)
    } catch (error) {
        console.error("Error finding node:", error);
        throw error;
    }
};

export { getAllTours, getTourById }