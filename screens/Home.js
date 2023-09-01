import React from "react";
import { Text, Image, View, TextInput, Button, Alert } from "react-native";

function HomeScreen({ navigation }) {
    return (
        <View style={{flexDirection: "colum", backgroundColor: '#f2f2f2'}}>
            <View style={{
                flex: 8,
                backgroundColor: "#ffffff",
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Image
                    source={{
                        uri: 'https://img.freepik.com/fotos-gratis/tiro-ao-ar-livre-de-mulher-de-cabelos-encaracolados-pensativa-fica-contra-o-edificio-urbano-escreve-informacoes-no-notebook-contem-caneta-e-bloco-de-notas-notas-texto-cria-novo-capitulo-o-livro-vestido-com-jumper-verde-casual_273609-62242.jpg?w=1380&t=st=1692966775~exp=1692967375~hmac=f9a03b22ede53deb59bf453436a50bd127484b773238c928983e02577f7bcd74',
                    }}
                    style={{
                        width: 150,
                        height: 150,
                        borderRadius: 100,
                        marginBottom: '7%'
                    }}
                />
                <Text style={{ marginBottom: '10%' }}>Open up App.js to start working on your app!</Text>


                <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: '10%', width: '75%', marginBottom: '2%' }}>Email </Text>
                <TextInput
                    style={{
                        height: 45,
                        width: '75%',
                        borderRadius: 3,
                        paddingLeft: 10,
                        borderWidth: 0,
                        backgroundColor: '#f2f2f2',
                    }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: '3%', width: '75%', marginBottom: '2%' }}>Senha </Text>
                <TextInput
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
                        title="Logar"
                        onPress={() => Alert.alert('Verifique seu e-mail!')}
                        color='#97D5B1'
                    />
                </View>
                <View style={[{ width: "50%", margin: 5 }]}>
                    <Button
                        title="Cadastre-se"
                        color='#D6D6D6'
                        onPress={() => navigation.navigate('cadastro')}
                    />
                </View>

            </View>
        </View>
    );
};


export default HomeScreen;