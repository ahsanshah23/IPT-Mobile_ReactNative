import React from "react";
import { StyleSheet, Dimensions, ScrollView, CheckBox, TextInput, AsyncStorage, Picker } from "react-native";
import { Block, theme, Text } from "galio-framework";
var FloatingLabel = require('react-native-floating-labels');
import { nowTheme } from '../../../constants';
import { Button } from "../../../components";
import Spinner from 'react-native-loading-spinner-overlay';

class FYP1_FinalEvaluation extends React.Component {
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
      leadermarks: "",
      member1marks: "",
      member2marks: "",
      fypID: "",
      fyps: [],
      opacityNumber: 1,
      spinnertext: "Gathering Details ..."
    };
  }

  componentDidMount() {
    this.getData();
   // this.getstatus();
  }

  async getstatus() {

    this.setState({
      spinner: true
    });

    let ip = await AsyncStorage.getItem('ip');

    await fetch('http://' + ip + '/api/fyp1get/Fyp1FinalStatus?id=' + this.state.fypID + ' ')
      .then(res => res.json())
      .then(users => {

        if (users[0].count == 0) {
          this.setState({
            ButtonSubmit: false,
            warning: ""
          })
          this.setState({
            spinner: false
          });
        }
        else {
          this.setState({
            ButtonSubmit: true,
            warning: "You have already filled this form"
          })
          this.setState({
            spinner: false
          });
        }

      })
      .catch((error) => {

        alert("Error");
        console.error(error);
        this.setState({
          spinner: false
        });
      });
  }

  async getData() {

    this.setState({
      spinner: true,
      opacityNumber: 0.5
    });


    let ID1 = await AsyncStorage.getItem('ID1');
    const markers = [];
    let ip = await AsyncStorage.getItem('ip');

    await fetch('http://' + ip + '/api/fyp1get/GetFypNames?id=' + ID1 + '')
      .then(res => res.json())

      .then(res => {
        res.map((element) => {
          const marketObj = {};
          marketObj.id = element.FypID;
          marketObj.title = element.ProjectName;

          markers.push(marketObj);
        });

        this.setState({
          spinner: false,
          opacityNumber: 1,
          fyps: markers
        });
      })
      .catch((error) => {
        alert("Error");
        this.setState({
          spinner: false,
          opacityNumber: 1
        });
      });
  }

  async Submit() {
    const { title, fypID, supervisor, cosupervisor, leaderID, member1ID, member2ID, deliverable1completed, deliverable2completed, deliverable3completed, deliverable4completed, deliverable5completed, fyp2deliverables, leadermarks, member1marks, member2marks } = this.state;

    if (leaderID === ""  || supervisor === "" || cosupervisor === "" || deliverable1completed === "" || fyp2deliverables === "" || leadermarks === "" ) {
      alert("All fields marked * are required!")
      if(deliverable1completed>100 || deliverable2completed>100 || deliverable3completed>100 || deliverable4completed>100 || deliverable5completed>100 || leadermarks>100)
      {
        alert("Deliverable completion should be less than 100")
      }
    }
    else {

      this.setState({
        spinnertext: "Inserting Fyp I Final Evaluation ...",
        spinner: true,
        opacityNumber: 0.5

      });


      let ip = await AsyncStorage.getItem('ip');
      let session_email = await AsyncStorage.getItem('email');

      fetch('http://' + ip + '/api/fyp1post/AddFinalEvaluationJury', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "FypID": fypID,
          "FormID": 2,
          "Deliverable1Completion": deliverable1completed,
          "Deliverable2Completion": deliverable2completed,
          "Deliverable3Completion": deliverable3completed,
          "Deliverable4Completion": deliverable4completed,
          "Deliverable5Completion": deliverable5completed,
          "Fyp2Deliverables": fyp2deliverables,
          "LeaderID": leaderID,
          "Member1ID": member1ID,
          "Member2ID": member2ID,
          "leaderMarks": leadermarks,
          "member1marks": member1marks,
          "member2marks": member2marks


        })
      })
        .then((response) => response.json())



        .then((responseJson) => {
          alert("Fyp I Final Evaluation inserted!");
          this.setState({

            spinner: false,
            opacityNumber: 1
          });
          this.props.navigation.navigate('FYP1_Home_Teacher')
        })

        .catch((error) => {
          this.setState({
            spinner: false,
            opacityNumber: 1
          });
        });
    }

  }

  async setData(title) {

    this.setState({
      spinner: true,
      opacityNumber: 0.5,
      spinnertext: "Filling Data ..."
    });

    let ip = await AsyncStorage.getItem('ip');

    await fetch('http://' + ip + '/api/fyp1get/GetFypDetailsByTitle?title=' + title + '')
      .then(res => res.json())
      .then(users => {

        this.setState({
          title: title,
          fypID: users[0].FypID,
          leaderID: users[0].LeaderID,
          member1ID: users[0].Member1ID,
          member2ID: users[0].Member2ID,
          supervisor: users[0].SupervisorEmpID,
          cosupervisor: users[0].CoSuperVisorID,
          spinner: false,
          opacityNumber: 1
        })
      })
      .catch((error) => {

        alert("Error");
        console.error(error);
        this.setState({
          spinner: false
        });
      });

    this.setState({
      spinner: false,
      opacityNumber: 1,
    });

    this.setState({
      spinner: true,
      opacityNumber: 0.5,
      spinnertext: "Filling Data ..."
    });

    await fetch('http://' + ip + '/api/fyp1get/GetFypDeliverablesDetailsByTitle?title=' + title + '')
      .then(res => res.json())
      .then(users => {

        this.setState({
          deliverable1detail: users[0].Deliverables1,
          deliverable2detail: users[0].Deliverables2,
          deliverable3detail: users[0].Deliverables3,
          deliverable4detail: users[0].Deliverables4,
          deliverable5detail: users[0].Deliverables5,
          spinner: false,
          opacityNumber: 1
        })

      })
      .catch((error) => {

        alert("Error");
        console.error(error);
        this.setState({
          spinner: false
        });
      });
    this.setState({
      spinner: false,
      opacityNumber: 1
    });

    this.getstatus();
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
              marginBottom: theme.SIZES.BASE / 2
            }}
            color={nowTheme.COLORS.HEADER}
          >
            Project Title *
          </Text>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE, width:100 }}>
            <Picker
              selectedValue={this.state.title}
              style={{ height: 50, width: 200 }}
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

  renderFYP2expected = () => {
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
            FYP II Deliverables expected *
          </Text>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <TextInput
              style={styles.input}
              placeholder="Type here to add abstract."
              multiline={true}
              autoCapitalize="sentences"
              underlineColorAndroid="transparent"
              selectionColor={'white'}
              maxLength={1500}
              returnKeyType="done"
              autoCorrect={false}
              blurOnSubmit={true}
              onChangeText={(fyp2deliverables) => this.setState({ fyp2deliverables })}
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
                Leader * : {this.state.leaderID}
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
                Member 1 * : {this.state.member1ID}
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
                Member 2 : {this.state.member2ID}
              </Text>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };

  renderSupervisors = () => {
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
            Supervisors
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
                Supervisor ID * : {this.state.supervisor}
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
                Co-supervisor(s) ID (if any) : {this.state.cosupervisor}
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

  renderDeliverables = () => {
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
            FYP 1 Deliverables
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
                Deliverable #1: {this.state.deliverable1detail}
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  keyboardType='number-pad'
                  onChangeText={(deliverable1completed) => this.setState({ deliverable1completed })}
                  placeholder="Percentage Completed"
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
                Deliverable  #2: {this.state.deliverable2detail}
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  keyboardType='number-pad'
                  onChangeText={(deliverable2completed) => this.setState({ deliverable2completed })}
                  placeholder="Percentage Completed"
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
                Deliverable  #3: {this.state.deliverable3detail}
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  keyboardType='number-pad'
                  onChangeText={(deliverable3completed) => this.setState({ deliverable3completed })}
                  placeholder="Percentage Completed"
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
                Deliverable  #4: {this.state.deliverable4detail}
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  keyboardType='number-pad'
                  onChangeText={(deliverable4completed) => this.setState({ deliverable4completed })}
                  placeholder="Percentage Completed"
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
                Deliverable  #5: {this.state.deliverable5detail}
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  keyboardType='number-pad'
                  onChangeText={(deliverable5completed) => this.setState({ deliverable5completed })}
                  placeholder="Percentage Completed"
                >
                </FloatingLabel>
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
                Leader * : {this.state.leaderID}
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  keyboardType='number-pad'
                  style={styles.formInput}
                  onChangeText={(leadermarks) => this.setState({ leadermarks })}
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
                Member #1 : {this.state.member1ID}
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  keyboardType='number-pad'
                  onChangeText={(member1marks) => this.setState({ member1marks })}
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
                Member #2 : {this.state.member2ID}
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  keyboardType='number-pad'
                  onChangeText={(member2marks) => this.setState({ member2marks })}
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
      <Block flex center style={{ opacity: this.state.opacityNumber }}>
        <Spinner
          visible={this.state.spinner}
          textContent={this.state.spinnertext}
          textStyle={styles.spinnerTextStyle}
        />
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

          <Block style={{ flex: 0.33, flexDirection: 'column', marginTop: theme.SIZES.BASE, justifyContent: 'center', alignItems: 'center' }}>
            <Block>
              <Button
                shadowless
                style={styles.button}
                color={nowTheme.COLORS.PRIMARY}
                disabled={this.state.ButtonSubmit}
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
            <Block>
              <Text style={{ fontSize: 16, color: 'red' }}>{this.state.warning}</Text>
            </Block>
          </Block>

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

export default FYP1_FinalEvaluation;
