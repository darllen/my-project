import React, { useState, useEffect } from 'react';
import { Text, Image, View, TextInput, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';


const CadastroContatoScreen = ({ route, navigation }) => {

    const [getNome, setNome] = useState();
    const [getEmail, setEmail] = useState();
    const [getTelefone, setTelefone] = useState();


    useEffect(() => {
        if (route.params) {
            setNome(route.params.nome);
            setEmail(route.params.email);
            setTelefone(route.params.telefone)
        }
    }, [])


    function cadastrarContato() {
        axios.post('http://localhost:3000/contatos', {
            nome: getNome,
            email: getEmail,
            telefone: getTelefone
        }).then(function (response) {
            navigation.navigate('ListaContatos')
        }).catch(function (error) {
            console.log(error);
        });
    }


    return (
        <View style={{ flex: 1, flexDirection: "colum", backgroundColor: '#ffffff' }}>

            <View style={{ flex: 1, flexDirection: "row", backgroundColor: '#97D5B1', alignItems: "center", justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('ListaContatos')}>
                    <Image style={{ width: 30, height: 30 }}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/8213/8213439.png',
                        }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'white', marginRight: 35, paddingLeft: 40 }}>Contato</Text>
            </View>


            <View style={{ flex: 8, alignItems: 'center', justifyContent: 'center' }}>

                <Text style={{ fontWeight: 'bold', fontSize: 15, width: '75%', marginBottom: '2%' }}>Nome </Text>
                <TextInput
                    onChangeText={nome => { setNome(nome) }}
                    defaultValue={getNome}
                    style={{
                        height: 45,
                        width: '75%',
                        borderRadius: 3,
                        paddingLeft: 10,
                        borderWidth: 0,
                        backgroundColor: '#f2f2f2',
                    }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: '7%', width: '75%', marginBottom: '2%' }}>Email </Text>
                <TextInput
                    onChangeText={email => { setEmail(email) }}
                    defaultValue={getEmail}
                    style={{
                        height: 45,
                        width: '75%',
                        borderRadius: 3,
                        paddingLeft: 10,
                        borderWidth: 0,
                        backgroundColor: '#f2f2f2',
                    }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: '7%', width: '75%', marginBottom: '2%' }}>Telefone </Text>
                <TextInput
                    onChangeText={telefone => { setTelefone(telefone) }}
                    defaultValue={getTelefone}
                    style={{
                        height: 45,
                        width: '75%',
                        borderRadius: 3,
                        paddingLeft: 10,
                        marginBottom: '15%',
                        borderWidth: 0,
                        backgroundColor: '#f2f2f2',
                    }}
                />
                <View style={[{ width: "50%", margin: 5 }]}>
                    <Button
                        title="Salvar"
                        onPress={() => { cadastrarContato() }
                        }
                        color='#97D5B1'
                    />
                    {
                        


                    }
                    
                    
                </View>

            </View>


        </View>
    );
};

export default CadastroContatoScreen;
