import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme, Text } from "galio-framework";
var FloatingLabel = require('react-native-floating-labels');
import { Table, Rows } from 'react-native-table-component';

import { nowTheme } from '../../constants';
import { Card } from 'react-native-paper';

import { AsyncStorage } from 'react-native';


class External_Form_Evaluation_View extends React.Component {
  constructor(props) {
    super(props);
    //Initial State
    this.state = {
      title: "",
      member1Name: "",
      mamber2Name: "",
      member3Email: "",
      member1Email: "",
      member2Email: "",
      member3Email: "",
      supervisorEmail: "",
      coSupervisorEmail: "",
      member1Mark: "",
      member2Mark: "",
      member3Mark: "",
      tableData: [
        ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+','C','C-','D+','D','F'],
        ['90', '86', '82', '78','74','70','66','62','58','54','50', '<50']
      ],
      evaluator: "",
      coevaluator: "",
    };
  }
  
  componentDidMount() {
    this.getdata();
  }

  async getdata()
  {
    let ip = await AsyncStorage.getItem('ip');
    let leader_email = await AsyncStorage.getItem('leader');
    fetch('http://'+ip+':3006/fyp2finalevaluationexternal_view?Email='+leader_email+'')
    .then(res => res.json())
    .then(users => {
      this.setState({
        title: users[0].Project_Title,
        member1Name: users[0].leader_name,
        member1Email: users[0].leader_email,
        member2Name: users[0].member2_name,
        member2Email: users[0].member2_email,
        member3Name: users[0].member3_name,
        member3Email: users[0].member3_email,
        supervisorEmail: users[0].supervisor_email,
        coSupervisorEmail: users[0].cosupervisor_email,
        member1Mark: users[0].leader_Marks,
        member2Mark: users[0].Member2_Marks,
        member3Mark: users[0].Member3_Marks,
        evaluator: users[0].Jury1_Name,
        coevaluator: users[0].Jury2_Name,
      })
    })
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
    const { member1Name, member2Name, member3Name } = this.state;
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
                  Name : {member1Name}
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
                  Name : {member2Name}
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
                  Name : {member3Name}
                </Text>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };

  renderadvisors = () => {
    const { supervisorEmail, coSupervisorEmail } = this.state;
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
                Supervisor
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
                  Email : {supervisorEmail}
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
                Co-Supervisor : 
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
                  Email : {coSupervisorEmail}
                </Text>
              </Block>
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
    const { member1Email, member2Email, member3Email, member1Mark, member2Mark, member3Mark } = this.state;
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
                  Email : {member1Email}
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
                  Suggested Marks out of 100 : {member1Mark}
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
                  Email : {member2Email}
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
                  Suggested Marks out of 100 : {member2Mark}
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
                  Email : {member3Email}
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
                  Suggested Marks out of 100 : {member3Mark}
                </Text>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };

  renderjury = () => {
    const { evaluator, coevaluator } = this.state;
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
                  fontWeight: '500'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Evaluator :
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
                  Email : {evaluator}
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
                Co-Evaluator : 
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
                  Email : {coevaluator}
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <Card style={styles.card}>
            {this.renderHeading()}
            {this.renderTitle()}
            {this.renderadvisors()}
            {this.renderrules()}
            {this.renderMarks()}
            {this.renderGrading()}
            {this.renderjury()}
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

export default External_Form_Evaluation_View;