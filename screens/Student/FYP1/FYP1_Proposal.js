import React from "react";
import { StyleSheet, Dimensions, ScrollView, CheckBox, TextInput } from "react-native";
import { Block, theme, Text } from "galio-framework";
import RadioGroup, { Radio } from "react-native-radio-input";
import { Checkbox } from 'react-native-paper';
import { nowTheme } from '../../../constants';
import { Card, Button, Icon, Input } from "../../../components";
import { AsyncStorage } from 'react-native';
var FloatingLabel = require('react-native-floating-labels');
// import articles from "../../../constants/articles";
const { width } = Dimensions.get("screen");

class FYP1_Proposal extends React.Component {
  state = {
    ischecked: false,
  };

  constructor(props) {
    super(props);
    //Initial State
    this.state = {
      title: "",
      type: "",
      areaofinterest: "HCI",
      abstract: "",
      leadername: "",
      leaderemail: "",
      member2name: "",
      member2email: "",
      member3name: "",
      member3email: "",
      supervisor: "",
      cosupervisor: ""

    };
  } 



  async Submit() {
    const { type, title, areaofinterest, abstract, leadername, leaderemail, member2name, member2email, member3email, member3name, supervisor, cosupervisor } = this.state;
    let ip = await AsyncStorage.getItem('ip');
    let session_email = await AsyncStorage.getItem('email');
    await fetch('http://'+ip+':3006/fyp1proposal_add?title=' + title + ' &type=' + type + ' &areaofinterest=' + areaofinterest + ' &abstract=' + abstract + ' &leadername=' + leadername + ' &leaderemail=' + 
    leaderemail + ' &member2name=' + member2name + ' &member2email=' + member2email + ' &member3email=' + member3email + ' &member3name=' + member3name + ' &supervisor=' + supervisor + ' &cosupervisor=' + cosupervisor + '&submitted_by=' + session_email + ' ')
      .then(users => {

        alert("inserted");  
        this.props.navigation.navigate('Student_Home')
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
    this.setState({ type: value });
  }

  renderTitle = () => {


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
          <Text
            h5
            style={{
              fontFamily: 'montserrat-regular',
              marginBottom: theme.SIZES.BASE / 2
            }}
            color={nowTheme.COLORS.HEADER}
          >
            Project Type
            </Text>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>

            <RadioGroup getChecked={this.getChecked}>
              <Radio iconName={"lens"} label={"Product based"} value={"Product Based"} />
              <Radio iconName={"lens"} label={"Experiment based"} value={"Experimental Based"} />
            </RadioGroup>

          </Block>
        </Block>
      </Block>
    );
  };

  renderInterest = () => {
    const { selectedInterest1, selectedInterest2, selectedInterest3, selectedInterest4 } = this.state;
    const { ischecked1, ischecked2, ischecked3, ischecked4, ischecked5, ischecked6, ischecked7, ischecked8, ischecked9, ischecked10, ischecked11, ischecked12, ischecked13, ischecked14, ischecked15, ischecked16, ischecked17, ischecked18 } = this.state;
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
            Choose your area of interest
          </Text>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Block style={{ flexDirection: 'row' }}>
              <Checkbox
                status={ischecked1 ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ ischecked1: !ischecked1 }); }}
              />
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                BigData Analytics

              </Text>
            </Block>

            <Block style={{ flexDirection: 'row' }}>
              <Checkbox
                status={ischecked2 ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ ischecked2: !ischecked2 }); }}
              />
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                HPC
              </Text>
            </Block>

            <Block style={{ flexDirection: 'row' }}>
              <Checkbox
                status={ischecked3 ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ ischecked3: !ischecked3 }); }}
              />
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Mobile Application

              </Text>
            </Block>

            <Block style={{ flexDirection: 'row' }}>
              <Checkbox
                status={ischecked4 ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ ischecked4: !ischecked4 }); }}
              />
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Machine Learning
              </Text>
            </Block>

            <Block style={{ flexDirection: 'row' }}>
              <Checkbox
                status={ischecked5 ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ ischecked5: !ischecked5 }); }}
              />
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Distributed Systems
              </Text>
            </Block>

            <Block style={{ flexDirection: 'row' }}>
              <Checkbox
                status={ischecked6 ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ ischecked6: !ischecked6 }); }}
              />
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                HCI/SE
              </Text>
            </Block>

            <Block style={{ flexDirection: 'row' }}>
              <Checkbox
                status={ischecked7 ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ ischecked7: !ischecked7 }); }}
              />
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Deep Learning
              </Text>
            </Block>

            <Block style={{ flexDirection: 'row' }}>
              <Checkbox
                status={ischecked8 ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ ischecked8: !ischecked8 }); }}
              />
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                OS
              </Text>
            </Block>

            <Block style={{ flexDirection: 'row' }}>
              <Checkbox
                status={ischecked9 ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ ischecked9: !ischecked9 }); }}
              />
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Semantic Web
              </Text>
            </Block>

            <Block style={{ flexDirection: 'row' }}>
              <Checkbox
                status={ischecked10 ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ ischecked10: !ischecked10 }); }}
              />
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Data/Text Mining
              </Text>
            </Block>

            <Block style={{ flexDirection: 'row' }}>
              <Checkbox
                status={ischecked11 ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ ischecked11: !ischecked11 }); }}
              />
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                MPI
              </Text>
            </Block>

            <Block style={{ flexDirection: 'row' }}>
              <Checkbox
                status={ischecked12 ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ ischecked12: !ischecked12 }); }}
              />
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                SDN
              </Text>
            </Block>

            <Block style={{ flexDirection: 'row' }}>
              <Checkbox
                status={ischecked13 ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ ischecked13: !ischecked13 }); }}
              />
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Data Science
              </Text>
            </Block>

            <Block style={{ flexDirection: 'row' }}>
              <Checkbox
                status={ischecked14 ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ ischecked14: !ischecked14 }); }}
              />
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                IoTs
              </Text>
            </Block>

            <Block style={{ flexDirection: 'row' }}>
              <Checkbox
                status={ischecked15 ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ ischecked15: !ischecked15 }); }}
              />
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Bio-informatics
              </Text>
            </Block>

            <Block style={{ flexDirection: 'row' }}>
              <Checkbox
                status={ischecked16 ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ ischecked16: !ischecked16 }); }}
              />
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Computer Vision
              </Text>
            </Block>

            <Block style={{ flexDirection: 'row' }}>
              <Checkbox
                status={ischecked17 ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ ischecked17: !ischecked17 }); }}
              />
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Security
              </Text>
            </Block>

            <Block style={{ flexDirection: 'row' }}>
              <Checkbox
                status={ischecked18 ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ ischecked18: !ischecked18 }); }}
              />
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Crowd Computing
              </Text>
            </Block>

            <FloatingLabel
              inputStyle={styles.input1}
              style={styles.formInput}
              // onChangeText={(supervisor) => this.setState({ supervisor })}
              placeholder="Any other area of interest"
            >
            </FloatingLabel>
          </Block>
        </Block>
      </Block>
    );
  };

  renderAbstract = () => {
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

              //onSubmitEditing={onDoneAddItem}
              onChangeText={(abstract) => this.setState({ abstract })}
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
                  onChangeText={(leadername) => this.setState({ leadername })}
                  placeholder="Name"
                >
                </FloatingLabel>

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(leaderemail) => this.setState({ leaderemail })}
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
                  onChangeText={(member2name) => this.setState({ member2name })}
                  placeholder="Name"
                >
                </FloatingLabel>

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(member2email) => this.setState({ member2email })}
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
                  onChangeText={(member3name) => this.setState({ member3name })}
                  placeholder="Name"
                >
                </FloatingLabel>

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(member3email) => this.setState({ member3email })}
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

  renderEnd = () => {
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
                Supervisor NU Email :
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(supervisor) => this.setState({ supervisor })}
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
                Co-supervisor(s) (if any) NU Email :
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(cosupervisor) => this.setState({ cosupervisor })}
                  placeholder="Email Supervisor"
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
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
          {this.renderHeading()}
          {this.renderTitle()}
          {this.renderInterest()}
          {this.renderAbstract()}
          {this.renderTeam()}
          {this.renderEnd()}

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
  button:{
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
export default FYP1_Proposal;
