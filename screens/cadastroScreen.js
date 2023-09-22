import React, { useState, useEffect } from 'react';
import { Text, Image, View, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';


export default function CadastroScreen({ route, navigation }){

  const HOST = 'http://localhost:3000/usuarios/';

  const [getId, setId] = useState();
  const [getNome, setNome] = useState();
  const [getCpf, setCpf] = useState();
  const [getEmail, setEmail] = useState();
  const [getTelefone, setTelefone] = useState();
  const [getSenha, setSenha] = useState();

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
      .then(response => { navigation.navigate('Home'); })
      .catch(error => { console.log(error); });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            style={styles.headerIcon}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/8213/8213439.png',
            }}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Usuário</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Nome *</Text>
        <TextInput
          onChangeText={nome => { setNome(nome); }}
          defaultValue={getNome}
          style={styles.input}
        />
        <Text style={styles.label}>CPF </Text>
        <TextInput
          onChangeText={cpf => { setCpf(cpf); }}
          defaultValue={getCpf}
          style={styles.input}
        />
        <Text style={styles.label}>Email *</Text>
        <TextInput
          onChangeText={email => { setEmail(email); }}
          defaultValue={getEmail}
          style={styles.input}
        />
        <Text style={styles.label}>Senha *</Text>
        <TextInput
          onChangeText={senha => { setSenha(senha); }}
          defaultValue={getSenha}
          style={styles.input}
        />
        <Text style={styles.label}>Telefone</Text>
        <TextInput
          onChangeText={telefone => { setTelefone(telefone); }}
          defaultValue={getTelefone}
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Salvar"
            onPress={() => { cadastrarUsuario(); }}
            color='#97D5B1'
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
    backgroundColor: '#ffffff',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#97D5B1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    width: 30,
    height: 30,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
    marginRight: 35,
    paddingLeft: 40,
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
  input: {
    height: 40,
    width: '75%',
    borderRadius: 3,
    paddingLeft: 10,
    borderWidth: 0,
    backgroundColor: '#f2f2f2',
    marginBottom: '5%',
  },
  buttonContainer: {
    width: '50%',
    margin: 10,
  },
});

