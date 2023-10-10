
import * as ImagePicker from 'expo-image-picker';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, list, ref, uploadBytes } from "firebase/storage";
import React, { useState }  from 'react';
import { Button, Image, View, TouchableOpacity, Text, FlatList, ActivityIndicator,Linking } from 'react-native';
import moment from "moment/moment";

 
export default function Upload({ navigation }) {

    const [imageUri, setImageUri] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [links, setLinks] = useState([]);

    const firebaseConfig = {
        apiKey: "AIzaSyCFJDKhqI20VHvbTzWzX3rG-2b-paMQ4OM",
        authDomain: "phonebook-821a2.firebaseapp.com",
        projectId: "phonebook-821a2",
        storageBucket: "phonebook-821a2.appspot.com",
        messagingSenderId: "676148577800",
        appId: "1:676148577800:web:78625f4f2c8195d288b3bd",
        measurementId: "G-03QJEXWH6Y"
    };

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({

            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });

        if (!result.cancelled) {

            setImageUri(result.uri);
            console.log(result.assets);

        }
    };

    const uploadImage = async () => {
        if (!imageUri) {
            Alert.alert('Selecione uma imagem antes de enviar.');
            return;
        }

        // Create a root reference
        const storage = getStorage();
        const randomFilename = generateRandomFilename();


        // Create a reference to 'mountains.jpg'
        const mountainsRef = ref(storage, randomFilename);

        const response = await fetch(imageUri);
        const blob = await response.blob();

        uploadBytes(mountainsRef, blob).then((snapshot) => {
            console.log(snapshot);
        });
    }

    function generateRandomFilename() {
        const randomString = generateRandomString(6);
        const currentTimestamp = moment(new Date()).format(
          "MM_DD_YYYY_h_mm_ss_SSS"
        );
        const randomNumber = Math.floor(Math.random() * 1000000);
        const fileExtension = "";
        const generatedRandomFilename = randomString + "_" + currentTimestamp + "_" + randomNumber + fileExtension;
        return generatedRandomFilename
      }
    
      function generateRandomString(stringLength) {
        let result = "";
        const alphaNumericCharacters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const alphabetsLength = alphaNumericCharacters.length;
        for (let i = 0; i < stringLength; i++) {
          result += alphaNumericCharacters.charAt(Math.floor(Math.random() * alphabetsLength));
        }
        return result;
      }

    async function LinkImage() {
        // Create a reference under which you want to list
        const storage = getStorage();
        const listRef = ref(storage);

        // Fetch the first page of 100.
        const newLinks = firstPage.items.map((item) => {
            return {
                link: ('https://firebasestorage.googleapis.com/v0/b/' + item.bucket + '/o/' + item.fullPath + '?alt=media'),
                fileName: item._location.path
            };
        });

        setLinks(newLinks);
    }

    return (

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Escolher Imagem" onPress={pickImage} />
            {imageUri && <Image source={{ uri: imageUri }} style={{
                width: 200,
                height: 200, 
                marginVertical: 20,
                borderRadius: 999
            }} />}
            {uploading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Enviar Imagem" onPress={uploadImage} disabled=
                    {!imageUri} />
            )}
            <Button title="Ver Imagens" onPress={LinkImage} />

            <View>
                <FlatList
                    data={links}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => setImageUri(item.link)}>
                            {/* <Image
                                source={{ uri: item }}
                                style={{width: 200, height: 100}}
                            /> */}
                            <Text>Imagem: {item.fileName}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>





    )
}
