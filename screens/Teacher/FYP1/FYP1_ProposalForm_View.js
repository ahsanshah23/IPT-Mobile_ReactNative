import React from "react";
import { StyleSheet, ScrollView, TextInput, View } from "react-native";
import { Block, theme, Text } from "galio-framework";
import { nowTheme } from '../../../constants';
import { Button} from "../../../components";
var FloatingLabel = require('react-native-floating-labels');
import { Card } from 'react-native-paper';
import RadioGroup, { Radio } from "react-native-radio-input";
import { AsyncStorage } from 'react-native';

class FYP1_ProposalForm_View extends React.Component { 

    constructor(props) {
        super(props);
        //Initial State
        this.state = {
            // title: "",
            // type: "",
            // areaofinterest: "HCI",
            // abstract: "",
            // leadername: "",
            // leaderemail: "",
            // member2name: "",
            // member2email: "",
            // member3name: "",
            // member3email: "",
            // supervisor: "",
            // cosupervisor: "",
            // comment: "",
            // status: "",
            // ButtonSubmit:true,
            // warning:""

            title: "",
            type: "",
            proposalID:"",
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

    async Submit() {
        const { proposalID, abstract, status, comment, leaderID, member1ID, member2ID, supervisor, cosupervisor, title, type } = this.state;
        // let ip = await AsyncStorage.getItem('ip');

        fetch('http://192.168.0.109:45455/api/fyp1post/updateproposalsupervisor', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ProposalID": proposalID,
        "ProjectTitle": title,
        "ProjectType": type,
        "Abstract": abstract, 
        "SupervisorID": supervisor,
        "CoSupervisorID": cosupervisor,
        "LeaderID": leaderID,
        "Member1ID": member1ID,
        "Member2ID": member2ID,
        "Status": status,
        "Comment": comment
      })
    })
      .then((response) => response.json())
        alert("Inserted");
        this.props.navigation.navigate('Student_Home')
      //If response is in json then in success
      .then((responseJson) => {
        //Success 
        console.log(responseJson);
      })
      //If response is not in json then in error
      .catch((error) => {
        //Error 
        alert("Error");
        console.error(error);
      });

        //  .then(users => {
        //     alert("updated");
        //     this.props.navigation.navigate('Teacher_Home')
        //   })  
    }

    componentDidMount() {
        this.getdata();
        // this.getstatus()
        
    }

    async getstatus() {
        let name = await AsyncStorage.getItem('name');
        this.setState({name:name});
        let ip = await AsyncStorage.getItem('ip');
        let leader = await AsyncStorage.getItem('leader');
        
        await fetch('http://'+ip+':3006/fyp1proposal_status_teacher?Email='+leader+' ')
          .then(res => res.json())
          .then(users => {
    
            if (users == 0) {
              this.setState({
                ButtonSubmit: false,      
              })
            }
            else {
              this.setState({
                ButtonSubmit: true,
                warning: "You have already filled this form"
              })
            }
    
          })
      }

    async getdata()
    {
        // alert("hi");
        // let ip = await AsyncStorage.getItem('ip');
        let leader = await AsyncStorage.getItem('leader');
        // alert(leader);
        
        fetch('http://192.168.0.109:45455/api/fyp1get/GetProposalDetails')
            .then(res => res.json())
            .then(users => {
                this.setState({
                    proposalID: users[0].ProposalID,

                    title: users[0].ProjectTitle,

                    type: users[0].ProjectType,

                    abstract: users[0].Abstract,

                    leaderID: users[0].LeaderID,

                    member1ID: users[0].Member1ID,

                    member2ID: users[0].Member2ID,

                    supervisor: users[0].SupervisorID,

                    cosupervisor: users[0].CoSupervisorID
                })
                // console.warn(this.state.title);
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
        const { leaderID, member1ID, member2ID, member2name, member3email, member3name } = this.state;
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
                                Leader ID :
                            </Text>
                            <Block style={{ flexDirection: 'column' }}>

                                <Text
                                    p
                                    style={{
                                        fontFamily: 'montserrat-regular',
                                        marginBottom: theme.SIZES.BASE / 2,
                                        marginTop: '2.5%',
                                        fontSize: 12,

                                    }}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Roll Number: {leaderID}
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
                                Member 1 ID :
                            </Text>
                            <Block style={{ flexDirection: 'column' }}>
                             
                                <Text
                                    p
                                    style={{
                                        fontFamily: 'montserrat-regular',
                                        marginBottom: theme.SIZES.BASE / 2,
                                        marginTop: '2.5%',
                                        fontSize: 12,

                                    }}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Roll Number: {member1ID}
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
                                Member 2 ID :
                            </Text>
                            <Block style={{ flexDirection: 'column' }}>
                               

                                <Text
                                    p
                                    style={{
                                        fontFamily: 'montserrat-regular',
                                        marginBottom: theme.SIZES.BASE / 2,
                                        marginTop: '2.5%',
                                        fontSize: 12,

                                    }}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Roll Number: {member2ID}
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
        const{comment} = this.state;
        return (
          <Block flex style={styles.group}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Text
                h5
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2
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
    
                  //onSubmitEditing={onDoneAddItem}
                  onChangeText={(comment) => this.setState({ comment })}
                />
              </Block>
            </Block>
          </Block>
        );
      };

    renderstatus = () => {
        const{status} = this.state;
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
                        Status
                    </Text>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>

                        <RadioGroup getChecked={this.getChecked}>
                            <Radio iconName={"lens"} label={"Accept"} value={"Accepted"} />
                            <Radio iconName={"lens"} label={"Reject"} value={"Rejected"} />
                        </RadioGroup>

                    </Block>
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

                    <Block style={{ marginTop: 20, flex: 0.33, flexDirection: 'row', marginTop: theme.SIZES.BASE, justifyContent: 'center', alignItems: 'center' }}>
                        <Button
                            shadowless
                            style={styles.button}
                            color={nowTheme.COLORS.PRIMARY}
                            onPress={this.Submit.bind(this)}
                            disabled={this.state.ButtonSubmit}
                        >
                            <Text
                                style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                                color={theme.COLORS.WHITE}
                            >
                                Submit
                            </Text>
                        </Button>
                        
                    </Block>
                    <Text style={{color:'red'}}>{this.state.warning}</Text>
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

export default FYP1_ProposalForm_View;
