import React from "react";
import { StyleSheet, Dimensions, ScrollView, CheckBox, TextInput, AsyncStorage } from "react-native";
import { Block, theme, Text } from "galio-framework";
var FloatingLabel = require('react-native-floating-labels');
import { nowTheme } from '../../../constants';
import Spinner from 'react-native-loading-spinner-overlay';

class FYP1_FinalEvaluation_View extends React.Component {
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
            deliverable1completed: "",
            deliverable2completed: "",
            deliverable3completed: "",
            deliverable4completed: "",
            deliverable5completed: "",
            fyp2deliverables: "",
            leadermarks: "",
            member1marks: "",
            member2marks: "",
        };
    }

    componentDidMount() {
        this.getdata();

    }

    async getdata() {

        this.setState({
            spinner: true
        });

        let ID1 = await AsyncStorage.getItem('ID1');
        let ip = await AsyncStorage.getItem('ip');
        await fetch('http://' + ip + '/api/fyp1get/GetFinalEvaluations?id=' + ID1 + '')
            .then(res => res.json())
            .then(users => {

                if (users[0] == undefined) {
                    alert("Data not available");
                    this.setState({
                        spinner: false
                    });
                }
                else {

                    this.setState({
                        title: users[0].ProjectName,
                        leaderID: users[0].LeaderID,
                        member1ID: users[0].Member1ID,
                        member2ID: users[0].Member2ID,
                        supervisor: users[0].SuperVisorEmpID,
                        cosupervisor: users[0].CoSuperVisorID,
                        deliverable1completed: users[0].Deliverable1Completion,
                        deliverable2completed: users[0].Deliverable2Completion,
                        deliverable3completed: users[0].Deliverable3Completion,
                        deliverable4completed: users[0].Deliverable4Completion,
                        deliverable5completed: users[0].Deliverable5Completion,
                        fyp2deliverables: users[0].Fyp2Deliverables,
                    })

                    this.setState({
                        spinner: false
                    });
                }
            })
            .catch((error) => {
                //Error 
                alert("Error");
                console.error(error);
                this.setState({
                    spinner: false
                });
            });

            if(this.state.leaderID != "")
            {
                alert("leader id not null");
                await fetch('http://' + ip + '/api/fyp1get/GetFyp1FinalMarks?id=' + this.state.leaderID + '')
                .then(res => res.json())
                .then(users1 => {

                    if (users1[0] == undefined) {
                        alert("Data not available");
                        this.setState({
                            spinner: false
                        });
                    }
                    else {
                        this.setState({
                            leadermarks: users1[0].Marks,
                        })
    
                        this.setState({
                            spinner: false
                        });
                    }
                })
                .catch((error) => {
                    //Error 
                    alert("Error");
                    console.error(error);
                    this.setState({
                        spinner: false
                    });
                });
            }

            if(this.state.member1ID != "")
            {
                alert("member 1 id not null");
                await fetch('http://' + ip + '/api/fyp1get/GetFyp1FinalMarks?id=' + this.state.member1ID + '')
                .then(res => res.json())
                .then(users2 => {

                    if (users2[0] == undefined) {
                        alert("Data not available");
                        this.setState({
                            spinner: false
                        });
                    }
                    else {
                        this.setState({
                            member1marks: users2[0].Marks,
                            // member3marks: users[0].Member3_Marks,
                        })
    
                        this.setState({
                            spinner: false
                        });
                    }
                })
                .catch((error) => {
                    //Error 
                    alert("Error");
                    console.error(error);
                    this.setState({
                        spinner: false
                    });
                });
            }

            if(this.state.member2ID != "")
            {
                alert("member 2 id not null");
                await fetch('http://' + ip + '/api/fyp1get/GetFyp1FinalMarks?id=' + this.state.member2ID + '')
                .then(res => res.json())
                .then(users3 => {

                    if (users3[0] == undefined) {
                        alert("Data not available");
                        this.setState({
                            spinner: false
                        });
                    }
                    else {
                        this.setState({
                            
                            member2marks: users3[0].Marks,
                        })
    
                        this.setState({
                            spinner: false
                        });
                    }
                })
                .catch((error) => {
                    //Error 
                    alert("Error");
                    console.error(error);
                    this.setState({
                        spinner: false
                    });
                });
            }
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

        return (
            <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text
                        h5
                        style={{
                            marginTop: 20,
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            fontWeight: '500'
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
                                Member 2 ID : {member1ID}
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
                                Member 3 ID : {member2ID}
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
                            marginTop: 20,
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2,
                            fontWeight: '500'
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
                                    fontWeight: '500'
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
                                    fontWeight: '500'
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
                                    fontWeight: '500'
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
                                    fontWeight: '500'
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
                            fontWeight: '500'
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
                                    ID: {this.state.leaderID}
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
                                    fontWeight: '500'
                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                Member #1:
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
                                    ID: {this.state.member1ID}
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
                                    Marks: {this.state.member1marks}
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
                                    ID: {this.state.member2ID}
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

                        </Block>
                    </Block>
                </Block>
            </Block>
        );
    };

    render() {
        return (
            <Block flex center>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Gathering Details ...'}
                    textStyle={{ color: 'white' }}
                />
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
                    {this.renderHeading()}
                    {this.renderTitle()}

                    {this.renderTeam()}
                    {this.renderSupervisors()}


                    {this.renderDeliverables()}

                    {this.renderFYP2expected()}
                    {this.renderMarks()}
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
