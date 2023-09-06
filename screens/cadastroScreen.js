import React from 'react';
import { Text, Image, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';

const CadastroScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, flexDirection: "colum", backgroundColor: '#ffffff' }}>
           
            <View style={{ flex: 1, flexDirection: "row", backgroundColor: '#97D5B1', alignItems: "center", justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image style={{ width: 30, height: 30 }}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/8213/8213439.png',
                        }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'white', marginRight: 35, paddingLeft: 40 }}>Usuário</Text>
            </View>

            
            <View style={{ flex: 8, alignItems: 'center', justifyContent: 'center' }}>

                <Text style={{ fontWeight: 'bold', fontSize: 15, width: '75%', marginBottom: '2%' }}>Nome </Text>
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
                <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: '7%', width: '75%', marginBottom: '2%' }}>CPF * </Text>
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
                <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: '7%', width: '75%', marginBottom: '2%' }}>Email </Text>
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
                <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: '7%', width: '75%', marginBottom: '2%' }}>Telefone </Text>
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
                        title="Salvar"
                        onPress={() => Alert.alert('Verifique seu e-mail!')}
                        color='#97D5B1'
                    />
                </View>
            </View>
        </View >
    );
};

export default CadastroScreen;
