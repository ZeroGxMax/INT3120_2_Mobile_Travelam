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

            if (childData && childData.id && childData.id == countryId) {
                foundData = childData;
                console.log("Node with countryId =", countryId, "found!");
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

const getCountryIdFromTourId = async (tourId) => {
    try {
        const tourDestRef = ref(db, "tour_dest/data");
        const destRef = ref(db, "destination/data");

        const tourDestSnapshot = await get(tourDestRef);
        const destSnapshot = await get(destRef);

        let foundCountry = null;

        tourDestSnapshot.forEach((tourDestChild) => {
            const tourDestData = tourDestChild.val();
            if (tourDestData.tourId == tourId) {
                const destId = tourDestData.destId;
                destSnapshot.forEach((destChild) => {
                    const destData = destChild.val();
                    if (destData && destData.id == destId) {
                        foundCountry = destData.countryId;
                        return;
                    }
                });
                if (foundCountry) {
                    return;
                }
            }
        });

        return foundCountry;
    } catch (error) {
        console.error("Error finding country from tour ID:", error);
        throw error;
    }
};

const getAllCountry = async () => {
    try {
        const countryRef = ref(db, 'country/data');
        const snapshot = await get(countryRef);

        const allCountries = [];

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            allCountries.push(childData);
        });

        return allCountries;
    } catch (error) {
        console.error("Error getting all countries:", error);
        throw error;
    }
};


export { getCountryFromId, getCountryFromName, getAllCountry, getCountryIdFromTourId }
