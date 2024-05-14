import { storage, firebaseApp } from "../firebaseService"
import { ref, get, getDatabase, set, remove, orderByChild } from "firebase/database";

const db = getDatabase(firebaseApp)

const getTransFromId = async (transId) => {
    try {
        const transRef = ref(db, 'transportation/data');
        const snapshot = await get(transRef);

        let foundData = null;

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();

            if (childData && childData.id && childData.id === transId) {
                foundData = childData;
                console.log("Node with transId =", transId, "found!");
            }
        });

        if (!foundData) {
            console.log("Node with transId =", transId, "not found.");
        }

        return foundData;
    } catch (error) {
        console.error("Error finding trans:", error);
        throw error;
    }
};

const getTransFromName = async (transName) => {
    try {
        const transRef = ref(db, 'transportation/data');
        const snapshot = await get(transRef);

        let foundData = null;

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();

            // Assuming countryData has a 'name' property
            if (childData && childData.name && childData.name.toLowerCase() === transName.toLowerCase()) {
                foundData = childData;
                console.log("Node with transName =", transName, "found!");
            }
        });

        if (!foundData) {
            console.log("Node with transName =", transName, "not found.");
        }

        return foundData;
    } catch (error) {
        console.error("Error finding trans:", error);
        throw error;
    }
};

const getTransFromDestId = async (destId) => {
    try {
        const transRef = ref(db, "transportation/data")
        const transDestRef = ref(db, "dest_trans/data")

        const transSnapshot = await get(transRef)
        const transDestSnapshot = await get(transDestRef)
        let foundTransList = [];

        transDestSnapshot.forEach((transDestChild) => {
            const transDestData = transDestChild.val();
            if (transDestData && transDestData.destId == destId) {
                const transId = transDestData.transId;
                transSnapshot.forEach((transChild) => {
                    const transData = transChild.val();
                    if (transData && transData.id == transId) {
                        foundTrans = transData
                        foundTrans.baseId = 400
                        foundTransList.push(foundTrans)
                    }
                });
            }
        });

        return foundTransList;
    } catch (error) {
        console.error("Error finding trans from country ID:", error);
        throw error;
    }
};

export { getTransFromId, getTransFromName, getTransFromDestId }
