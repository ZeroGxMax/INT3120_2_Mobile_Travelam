import { ref, get, getDatabase,  orderByChild } from "firebase/database";
import { firebaseApp } from "../firebaseService"; 


const db = getDatabase(firebaseApp);

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

export { getAllRestaurants };
