import React from "react";
import { StyleSheet, Dimensions, ScrollView, Picker } from "react-native";
import { Block, theme, Text } from "galio-framework";
var FloatingLabel = require('react-native-floating-labels');
import { Table, Rows } from 'react-native-table-component';

import { nowTheme } from '../../constants';
import { Card, Button, Icon, Input } from "../../components";

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

      leaderID: "",

      member1ID: "",

      member2ID: "",

      supervisorID: "",

      coSupervisorID: "",

      leaderMarks: "",

      member1Marks: "",

      member2Marks: "",

      tableData: [
        ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'],
        ['90', '86', '82', '78', '74', '70', '66', '62', '58', '54', '50', '<50']
      ],
      evaluator: "",
      coevaluator: "",
      fyps: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {

    const markers = [];
    // let ip = await AsyncStorage.getItem('ip');
    let ID = await AsyncStorage.getItem('ID1');

    await fetch('http://192.168.0.108:45459/api/FYP2Get/GetFypNamesExternalJury?username=' + ID + ' ')
      .then(res => res.json())

      .then(res => {
        res.map((element) => {
          const marketObj = {};
          marketObj.id = element.FypID;
          marketObj.title = element.ProjectName;
          // marketObj.leaderemail = element.leaderemail;

          markers.push(marketObj);
        });

        this.setState({ fyps: markers });
      });
  }

  async setData(title) {

    let ip = await AsyncStorage.getItem('ip');

    await fetch('http://192.168.0.108:45459/api/fyp1get/GetFypDetailsByTitle?title=' + title + ' ')
      .then(res => res.json())
      .then(users => {

        this.setState({
          title: title,
          fypID: users[0].FypID,
          leaderID: users[0].LeaderID,
          member1ID: users[0].Member1ID,
          member2ID: users[0].Member2ID,
          supervisorID: users[0].SupervisorEmpID,
          coSupervisorID: users[0].CoSuperVisorID,

        })

      })
  }

  async Submit() {
    const { leaderID, member1ID, member2ID, leaderMarks, member1Marks, member2Marks } = this.state;
    let ip = await AsyncStorage.getItem('ip');
    let session_email = await AsyncStorage.getItem('email');

    fetch('http://192.168.0.108:45459/api/fyp2post/AddFinalEvaluationJury', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        "FormID": 5,
        "LeaderID": leaderID,
        "Member1ID": member1ID,
        "Member2ID": member2ID,
        "leaderMarks": leaderMarks,
        "member1marks": member1Marks,
        "member2marks": member2Marks


      })
    })
      .then((response) => response.json())

      //If response is in json then in success
      .then((responseJson) => {
        //Success 
        alert("Inserted Final Evaluation FYP II");
        this.props.navigation.navigate('External_Home')
      })
      //If response is not in json then in error
      .catch((error) => {
        //Error 
        alert("Error");
        console.error(error);
      });


  }

  renderGrading = () => {
    const state = this.state;
    return (<Block flex style={styles.group}>
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
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>

            <Rows data={state.tableData} textStyle={styles.text} />
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
            External Jury Evaluation Form
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
            <Picker
              selectedValue={this.state.title}
              style={{ height: 50, width: 100 }}
              onValueChange={(value) =>
                this.setData(value)
              }
            >
              {this.state.fyps.map((item, key) => (
                <Picker.Item key={key} label={item.title} value={item.title} />
              )
              )}


            </Picker>
          </Block>



        </Block>
      </Block>
    );
  };


  renderadvisors = () => {
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
            Supervisor(s)
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
                Supervisor : {this.state.supervisorID}
              </Text>

              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Co-supervisor(s) (if any) : {this.state.coSupervisorID}
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
              fontSize: 16
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
              fontSize: 16
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
              fontSize: 16
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
              fontSize: 16
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
              fontSize: 16
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
                Leader ID : {this.state.leaderID}
              </Text>
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
                  Suggested Marks out of 100:
              </Text>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(leaderMarks) => this.setState({ leaderMarks })}
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
                Member 1 ID : {this.state.member1ID}
              </Text>
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
                  Suggested Marks out of 100:
              </Text>

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(member1Marks) => this.setState({ member1Marks })}
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
                Member 2 ID : {this.state.member2ID}
              </Text>
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
                  Suggested Marks out of 100:
              </Text>

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(member2Marks) => this.setState({ member2Marks })}
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




  render() {
    return (
      <Block flex center>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {this.renderHeading()}
          {this.renderTitle()}
          {this.renderadvisors()}
          {this.renderrules()}
          {this.renderMarks()}
          {this.renderGrading()}

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
  button: {
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