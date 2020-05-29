import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme, Text } from "galio-framework";
var FloatingLabel = require('react-native-floating-labels');
import { Table, Rows } from 'react-native-table-component';
import Spinner from 'react-native-loading-spinner-overlay';

import { nowTheme } from '../../../constants';
import { Card } from 'react-native-paper';

import { AsyncStorage } from 'react-native';


class FYP2_Final_Evaluation_Internal_View extends React.Component {
  constructor(props) {
    super(props);
    //Initial State
    this.state = {
      title: "",
      leaderID: "",
      mamber1ID: "",
      member2ID: "",
      supervisorID: "",
      coSupervisorID: "",
      leaderMarks: "",
      member1Marks: "",
      member2Marks: "",
      tableData: [
        ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+','C','C-','D+','D','F'],
        ['90', '86', '82', '78','74','70','66','62','58','54','50', '<50']
      ],
    };
  }
  
  componentDidMount() {
    this.getdata();
  }

  async getdata()
  {
    this.setState({
      spinner: true
    });

    let ID1 = await AsyncStorage.getItem('ID1');
    let ip = await AsyncStorage.getItem('ip');

    await fetch('http://' + ip + '/api/fyp2get/GetFinalEvaluationByID?id=' + ID1 + '')
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
          supervisorID: users[0].SuperVisorEmpID,
          coSupervisorID: users[0].CoSuperVisorID,
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
      await fetch('http://' + ip + '/api/fyp2get/GetFyp2FinalMarks?id=' + this.state.leaderID + '')
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
                leaderMarks: users1[0].Marks,
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
        await fetch('http://' + ip + '/api/fyp2get/GetFyp2FinalMarks?id=' + this.state.member1ID + '')
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
                    member1Marks: users2[0].Marks,
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
      await fetch('http://' + ip + '/api/fyp2get/GetFyp2FinalMarks?id=' + this.state.member2ID + '')
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
                
                member2Marks: users3[0].Marks,
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

  renderGrading = () => {
    const state = this.state;
      return ( 
        <Block flex style={styles.group}>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Text
              h5
              style={{
                marginTop: 20,
                fontFamily: 'montserrat-regular',
                marginBottom: theme.SIZES.BASE / 2,
                marginTop: '2.5%',
                fontWeight: '500'
              }}
              color={nowTheme.COLORS.HEADER}
            >
              Grading Scheme (For Reference)
            </Text>
            <Block style={styles.container}>
              <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Rows data={state.tableData} textStyle={styles.text}/>
              </Table>
            </Block>
          </Block>
        </Block>
      );
  };

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
            Final Year Project II – CS 491
          </Text>
        </Block>
      </Block>
    );
  };

  renderTitle = () => {
    const { title } = this.state;

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
            Project Title : {title}
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
                Leader : {leaderID}
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
                Member 1 : {member1ID}
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
                Member 2 : {member2ID}
              </Text>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };

  renderadvisors = () => {
    const { supervisorID, coSupervisorID } = this.state;
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
                  fontWeight: '500'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Supervisor : {supervisorID}
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
                Co-Supervisor : {coSupervisorID}
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
              fontFamily: 'montserrat-regular',
              marginBottom: theme.SIZES.BASE / 2,
              fontWeight: '500'
            }}
            color={nowTheme.COLORS.HEADER}
          >
            Please evaluate group members individually by considering the evaluation criteria provided below. Give final marks out of 100 in the section provided overleaf.
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
            1. Does the group follow a well-defined software development methodology? Can students justify the use of the chosen software developement methodology?
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
            2. Have the students adapted the given documenttemplates correctly according to their project requirements?
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
            3. How well each member knows about software product's user requirements, and production use?
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
            4. Knowledge of appropriate software tools, libraries and frameworks for implementation. For example: UI, Analysis, Visualization of data, IDE selected for coding, Database (SQL/NoSQL), livraries, etc.
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
            5. Developement of UI and justification of UI/UX aspects, structure of code and/or hardware components. Use of OOP and coding practices
          </Text>
        </Block>
      </Block>
    );
  };

  renderMarks = () => {
    const { leaderID, member1ID, member2ID, member1Marks, member2Marks, leaderMarks } = this.state;
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
                Leader : 
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
                  ID : {leaderID}
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
                  Suggested Marks out of 100 : {leaderMarks}
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
                    fontSize: 16,
                  }}
                  color={nowTheme.COLORS.HEADER}
                >
                  ID : {member1ID}
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
                  Suggested Marks out of 100 : {member1Marks}
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
                  ID : {member2ID}
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
                  Suggested Marks out of 100 : {member2Marks}
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <Card style={styles.card}>
            {this.renderHeading()}
            {this.renderTitle()}
            {this.renderTeam()}
            {this.renderadvisors()}
            {this.renderMarks()}
            {this.renderGrading()}
          </Card>
        </ScrollView>
      </Block>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SIZES.BASE
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER
  },
  button:{
    backgroundColor: "orange",
    color: "white"
  },
  formInput: {
    borderBottomWidth: 1.5,
    fontSize: 16
  },
  input1: {
    borderWidth: 0,
    fontSize: 16
  },
  card: {
    marginTop: 40,
    backgroundColor: '#F5F5F5'
  },
});

export default FYP2_Final_Evaluation_Internal_View;