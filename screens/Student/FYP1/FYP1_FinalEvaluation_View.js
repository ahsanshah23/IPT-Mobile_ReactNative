import React from "react";
import { StyleSheet, Dimensions, ScrollView, CheckBox, TextInput, AsyncStorage } from "react-native";
import { Block, theme, Text } from "galio-framework";
var FloatingLabel = require('react-native-floating-labels');
import { nowTheme } from '../../../constants';
class FYP1_FinalEvaluation_View extends React.Component {
    state = {
        ischecked: false,
    };

    constructor(props) {
        super(props);
        //Initial State
        this.state = {
            title: "",
            leadername: "",
            member2name: "",
            member3name: "",
            supervisor: "",
            cosupervisor: "",
            deliverable1detail: "",
            deliverable1completed: "",
            deliverable2detail: "",
            deliverable2completed: "",
            deliverable3detail: "",
            deliverable3completed: "",
            deliverable4detail: "",
            deliverable4completed: "",
            deliverable5detail: "",
            deliverable5completed: "",
            fyp2deliverables: "",
            leaderemail: "",
            leadermarks: "",
            member2email: "",
            member2marks: "",
            member3email: "",
            member3marks: "",
            evaluator: "",
            coevaluator: ""

        };
    }

    componentDidMount() {
        this.getdata();

    }

