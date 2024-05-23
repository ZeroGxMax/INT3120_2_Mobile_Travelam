import { storage, firebaseApp } from "../firebaseService"
import { ref, get, getDatabase, set, remove, orderByChild } from "firebase/database";

const db = getDatabase(firebaseApp)

const getAllComments = async () => {
    try {
        const commentRef = ref(db, 'comment/data');
        const snapshot = await get(commentRef); 

        return snapshot.val();
    } catch (error) {
        console.error("Error getting comment:", error);
        throw error;
    }
};

const getCommentsFromTourId = async (tourId) => {
    try {
        const commentRef = ref(db, 'comment/data');
        const snapshot = await get(commentRef);

        const comments = [];
        snapshot.forEach((commentChild) => {
            const commentData = commentChild.val();
            if (commentData && commentData.tourId == tourId) {
                comments.push(commentData);
            }
        });

        return comments;
    } catch (error) {
        console.error("Error getting comments:", error);
        throw error;
    }
};

export {getAllComments, getCommentsFromTourId}