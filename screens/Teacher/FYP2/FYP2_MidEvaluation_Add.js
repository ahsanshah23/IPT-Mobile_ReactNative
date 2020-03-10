import React from 'react';
import { Block, Text, theme } from 'galio-framework';
import { articles, nowTheme } from '../../../constants/';
import { Card, Button, Icon, Input } from "../../../components";
import { AsyncStorage } from 'react-native';
import { StyleSheet, Dimensions, ScrollView, CheckBox, TextInput } from "react-native";
//import { Block, theme, Text } from "galio-framework";
//import { RadioButton } from 'react-native-paper';
import RadioGroup, { Radio } from "react-native-radio-input";
var FloatingLabel = require('react-native-floating-labels');
const { width } = Dimensions.get("screen");

class FYP2_MidEvaluation_Add extends React.Component {
  state = {
    ischecked: false,
  };

  constructor(props) {
    super(props);
    //Initial State
    this.state = {
      title: "",
      member1Name: "",
      member1Email: "",
      member2Name: "",
      member2Email: "",
      member3Name: "",
      member3Email: "",
      supervisorName: "",
      supervisorEmail: "",
      coSupervisorName: "",
      coSupervisorEmail: "",
      projectProgress: "",
      documentationStatus: "",
      progressComments: "",
      evaluatorEmail: "",
      coevaluatorEmail: "",
    };
  }

  async Submit() {
    const { title, member1Name, member2Name, member3Name, member1Email, member2Email, member3Email, supervisorEmail, coSupervisorEmail, projectProgress, documentationStatus, progressComments, evaluatorEmail, coevaluatorEmail } = this.state;
    let ip = await AsyncStorage.getItem('ip');
    let session_email = await AsyncStorage.getItem('email');
    await fetch('http://' + ip + ':3006/fyp2midevaluation_add?title=' + title + ' &member1Email=' + member1Email + ' &member2Email=' + member2Email + ' &member1Name=' + member1Name + ' &member2Name=' + member2Name +
      ' &member3Email=' + member3Email + ' &supervisorEmail=' + supervisorEmail + ' &coSupervisorEmail=' + coSupervisorEmail + ' &member3Name=' + member3Name +
      ' &projectProgress=' + projectProgress + ' &documentationStatus=' + documentationStatus + ' &progressComments=' + progressComments + ' &evaluatorEmail=' + evaluatorEmail + ' &coevaluatorEmail=' + coevaluatorEmail + ' ')
      .then(users => {
        alert("inserted");
        this.props.navigation.navigate('Teacher_Home')
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
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(member1Email) => this.setState({ member1Email })}
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
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(member2Email) => this.setState({ member2Email })}
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
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(member3Email) => this.setState({ member3Email })}
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
                Supervisor :
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(supervisorName) => this.setState({ supervisorName })}
                  placeholder="Name"
                >
                </FloatingLabel>
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
                  onChangeText={(coSupervisorName) => this.setState({ coSupervisorName })}
                  placeholder="Name"
                >
                </FloatingLabel>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(coSupervisorEmail) => this.setState({ coSupervisorEmail })}
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
            Project Progress
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
            Documentation Status
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
          {this.renderAdvisors()}
          {this.renderProject()}
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
  button: {
    backgroundColor: "orange",
    color: "white"
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER
  }
});

export default FYP2_MidEvaluation_Add;