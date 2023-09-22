import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
//import FlashMessage, { showMessage } from "react-native-flash-message";

export default function HomeScreen({ navigation }){

    const ENDERECO_API = 'http://localhost:3000/usuarios';

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();


    const validarLogin = () => {
        
        axios.get(ENDERECO_API + `?email=${email}&senha=${senha}`)
            .then((response) => {
                if (response.data.length != 0 ) {
                    navigation.navigate('ListaContatos');
                } else {
                    /* showMessage({
                        message: "Credenciais inválidas",
                        type: "Erro",
                      }); */
                    Alert.alert('Erro', 'Credenciais inválidas. Por favor, verifique seu email e senha.');
                    alert('Credenciais inválidas');
                }
            })
            .catch((error) => {
                console.error('Erro na requisição:', error);
            });
      };


    return (
        <View style={styles.container}>
            {/* <FlashMessage position="top" /> */}
            <View style={styles.card}>
                <Image
                    source={{
                        uri: 'https://img.freepik.com/fotos-gratis/tiro-ao-ar-livre-de-mulher-de-cabelos-encaracolados-pensativa-fica-contra-o-edificio-urbano-escreve-informacoes-no-notebook-contem-caneta-e-bloco-de-notas-notas-texto-cria-novo-capitulo-o-livro-vestido-com-jumper-verde-casual_273609-62242.jpg?w=1380&t=st=1692966775~exp=1692967375~hmac=f9a03b22ede53deb59bf453436a50bd127484b773238c928983e02577f7bcd74',
                    }}
                    style={styles.image}
                />

                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                />
                <Text style={styles.title}>Senha</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setSenha}
                    secureTextEntry={true}
                />
                <View style={[styles.buttonContainer, { marginTop: '15%' }]}>
                    <Button
                        title="Login"
                        onPress={validarLogin}
                        color='#97D5B1'
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Cadastre-se"
                        color='#D8D8D8'
                        onPress={() => navigation.navigate('Cadastro')}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#97D5B1',
        justifyContent: 'flex-end',
    },
    card: {
        flex: 0.92,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.4,
        shadowRadius: 50,
        paddingHorizontal: 20,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginBottom: '7%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: '5%',
        width: '75%',
        marginBottom: '2%',
    },
    input: {
        height: 45,
        width: '80%',
        borderRadius: 3,
        paddingLeft: 10,
        borderWidth: 0,
        backgroundColor: '#f2f2f2',
    },
    buttonContainer: {
        width: '55%',
        marginVertical: 5,
    },
});

