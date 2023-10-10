import React, { useState, useEffect } from 'react';
import { Text, Image, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getStorage, list, ref, uploadBytes } from "firebase/storage";
import FlashMessage, { showMessage } from "react-native-flash-message";
import moment from "moment/moment";

export default function AddContato({ route, navigation }) {

    const HOST = 'http://localhost:3000/contatos/';

    const { funcao } = route.params;

    const [getId, setId] = useState();
    const [getNome, setNome] = useState();
    const [getEmail, setEmail] = useState();
    const [getTelefone, setTelefone] = useState();
    const [imageUri, setImageUri] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        if (route.params) {
            setId(route.params.id);
            setNome(route.params.nome);
            setEmail(route.params.email);
            setTelefone(route.params.telefone);
        }
    }, []);

    function cadastrarContato() {
        axios.post(HOST, {
            nome: getNome,
            email: getEmail,
            telefone: getTelefone
        })
        .then(response => { 
            showMessage({
                message: "Cadastrado com sucesso!",
                type: "success",
            });
            navigation.navigate('ListaContatos');
        })
        .catch(error => { console.log(error); });
    }

    function atualizarContato(id) {
        axios.put(HOST + id, {
            nome: getNome,
            email: getEmail,
            telefone: getTelefone
        })
        .then(response => { 
            showMessage({
                message: "Contato atualizado!",
                type: "success",
            });
            navigation.navigate('ListaContatos'); 
        })
        .catch(error => { console.log(error); });
    }

    function excluirContato(id) {
        axios
        .delete(HOST + id)
        .then(response => { 
            showMessage({
                message: "Contato excluído!",
                type: "success",
            });
            navigation.navigate('ListaContatos'); 
        })
        .catch(error => { console.log(error); });
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImageUri(result.uri);
        }
    };

    const uploadImage = async () => {
        if (!imageUri) {
            Alert.alert('Selecione uma imagem antes de enviar.');
            return;
        }

        const storage = getStorage();
        const fileName = generateRandomFilename()
        const mountainsRef = ref(storage, `${fileName}`);

        const response = await fetch(imageUri);
        const blob = await response.blob();

        uploadBytes(mountainsRef, blob).then((snapshot) => {
            console.log(snapshot);
        });
    }

    function generateRandomFilename() {
        const randomString = generateRandomString(6);
        const currentTimestamp = moment(new Date()).format("MM_DD_YYYY_h_mm_ss_SSS");
        const randomNumber = Math.floor(Math.random() * 1000000);
        const fileExtension = "";
        const generatedRandomFilename = randomString + "_" + currentTimestamp + "_" + randomNumber + fileExtension;
        return generatedRandomFilename
    }

    function generateRandomString(stringLength) {
        let result = "";
        const alphaNumericCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const alphabetsLength = alphaNumericCharacters.length;
        for (let i = 0; i < stringLength; i++) {
            result += alphaNumericCharacters.charAt(Math.floor(Math.random() * alphabetsLength));
        }
        return result;
    }

    const LinkImage = async () => {
        const storage = getStorage();
        const listRef = ref(storage);
        const fileName = generateRandomFilename()
        const firstPage = await list(listRef, fileName);

        const newLinks = firstPage.items.map((item) => {
            return {
                link: ('https://firebasestorage.googleapis.com/v0/b/' + item.bucket + '/o/' + item.fullPath + '?alt=media'),
                fileName: item._location.path
            };
        });

        setLinks(newLinks);
    };

    return (
        <View style={styles.container}>
            <FlashMessage position="top" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('ListaContatos')}>
                    <Image style={styles.headerImage} source={{ uri: 'https://api.iconify.design/material-symbols:arrow-back-ios-new.svg', }} />
                </TouchableOpacity>
                <Text style={styles.headerText}>phonebook</Text>
            </View>

            <View style={styles.avatar}>
                {imageUri ? (
                    <Image
                        source={{ uri: imageUri }}
                        style={{
                            width: 100,
                            height: 100,
                            marginVertical: 20,
                            borderRadius: 999
                        }}
                    />
                ) : (
                    <TouchableOpacity style={styles.avatarDefault} onPress={pickImage}>
                        <Image style={styles.avatarDefaultIcon} source={{ uri: 'https://api.iconify.design/material-symbols:add-photo-alternate-outline.svg', }} />
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.content}>
                <View style={styles.inputs}>
                    <TextInput
                        onChangeText={nome => { setNome(nome); }}
                        defaultValue={getNome}
                        style={[styles.input, { marginBottom: 40, }]}
                        placeholder="nome"
                    />
                    <TextInput
                        onChangeText={email => { setEmail(email); }}
                        defaultValue={getEmail}
                        style={[styles.input, { marginBottom: 40, }]}
                        placeholder="email"
                    />
                    <TextInput
                        onChangeText={telefone => { setTelefone(telefone); }}
                        defaultValue={getTelefone}
                        style={styles.input}
                        placeholder="telefone"
                    />
                </View>

                <View style={styles.buttons}>
                    {funcao == 'cadastrar' ? (
                        <TouchableOpacity onPress={() => { cadastrarContato(); }} style={[styles.buttonContainer, { backgroundColor: '#000' }]}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={() => { atualizarContato(getId); }} style={[styles.buttonContainer, { backgroundColor: '#000' }]}>
                                <Text style={styles.buttonText}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { excluirContato(getId); }} style={[styles.buttonContainerGoogle, { backgroundColor: 'transparent' }]}>
                                <Text style={[styles.buttonText, { color: '#000' }]}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        height: 120,
        flexDirection: "colum",
        backgroundColor: '#F9F9F9',
        paddingTop: 20,
        paddingLeft: 20,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#000',
    },
    headerImage: {
        width: 30,
        height: 30,
        marginBottom: 25,
    },
    avatarDefault:{
        width: 100,
        height: 100,
        backgroundColor: '#dcdcdc',
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarDefaultIcon:{
        width: 40,
        height: 40,
    },
    avatar:{
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 15,
        width: '75%',
        color: '#8c8c8c'
    },
    inputs: {
        width: '100%',
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: '75%',
        paddingLeft: 1,
        borderBottomWidth: 1,
        backgroundColor: 'transparent',
        placeholderTextColor: '#ABABAB',
        color: '#000',
        borderBottomColor: '#c2c2c2'
    },
    buttons: {
        alignItems: 'center',
        marginTop: 40,
        width: '100%'
    },
    buttonContainer: {
        height: 40,
        width: '75%',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16, 
        fontWeight: '600',
        color: '#FFF',
        textAlign: 'center',
        letterSpacing: 1,
    },
    buttonContainerGoogle: {
        height: 40,
        width: '75%',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        color: '#000',
        borderColor: '#000',
        marginTop: 10,
    },
});
