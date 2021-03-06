import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, Picker } from "react-native";
import { Block, theme, Text } from "galio-framework";
import RadioGroup, { Radio } from "react-native-radio-input";
import { nowTheme } from '../../../constants';
import { Card, Button, Icon, Input } from "../../../components";
import { AsyncStorage } from 'react-native';
var FloatingLabel = require('react-native-floating-labels');
const { width } = Dimensions.get("screen");
import Spinner from 'react-native-loading-spinner-overlay';

class FYP1_Mid_Evaluation_Add extends React.Component {
  state = {
    ischecked: false,
  };

  constructor(props) {
    super(props);
    //Initial State
    this.state = {

      fypID: "",
      title: "",
      leaderID: "",
      member1ID: "",
      member2ID: "",
      supervisor: "",
      cosupervisor: "",
      status: "",

      markcriteria1: 0,
      markcriteria2: 0,
      markcriteria3: 0,
      markcriteria4: 0,
      markcriteria5: 0,



      deliverable1: "",
      deliverable2: "",
      deliverable3: "",
      deliverable4: "",
      deliverable5: "",

      changes: "",
      comments: "",

      fyps: [],
      opacityNumber: 1,

      spinnertext: "Gathering Details ..."
    };
  }

  componentDidMount() {
    this.getData();
    
  }

  async getstatus() {

    this.setState({
      spinner: true
    });

    let ip = await AsyncStorage.getItem('ip');

    await fetch('http://' + ip + '/api/fyp1get/DefenseStatus?id=' + this.state.fypID + ' ')
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
          // marketObj.leaderemail = element.leaderemail;

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

    const { title, fypID, leaderID, member1ID, member2ID, supervisor, cosupervisor, status, markcriteria1, markcriteria2, markcriteria3, markcriteria4, markcriteria5, markcriteria6, deliverable1, deliverable2, deliverable3, deliverable4, deliverable5, changes } = this.state;

    if (status === "" || leaderID === "" || supervisor === "" || markcriteria1 === "" || markcriteria2 === "" || markcriteria3 === "" || markcriteria4 === "" || markcriteria5 === "" || markcriteria6 === "" || deliverable1 === "") {
      if (markcriteria1 > 5 || markcriteria2 > 5 || markcriteria3 > 5 || markcriteria4 > 5 || markcriteria5 > 5 || markcriteria6 > 5) {
        alert("Marks should be less than 5!")
      }
      else
        alert("All fields marked * are required!")
    }
    else {
      this.setState({
        spinnertext: "Inserting Fyp I Mid Evaluation ...",
        spinner: true,
        opacityNumber: 0.5

      });

      let ip = await AsyncStorage.getItem('ip');
      let session_email = await AsyncStorage.getItem('email');


      fetch('http://' + ip + '/api/fyp1post/AddProposalEvaluationJury', {

        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          "FypID": fypID,
          "FormID": 1,
          "Criteria1Marks": markcriteria1,
          "Criteria2Marks": markcriteria2,
          "Criteria3Marks": markcriteria3,
          "Criteria4Marks": markcriteria4,
          "Criteria5Marks": markcriteria5,
          "Deliverables1": deliverable1,
          "Deliverables2": deliverable2,
          "Deliverables3": deliverable3,
          "Deliverables4": deliverable4,
          "Deliverables5": deliverable5,
          "ChangesRecommeneded": changes,
          "DefenceStatus": status,
          "LeaderID": leaderID,
          "Member1ID": member1ID,
          "Member2ID": member2ID
        })
      })
        .then((response) => response.json())



        .then((responseJson) => {
          alert("Fyp I Mid Evaluation inserted!");
          this.setState({
            spinner: false,
            opacityNumber: 1
          });
          this.props.navigation.navigate('FYP1_Home_Teacher')
        })

