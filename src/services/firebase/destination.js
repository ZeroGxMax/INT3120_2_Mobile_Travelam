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

const getAllDest = async () => {
    try {
        const destRef = ref(db, "destination/data");

        const destSnapshot = await get(destRef);

        let foundDests = [];

        destSnapshot.forEach((destChild) => {
            const destData = destChild.val();
            const foundDest = destData
            foundDests.push(foundDest)
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



export { getAllDestFromCountry, getAllDest }