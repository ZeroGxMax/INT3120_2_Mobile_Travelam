import { storage, firebaseApp } from "../firebaseService"
import { ref, get, getDatabase, set, remove, orderByChild } from "firebase/database";

const db = getDatabase(firebaseApp)

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

// const getCountryIdsFromDestData = (destData) => {
//     try {
//         destData.forEach(

//         )
//     } catch (error) {
//         console.error("Error finding country ids from dest data:", error);
//         throw error;
//     }
// }

const getCountryIdFromRestaurantId = async (restaurantId) => {
    try {
        const restaurantRef = ref(db, "restaurant/data");
        const destRef = ref(db, "destination/data");

        const restaurantSnapshot = await get(restaurantRef);
        const destSnapshot = await get(destRef);

        let foundCountry = null;

        restaurantSnapshot.forEach((restaurantChild) => {
            const restaurantData = restaurantChild.val();
            if (restaurantData.id == restaurantId) {
                const destId = restaurantData.destId;
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
        console.error("Error finding country from restaurant ID:", error);
        throw error;
    }
};

const getCountryIdFromAccommodationId = async (accommodationId) => {
    try {
        const accommodationRef = ref(db, "accommodation/data");
        const destRef = ref(db, "destination/data");

        const accommodationSnapshot = await get(accommodationRef);
        const destSnapshot = await get(destRef);

        let foundCountry = null;

        accommodationSnapshot.forEach((accommodationChild) => {
            const accommodationData = accommodationChild.val();
            if (accommodationData.id == accommodationId) {
                const destId = accommodationData.destId;
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
        console.error("Error finding country from accommodation ID:", error);
        throw error;
    }
};

const getCountryIdFromActivityId = async (activityId) => {
    try {
        const activityRef = ref(db, "activity/data");
        const destRef = ref(db, "destination/data");

        const activitySnapshot = await get(activityRef);
        const destSnapshot = await get(destRef);

        let foundCountry = null;

        activitySnapshot.forEach((activityChild) => {
            const activityData = activityChild.val();
            if (activityData.id == activityId) {
                const destId = activityData.destId;
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
        console.error("Error finding country from activity ID:", error);
        throw error;
    }
};



export { getCountryFromId, getCountryFromName, getAllCountry, getCountryIdFromTourId, getCountryIdFromRestaurantId, getCountryIdFromAccommodationId, getCountryIdFromActivityId }