        .catch((error) => {
          alert("Error");
          this.setState({
            spinner: false,
            opacityNumber: 1
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

  async setData(title) {

    this.setState({
      spinner: true,
      opacityNumber: 0.2
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
        this.setState({
          spinner: false,
          opacityNumber: 1
        });
      });

      this.getstatus();
  }

  renderTitle = () => {


    const { fyps, title } = this.state;
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

  renderStatus = () => {
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
            Project Status *
          </Text>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>

            <RadioGroup getChecked={this.getChecked}>
              <Radio iconName={"lens"} label={"Accepted"} value={"Accepted"} />

              <Radio iconName={"lens"} label={"Rejected (Re-Defence)"} value={"Rejected"} />
            </RadioGroup>

          </Block>
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
              marginBottom: theme.SIZES.BASE / 2
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
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                1) Project Background and Problem *
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  keyboardType='number-pad'
                  style={styles.formInput}
                  onChangeText={(markcriteria1) => this.setState({ markcriteria1 })}
                  placeholder="Marks out of 5"
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
                2) Objectives *
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  keyboardType='number-pad'
                  style={styles.formInput}
                  onChangeText={(markcriteria2) => this.setState({ markcriteria2 })}
                  placeholder="Marks out of 5"
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
                3) Significance of Study *
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  keyboardType='number-pad'
                  style={styles.formInput}
                  onChangeText={(markcriteria3) => this.setState({ markcriteria3 })}
                  placeholder="Marks out of 5"
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
                4) Literature Review *
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  keyboardType='number-pad'
                  style={styles.formInput}
                  onChangeText={(markcriteria4) => this.setState({ markcriteria4 })}
                  placeholder="Marks out of 5"
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
                5) Project Methodology *
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  keyboardType='number-pad'
                  style={styles.formInput}
                  onChangeText={(markcriteria5) => this.setState({ markcriteria5 })}
                  placeholder="Marks out of 5"
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
                6) Presentation and Writing of the Report *
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  keyboardType='number-pad'
                  onChangeText={(markcriteria6) => this.setState({ markcriteria6 })}
                  placeholder="Marks out of 5"
                >
                </FloatingLabel>
              </Block>
            </Block>
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
                Leader ID * : {this.state.leaderID}
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
                Member 1 ID : {this.state.member1ID}
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
                Co-supervisor(s) (if any) ID : {this.state.cosupervisor}
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
              marginBottom: theme.SIZES.BASE / 2
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
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Deliverable # 1 *:
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(deliverable1) => this.setState({ deliverable1 })}
                  placeholder="Description"
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
                Deliverable # 2 (optional):
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(deliverable2) => this.setState({ deliverable2 })}
                  placeholder="Description"
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
                Deliverable # 3 (optional):
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(deliverable3) => this.setState({ deliverable3 })}
                  placeholder="Description"
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
                Deliverable # 4 (optional):
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(deliverable4) => this.setState({ deliverable4 })}
                  placeholder="Description"
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
                Deliverable # 5 (optional):
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(deliverable5) => this.setState({ deliverable5 })}
                  placeholder="Description"
                >
                </FloatingLabel>
              </Block>

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
              marginBottom: theme.SIZES.BASE / 2
            }}
            color={nowTheme.COLORS.HEADER}
          >
            Recommended Changes:
          </Text>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Block style={{ flexDirection: 'column' }}>

              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(changes) => this.setState({ changes })}
                  placeholder="Changes"
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
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
          {this.renderHeading()}
          {this.renderTitle()}
          {this.renderTeam()}
          {this.renderSupervisors()}
          {this.renderStatus()}
          {this.renderAssesment()}
          {this.renderDeliverables()}
          {this.renderChanges()}

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
  spinnerTextStyle: {
    color: 'black'
  },
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
    fontSize: 16,
    color: 'black'
  },
  input1: {
    borderWidth: 0,
    fontSize: 16
  }
})
export default FYP1_Mid_Evaluation_Add;
