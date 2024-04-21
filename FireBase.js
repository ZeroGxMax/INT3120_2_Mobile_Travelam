import { getApp, getApps, initializeApp, deleteApp } from "firebase/app";
import {
    browserLocalPersistence,
    browserPopupRedirectResolver,
    getAuth,
    initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDvUMG51AH0c5IL-zWhDp_uC5N0Wky94ZY",
    authDomain: "travelam-b45ed.firebaseapp.com",
    projectId: "travelam-b45ed",
    storageBucket: "travelam-b45ed.appspot.com",
    databaseURL: "https://travelam-b45ed-default-rtdb.asia-southeast1.firebasedatabase.app",
    messagingSenderId: "269119879844",
    appId: "1:269119879844:android:deb8a062674874d08a4431",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, auth, db, storage };