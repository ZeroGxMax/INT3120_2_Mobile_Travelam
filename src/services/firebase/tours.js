import { storage, firebaseApp } from "../firebaseService"
import { ref, get, getDatabase, set, remove, orderByChild } from "firebase/database";

const db = getDatabase(firebaseApp)

const getAllTours = async (tourId) => {
    try {
        const toursRef = ref(db, 'tour/data');
        const snapshot = await get(toursRef);

        // console.log("Reference:", toursRef.toString());
        // console.log("Data inside '10' node:", snapshot.val());

        return snapshot.val();
    } catch (error) {
        console.error("Error getting tours:", error);
        throw error;
    }
};

const getBestTours = async (limit = 10) => {
    try {
        const tourRef = ref(db, 'tour/data');

        const snapshot = await get(tourRef);

        let bestTours = []; 
        let highestVotings = []; // Variable to store the highest votings

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val(); 

            if (bestTours.length < limit || childData.voting > Math.min(...highestVotings)) {
                bestTours.push(childData);
                highestVotings.push(childData.voting);
                
                // If the number of best tours exceeds the limit, remove the tour with the lowest Votings
                if (bestTours.length > limit) {
                    const lowestVotingsIndex = highestVotings.indexOf(Math.min(...highestVotings));
                    bestTours.splice(lowestVotingsIndex, 1);
                    highestVotings.splice(lowestVotingsIndex, 1);
                }
            }
        });

        // If no tour with a Votings is found
        if (bestTours.length === 0) {
            console.log("Best tour: No tours found.");
        } else {
            console.log("Best tours found!");
        }

        return bestTours; // Return the best tours
    } catch (error) {
        console.error("Error finding best tours:", error);
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

const getTourByCountryId = async (countryId) => {
    try {
        const tourRef = ref(db, 'tour/data');
        const tourDestRef = ref(db, "tour_dest/data");
        const destRef = ref(db, "destination/data");

        const tourSnapshot = await get(tourRef);
        const tourDestSnapshot = await get(tourDestRef);
        const destSnapshot = await get(destRef);

        let foundTours = [];

        tourSnapshot.forEach((tourChild) => {
            const tourData = tourChild.val();
            const tourId = tourData.id;

            let found = false;

            tourDestSnapshot.forEach((tourDestChild) => {
                const tourDestData = tourDestChild.val();
                const destId = tourDestData.destId;

                if (tourDestData.tourId == tourId) {
                    destSnapshot.forEach((destChild) => {
                        const destData = destChild.val();
                        if (destData && destData.id == destId && destData.countryId == countryId && !found) {
                            foundTours.push(tourData);
                            found = true;
                            return;
                        }
                    });
                }
                if (found) {
                    return;
                }
            });
        });

        if (foundTours.length === 0) {
            console.log("No tour found!");
        }

        return foundTours;
    } catch (error) {
        console.error("Error finding specific tours by country:", error);
        throw error;
    }
};



export { getAllTours, getTourById, getTourByCountryId, getBestTours }