import * as ImagePicker from 'expo-image-picker';
import { storage } from '../services/firebaseService';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Alert } from 'react-native';

export const pickImage = async (setImage) => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted == false) {
        Alert.alert("Permission to access media library is required!");
        return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!pickerResult.canceled) {
        const source = { uri: pickerResult.assets[0].uri };
        setImage(source);
        return source;
    }
    return null;
};

export const uploadImageToStorage = async (imageUri, setUploading, setImageUrl, setImagePicked) => {
    try {
        setUploading(true);
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const filename = imageUri.substring(imageUri.lastIndexOf("/") + 1);
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, blob);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                null,
                (error) => {
                    console.error("Upload failed: ", error);
                    setUploading(false);
                    setImagePicked(false);
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log('File available at', downloadURL);
                    setImageUrl(downloadURL);
                    setUploading(false);
                    setImagePicked(false); 
                    resolve(downloadURL);
                }
            );
        });
    } catch (error) {
        console.error("Error in uploadImageToStorage: ", error);
        setUploading(false);
        throw error;
    }
};