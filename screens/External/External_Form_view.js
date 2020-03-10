import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Images, nowTheme } from '../../constants';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
const { width, height } = Dimensions.get('screen');


class External_Form_view extends React.Component {



    constructor(props) {
        super(props);
        this.state = {

            id: "",
            title: "",
            leader_email: ""

        };
    }


    componentDidMount() {
        this.getData();
    }

    async getData() {
        let ip = await AsyncStorage.getItem('ip');
        let session_email = await AsyncStorage.getItem('email');
        await fetch('http://'+ip+':3006/fyp1proposal_list?Email='+session_email+' ')
            .then(res => res.json())
            .then(users => {

                console.warn(users[0].id)
                console.warn(users[0].project_title)
                console.warn(users[0].leader_email)
                this.setState({
                    id: users[0].id,
                    title: users[0].project_title,
                    leader_email: users[0].leader_email
                })
                // this.props.navigation.navigate('Student_Home')
            })
    }


    render() {
        const { id, title, leader_email } = this.state;
        return (
            <Block>
                <ScrollView>


                    <TouchableOpacity style={[styles.card, { backgroundColor: '#FF4500' }]} onPress={() => { this.props.navigation.navigate("FYP1_ProposalForm_View"); }}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.title}>{title}</Text>
                            <Image style={styles.icon} source={{ uri: "https://img.icons8.com/ios/40/000000/settings.png" }} />
                        </View>

                        <View style={styles.cardFooter}>
                            <Text style={styles.subTitle}>  Proposal ID: {id} </Text>
                        </View>
                        <View style={styles.cardFooter}>
                            <Text style={styles.subTitle}>  Leader Email: {leader_email} </Text>
                        </View>

                    </TouchableOpacity>

                    {/* <TouchableOpacity style={[styles.card, { backgroundColor: '#87CEEB' }]} onPress={() => { this.props.navigation.navigate("FYP1_MidEvaluation"); }}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.title}> FYP 1  </Text>
                            <Image style={styles.icon} source={{ uri: "https://img.icons8.com/ios/40/000000/settings.png" }} />
                        </View>

                        <View style={styles.cardFooter}>
                            <Text style={styles.subTitle}> Mid Evaluation Form</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.card, { backgroundColor: '#008080' }]} onPress={() => { this.props.navigation.navigate("FYP1_FinalEvaluation"); }}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.title}> FYP 1  </Text>
                            <Image style={styles.icon} source={{ uri: "https://img.icons8.com/ios/40/000000/settings.png" }} />
                        </View>

                        <View style={styles.cardFooter}>
                            <Text style={styles.subTitle}> Final Evaluation Form</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.card, { backgroundColor: '#FF69B4' }]} onPress={() => { this.props.navigation.navigate("FYP2_MidEvaluation"); }}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.title}> FYP 2  </Text>
                            <Image style={styles.icon} source={{ uri: "https://img.icons8.com/ios/40/000000/settings.png" }} />
                        </View>

                        <View style={styles.cardFooter}>
                            <Text style={styles.subTitle}> Mid Evaluation Form</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.card, { backgroundColor: '#00BFFF' }]} onPress={() => { this.props.navigation.navigate("FYP2_FinalEvaluation"); }}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.title}> FYP 2  </Text>
                            <Image style={styles.icon} source={{ uri: "https://img.icons8.com/ios/40/000000/settings.png" }} />
                        </View>

                        <View style={styles.cardFooter}>
                            <Text style={styles.subTitle}> Final Evaluation Form</Text>
                        </View>
                    </TouchableOpacity> */}

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


export default External_Form_view;