    async getdata() {
        let ip = await AsyncStorage.getItem('ip');
        fetch('http://' + ip + ':3006/fyp1finalevaluation_view')
            .then(res => res.json())
            .then(users => {

                this.setState({
                    title: users[0].Project_title,
                    leaderemail: users[0].leader_email,
                    leadername: users[0].leader_name,
                    member2email: users[0].member2_email,
                    member2name: users[0].member2_name,
                    member3email: users[0].member3_email,
                    member3name: users[0].member3_name,
                    supervisor: users[0].supervisor_email,
                    cosupervisor: users[0].cosupervisor_email,

                    deliverable1detail: users[0].Deliverable1_Name,
                    deliverable2detail: users[0].Deliverable2_Name,
                    deliverable3detail: users[0].Deliverable3_Name,
                    deliverable4detail: users[0].Deliverable4_Name,
                    deliverable5detail: users[0].Deliverable5_Name,

                    deliverable1completed: users[0].Deliverable1_Completed,
                    deliverable2completed: users[0].Deliverable2_Completed,
                    deliverable3completed: users[0].Deliverable3_Completed,
                    deliverable4completed: users[0].Deliverable4_Completed,
                    deliverable5completed: users[0].Deliverable5_Completed,

                    fyp2deliverables: users[0].FYP2_Deliverables,

                    leadermarks: users[0].Member1_Marks,
                    member2marks: users[0].Member2_Marks,
                    member3marks: users[0].Member3_Marks,

                    evaluator: users[0].Jury1_Name,
                    coevaluator: users[0].Jury2_Name,


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
                        Jury Evaluation Form
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

    renderTitle = () => {
        // const { checked } = this.state;

        return (
            <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text
                        h5
                        style={{
                            marginTop: 20,
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            fontWeight:'500'
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Project Title : {this.state.title}
                    </Text>




                </Block>
            </Block>
        );
    };

    renderFYP2expected = () => {
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
                        FYP II Expected Deliverables:
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
                        {this.state.fyp2deliverables}
                    </Text>

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
                                        fontSize: 16
                                    }}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Name: {leadername}
                                </Text>

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
                                        fontSize: 16
                                    }}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Name: {member2name}
                                </Text>

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
                                        fontSize: 16
                                    }}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Name: {member3name}
                                </Text>

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

    renderrules = () => {
        return (
            <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text
                        h5
                        style={{
                            marginTop: 20,
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            fontSize:16
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Please evaluate group members individually by considering the evaluation criteria provided below. Give final marks out of 100 in the section provided overleaf

          </Text>

                    <Text
                        h5
                        style={{
                            marginTop: 10,
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            fontSize:16
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >

                        1. Does the group follow a well-defined software development methodology? Can students justify the use of the chosen software developement methodology?

          </Text>

                    <Text
                        h5
                        style={{
                            marginTop: 10,
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            fontSize:16
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >

                        2. Have the students adapted the given documenttemplates correctly according to their project requirements?

          </Text>

                    <Text
                        h5
                        style={{
                            marginTop: 10,
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            fontSize:16
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >

                        3. How well each member knows about software product's user requirements, and production use?

          </Text>

                    <Text
                        h5
                        style={{
                            marginTop: 10,
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            fontSize:16
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >

                        4. Knowledge of appropriate software tools, libraries and frameworks for implementation. For example: UI, Analysis, Visualization of data, IDE selected for coding, Database (SQL/NoSQL), livraries, etc.

          </Text>

                    <Text
                        h5
                        style={{
                            marginTop: 10,
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            fontSize:16
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >

                        5. Developement of UI and justification of UI/UX aspects, structure of code and/or hardware components. Use of OOP and coding practices
          </Text>
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
                            marginTop: 20,
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            fontWeight:'500'
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >
                        FYP 1 Deliverables
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
                                Deliverable #1:
              </Text>
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
                                    Detail: {this.state.deliverable1detail}
                                </Text>

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
                                    Marks: {this.state.deliverable1completed}
                                </Text>
                            </Block>
                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',
                                    fontWeight:'500'
                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                Deliverable  #2:
              </Text>
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
                                    Detail: {this.state.deliverable2detail}
                                </Text>

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
                                    Marks: {this.state.deliverable2completed}
                                </Text>
                            </Block>
                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',
                                    fontWeight:'500'
                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                Deliverable  #3:
              </Text>
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
                                    Detail: {this.state.deliverable3detail}
                                </Text>

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
                                    Marks: {this.state.deliverable3completed}
                                </Text>
                            </Block>

                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',
                                    fontWeight:'500'
                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                Deliverable  #4:
              </Text>
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
                                    Detail: {this.state.deliverable4detail}
                                </Text>

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
                                    Marks: {this.state.deliverable4completed}
                                </Text>
                            </Block>

                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',
                                    fontWeight:'500'
                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                Deliverable  #5:
              </Text>
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
                                    Detail: {this.state.deliverab5e1detail}
                                </Text>

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
                                    Marks: {this.state.deliverable5completed}
                                </Text>
                            </Block>


                        </Block>
                    </Block>
                </Block>
            </Block>
        );
    };

    renderMarks = () => {
        return (
            <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text
                        h5
                        style={{
                            marginTop: 20,
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            fontWeight:'500'
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Mark Assignment
          </Text>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Block style={{ flexDirection: 'column' }}>
                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',
                                    fontWeight:'500'
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
                                        fontSize: 16
                                    }}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Email: {this.state.leaderemail}
                                </Text>

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
                                    Marks: {this.state.leadermarks}
                                </Text>
                            </Block>


                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',
                                    fontWeight:'500'
                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                Member #2:
              </Text>
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
                                    Email: {this.state.member2email}
                                </Text>

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
                                    Marks: {this.state.member2marks}
                                </Text>
                            </Block>

                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%',
                                    fontWeight:'500'
                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                Member #3:
              </Text>
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
                                    Email: {this.state.member3email}
                                </Text>

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
                                    Marks: {this.state.member3marks}
                                </Text>
                            </Block>

                        </Block>
                    </Block>
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
                                Evaluator # 2 : {this.state.coevaluator}
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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 30 }}
                >
                    {this.renderHeading()}
                    {this.renderTitle()}

                    {this.renderTeam()}
                    {this.renderSupervisors()}

                    {this.renderrules()}
                    {this.renderDeliverables()}

                    {this.renderFYP2expected()}
                    {this.renderMarks()}
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

export default FYP1_FinalEvaluation_View;
