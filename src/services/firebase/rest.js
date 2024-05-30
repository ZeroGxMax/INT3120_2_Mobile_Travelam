import { storage, firebaseApp } from "../firebaseService"
import { ref, get, getDatabase, set, remove, orderByChild } from "firebase/database";

const db = getDatabase(firebaseApp)

const getRestFromId = async (restId) => {
    try {
        const restRef = ref(db, 'restaurant/data');
        const snapshot = await get(restRef);

        let foundData = null;

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();

            if (childData && childData.id && childData.id === restId) {
                foundData = childData;
                console.log("Node with restId =", restId, "found!");
            }
        });

        if (!foundData) {
            console.log("Node with restId =", restId, "not found.");
        }

        return foundData;
    } catch (error) {
        console.error("Error finding rest:", error);
        throw error;
    }
};

const getRestListFromId = async (restIdList) => {
    try {
        const restRef = ref(db, 'restaurant/data');
        const snapshot = await get(restRef);

        let foundData = [];
        let i = 0;

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();

            if (i === restIdList.length) {
                return foundData;
            }

            if (childData && childData.id && childData.id == restIdList[i]) {
                foundData.push(childData);
                console.log("Node with restId =", restIdList[i], "found!");
                i += 1
            }
        });

        if (!foundData) {
            console.log("Node with restId =", 1, "not found.");
        }

        return foundData;
    } catch (error) {
        console.error("Error finding rest:", error);
        throw error;
    }
};

const getRestFromName = async (restName) => {
    try {
        const restRef = ref(db, 'restaurant/data');
        const snapshot = await get(restRef);

        let foundData = null;

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();

            // Assuming countryData has a 'name' property
            if (childData && childData.name && childData.name.toLowerCase() === restName.toLowerCase()) {
                foundData = childData;
                console.log("Node with restName =", restName, "found!");
            }
        });

        if (!foundData) {
            console.log("Node with restName =", restName, "not found.");
        }

        return foundData;
    } catch (error) {
        console.error("Error finding rest:", error);
        throw error;
    }
};

const getRestFromDestId = async (destId) => {
    try {
        const restRef = ref(db, "restaurant/data")
        const restDestRef = ref(db, "dest_restaurant/data")

        const restSnapshot = await get(restRef)
        const restDestSnapshot = await get(restDestRef)
        let foundRestList = [];

        restDestSnapshot.forEach((restDestChild) => {
            const restDestData = restDestChild.val();
            if (restDestData && restDestData.destId == destId) {
                const restId = restDestData.restId;
                restSnapshot.forEach((restChild) => {
                    const restData = restChild.val();
                    if (restData && restData.id == restId) {
                        foundRest = restData
                        foundRest.baseId = 200
                        foundRestList.push(foundRest)
                    }
                });
            }
        });

        return foundRestList;
    } catch (error) {
        console.error("Error finding rest from country ID:", error);
        throw error;
    }
};

const getRestFromDestIdAddData = async (destId, country, dest) => {
    try {
        const restRef = ref(db, "restaurant/data")
        const restDestRef = ref(db, "dest_restaurant/data")

        const restSnapshot = await get(restRef)
        const restDestSnapshot = await get(restDestRef)
        let foundRestList = [];

        restDestSnapshot.forEach((restDestChild) => {
            const restDestData = restDestChild.val();
            if (restDestData && restDestData.destId == destId) {
                const restId = restDestData.restId;
                restSnapshot.forEach((restChild) => {
                    const restData = restChild.val();
                    if (restData && restData.id == restId) {
                        foundRest = restData
                        foundRest.baseId = 200
                        foundRest.countryName = country,
                        foundRest.destinationName = dest,
                        foundRestList.push(foundRest)
                    }
                });
            }
        });

        return foundRestList;
    } catch (error) {
        console.error("Error finding rest from country ID:", error);
        throw error;
    }
};

const getAllRestaurants = async () => {
    try {
        const restaurantsRef = ref(db, 'restaurant/data');
        const snapshot = await get(restaurantsRef); 

        // console.log("Reference:", restaurantsRef.toString());
        // console.log("Restaurant data:", snapshot.val());

        return snapshot.val();
    } catch (error) {
        console.error("Error getting restaurants:", error);
        throw error;
    }
};

export { getRestFromId, getRestListFromId, getRestFromName, getRestFromDestId, getAllRestaurants, getRestFromDestIdAddData }
