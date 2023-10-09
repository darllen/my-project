import axios from 'axios';
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FlashMessage, { showMessage } from "react-native-flash-message";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";

export default function Cadastro({ route, navigation }) {

  const HOST = 'http://localhost:3000/usuarios/';

  const [getId, setId] = useState();
  const [getNome, setNome] = useState();
  const [getCpf, setCpf] = useState();
  const [getEmail, setEmail] = useState();
  const [getTelefone, setTelefone] = useState();
  const [getSenha, setSenha] = useState();

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


  function cadastrar(email, password) {
    const auth = getAuth();
    debugger
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        showMessage({
          message: "Cadastrado com sucesso!",
          type: "success",
        });

        navigation.navigate('Home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        showMessage({
          message: "Tá errado mermão!",
          type: "danger",
        });
      });
  }

  useEffect(() => {
    if (route.params) {
      setId(route.params.id);
      setNome(route.params.nome);
      setCpf(route.params.cpf)
      setEmail(route.params.email);
      setTelefone(route.params.telefone);
      setSenha(route.params.senha);
    }
  }, []);

  function cadastrarUsuario() {
    axios.post(HOST, {
      nome: getNome,
      cpf: getCpf,
      email: getEmail,
      telefone: getTelefone,
      senha: getSenha,
    })
      .then(response => {
        showMessage({
          message: "Cadastrado com sucesso!",
          type: "success",
        });

        navigation.navigate('Home');
      })
      .catch(error => { console.log(error); });
  }

  return (
    <View style={styles.container}>
      <FlashMessage position="top" />

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://api.iconify.design/material-symbols:arrow-back-ios-new.svg', }}
        />
      </TouchableOpacity>

      <Text style={styles.title1}>Sign-up</Text>

      <View style={styles.inputs}>
        <TextInput
          onChangeText={nome => { setNome(nome); }}
          defaultValue={getNome}
          style={styles.input}
          placeholder="seu nome"
        />
        <TextInput
          onChangeText={cpf => { setCpf(cpf); }}
          defaultValue={getCpf}
          style={styles.input}
          placeholder="123.456.789-12"
        />
        <TextInput
          onChangeText={email => { setEmail(email); }}
          defaultValue={getEmail}
          style={styles.input}
          placeholder="exemplo@hotmail.com"
        />
        <TextInput
          onChangeText={senha => { setSenha(senha); }}
          secureTextEntry={true}
          defaultValue={getSenha}
          style={styles.input}
          placeholder="******"
        />
        <TextInput
          onChangeText={telefone => { setTelefone(telefone); }}
          defaultValue={getTelefone}
          style={styles.input}
          placeholder="(81) 99999-9999"
        />

        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => { cadastrar(getEmail, getSenha); }} style={[styles.buttonContainer, { backgroundColor: '#000' }]}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 40,
    marginLeft: 20,
  },
  title1: {
    fontSize: 30,
    fontWeight: '750',
    marginHorizontal: 30,
    marginTop: 40,
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
  content: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    width: '75%',
    marginBottom: '2%',
  },
  inputs: {
    alignItems: 'center',
    marginTop: 50,
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
    width: '85%',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: '#F9F9F9',
  },
  buttonContainer: {
    height: 45,
    width: '100%',
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
});

