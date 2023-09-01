
const Cadastro = ({navigation}) => {
    return (
        <View style={[styles.container, { flexDirection: "colum" }]}>
            <View style={{ flex: 1, backgroundColor: "#f2f2f2", paddingTop: 50, alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 40 }}>Cadastro</Text>
            </View>
            <View style={{
                flex: 8,
                alignItems: 'center',
                justifyContent: 'center',
            }}>

                <Text style={{ fontWeight: 'bold', fontSize: 15, width: '75%', marginBottom: '2%' }}>Nome </Text>
                <TextInput
                    style={{
                        height: 45,
                        borderColor: 'gray',
                        width: '75%',
                        borderRadius: 3,
                        borderWidth: 0,
                        backgroundColor: '#f2f2f2',
                    }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: '3%', width: '75%', marginBottom: '2%' }}>Email </Text>
                <TextInput
                    style={{
                        height: 45,
                        borderColor: 'gray',
                        width: '75%',
                        borderRadius: 3,
                        borderWidth: 0,
                        backgroundColor: '#f2f2f2',
                    }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: '3%', width: '75%', marginBottom: '2%' }}>Senha </Text>
                <TextInput
                    style={{
                        height: 45,
                        borderColor: 'gray',
                        width: '75%',
                        borderRadius: 3,
                        marginBottom: '15%',
                        borderWidth: 0,
                        backgroundColor: '#f2f2f2',
                    }}
                />
                <View style={[{ width: "50%", margin: 5 }]}>
                    <Button
                        title="Cadastrar"
                        onPress={() => Alert.alert('Verifique seu e-mail!')}
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
    },
});

export default Cadastro;