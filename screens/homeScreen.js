import React from 'react';
import { Text, Image, View, TextInput, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, flexDirection: "colum", backgroundColor: '#97D5B1', justifyContent: 'flex-end' }}>
            <View style={{
                flex: 0.92,
                backgroundColor: "#ffffff",
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
    
                <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: '5%', width: '75%', marginBottom: '2%' }}>Login </Text>
                <TextInput
                    style={{
                        height: 45,
                        width: '75%',
                        borderRadius: 3,
                        paddingLeft: 10,
                        borderWidth: 0,
                        backgroundColor: '#f2f2f2',

                    }} />
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
                        title="Login"
                        onPress={() => navigation.navigate('ListaContatos')}
                        color='#97D5B1'
                    />
                </View>
                <View style={[{ width: "50%", margin: 5 }]}>
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

export default HomeScreen;
