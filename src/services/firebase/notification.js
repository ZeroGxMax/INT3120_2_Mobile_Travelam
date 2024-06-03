import { firebaseApp } from "../firebaseService"
import { ref, get, getDatabase, set, child, push, update } from "firebase/database";
import { formatDate } from "../../utils/dateUtils";

const db = getDatabase(firebaseApp)

const getToken = async (userId) => {
    try {
        const cusRef = ref(db, 'customer/data/' + userId);
        const snapshot = await get(cusRef);

        if (!snapshot.exists()) {
            console.error("No data available for user:", userId);
            return null;
        }

        const token = snapshot.val().push_token ? snapshot.val().push_token : null

        // console.log(token)

        return token;
    } catch (error) {
        console.error("Error retrieving push token:", error);
        throw error;
    }
};

const getUserNotification = async (userId) => {
    try {
        const notificationRef = ref(db, 'notification/data');
        const snapshot = await get(notificationRef);

        let foundNotifications = [];
        snapshot.forEach((notification) => {
            const data = notification.val();

            if (data.userId && data.userId == userId) {
                foundNotifications.push(data)
                // console.log(data)
            }
        });

        return foundNotifications
    } catch {
        console.error("Error finding notifications:", error);
        throw error;
    }
}

const getLastNotiId = async (snapshot) => {
    let lastNotiId = 0;

    snapshot.forEach((noti) => {
        let data = noti.val();
        if (data.id > lastNotiId) {
            lastNotiId = data.id;
        }
    });

    return lastNotiId;
};

const addScheduleNotification = async (userId, push_token, tourName, startDate, daysBefore) => {
    try {
        const notiRef = ref(db, 'notification/data');
        const newNotiRef = push(notiRef);
        const snapshot = await get(notiRef);
        const lastNotiId = await getLastNotiId(snapshot);

        let notificationDate = new Date(startDate);
        notificationDate.setDate(notificationDate.getDate() - daysBefore);

        const formattedStartDate = formatDate(startDate);

        const newNotification = {
            id: lastNotiId + 1,
            userId: userId,
            push_token: push_token,
            title: "Tour Reminder",
            body: `Your tour "${tourName}" is starting on ${formattedStartDate}. Only ${daysBefore} days left! Please prepare.`,
            startDate: new Date(startDate).toISOString(),
            notification_date: notificationDate.toISOString(), 
            pushed: false,
            read: false,
        };

        await set(newNotiRef, newNotification);
        console.log("Notifications added successfully");
    } catch (error) {
        console.error("Error adding notifications:", error);
        throw error;
    }
}

const addNotification = async (userId, title, body, push_token, secondAfter) => {
    try {
        const notiRef = ref(db, 'notification/data');
        const newNotiRef = push(notiRef);
        const snapshot = await get(notiRef);
        const lastNotiId = await getLastNotiId(snapshot);

        const notificationDate = new Date();
        notificationDate.setSeconds(notificationDate.getSeconds() + secondAfter);

        const newNotification = {
            id: lastNotiId + 1,
            userId: userId,
            push_token: push_token,
            title: title,
            body: body,
            notification_date: notificationDate.toISOString(), 
            pushed: true,
            read: false,
        };

        await set(newNotiRef, newNotification);
        console.log("Notifications added successfully");
    } catch (error) {
        console.error("Error adding notifications:", error);
        throw error;
    }
}

const getRefFromId = async (notificationId) => {
    try {
        const notiRef = ref(db, 'notification/data');
        const snapshot = await get(notiRef);

        let notificationRefFound;

        snapshot.forEach((child) => {
            const data = child.val();
            if (data && data.id == notificationId) {
                notificationRefFound = child.ref;
            }
        });

        if (!notificationRefFound) {
            throw new Error(`Notification with ID ${notificationId} not found.`);
        }

        return notificationRefFound;
    } catch (error) {
        console.error("Error getting notification reference:", error);
        throw error;
    }
};

const markPushedNotifications = async (notificationId) => {
    try {
        let ref = await getRefFromId(notificationId)
        const snapshot = await get(ref)
        const notiData = snapshot.val();

        if (!notiData.pushed) {
            notiData.pushed = true
        }

        await update(ref, notiData);
        
        console.log("Mark pushed notification successfully");
    } catch (error) {
        console.error("Error mark pushed notification:", error);
        throw error;
    }
}

const markReadNotifications = async (notificationId) => {
    try {
        let ref = await getRefFromId(notificationId)
        const snapshot = await get(ref)
        const notiData = snapshot.val();

        if (!notiData.read) {
            notiData.read = true
        }

        await update(ref, notiData);
        
        console.log("Mark read notification successfully");
    } catch (error) {
        console.error("Error mark read notification:", error);
        throw error;
    }
}

export {getToken, addScheduleNotification, addNotification, getUserNotification, markPushedNotifications, markReadNotifications}