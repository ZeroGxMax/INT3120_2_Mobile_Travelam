import { storage, firebaseApp } from "../firebaseService"
import { ref, get, getDatabase, set, remove, orderByChild } from "firebase/database";

const db = getDatabase(firebaseApp)

const getAllActivity = async () => {
    try {
        const activityRef = ref(db, 'activity/data');
        const snapshot = await get(activityRef); 

        // console.log("Reference:", restaurantsRef.toString());
        // console.log("Restaurant data:", snapshot.val());

        return snapshot.val();
    } catch (error) {
        console.error("Error getting activities:", error);
        throw error;
    }
};

const getActFromId = async (actId) => {
    try {
        const actRef = ref(db, 'activity/data');
        const snapshot = await get(actRef);

        let foundData = null;

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();

            if (childData && childData.id && childData.id === actId) {
                foundData = childData;
                console.log("Node with actId =", actId, "found!");
            }
        });

        if (!foundData) {
            console.log("Node with actId =", actId, "not found.");
        }

        return foundData;
    } catch (error) {
        console.error("Error finding act:", error);
        throw error;
    }
};

const getActFromName = async (actName) => {
    try {
        const actRef = ref(db, 'activity/data');
        const snapshot = await get(actRef);

        let foundData = null;

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();

            // Assuming countryData has a 'name' property
            if (childData && childData.name && childData.name.toLowerCase() === actName.toLowerCase()) {
                foundData = childData;
                console.log("Node with actName =", actName, "found!");
            }
        });

        if (!foundData) {
            console.log("Node with actName =", actName, "not found.");
        }

        return foundData;
    } catch (error) {
        console.error("Error finding act:", error);
        throw error;
    }
};

const getActFromDestId = async (destId) => {
    try {
        const actRef = ref(db, "activity/data")
        const actDestRef = ref(db, "dest_activity/data")

        const actSnapshot = await get(actRef)
        const actDestSnapshot = await get(actDestRef)
        let foundActList = [];

        actDestSnapshot.forEach((actDestChild) => {
            const actDestData = actDestChild.val();
            if (actDestData && actDestData.destId == destId) {
                const actId = actDestData.activityId;
                actSnapshot.forEach((actChild) => {
                    const actData = actChild.val();
                    if (actData && actData.id == actId) {
                        foundAct = actData
                        foundAct.baseId = 600
                        foundActList.push(foundAct)
                    }
                });
            }
        });

        return foundActList;
    } catch (error) {
        console.error("Error finding act from country ID:", error);
        throw error;
    }
};

export { getActFromId, getActFromName, getActFromDestId, getAllActivity }
