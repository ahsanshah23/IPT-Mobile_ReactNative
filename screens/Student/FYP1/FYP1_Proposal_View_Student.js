import React from "react";
import { StyleSheet, Dimensions, ScrollView, TextInput, View } from "react-native";
import { Block, theme, Text } from "galio-framework";
import { nowTheme } from '../../../constants';
var FloatingLabel = require('react-native-floating-labels');
import { Card } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
// import articles from "../../../constants/articles";
const { width } = Dimensions.get("screen");

class FYP1_Proposal_View_Student extends React.Component {

    constructor(props) {
        super(props);
        //Initial State
        this.state = {
            title: "",
            type: "",
            areaofinterest: "HCI",
            abstract: "",
            leadername: "",
            leaderemail: "",
            member2name: "",
            member2email: "",
            member3name: "",
            member3email: "",
            supervisor: "",
            cosupervisor: "",
            comment: "",
            status: ""

        };
    }

    componentDidMount() {
        this.getdata();

    }

    async getdata() {
        let ip = await AsyncStorage.getItem('ip');
        let session_email = await AsyncStorage.getItem('email');
        fetch('http://' + ip + ':3006/fyp1proposal_view?Email=' + session_email + '')
            .then(res => res.json())
            .then(users => {
                this.setState({
                    title: users[0].project_title,
                    type: users[0].project_type,
                    areaofinterest: users[0].area_of_interest,
                    abstract: users[0].abstract,
                    leaderemail: users[0].leader_email,
                    leadername: users[0].leader_name,
                    member2email: users[0].member2_email,
                    member2name: users[0].member2_name,
                    member3email: users[0].member3_email,
                    member3name: users[0].member3_name,
                    supervisor: users[0].supervisor,
                    cosupervisor: users[0].cosupervisor,
                    comment: users[0].comment,
                    status: users[0].status,
                    submitted_by: users[0].submitted_by
                })
            })
    }

