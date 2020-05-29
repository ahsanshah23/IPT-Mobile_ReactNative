import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { View } from 'react-native';


class FYP_Groups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            title: "",
            leaderemail: "",
            groups: [],
            member2email: "",
            member3email: "",
            supervisor: "",
            cosupervisor: ""

        };
    }


    componentDidMount() {
        this.getData();
    }

    async getData() {

        const markers = [];
        let ip = await AsyncStorage.getItem('ip');
        let session_email = await AsyncStorage.getItem('email');

        await fetch('http://' + ip + ':3006/fypgroups?Email=' + session_email + ' ')
            .then(res => res.json())

            .then(res => {
                res.map((element) => {
                    const marketObj = {};

                    marketObj.title = element.title;
                    marketObj.leaderemail = element.leaderemail;
                    marketObj.member2email = element.member2email;
                    marketObj.member3email = element.member3email;
                    marketObj.supervisor = element.supervisor;
                    marketObj.cosupervisor = element.cosupervisor;

                    markers.push(marketObj);
                });

                this.setState({ groups: markers });
            });
    }

    render() {
        const { title, leaderemail, member2email, member3email, supervisor, cosupervisor } = this.state;
        return (
            <Block>
                <ScrollView>
                    {this.state.groups.map((item, key) => (

                        <TouchableOpacity disabled={true} style={[styles.card, { backgroundColor: '#008080' }]} >
                            <View style={styles.cardHeader}>
                                <Text style={styles.title}> {item.title}</Text>
                                <Image style={styles.icon} source={{ uri: "https://img.icons8.com/ios/40/000000/settings.png" }} />
                            </View>

                            <View style={styles.cardFooter}>
                                <Text style={styles.subTitle}> Leader Email:  {item.leaderemail} </Text>
                            </View>
                            <View style={styles.cardFooter}>
                                <Text style={styles.subTitle}> Member #2 Email:  {item.member2email} </Text>
                            </View>
                            <View style={styles.cardFooter}>
                                <Text style={styles.subTitle}> Member #3 Email:  {item.member3email} </Text>
                            </View>
                            <View style={styles.cardFooter}>
                                <Text style={styles.subTitle}> Supervisor Email:  {item.supervisor} </Text>
                            </View>
                            <View style={styles.cardFooter}>
                                <Text style={styles.subTitle}> Cosupervisor Email:  {item.cosupervisor}</Text>
                            </View>

                        </TouchableOpacity>
                    )
                    )}



                </ScrollView>
            </Block>

        );
    }
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 2,
        marginVertical: 2,
        flexBasis: '48%',
        marginTop: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 30,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    icon: {
        height: 20,
        width: 20,
    },
    title: {
        fontFamily: 'montserrat-regular',
        fontSize: 26,
        flex: 1,
        color: "#FFFFFF",
        fontWeight: '500'
    },
    subTitle: {
        fontFamily: 'montserrat-regular',
        fontSize: 16,
        flex: 1,
        color: "#FFFFFF",
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
});


export default FYP_Groups;
