import moment from "moment";
import { getAllComments, getCommentsFromTourId, addNewComment, addNewReply, likeComment } 
from "../../services/firebase/comment";


// let sampleComments = []; 

export const fetchAndProcessComments = async (tourId) => {
    try {
        const sampleCommentsRaw = await getCommentsFromTourId(tourId);
        sampleCommentsRaw.forEach(c => {
            if (c.children) {
                c.childrenCount = c.children.length;
            }
        });

        let sampleComments = Object.freeze(sampleCommentsRaw);

        return sampleComments;

    } catch (error) {
        console.error("Error fetching or processing comments:", error);
        throw error;
    }
};

// fetchAndProcessComments();

export function getComments() {
    const c = [...sampleComments];
    return c.splice(c.length - 5);
}

export function paginateComments(
    comments,
    from_commentId,
    direction,
    parent_commentId,
    sampleComments
) {
    const c = [...sampleComments];
    if (!parent_commentId) {
        const lastIndex = sampleComments.findIndex(
            c => c.commentId == from_commentId
        );
        if (direction == "up") {
            comments = comments.concat(c.splice(lastIndex + 1, 5));
        } else {
            const start = lastIndex - 6 > 1 ? lastIndex - 6 : 0;

            const part = c.slice(start, lastIndex);
            console.log(start, lastIndex);
            comments = [...part, ...comments];
        }
    } else {
        const parentLastIndexDB = sampleComments.findIndex(
            c => c.commentId == parent_commentId
        );
        const children = c[parentLastIndexDB].children;
        const target = children.findIndex(c => c.commentId == from_commentId);
        const existingIndex = comments.findIndex(
            c => c.commentId == parent_commentId
        );

        if (direction == "up") {
            const append = children.slice(target + 1, 5);
            comments[existingIndex].children.concat(append);
        } else {
            const start = target - 6 >= 0 ? target : 0;
            const prepend = children.slice(start - 6, target);
            comments[existingIndex].children = [
                ...prepend,
                ...comments[existingIndex].children
            ];
        }
    }
    return comments;
}

export function like(comments, cmnt) {
    // Nếu bình luận không có parentId, tức là bình luận gốc
    if (!cmnt.parentId) {
        if (comments) {
            // Tìm bình luận trong danh sách bình luận gốc
            for (let c of comments) {
                if (c.commentId == cmnt.commentId) {
                    c.liked = !c.liked; // Đảo trạng thái liked
                    likeComment(cmnt.commentId)
                    break; 
                }
            }
        }
    } else {
        // Tìm trong danh sách bình luận gốc
        for (let c of comments) {
            // Nếu bình luận có children
            if (c.children) {
                // Tìm bình luận trong danh sách bình luận trả lời
                for (let child of c.children) {
                    if (child.commentId == cmnt.commentId) {
                        child.liked = !child.liked;
                        likeComment(cmnt.commentId)
                        return comments; // Trả về danh sách đã thay đổi
                    }
                }
            }
        }
    }
    
    return comments; 
}

export function edit(comments, cmnt, text) {
    if (!cmnt.parentId) {
        // add result to comments
        if (comments) {
            comments.find(c => {
                if (c.commentId === cmnt.commentId) {
                    c.body = text;
                    return true;
                }
            });
        }
    } else {
        comments.find(c => {
            if (c.children) {
                let isItFound = false;
                c.children.find(child => {
                    if (child.commentId === cmnt.commentId) {
                        child.body = text;
                        isItFound = true;
                    }
                });
                return isItFound;
            }
        });
    }
    return comments;
}

export function deleteComment(comments, cmnt) {
    if (!cmnt.parentId) {
        // add result to comments
        if (comments) {
            const index = comments.findIndex(c => c.commentId === cmnt.commentId);
            comments.splice(index, 1);
        }
    } else {
        comments.find(c => {
            if (c.children) {
                let isItFound = false;
                const index = c.children.findIndex(child => {
                    if (child.commentId === cmnt.commentId) {
                        isItFound = true;
                    }
                });

                if (index) {
                    c.children.splice(index, 1);
                }
                return isItFound;
            }
        });
    }
    return comments;
}

export function save(comments, text, parentCommentId, date, username, tourId, sampleComments) {
    try {
        // find last comment id
        let lastCommentId = 0;
        sampleComments.forEach(c => {
            if (c.commentId > lastCommentId) {
                lastCommentId = c.commentId;
            }
            if (c.children) {
                c.children.forEach(c2 => {
                    if (c2.commentId > lastCommentId) {
                        lastCommentId = c2.commentId;
                    }
                });
            }
        });

        const com = {
            parentId: null,
            commentId: lastCommentId + 1,
            created_at: date,
            updated_at: date,
            liked: false,
            reported: false,
            email: username,
            body: text,
            likes: []
        };

        if (!parentCommentId) {
            comments.push(com);
            addNewComment(tourId, text, date, username, "noUserIdYet");
        } else {
            comments.find(c => {
                if (c.commentId === parentCommentId) {
                    com.parentId = c.commentId;

                    if (c.children) {
                        c.childrenCount = c.childrenCount * 1 + 1;
                        c.children.push(com);
                    } else {
                        c.childrenCount = 1;

                        c.children = [];
                        c.children.push(com);
                    }
                    return true;
                }
            }, this);
            addNewReply(parentCommentId, text, date, username, "noUserIdYet");
        }
        return comments;
    } catch (error) {
        console.error("Error saving comment:", error);
        throw error;
    }
}

export function report(comments, cmnt) {
    if (!cmnt.parentId) {
        // add result to comments

        comments.find(c => {
            if (c.commentId === cmnt.commentId) {
                c.reported = true;
                return true;
            }
        });
    } else {
        comments.find(c => {
            if (c.children) {
                let isItFound = false;
                c.children.find(child => {
                    if (child.commentId === cmnt.commentId) {
                        child.reported = true;
                        isItFound = true;
                    }
                });
                return isItFound;
            }
        });
    }
    return comments;
}