    renderHeading = () => {
        return (
            <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text
                        h3
                        style={{
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >
                        FAST NUCES, Karachi
          </Text>
                    <Text
                        h4
                        style={{
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Pre-Registration Form, Fall 2019
          </Text>
                    <Text
                        h4
                        style={{
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Final Year Project I – CS 491
          </Text>
                </Block>
            </Block>
        );
    };

    getChecked = (value) => {
        this.setState({ status: value });
    }

    renderTitle = () => {
        const { title, type } = this.state;

        return (
            <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text
                        h5
                        style={{
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            fontWeight: '500'
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Project Title : {title}
                    </Text>

                    <Text
                        h5
                        style={{
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            fontWeight: '500'
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Project Type: {type}
                    </Text>

                </Block>
            </Block>
        );
    };

    renderInterest = () => {
        const { areaofinterest } = this.state;
        return (
            <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text
                        h5
                        style={{
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            fontWeight: '500'
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Area of interest(s)
                    </Text>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Block style={{ flexDirection: 'column' }}>

                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%'
                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                {areaofinterest}
                            </Text>

                        </Block>
                    </Block>
                </Block>
            </Block>
        );

    };

    renderAbstract = () => {
        const { abstract } = this.state;
        return (
            <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text
                        h5
                        style={{
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            fontWeight: '500'
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Abstract
                    </Text>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Type here to add abstract."
                            multiline={true}
                            autoCapitalize="sentences"
                            underlineColorAndroid="transparent"
                            selectionColor={'white'}
                            maxLength={5000}
                            returnKeyType="done"
                            autoCorrect={false}
                            blurOnSubmit={true}
                            value={abstract}
                            editable={false}
                        />
                    </Block>
                </Block>
            </Block>
        );
    };

    renderTeam = () => {
        const { leaderemail, leadername, member2email, member2name, member3email, member3name } = this.state;
        return (
            <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text
                        h5
                        style={{
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            fontWeight: '500'
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Team Members
                    </Text>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Block style={{ flexDirection: 'column' }}>
                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',
                                    fontWeight: '500'
                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                Member 1 : (Leader)
                            </Text>
                            <Block style={{ flexDirection: 'column' }}>


                                <Text
                                    p
                                    style={{
                                        fontFamily: 'montserrat-regular',
                                        marginBottom: theme.SIZES.BASE / 2,
                                        marginTop: '2.5%',
                                        fontSize: 16,

                                    }}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Email: {leaderemail}
                                </Text>

                            </Block>
                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',
                                    fontWeight: '500'
                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                Member 2 :
                            </Text>
                            <Block style={{ flexDirection: 'column' }}>


                                <Text
                                    p
                                    style={{
                                        fontFamily: 'montserrat-regular',
                                        marginBottom: theme.SIZES.BASE / 2,
                                        marginTop: '2.5%',
                                        fontSize: 16,

                                    }}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Email: {member2email}
                                </Text>

                            </Block>
                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',
                                    fontWeight: '500'
                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                Member 3 :
                            </Text>
                            <Block style={{ flexDirection: 'column' }}>


                                <Text
                                    p
                                    style={{
                                        fontFamily: 'montserrat-regular',
                                        marginBottom: theme.SIZES.BASE / 2,
                                        marginTop: '2.5%',
                                        fontSize: 16,

                                    }}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Email: {member3email}
                                </Text>
                            </Block>
                        </Block>
                    </Block>
                </Block>
            </Block>
        );
    };

    renderEnd = () => {
        const { supervisor, cosupervisor } = this.state;
        return (
            <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text
                        h5
                        style={{
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            fontWeight: '500'
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Supervisors
                    </Text>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Block style={{ flexDirection: 'column' }}>
                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',

                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                Supervisor : {supervisor}
                            </Text>

                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',

                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                Co-supervisor(s) (if any) : {cosupervisor}
                            </Text>

                        </Block>
                    </Block>
                </Block>
            </Block>
        );
    };

    renderHeadingSupervisor = () => {
        return (
            <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>

                    <Text
                        h4
                        style={{
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Supervisor evaluataion
                    </Text>
                </Block>
            </Block>
        );
    };

    renderComment = () => {
        const { comment } = this.state;
        return (
            <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text
                        h5
                        style={{
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            fontWeight: '500'
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Comment
              </Text>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Type here to add comments"
                            multiline={true}
                            autoCapitalize="sentences"
                            underlineColorAndroid="transparent"
                            selectionColor={'white'}
                            maxLength={5000}
                            returnKeyType="done"
                            autoCorrect={false}
                            blurOnSubmit={true}
                            disabled
                            value={comment}
                        //onSubmitEditing={onDoneAddItem}
                        //   onChangeText={(comment) => this.setState({ comment })}
                        />
                    </Block>
                </Block>
            </Block>
        );
    };

    renderstatus = () => {
        const { status } = this.state;

        return (
            <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text
                        h5
                        style={{
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            fontWeight: '500'
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Status : {status}
                    </Text>


                </Block>
            </Block>
        );
    }

    render() {
        return (
            <Block flex center>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
                    <Card style={styles.card}>
                        {this.renderHeading()}
                        {this.renderTitle()}
                        {this.renderInterest()}
                        {this.renderAbstract()}
                        {this.renderTeam()}
                        {this.renderEnd()}
                    </Card>


                    <View style={styles.lineStyle} />

                    <Card style={styles.card}>
                        {this.renderHeadingSupervisor()}
                        {this.renderstatus()}
                        {this.renderComment()}
                    </Card>


                </ScrollView>
            </Block>
        );
    }

}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'orange',
        color: 'white'
    },
    card: {
        marginTop: 40,
        backgroundColor: '#F5F5F5'
    },
    lineStyle: {
        borderWidth: 2,
        borderColor: 'black',
        margin: 10,
    },
    group: {
        paddingTop: theme.SIZES.BASE * 2
    },
    input: {
        paddingTop: 10,
        paddingRight: 15,
        fontSize: 15,
        color: 'black'

    },
    container: {
        fontSize: 16,
        backgroundColor: 'white',
    },

    formInput: {
        borderBottomWidth: 1.5,
        fontSize: 16
    },
    input1: {
        borderWidth: 0,
        fontSize: 16
    }
})

export default FYP1_Proposal_View_Student;
