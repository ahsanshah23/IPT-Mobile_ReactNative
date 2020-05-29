import React from 'react';
import { Block, Text, theme } from 'galio-framework';
import { articles, nowTheme } from '../../../constants/';
import { Card, Button, Icon, Input } from "../../../components";
import { AsyncStorage } from 'react-native';
import { StyleSheet, Dimensions, ScrollView, CheckBox, TextInput, Picker } from "react-native";
import RadioGroup, { Radio } from "react-native-radio-input";
var FloatingLabel = require('react-native-floating-labels');
import Spinner from 'react-native-loading-spinner-overlay';

class FYP2_MidEvaluation_Add extends React.Component {
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

      projectProgress: "",

      documentationStatus: "",

      progressComments: "",

      fyps: [],

      opacityNumber: 1,

      spinner: false
    };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {

    this.setState({
      spinnertext: "Getting Data ...",
      spinner: true,
      opacityNumber: 0.5
    });

    const markers = [];
    let ip = await AsyncStorage.getItem('ip');
    let ID = await AsyncStorage.getItem('ID1');

    await fetch('http://' + ip + '/api/fyp1get/GetFypNames?id=' + ID + ' ')
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
        console.warn("Error " + error);
        this.setState({
          spinner: false,
          opacityNumber: 1
        });
      });
  }

  async getstatus() {

    this.setState({
      spinner: true
    });

    let ip = await AsyncStorage.getItem('ip');

    await fetch('http://' + ip + '/api/fyp2get/Fyp2MidStatus?id=' + this.state.fypID + ' ')
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

  async setData(title) {

    this.setState({
      spinnertext: "Setting Data ...",
      spinner: true,
      opacityNumber: 0.5
    });

    let ip = await AsyncStorage.getItem('ip');

    await fetch('http://' + ip + '/api/fyp1get/GetFypDetailsByTitle?title=' + title + ' ')
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
          spinner: false,
          opacityNumber: 1

        })

      })
      .catch((error) => {
        console.warn("Error " + error);
        this.setState({
          spinner: false,
          opacityNumber: 1
        });
      });

      this.getstatus()
  }

  async Submit() {
    const { fypID, leaderID, member1ID, member2ID, projectProgress, documentationStatus, progressComments } = this.state;

    if (leaderID === "" || projectProgress === "" || documentationStatus === "") {
      alert("All fields marked * are required!")
    }
    else {
      this.setState({
        spinnertext: "Inserting Fyp II Mid Evaluation ...",
        spinner: true,
        opacityNumber: 0.5

      });

      let ip = await AsyncStorage.getItem('ip');
      let session_email = await AsyncStorage.getItem('email');

      fetch('http://' + ip + '/api/fyp2post/AddMidEvaluationJury', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          "FypID": fypID,
          "FormID": 3,
          "ProjectProgress": projectProgress,
          "DocumentationStatus": documentationStatus,
          "ProgressComments": progressComments,
          "LeaderID": leaderID,
          "Member1ID": member1ID,
          "Member2ID": member2ID


        })
      })
        .then((response) => response.json())

        //If response is in json then in success

        .then((responseJson) => {
          alert("Fyp II Mid Evaluation inserted!");
          this.setState({
            spinner: false,
            opacityNumber: 1
          });
          this.props.navigation.navigate('FYP2_Home_Teacher')
        })

        //If response is not in json then in error

        .catch((error) => {
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
            CS492-Project-II, Spring-19
          </Text>
          <Text
            h4
            style={{
              fontFamily: 'montserrat-regular',
              marginBottom: theme.SIZES.BASE / 2
            }}
            color={nowTheme.COLORS.HEADER}
          >
            Mid-I Evaluation Form
          </Text>
        </Block>
      </Block>
    );
  };

  getChecked1 = (value) => {
    this.setState({ projectProgress: value });
  }

  getChecked2 = (value) => {
    this.setState({ documentationStatus: value });
  }

  renderTitle = () => {
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

  renderTeam = () => {
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
            Group Members
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
                Leader ID *: {this.state.leaderID}
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
                Member 2 ID : {this.state.member2ID}
              </Text>

            </Block>
          </Block>
        </Block>
      </Block>
    );
  };

  renderAdvisors = () => {
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
                Supervisor *: {this.state.supervisorID}
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


  renderProject = () => {
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
            Project Progress *
        </Text>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <RadioGroup getChecked={this.getChecked1}>
              <Radio iconName={"lens"} label={"1"} value={"1"} />
              <Radio iconName={"lens"} label={"2"} value={"2"} />
              <Radio iconName={"lens"} label={"3"} value={"3"} />
              <Radio iconName={"lens"} label={"4"} value={"4"} />
              <Radio iconName={"lens"} label={"5"} value={"5"} />
            </RadioGroup>
          </Block>
          <Text
            h5
            style={{
              marginTop: 20,
              fontFamily: 'montserrat-regular',
              marginBottom: theme.SIZES.BASE / 2
            }}
            color={nowTheme.COLORS.HEADER}
          >
            Documentation Status *
          </Text>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <RadioGroup getChecked={this.getChecked2}>
              <Radio iconName={"lens"} label={"1"} value={"1"} />
              <Radio iconName={"lens"} label={"2"} value={"2"} />
              <Radio iconName={"lens"} label={"3"} value={"3"} />
              <Radio iconName={"lens"} label={"4"} value={"4"} />
              <Radio iconName={"lens"} label={"5"} value={"5"} />
            </RadioGroup>
          </Block>
          <Text
            h5
            style={{
              marginTop: 20,
              fontFamily: 'montserrat-regular',
              marginBottom: theme.SIZES.BASE / 2
            }}
            color={nowTheme.COLORS.HEADER}
          >
            Comments about the progress:
          </Text>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <TextInput
              style={styles.input}
              //value={inputValue}
              //onChangeText={onChangeText}
              placeholder="Type here."
              //placeholderTextColor={inputPlaceholder}
              multiline={true}
              autoCapitalize="sentences"
              underlineColorAndroid="transparent"
              selectionColor={'white'}
              maxLength={1500}
              returnKeyType="done"
              autoCorrect={false}
              blurOnSubmit={true}
              //onSubmitEditing={onDoneAddItem}
              onChangeText={(progressComments) => this.setState({ progressComments })}
            />
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
          {this.renderAdvisors()}
          {this.renderProject()}

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
    fontSize: 16
  },
  input1: {
    borderWidth: 0,
    fontSize: 16
  }
})


export default FYP2_MidEvaluation_Add;