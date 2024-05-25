import React, { Component, useState, useEffect, useRef } from "react";
import { ScrollView, Image, StyleSheet } from "react-native";
import LoadingView from '../components/utils/LoadingView';

import Comments from "./CommentScreenContent/Comments"
import * as commentActions from "./CommentScreenContent/commentActions";
import moment from "moment";

const CommentScreen = ({ route, navigation }) => {
    const { tour } = route.params;

    const [loading, setLoading] = useState(true);

    const scrollViewRef = useRef(null);
    const [sampleComments, setSampleComments] = useState([]);
    const [comments, setComments] = useState(null);
    const [loadingComments, setLoadingComments] = useState(true);
    const [lastCommentUpdate, setLastCommentUpdate] = useState(null);
    let scrollIndex = 0;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log(tour.id)
                // const c = commentActions.getComments();
                const processedComments = await commentActions.fetchAndProcessComments(tour.id);
                setSampleComments(processedComments)
                // console.log(sampleComments)
                setComments(processedComments.slice(-5));
                // setComments(c);
                setLoadingComments(false);
                setLastCommentUpdate(new Date().getTime());
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
    }, [sampleComments]);

    const extractUsername = (c) => {
        try {
            return c.email !== "" ? c.email : null;
        } catch (e) {
            console.log(e);
        }
    };

    const extractBody = (c) => {
        try {
            return c.body && c.body !== "" ? c.body : null;
        } catch (e) {
            console.log(e);
        }
    };

    const extractImage = (c) => {
        try {
            return c.image_id && c.user.image_id !== "" ? c.user.image_id : "";
        } catch (e) {
            console.log(e);
        }
    };

    const extractChildrenCount = (c) => {
        // console.log(c)
        try {
            if (c.children) {
                return c.childrenCount
            } else {
                return 0;
            }
        } catch (e) {
            console.log(e);
        }
    };

    const extractEditTime = (item) => {
        try {
            return item.updated_at;
        } catch (e) {
            console.log(e);
        }
    };

    const extractCreatedTime = (item) => {
        try {
            return item.created_at;
        } catch (e) {
            console.log(e);
        }
    };

    const likeExtractor = (item) => {
        return item.liked;
    };

    const reportedExtractor = (item) => {
        return item.reported;
    };

    const likesExtractor = (item) => {
        if (item.likes) {
            return item.likes.map((like) => {
                return {
                    image: like.image,
                    name: like.username,
                    userId: like.userId,
                    tap: (username) => {
                        console.log("Taped: " + username);
                    },
                };
            });
        }
    };

    /** I change something here */
    const isCommentChild = (item) => {
        // return item.parentId !== null;
        return item.parentId != null;
    };

    const extractKey = (item) => {
        return item.commentId;
    };

    if (loading) {
        return <LoadingView />;
    }

    return (
        <ScrollView
            style={styles.container}
            keyboardShouldPersistTaps="always"
            onScroll={(event) => {
                scrollIndex = event.nativeEvent.contentOffset.y;
            }}
            ref={scrollViewRef}
        >
            <Image
                style={{ height: 200 }}
                source={{
                    uri: tour.demoImage
                }}
            />
            <Comments
                data={comments}
                viewingUserName={"Pearline@veda.ca"}
                userIsAdmin={true}
                styles={{}}
                initialDisplayCount={5}
                editMinuteLimit={0}
                usernameTapAction={(username) => {
                    console.log("Taped user: " + username);
                }}
                childPropName={"children"}
                isChild={(item) => isCommentChild(item)}
                keyExtractor={(item) => extractKey(item)}
                parentIdExtractor={(item) => item.parentId}
                usernameExtractor={(item) => extractUsername(item)}
                editTimeExtractor={(item) => extractEditTime(item)}
                createdTimeExtractor={(item) => extractCreatedTime(item)}
                bodyExtractor={(item) => extractBody(item)}
                imageExtractor={(item) => extractImage(item)}
                likeExtractor={(item) => likeExtractor(item)}
                reportedExtractor={(item) => reportedExtractor(item)}
                likesExtractor={(item) => likesExtractor(item)}
                childrenCountExtractor={(item) => extractChildrenCount(item)}
                replyAction={(offset) => {
                    scrollViewRef.current.scrollTo({
                        x: null,
                        y: scrollIndex + offset - 300,
                        animated: true,
                    });
                }}
                saveAction={(text, parentCommentId) => {
                    let date = moment().format("YYYY-MM-DD H:mm:ss");
                    let newComments = commentActions.save(
                        comments,
                        text,
                        parentCommentId,
                        date,
                        "testUser",
                        tour.id,
                        sampleComments
                    );
                    setComments(newComments);

                    if (!parentCommentId) {
                        scrollViewRef.current.scrollToEnd();
                    }
                }}
                editAction={(text, comment) => {
                    let newComments = commentActions.edit(comments, comment, text);
                    setComments(newComments);
                }}
                reportAction={(comment) => {
                    let newComments = commentActions.report(comments, comment);
                    setComments(newComments);
                }}
                likeAction={(comment) => {
                    let newComments = commentActions.like(comments, comment);
                    // setComments(newComments);
                }}
                deleteAction={(comment) => {
                    let newComments = commentActions.deleteComment(comments, comment);
                    setComments(newComments);
                }}
                paginateAction={(from_comment_id, direction, parent_comment_id) => {
                    let newComments = commentActions.paginateComments(
                        comments,
                        from_comment_id,
                        direction,
                        parent_comment_id,
                        sampleComments
                    );

                    setComments(newComments);
                    setTimeout(function () {
                        if (direction == "up") {
                            scrollViewRef.current.scrollTo({
                                x: 0,
                                y: 500,
                                animated: true,
                            });
                        } else {
                            scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
                        }
                    }, 3000);
                }}
            />
        </ScrollView>
    );

}
export default CommentScreen;

