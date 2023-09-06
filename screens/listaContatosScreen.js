import React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

const ListaContatosScreen = ({ navigation }) => {
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
                <ListItem bottomDivider /* style={{alignItems: "center", backgroundColor: "pink" }} */
                    onPress={() => navigation.navigate('AlterarContato')}>
                    <Avatar rounded title="M" containerStyle={{ backgroundColor: "#c2c2c2" }} />
                    <ListItem.Content>
                        <ListItem.Title>Marcus Andrade</ListItem.Title>
                        <ListItem.Subtitle>81 988553424</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider
                    onPress={() => navigation.navigate('AlterarContato')}>
                    <Avatar rounded title="P" containerStyle={{ backgroundColor: "#7EAD94" }} />
                    <ListItem.Content>
                        <ListItem.Title>Patrícia Tavares</ListItem.Title>
                        <ListItem.Subtitle>81 998765332</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                <ListItem
                    onPress={() => navigation.navigate('AlterarContato')}>
                    <Avatar rounded title="R" containerStyle={{ backgroundColor: "#648477" }} />
                    <ListItem.Content>
                        <ListItem.Title>Rodrigo Antunes</ListItem.Title>
                        <ListItem.Subtitle>81 987765525</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
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
