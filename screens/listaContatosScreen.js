import { useIsFocused } from '@react-navigation/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

export default function ListaContatosScreen({ navigation }){

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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Lista de Contatos</Text>
                <TouchableOpacity onPress={() => navigation.navigate('CadastroContato', { funcao: 'cadastrar' })}>
                    <Image
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/8213/8213565.png',
                        }}
                        style={styles.headerImage}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.listaContatos}>
                {dados.map((l, i) => (
                    <ListItem
                        key={i}
                        bottomDivider
                        onPress={() =>
                            navigation.navigate('CadastroContato', {
                                id: l.id,
                                nome: l.nome,
                                telefone: l.telefone,
                                email: l.email,
                            })
                        }
                    >
                        <Avatar rounded title={l.nome[0]} containerStyle={styles.avatarContainer} />
                        <ListItem.Content>
                            <ListItem.Title style={styles.listItemTitle}>{l.nome}</ListItem.Title>
                            <ListItem.Subtitle>{l.telefone}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </View>
            <TouchableOpacity
                onPress={() =>
                        navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    })
                }
            >
                <Image
                    style={styles.footerImage}
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/8213/8213439.png',
                    }}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    header: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#97D5B1',
        alignItems: "center",
        justifyContent: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'white',
        marginRight: 35,
        paddingLeft: 40,
    },
    headerImage: {
        width: 30,
        height: 30,
    },
    listaContatos: {
        flex: 8,
    },
    avatarContainer: {
        backgroundColor: "#c2c2c2",
    },
    footerImage: {
        width: 30,
        height: 30,
        margin: 20,
    },
});
