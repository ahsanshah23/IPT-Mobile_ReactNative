import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme, Text } from "galio-framework";
var FloatingLabel = require('react-native-floating-labels');
import { Table, Rows } from 'react-native-table-component';

import { nowTheme } from '../../../constants';
import { Card, Button, Icon, Input } from "../../../components";

import { AsyncStorage } from 'react-native';


class FYP2_FinalEvaluation_Internal extends React.Component {
  state = {
    ischecked: false,
    
  };

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

  async Submit() {
    const { title, member1Email, member2Email, member3Email, member1Name, member2Name, Member3Name, supervisorEmail, coSupervisorEmail, member1Mark, member2Mark, member3Mark, evaluator, coevaluator } = this.state;
    let ip = await AsyncStorage.getItem('ip');
    let session_email = await AsyncStorage.getItem('email');
    await fetch('http://'+ip+':3006/fyp2finalevaluation_add?title=' + title + ' &member1Name=' + member1Name + '&member2Name=' + member2Name + ' &member3Name=' + Member3Name + ' &supervisorEmail=' + supervisorEmail + ' &coSupervisorEmail=' + coSupervisorEmail + ' &member1Email=' + member1Email +
    ' &member1Mark=' + member1Mark + ' &member2Email=' + member2Email + ' &member2Mark=' + member2Mark + ' &member3Email=' + member3Email +
    ' &member3Mark=' + member3Mark + ' &evaluator=' + evaluator + ' &coevaluator=' + coevaluator + ' ')
    .then(users => {
      alert("inserted");
      this.props.navigation.navigate('Teacher_Home')
    })
  }

  renderGrading = () => {
    const state = this.state;
      return ( <Block flex style={styles.group}>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
     <Text
        p
        style={{
          marginTop: 20,
          fontFamily: 'montserrat-regular',
          marginBottom: theme.SIZES.BASE / 2,
          marginTop: '2.5%'
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
    // const { checked } = this.state;

    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text
            h5
            style={{
              marginTop: 20,
              fontFamily: 'montserrat-regular',
              marginBottom: theme.SIZES.BASE / 2
            }}
            color={nowTheme.COLORS.HEADER}
          >
            Project Title
          </Text>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              primary={this.state.primaryFocus}
              right
              placeholder="Project Title"
              onFocus={() => this.setState({ primaryFocus: true })}
              onBlur={() => this.setState({ primaryFocus: false })}
              iconContent={<Block />}
              shadowless
              onChangeText={(title) => this.setState({ title })}
            />
          </Block>



        </Block>
      </Block>
    );
  };

  
  renderTeam = () => {
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
            Team Members
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
                Member 1 : (Leader)
              </Text>
              <Block style={{ flexDirection: 'column' }}>

              <FloatingLabel
                inputStyle={styles.input1}
                style={styles.formInput}
                onChangeText={(member1Name) => this.setState({ member1Name })}
                placeholder="Name"
              >
              </FloatingLabel>
              </Block>
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Member 2 :
              </Text>
              <Block style={{ flexDirection: 'column' }}>

              <FloatingLabel
                inputStyle={styles.input1}
                style={styles.formInput}
                onChangeText={(member2Name) => this.setState({ member2Name })}
                placeholder="Name"
              >
              </FloatingLabel>
              </Block>
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Member 3 :
              </Text>
              <Block style={{ flexDirection: 'column' }}>

              <FloatingLabel
                inputStyle={styles.input1}
                style={styles.formInput}
                onChangeText={(member3Name) => this.setState({ member3Name })}
                placeholder="Name"
              >
              </FloatingLabel>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };

  renderadvisors = () => {
    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>

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
                Advisor :
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(supervisorEmail) => this.setState({ supervisorEmail })}
                  placeholder="Email"
                >
                </FloatingLabel>
              </Block>
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Co-supervisor(s) (if any) :
              </Text>
              <Block style={{ flexDirection: 'column' }}>
              <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(cosupervisorEmail) => this.setState({ cosupervisorEmail })}
                  placeholder="Email"
                >
                </FloatingLabel>
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
              marginTop: 20,
              fontFamily: 'montserrat-regular',
              marginBottom: theme.SIZES.BASE / 2
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
              marginBottom: theme.SIZES.BASE / 2
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
              marginBottom: theme.SIZES.BASE / 2
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
              marginBottom: theme.SIZES.BASE / 2
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
              marginBottom: theme.SIZES.BASE / 2
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
              marginBottom: theme.SIZES.BASE / 2
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
    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text
            h5
            style={{
              marginTop: 20,
              fontFamily: 'montserrat-regular',
              marginBottom: theme.SIZES.BASE / 2
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
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Member #1:
              </Text>
              <Block style={{ flexDirection: 'column' }}>

              <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(member1Email) => this.setState({ member1Email })}
                  placeholder="Email"
                >
                </FloatingLabel>
                <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Suggested Marks out of 100:
              </Text>
              <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(member1Mark) => this.setState({ member1Mark })}
                  placeholder="Marks"
                >
                </FloatingLabel>
              </Block>


              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Member #2:
              </Text>
              <Block style={{ flexDirection: 'column' }}>

              <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(member2Email) => this.setState({ member2Email })}
                  placeholder="Email"
                >
                </FloatingLabel>
                <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Suggested Marks out of 100:
              </Text>

              <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(member2Mark) => this.setState({ member2Mark })}
                  placeholder="Marks"
                >
                </FloatingLabel>
              </Block>

              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Member #3:
              </Text>
              <Block style={{ flexDirection: 'column' }}>

              <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(member3Email) => this.setState({ member3Email })}
                  placeholder="Email"
                >
                </FloatingLabel>
                <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Suggested Marks out of 100:
              </Text>
              <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(member3Mark) => this.setState({ member3Mark })}
                  placeholder="Marks"
                >
                </FloatingLabel>
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
              marginTop: 20,
              fontFamily: 'montserrat-regular',
              marginBottom: theme.SIZES.BASE / 2
            }}
            color={nowTheme.COLORS.HEADER}
          >
            Evaluators:
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
                Evaluator's Email:
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(evaluator) => this.setState({ evaluator })}
                  placeholder="Email"
                >
                </FloatingLabel>
              </Block>

              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Co-Evaluator's Email:
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(coevaluator) => this.setState({ coevaluator })}
                  placeholder="Email"
                >
                </FloatingLabel>
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
          {this.renderHeading()}
          {this.renderTitle()}
          {this.renderTeam()}
          {this.renderadvisors()}
          {this.renderrules()}
          {this.renderMarks()}
          {this.renderGrading()}
          {this.renderJury()}

          <Block style={{ flex: 0.33, flexDirection: 'row', marginTop: theme.SIZES.BASE, justifyContent: 'center', alignItems: 'center' }}>
            <Button
              shadowless
              style={styles.button}
              color={nowTheme.COLORS.PRIMARY}
              onPress={this.Submit.bind(this)}
              
            >
              <Text
                style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                color={theme.COLORS.WHITE}
              >
                Submit
              </Text>
            </Button>
          </Block>
         
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
  }
});

export default FYP2_FinalEvaluation_Internal;