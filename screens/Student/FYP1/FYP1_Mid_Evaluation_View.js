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
            leadername: "",
            leaderemail: "",
            member2name: "",
            member2email: "",
            member3name: "",
            member3email: "",
            supervisor: "",
            cosupervisor: "",
            status: "",
            markcriteria1: "",
            markcriteria2: "",
            markcriteria3: "",
            markcriteria4: "",
            markcriteria5: "",
            markcriteria6: "",
            deliverable1: "",
            deliverable2: "",
            deliverable3: "",
            deliverable4: "",
            deliverable5: "",
            changes: "",
            comments: "",
            evaluator: "",
            coevaluator: "",
            markstotal: ""
        };
    }

    componentDidMount() {
        this.getdata();

    }

    async getdata() {
        let ip = await AsyncStorage.getItem('ip');
        let session_email = await AsyncStorage.getItem('email');
        fetch('http://' + ip + ':3006/fyp1midevaluation_view?Email=' + session_email + '')
            .then(res => res.json())
            .then(users => {

                this.setState({
                    title: users[0].Project_Title,
                    leaderemail: users[0].leader_email,
                    leadername: users[0].leader_name,
                    member2email: users[0].member2_email,
                    member2name: users[0].member2_name,
                    member3email: users[0].member3_email,
                    member3name: users[0].member3_name,
                    supervisor: users[0].supervisor_email,
                    cosupervisor: users[0].cosupervisor_email,
                    status: users[0].Project_Status,
                    markcriteria1: users[0].Criteria1_Marks,
                    markcriteria2: users[0].Criteria2_Marks,
                    markcriteria3: users[0].Criteria3_Marks,
                    markcriteria4: users[0].Criteria4_Marks,
                    markcriteria5: users[0].Criteria5_Marks,
                    markcriteria6: users[0].Criteria6_Marks,
                    deliverable1: users[0].Deliverable1,
                    deliverable2: users[0].Deliverable2,
                    deliverable3: users[0].Deliverable3,
                    deliverable4: users[0].Deliverable4,
                    deliverable5: users[0].Deliverable5,
                    changes: users[0].Recommended_Changes,
                    comments: users[0].Comments_To_FYP_Committee,
                    evaluator: users[0].Evaluator1_name,
                    coevaluator: users[0].Evaluator2_name,


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

    renderComments = () => {
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
                        Comments to the FYP Committee:
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
                        {this.state.comments}
                    </Text>


                </Block>
            </Block>
        );
    };

    renderJury = () => {

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
                        Evaluators
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
                                Evaluator # 1 : {this.state.evaluator}
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
                                Evaluator 2 : {this.state.coevaluator}
                            </Text>

                        </Block>
                    </Block>
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
                    {this.renderComments()}
                    {this.renderJury()}



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
