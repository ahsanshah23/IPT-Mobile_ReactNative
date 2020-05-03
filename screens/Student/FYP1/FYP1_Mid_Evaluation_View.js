import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Block, theme, Text } from "galio-framework";
import { nowTheme } from '../../../constants';
import { AsyncStorage } from 'react-native';
var FloatingLabel = require('react-native-floating-labels');
// import articles from "../../../constants/articles";

class FYP1_Mid_Evaluation_Add extends React.Component {
    state = {
        ischecked: false,
    };

    constructor(props) {
        super(props);
        //Initial State
        this.state = {
            title: "",
            leaderID: "",
            member1ID: "",
            member2ID: "",
            supervisor: "",
            cosupervisor: "",
            status: "",
            markcriteria1: "",
            markcriteria2: "",
            markcriteria3: "",
            markcriteria4: "",
            markcriteria5: "",
            deliverable1: "",
            deliverable2: "",
            deliverable3: "",
            deliverable4: "",
            deliverable5: "",
            changes: "",
            markstotal: ""
        };
    }

    componentDidMount() {
        this.getdata();

    }

    async getdata() {
        let ID1 = await AsyncStorage.getItem('ID');
        alert(ID1);
        let ip = await AsyncStorage.getItem('ip');
        let session_email = await AsyncStorage.getItem('email');
        await fetch('http://192.168.1.4:45455/api/fyp1get/GetProposalEvaluations?id='+ID1+'')
            .then(res => res.json())
            .then(users => {
                this.setState({
                    title: users[0].ProjectName,
                    leaderID: users[0].LeaderID,
                    member1ID: users[0].Member1ID,
                    member2ID: users[0].Member2ID,
                    supervisor: users[0].SuperVisorEmpID,
                    cosupervisor: users[0].CoSuperVisorID,
                    status: users[0].DefenceStatus,
                    markcriteria1: users[0].Criteria1Marks,
                    markcriteria2: users[0].Criteria2Marks,
                    markcriteria3: users[0].Criteria3Marks,
                    markcriteria4: users[0].Criteria4Marks,
                    markcriteria5: users[0].Criteria5Marks,
                    deliverable1: users[0].Deliverables1,
                    deliverable2: users[0].Deliverables2,
                    deliverable3: users[0].Deliverables3,
                    deliverable4: users[0].Deliverables4,
                    deliverable5: users[0].Deliverables5,
                    changes: users[0].ChangesRecommeneded,
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
                        FYP Defence Evaluation Form
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
                        Project Title: {this.state.title}
                    </Text>

                </Block>
            </Block>
        );
    };

    renderStatus = () => {
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
                        Project Status : {this.state.status}
                    </Text>

                </Block>
            </Block>
        );


    };

    renderAssesment = () => {
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
                        Assesment Criteria Type
          </Text>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Block style={{ flexDirection: 'column' }}>
                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',
                                    fontSize: 16

                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                1) Project Background and Problem: {this.state.markcriteria1}
                            </Text>


                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',
                                    fontSize: 16
                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                2) Objectives: {this.state.markcriteria2}
                            </Text>

                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',
                                    fontSize: 16
                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                3) Significance of Study: {this.state.markcriteria3}
                            </Text>


                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',
                                    fontSize: 16
                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                4) Literature Review: {this.state.markcriteria4}
                            </Text>


                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',
                                    fontSize: 16
                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                5) Project Methodology: {this.state.markcriteria5}
                            </Text>


                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',
                                    fontSize: 16
                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                6) Presentation and Writing of the Report: {this.state.markcriteria6}
                            </Text>



                        </Block>
                    </Block>
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
                                Leader ID : {leaderID}
                            </Text>
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
                                Member 2 : {member1ID}
                            </Text>
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
                                Member 3 : {member2ID}
                            </Text>
                        </Block>
                    </Block>
                </Block>
            </Block>
        );
    };

    renderSupervisors = () => {
        const { supervisor, cosupervisor } = this.state;
        return (
            <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text
                        h5
                        style={{
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            fontWeight: '500',

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
                                    fontSize: 16

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
                                    fontSize: 16

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

    renderDeliverables = () => {
        return (
            <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text
                        h5
                        style={{
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            fontWeight:'500'
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >
                        FYP 1 Deliverables:
                    </Text>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Block style={{ flexDirection: 'column' }}>
                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',
                                    fontSize: 16

                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                Deliverable # 1: {this.state.deliverable1}
                            </Text>


                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',
                                    fontSize: 16

                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                Deliverable # 2: {this.state.deliverable2}
                            </Text>


                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',
                                    fontSize: 16

                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                Deliverable # 3: {this.state.deliverable3}
                            </Text>



                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',
                                    fontSize: 16

                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                Deliverable # 4: {this.state.deliverable4}
                            </Text>



                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',
                                    fontSize: 16

                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                Deliverable # 5: {this.state.deliverable5}
                            </Text>

                        </Block>
                    </Block>
                </Block>
            </Block>
        );
    };

    renderChanges = () => {
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
                        Recommended Changes:
                    </Text>

                    <Text
                        h5
                        style={{
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            fontSize: 16
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >
                        {this.state.changes}
                    </Text>

                </Block>
            </Block>
        );
    };

    render() {
        return (
            <Block flex center>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
                    {this.renderHeading()}
                    {this.renderTitle()}
                    {this.renderTeam()}
                    {this.renderSupervisors()}
                    {this.renderStatus()}
                    {this.renderAssesment()}
                    {this.renderDeliverables()}
                    {this.renderChanges()}
                </ScrollView>
            </Block>
        );
    }

}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "orange",
        color: "white"
    },
    group: {
        paddingTop: theme.SIZES.BASE * 2
    },
    input: {
        paddingTop: 10,
        paddingRight: 15,
        fontSize: 15,
        color: 'black',
        fontWeight: '500',

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
export default FYP1_Mid_Evaluation_Add;
