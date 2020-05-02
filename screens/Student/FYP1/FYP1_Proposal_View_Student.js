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
            
            abstract: "",
            leaderID: "",
            member1ID: "",
            member2ID: "",
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
        fetch('http://'+ip+'/api/fyp1get/getproposaldetails')
            .then(res => res.json())
            .then(users => {

                this.setState({

                    title: users[0].ProjectTitle,

                    type: users[0].ProjectType,

                    abstract: users[0].Abstract,

                    leaderID: users[0].LeaderID,

                    member1ID: users[0].Member1ID,

                    member2ID: users[0].Member2ID,

                    supervisor: users[0].SupervisorID,

                    cosupervisor: users[0].CoSupervisorID,

                    comment: users[0].Comment,

                    status: users[0].Status,

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


                    <Text
                        p
                        style={{
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            marginTop: '2.5%',

                        }}
                        color={nowTheme.COLORS.HEADER}
                    >
                        {abstract}
                    </Text>


                </Block>
            </Block>
        );
    };

    renderTeam = () => {
        const { leaderID, member1ID, member2ID } = this.state;
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
                                Leader ID:
                            </Text>
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
                                    {leaderID}
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
                                Member 1 :
                            </Text>
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
                                    {member1ID}
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

                                    }}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    {member2ID}
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