const styles = StyleSheet.create({
    commentContainer: {
        padding: 5,
        flexDirection: 'row'
    },
    left: {
        padding: 5
    },
    image: {
        height: 40,
        width: 40,
        borderRadius: 40
    },
    right: {
        flex: 1,
        padding: 5
    },
    rightContent: {
        borderRadius: 10,
        padding: 5,
        backgroundColor: '#f1f3f6'
    },
    rightContentTop: {
        flexDirection: 'row'
    },

    name: {
        fontWeight: 'bold',
        paddingBottom: 5
    },
    editIcon: {
        flex: 1,
        alignItems: 'flex-end',
    },
    body: {
        paddingBottom: 10
    },
    rightActionBar: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    time: {
        fontSize: 12,
        paddingLeft: 5,
        color: '#9B9B9B',
        fontStyle: 'italic'
    },
    actionText: {
        color: '#9B9B9B',
        fontWeight: 'bold'
    },
    repliedSection: {
        width: 180,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    repliedImg: {
        height: 20,
        width: 20,
        borderRadius: 20
    },
    repliedUsername: {
        color: '#9B9B9B',
        fontWeight: 'bold'
    },
    repliedText: {
        color: '#9B9B9B',
    },
    repliedCount: {
        color: '#9B9B9B',
        fontSize: 12
    },
    inputSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    submit: {
        padding: 10,
    },
    input: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        color: '#424242',
    },
    likeNr: {
        fontWeight: 'normal',
        fontSize: 12
    },
    likeHeader: {
        textAlign: 'center',
        padding: 10,
        fontWeight: 'bold'

    },
    likeButton: {
        margin: 10,
        alignItems: 'center',

    },
    likeContainer: {
        padding: 10,
        width: 200,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',

    },
    likeImage: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    likename: {
        fontWeight: 'bold',
        fontSize: 14
    },
    editModalContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    editModal: {
        backgroundColor: "white",
        width: 400,
        height: 300,
        borderWidth: 2,
        borderColor: "silver"
    },
    editButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        height: 40,
        width: 80,
        paddingLeft: 5,
        paddingRight: 5,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "silver",
        borderRadius: 5,
        margin: 10
    }
})