import React, { useState, useEffect } from 'react';
import { Text, Image, View, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function CadastroContatoScreen({ route, navigation }) {

    const HOST = 'http://localhost:3000/contatos/';

    const { funcao } = route.params;

    const [getId, setId] = useState();
    const [getNome, setNome] = useState();
    const [getEmail, setEmail] = useState();
    const [getTelefone, setTelefone] = useState();

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
            .then(response => { navigation.navigate('ListaContatos'); })
            .catch(error => { console.log(error); });
    }

    function atualizarContato(id) {
        axios.put(HOST + id, {
            nome: getNome,
            email: getEmail,
            telefone: getTelefone
        })
            .then(response => { navigation.navigate('ListaContatos'); })
            .catch(error => { console.log(error); });
    }

    function excluirContato(id) {
        axios
        .delete(HOST + id)
        .then(response => { navigation.navigate('ListaContatos'); })
        .catch(error => { console.log(error); });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('ListaContatos')}>
                    <Image
                        style={styles.headerImage}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/8213/8213439.png',
                        }}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>Contato</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                    onChangeText={nome => { setNome(nome); }}
                    defaultValue={getNome}
                    style={styles.input}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    onChangeText={email => { setEmail(email); }}
                    defaultValue={getEmail}
                    style={styles.input}
                />
                <Text style={styles.label}>Telefone</Text>
                <TextInput
                    onChangeText={telefone => { setTelefone(telefone); }}
                    defaultValue={getTelefone}
                    style={styles.input}
                />

                <View style={[styles.buttonContainer, { marginTop: '15%' }]}>
                    {funcao == 'cadastrar' ? (
                        <Button
                            title="Salvar"
                            onPress={() => { cadastrarContato(); }}
                            color='#97D5B1'
                        />
                    ) : (
                        <View>
                            <View style={styles.button}>
                                <Button
                                    title="Alterar"
                                    onPress={() => { atualizarContato(getId); }}
                                    color='#97D5B1'
                                />
                            </View>
                            <View style={styles.button}>
                                <Button
                                    title="Excluir"
                                    onPress={() => { excluirContato(getId); }}
                                    color='#D6D6D6'
                                />
                            </View>
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
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#97D5B1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerImage: {
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
    },
    label: {
        fontWeight: 'bold',
        fontSize: 15,
        width: '75%',
        marginBottom: '2%',
    },
    input: {
        height: 45,
        width: '75%',
        borderRadius: 3,
        paddingLeft: 10,
        borderWidth: 0,
        backgroundColor: '#f2f2f2',
        marginBottom: '5%',
    },
    buttonContainer: {
        width: '50%',
        margin: 5,
    },
    button: {
        width: '100%',
        margin: 5,
    },
});

