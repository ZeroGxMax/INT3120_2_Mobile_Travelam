import { storage, firebaseApp } from "../firebaseService"
import { ref, get, getDatabase, set, remove, orderByChild } from "firebase/database";

const db = getDatabase(firebaseApp)

const getAllDestFromCountry = async (countryId) => {
    try {
        const destRef = ref(db, "destination/data");

        const destSnapshot = await get(destRef);

        let foundDests = [];

        destSnapshot.forEach((destChild) => {
            const destData = destChild.val();
            if (destData && destData.countryId == countryId) {
                foundDest = destData
                foundDests.push(foundDest)
            };
        });

        if (foundDests.length === 0) {
            console.log("No destination found!");
        }

        return foundDests;
    } catch (error) {
        console.error("Error finding specific destination by country:", error);
        throw error;
    }
};


const getDestIdsFromTourId = async (tourId) => {
    try {
        const tourDestRef = ref(db, "tour_dest/data");
        const tourDestSnapshot = await get(tourDestRef);
        const foundDestIds = []


        tourDestSnapshot.forEach((tourDestChild) => {
            const tourDestData = tourDestChild.val();
            const destId = tourDestData.destId;

            if (tourDestData.tourId == tourId) {
                foundDestIds.push(destId)
            }
        })

        return foundDestIds;
    } catch (error) {
        console.error("Error finding dest ids from tour id:", error);
        throw error;
    }
}

const getDestFromId = async (destId) => {
    try {
        const destRef = ref(db, 'destination/data');
        const snapshot = await get(destRef);

        let foundData = null;

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();

            if (childData.id == destId) {
                foundData = childData;
            }
        });
        if (!foundData) {
            console.log("Node with destId =", destId, "not found.");
        }

        return foundData;
    } catch (error) {
        console.error("Error finding destination:", error);
        throw error;
    }
};

export { getAllDestFromCountry, getDestIdsFromTourId, getDestFromId }