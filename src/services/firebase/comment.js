import { storage, firebaseApp } from "../firebaseService"
import { ref, get, getDatabase, push, set, remove, orderByChild, child, update } from "firebase/database";

const db = getDatabase(firebaseApp)

const getLastCommentId = (commentSnapshot) => {
    
    let lastCommentId = 0;

    commentSnapshot.forEach((comment) => {
        let childData = comment.val()
        if (childData.commentId > lastCommentId) {
            lastCommentId = childData.commentId
        }
        if (childData.children) {
            childData.children.forEach((reply) => {
                if (reply.commentId > lastCommentId) {
                    lastCommentId = reply.commentId
                }
            })
        }
    })

    return lastCommentId
}

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

const getCommentFromId = async (commentId) => {
    try {
        const commentRef = ref(db, 'comment/data');
        const snapshot = await get(commentRef);

        let comment;

        snapshot.forEach((commentChild) => {
            const commentData = commentChild.val();
            if (commentData && commentChild.commentId == commentId) {
                comment = commentData;
            }
            if (commentData.children) {
                commentData.children.forEach((reply) => {
                    if (reply.commentId == commentId) {
                        comment = reply
                    }
                })
            }
        });
        return comment;
    } catch (error) {
        console.error("Error getting comment:", error);
        throw error;
    }
};

const addNewComment = async (tourId, body, created_at, email, userId) => {
    try {
        const commentRef = ref(db, 'comment/data');
        const newCommentRef = push(commentRef);
        const snapshot = await get(commentRef);
        
        let lastCommentId = getLastCommentId(snapshot)

        const newComment = {
            body: body,
            commentId: lastCommentId + 1,
            created_at: created_at,
            email: email,
            liked: false,
            reported: false,
            tourId: tourId,
            userId: userId,
        };

        // console.log("New comment: " + JSON.stringify(newComment, null, 2));
        await set(newCommentRef, newComment);
        console.log("Comment added successfully");
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
}

const addNewReply = async (parentId, body, created_at, email, userId) => {
    try {
        const commentRef = ref(db, 'comment/data');
        const snapshot = await get(commentRef);
        let refToParent;
        let parentComment;
        let lastCommentId = getLastCommentId(snapshot)

        snapshot.forEach((commentChild) => {
            const commentData = commentChild.val()
            if (commentData && commentData.commentId == parentId) {
                parentComment = commentData;
                refToParent = child(commentRef, commentChild.key)
            }
        });

        const newComment = {
            parentId: parentId,
            body: body,
            commentId: lastCommentId + 1,
            created_at: created_at,
            email: email,
            liked: false,
            reported: false,
            userId: userId,
        };

        const newCommentRef = child(refToParent, "children");

        // If "children" key exists -> Add newComment (a single list element) to it
        // Else create a "children" key and add newComment (as a list) to it
        if (parentComment.children) {
            const childrenCount = `${parentComment.children.length}`
            newReplyRef = child(newCommentRef, childrenCount)
            console.log("New reply: " + JSON.stringify(newComment, null, 2));
            await set(newReplyRef, newComment);
            console.log("Reply added successfully");
        } else {
            const newCommentList = [newComment]
            console.log("New reply: " + JSON.stringify(newComment, null, 2));
            await set(newCommentRef, newCommentList);
        }
        console.log("Reply added successfully");
    } catch (error) {
        console.error("Error adding reply:", error);
        throw error;
    }
}

const getRefFromId = async (commentId) => {
    try {
        const commentRef = ref(db, 'comment/data');
        const snapshot = await get(commentRef);

        let commentRefFound;

        // Create an array to hold promises for fetching replies
        const promises = [];

        snapshot.forEach((commentChild) => {
            const commentData = commentChild.val();
            if (commentData && commentData.commentId == commentId) {
                commentRefFound = commentChild.ref;
            }
            if (commentData.children) {
                const replyRef = ref(db, `comment/data/${commentChild.key}/children`);
                // Push each asynchronous operation to the promises array
                promises.push(
                    get(replyRef).then((replySnapshot) => {
                        replySnapshot.forEach((reply) => {
                            const replyData = reply.val();
                            if (replyData.commentId == commentId) {
                                commentRefFound = child(commentChild.ref, `children/${reply.key}`);
                            }
                        });
                    })
                );
            }
        });
        await Promise.all(promises);

        // console.log(commentRefFound);
        return commentRefFound;
    } catch (error) {
        console.error("Error getting comment reference:", error);
        throw error;
    }
};

const likeComment = async (commentId) => {
    try {
        const ref = await getRefFromId(commentId)
        const snapshot = await get(ref)
        const commentData = snapshot.val();
        commentData.liked = !commentData.liked;
        await update(ref, commentData);

    } catch (error) {
        console.error("Error like comment: ", error)
    }
}

export {getAllComments, getCommentsFromTourId, addNewComment, getCommentFromId, addNewReply, likeComment}