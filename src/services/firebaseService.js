import { getApp, getApps, initializeApp, deleteApp } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {
    browserLocalPersistence,
    browserPopupRedirectResolver,
    getAuth,
    initializeAuth,
    getReactNativePersistence
} from "firebase/auth";
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

const auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const storage = getStorage(firebaseApp);

export { firebaseApp, auth, storage };