import React, { useState, useEffect } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import axios from 'axios';


const ListaContatosScreen = ({ navigation }) => {

    const [dados, setDados] = useState([]);


    useEffect(() => {
        consultarDados();

        function consultarDados() {
            axios.get('http://localhost:3000/contatos')
                .then(function (response) {
                    setDados(response.data);
                }).catch(function (error) {
                    console.log(error);
                });
        }
    }, [])


    return (
        <View style={{ flex: 1, flexDirection: "colum" }}>


            <View style={{ flex: 1, flexDirection: "row", backgroundColor: '#97D5B1', alignItems: "center", justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'white', marginRight: 35, paddingLeft: 40 }}>Lista de Contatos</Text>

                <TouchableOpacity onPress={() => navigation.navigate('CadastroContato')}>
                    <Image
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/8213/8213565.png',
                        }}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>

            </View>


            <View style={{ flex: 8 }}>

                {
                    dados.map((l, i) => (
                        <ListItem key={i} bottomDivider onPress={() => navigation.navigate('AlterarContato', {
                            nome: l.nome,
                            telefone: l.telefone,
                            email: l.email

                        })
                        }>
                            <Avatar rounded title={l.nome[0]} containerStyle={{ backgroundColor: "#c2c2c2" }} />
                            <ListItem.Content>
                                
                                <ListItem.Title>{l.nome}</ListItem.Title>
                                <ListItem.Subtitle>{l.telefone}</ListItem.Subtitle>
                            </ListItem.Content >
                        </ListItem>
                                              
                    ))
                }
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image style={{ width: 30, height: 30, margin: 20 }}
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/8213/8213439.png',
                    }} />
            </TouchableOpacity>
        </View >
    );
};



export default ListaContatosScreen;
