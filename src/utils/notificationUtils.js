

export const sendPushNotification = async (token, title, body) => {
    try {
        let response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: token,
                sound: 'default',
                title: title,
                body: body,
            })
        });

        let json = await response.json();
        console.log(json);

        if (json.data && json.data.status == 'ok') {
            console.log("Push notification sent successfully!");
        } else {
            console.error("Failed to send push notification:", json);
        }
    } catch (error) {
        console.error("Error sending push notification:", error);
    }
};