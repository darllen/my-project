import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import FlashMessage, { showMessage } from "react-native-flash-message";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


export default function Login({ navigation }) {

    const ENDERECO_API = 'http://localhost:3000/usuarios';

    const provider = new GoogleAuthProvider();

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    const firebaseConfig = {
        apiKey: "AIzaSyAvIIGFGEg7pV4kJ2BSZyjIG4b3-OQ3AOU",
        authDomain: "phonebook-757bd.firebaseapp.com",
        projectId: "phonebook-757bd",
        storageBucket: "phonebook-757bd.appspot.com",
        messagingSenderId: "860387209839",
        appId: "1:860387209839:web:f5c8bf7c40f25eedad539a",
        measurementId: "G-8VER03WY3D"
    };

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);


    const validarLogin = () => {

        axios.get(ENDERECO_API + `?email=${email}&senha=${senha}`)
            .then((response) => {
                if (response.data.length != 0) {
                    navigation.navigate('ListaContatos');
                } else {
                    showMessage({
                        message: "Credenciais inválidas",
                        type: "danger",
                    });
                }
            })
            .catch((error) => {
                console.error('Erro na requisição:', error);
            });
    };

    function logar(email, password) {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate('ListaContatos');

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                showMessage({
                    message: "Credenciais inválidas",
                    type: "danger",
                });
            });
    }

    function logarGoogle(email, password) {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                navigation.navigate('ListaContatos');
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                showMessage({
                    message: "Algo deu errado",
                    type: "danger",
                });
            });
    }


    return (
        <View style={styles.container}>
            <FlashMessage position="top" />
            <Text style={styles.title1}>LogIn</Text>

            <View style={styles.inputs}>
                {/* <Text style={styles.title2}>Login</Text> */}
                <TextInput
                    onChangeText={setEmail}
                    style={styles.input}
                    placeholder="exemplo@hotmail.com"
                />
                {/* <Text style={styles.title2}>Senha</Text> */}
                <TextInput
                    onChangeText={setSenha}
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="******"
                />
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={() => { logar(email, senha); }} style={[styles.buttonContainer, { backgroundColor: '#000' }]}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonContainer]} onPress={() => navigation.navigate('Cadastro')}>
                    <Text style={[styles.buttonText, { color: '#000', fontSize: 13 }]}>
                        Não tem uma conta? <Text style={{ textDecorationLine: 'underline' }}>Cadastre-se</Text>
                    </Text>
                </TouchableOpacity>

                <View style={styles.divider}>
                    <View style={styles.dividerLeft}><Text> </Text></View>                        
                    <View style={styles.dividerCenter}>
                        <Text style={[styles.title3, { color: 'rgba(0, 0, 0, 0.40)' }]}>   SingIn with   </Text>
                    </View>
                    <View style={styles.dividerRight}><Text> </Text></View>
                </View>

                <TouchableOpacity onPress={() => { logarGoogle(); }} style={[styles.buttonContainerGoogle]} >
                    <Text style={[styles.buttonText, { color: '#000' }]}>Google</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    title1: {
        fontSize: 30,
        fontWeight: '750',
        marginHorizontal: 30,
        marginTop: 90,
    },
    title2: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: '5%',
        width: '75%',
        marginBottom: '2%',
    },
    title3: {
        fontWeight: 500,
        fontSize: 12,
    },
    inputs: {
        alignItems: 'center',
        marginTop: 100,
    },
    input: {
        height: 52,
        width: '85%',
        borderRadius: 4,
        paddingLeft: 10,
        backgroundColor: '#F9F9F9',
        placeholderTextColor: '#ABABAB',
        color: '#000',
        margin: 13,
    },
    buttons: {
        alignItems: 'center',
        marginTop: 40,
    },
    buttonContainer: {
        height: 50,
        width: '85%',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainerGoogle: {
        height: 50,
        width: '85%',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        color: '#000',
        borderColor: '#000',
    },
    buttonText: {
        fontSize: 16, 
        fontWeight: '600',
        color: '#FFF',
        textAlign: 'center',
        letterSpacing: 1,
    },
    divider: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        color: "#d9d9d9",
        paddingBottom: 24,
        justifyContent: 'center',
    },
    dividerLeft: {
        width: '40%',
        borderBottomWidth: 1,
        borderColor: '#d9d9d9',
    },
    dividerCenter: {
        height: 50,
        justifyContent: 'center',
    },
    dividerRight: {
        width: '40%',
        borderBottomWidth: 1,
        borderColor: '#d9d9d9'
    }
});

