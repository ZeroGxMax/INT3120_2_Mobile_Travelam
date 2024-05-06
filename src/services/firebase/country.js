import { storage, firebaseApp } from "../firebaseService"
import { ref, get, getDatabase, set, remove, orderByChild } from "firebase/database";

const db = getDatabase(firebaseApp)

const getCountryFromId = async (countryId) => {
    try {
        const countryRef = ref(db, 'country/data');
        const snapshot = await get(countryRef);

        let foundData = null;

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();

            if (childData && childData.id && childData.id === countryId) {
                foundData = childData;
                console.log("Node with countryId =", countryId, "found:", foundData);
            }
        });

        if (!foundData) {
            console.log("Node with countryId =", countryId, "not found.");
        }

        return foundData;
    } catch (error) {
        console.error("Error finding country:", error);
        throw error;
    }
};

const getCountryFromName = async (countryName) => {
    try {
        const countryRef = ref(db, 'country/data');
        const snapshot = await get(countryRef);

        let foundData = null;

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();

            // Assuming countryData has a 'name' property
            if (childData && childData.countryName && childData.countryName.toLowerCase() === countryName.toLowerCase()) {
                foundData = childData;
                console.log("Node with countryName =", countryName, "found!");
            }
        });

        if (!foundData) {
            console.log("Node with countryName =", countryName, "not found.");
        }

        return foundData;
    } catch (error) {
        console.error("Error finding country:", error);
        throw error;
    }
};


export {getCountryFromId, getCountryFromName}