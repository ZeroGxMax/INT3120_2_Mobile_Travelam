import React, { PureComponent } from "react";
import {
    View,
    Text,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Alert
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

class Comment extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            menuVisible: false,
            liked: props.liked,
        };
    }

    toggleMenuVisibility = () => {
        this.setState(prevState => ({ menuVisible: !prevState.menuVisible }));
    };

    toggleLike = () => {
        this.setState(prevState => ({
            liked: !prevState.liked
        }));
    }

    handleAction = (action) => {
        return () => {
            action(this.props.data);
            this.setState({ menuVisible: false });
        };
    };

    confirmAction = (message, action) => {
        return () => {
            Alert.alert(
                `Confirm ${message}`,
                `Are you sure you want to ${message}?`,
                [
                    { text: "Yes", onPress: this.handleAction(action) },
                    { text: "No", onPress: () => null }
                ],
                { cancelable: true }
            );
        };
    };

    getStyle = (name) => (this.props.styles && this.props.styles[name]) ? this.props.styles[name] : {};

    renderActionButton = (action, label, customStyles) => (
        <TouchableHighlight style={styles.actionButton} onPress={this.handleAction(action)}>
            <Text style={[styles.actionText, customStyles]}>{label}</Text>
        </TouchableHighlight>
    );

    renderMenuItem = (label, action, customStyles) => (
        <TouchableOpacity style={styles.menuItem} onPress={this.handleAction(action)}>
            <Text style={[styles.menuText, this.getStyle("menuText"), customStyles]}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    render() {
        let{ menuVisible, liked } = this.state;
        const {
            image,
            likesNr,
            likeAction,
            replyAction,
            username,
            body,
            canEdit,
            reportAction,
            reported,
            isOwnComment
        } = this.props;

        return (
            <View style={[styles.commentContainer, this.getStyle("commentContainer")]}>
                <View style={styles.left}>
                    <TouchableHighlight onPress={this.handleAction(this.props.usernameTapAction)}>
                        <View style={{ alignItems: "center" }}>
                            <Image
                                style={[
                                    styles.image,
                                    { width: 30, height: 30, borderRadius: 15 },
                                    this.getStyle("avatar")
                                ]}
                                source={
                                    image === ""
                                        ? require("../../assets/no-user.png")
                                        : { uri: image }
                                }
                            />
                            {/* {likesNr && likeAction ? (
                                <TouchableHighlight
                                    style={[styles.actionButton, { paddingTop: 5 }]}
                                    onPress={this.handleAction(this.props.likesTapAction)}
                                >
                                    <View style={{ flexDirection: "row" }}>
                                        <Icon name="heart" color="#df1740" size={15} />
                                        <Text style={styles.likeNr}>{likesNr}</Text>
                                    </View>
                                </TouchableHighlight>
                            ) : null} */}
                        </View>
                    </TouchableHighlight>
                </View>
                <TouchableOpacity
                    onPress={() => this.setState({ menuVisible: false })}
                    onLongPress={this.toggleMenuVisibility}
                    style={styles.right}
                >
                    <View style={styles.rightContent}>
                        <View style={styles.rightContentTop}>
                            <TouchableHighlight onPress={this.handleAction(this.props.usernameTapAction)}>
                                <Text style={[styles.name, this.getStyle("username")]}>{username}</Text>
                            </TouchableHighlight>
                        </View>
                        <Text style={[styles.body, this.getStyle("body")]}>{body}</Text>
                    </View>
                    <View style={styles.rightActionBar}>
                        <TouchableHighlight style={styles.actionButton} onPress={() => {
                            this.props.likeAction(this.props.data)
                            this.toggleLike();
                        }}>
                            <Text style={[styles.actionText, liked ? { color: "#4DB2DF" } : null]}>
                                Like
                            </Text>
                        </TouchableHighlight>
                        {replyAction && this.renderActionButton(replyAction, "Reply")}
                    </View>
                </TouchableOpacity>
                {menuVisible && (
                    <View style={[
                        styles.menu,
                        this.props.isChild && { position: 'absolute' }
                    ]}>
                        <View style={{ flex: 1.5 }}>
                            {reportAction && !isOwnComment && (
                                <TouchableOpacity
                                    style={styles.menuItem}
                                    onPress={this.confirmAction("report", this.props.reportAction)}
                                >
                                    <Text style={[
                                        styles.menuText,
                                        { fontStyle: reported ? "italic" : "normal", fontSize: reported ? 11 : 14 },
                                        this.getStyle("menuText"),
                                        this.getStyle(reported ? "reportedText" : "reportText")
                                    ]}>
                                        {reported ? "Reported" : "Report"}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                )}
            </View>
        );
    }
}

Comment.propTypes = {
    data: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
    styles: PropTypes.object,
    canEdit: PropTypes.bool,
    child: PropTypes.bool,
    editComment: PropTypes.func,
    likeAction: PropTypes.func,
    liked: PropTypes.bool,
    likesNr: PropTypes.number,
    likesTapAction: PropTypes.func,
    replyAction: PropTypes.func,
    deleteAction: PropTypes.func,
    reportAction: PropTypes.func,
    reported: PropTypes.bool,
    updatedAt: PropTypes.string,
    username: PropTypes.string.isRequired,
    usernameTapAction: PropTypes.func,
    isChild: PropTypes.bool,
};

export default Comment;
