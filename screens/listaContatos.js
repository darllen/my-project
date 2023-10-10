import { useIsFocused } from '@react-navigation/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import FlashMessage, { showMessage } from "react-native-flash-message";
import { getAuth, signOut } from "firebase/auth";



export default function ListaContatos({ navigation }) {

    const HOST = 'http://localhost:3000/contatos/';
    const [dados, setDados] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        consultarContatos();
    }, [isFocused]);

    function consultarContatos() {
        axios.get(HOST)
            .then(function (response) {
                setDados(response.data);
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function deslogar() {
        const auth = getAuth();

        signOut(auth).then(() => {
            showMessage({
                message: "Até logo!",
                type: "success",
            });
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }]
            })

        }).catch((error) => {
            showMessage({
                message: "Error",
                type: "danger",
            });
        });
    }

    return (
        <View style={styles.container}>
            <FlashMessage position="top" />

            <View style={styles.header}>
                <Text style={styles.headerText}>phonebook</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AddContato', { funcao: 'cadastrar' })}>
                    <Image style={styles.headerImage} source={{ uri: 'https://api.iconify.design/material-symbols:add.svg', }} />
                </TouchableOpacity>
            </View>

            <View style={styles.listaContatos}>
                {dados.map((l, i) => (
                    <ListItem key={i} bottomDivider
                        onPress={() =>
                            navigation.navigate('AddContato', {
                                id: l.id,
                                nome: l.nome,
                                telefone: l.telefone,
                                email: l.email,
                            })}>

                        <Avatar rounded title={l.nome[0]} containerStyle={styles.avatarContainer} />
                        <ListItem.Content>
                            <ListItem.Title style={styles.listItemTitle}>{l.nome}</ListItem.Title>
                            <ListItem.Subtitle>{l.telefone}</ListItem.Subtitle>
                        </ListItem.Content>
                        <Image style={[ styles.icon, { margin: 0, marginRight: 10}]} source={{ uri: 'https://api.iconify.design/material-symbols:call.svg', }} />
                    </ListItem>
                ))}
            </View>
            <View style={styles.footer}>
                <TouchableOpacity>
                    <Image style={styles.icon} source={{ uri: 'https://api.iconify.design/material-symbols:house.svg', }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.icon} source={{ uri: 'https://api.iconify.design/material-symbols:call.svg', }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { deslogar(); }}>
                    <Image style={styles.icon} source={{ uri: 'https://api.iconify.design/material-symbols:exit-to-app.svg', }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',
    },
    header: {
        height: 120,
        flexDirection: "row",
        backgroundColor: '#F9F9F9',
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingHorizontal: 25,
        paddingTop: 1,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#000',
        paddingBottom: 15,
    },
    headerImage: {
        width: 30,
        height: 30,
        marginBottom: 60,
    },
    listaContatos: {
        flex: 8,
    },
    avatarContainer: {
        backgroundColor: "#000",
    },
    icon: {
        width: 30,
        height: 30,
        margin: 20
    },
    footer: {
        height: 70,
        backgroundColor: '#F9F9F9',
        borderTopColor: '#c2c2c2',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
    },

});
