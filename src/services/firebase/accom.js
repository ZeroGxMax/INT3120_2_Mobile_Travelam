import { Alert } from "react-native";
import { storage, firebaseApp } from "../firebaseService"
import { ref, get, getDatabase, set, remove, orderByChild } from "firebase/database";

const db = getDatabase(firebaseApp)

const getAllAccommodation = async () => {
    try {
        const accommodationRef = ref(db, 'accommodation/data');
        const snapshot = await get(accommodationRef); 

        return snapshot.val();
    } catch (error) {
        console.error("Error getting accommodation:", error);
        throw error;
    }
};


const getAccomFromId = async (accomId) => {
    try {
        const accomRef = ref(db, 'accommodation/data');
        const snapshot = await get(accomRef);

        let foundData = null;

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();

            if (childData && childData.id && childData.id === accomId) {
                foundData = childData;
                console.log("Node with accomId =", accomId, "found!");
            }
        });

        if (!foundData) {
            console.log("Node with accomId =", accomId, "not found.");
        }

        return foundData;
    } catch (error) {
        console.error("Error finding accom:", error);
        throw error;
    }
};

const getAccomListFromId = async (accomIdList) => {
    try {
        const accomRef = ref(db, 'accommodation/data');
        const snapshot = await get(accomRef);

        let foundData = [];

        let i = 0

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            if (i === accomIdList.length) {
                return foundData;
            }

            if (childData && childData.id && childData.id == accomIdList[i]) {
                foundData.push(childData);
                i += 1;
                console.log("Node with accomId =", accomIdList[i], "found!");
            }
        });

        if (!foundData) {
            console.log("Node with accomId =", 1, "not found.");
        }

        return foundData;
    } catch (error) {
        console.error("Error finding accom:", error);
        throw error;
    }
};

const getAccomFromName = async (accomName) => {
    try {
        const accomRef = ref(db, 'accommodation/data');
        const snapshot = await get(accomRef);

        let foundData = null;

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();

            // Assuming countryData has a 'name' property
            if (childData && childData.name && childData.name.toLowerCase() === accomName.toLowerCase()) {
                foundData = childData;
                console.log("Node with accomName =", accomName, "found!");
            }
        });

        if (!foundData) {
            console.log("Node with accomName =", accomName, "not found.");
        }

        return foundData;
    } catch (error) {
        console.error("Error finding accom:", error);
        throw error;
    }
};

const getAccomFromDestId = async (destId) => {
    try {
        const accomRef = ref(db, "accommodation/data")
        const accomDestRef = ref(db, "dest_accom/data")

        const accomSnapshot = await get(accomRef)
        const accomDestSnapshot = await get(accomDestRef)
        let foundAccomList = [];

        accomDestSnapshot.forEach((accomDestChild) => {
            const accomDestData = accomDestChild.val();
            if (accomDestData && accomDestData.destId == destId) {
                const accomId = accomDestData.accomId;
                accomSnapshot.forEach((accomChild) => {
                    const accomData = accomChild.val();
                    if (accomData && accomData.id == accomId) {
                        foundAccom = accomData
                        foundAccom.baseId = 0
                        foundAccomList.push(foundAccom)
                    }
                });
            }
        });

        return foundAccomList;
    } catch (error) {
        console.error("Error finding accom from country ID:", error);
        throw error;
    }
};

const getAllAccom = async () => {
    try {
        const accomRef = ref(db, 'accommodation/data');
        const snapshot = await get(accomRef);

        const allAccoms = [];

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            allAccoms.push(childData);
        });

        return allAccoms;
    } catch (error) {
        console.error("Error getting all accoms:", error);
        throw error;
    }
};


export { getAccomFromId, getAccomListFromId, getAccomFromName, getAllAccom, getAccomFromDestId, getAllAccommodation }
