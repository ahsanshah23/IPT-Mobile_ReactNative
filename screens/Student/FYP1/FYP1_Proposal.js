import React from "react";
import { StyleSheet, Dimensions, ScrollView, CheckBox, TextInput } from "react-native";
import { Block, theme, Text } from "galio-framework";
import RadioGroup, { Radio } from "react-native-radio-input";
import { nowTheme } from '../../../constants';
import {  Button, Input } from "../../../components";
import { AsyncStorage } from 'react-native';
var FloatingLabel = require('react-native-floating-labels');
import { Table, Rows } from 'react-native-table-component';

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

      areaofinterest: "",

      abstract: "",

      leaderID: "",

      member1ID: "",

      member2ID: "",

      supervisor: "",

      cosupervisor: "",


    };
  }



  async Submit() {

    const { type, title, abstract, leaderID, member1ID, member2ID, supervisor, cosupervisor } = this.state;
    let ip = await AsyncStorage.getItem('ip');

    fetch('http://192.168.0.109:45455/api/fyp1post/addproposalstudent', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ProjectTitle": title,
        "ProjectType": type,
        "Abstract": abstract,
        "SupervisorID": supervisor,
        "CoSupervisorID": cosupervisor,
        "LeaderID": leaderID,
        "Member1ID": member1ID,
        "Member2ID": member2ID
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

 
  }

  renderInterest = () => {
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

            }}
            color={nowTheme.COLORS.HEADER}
          >
            List Of Interests
            </Text>
          <Block style={styles.container}>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
              <Rows data={state.tableData} textStyle={{ fontSize: 16 }} />
            </Table>
          </Block>

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
                Write your area of interest(s) :
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(areaofinterest) => this.setState({ areaofinterest })}
                  placeholder="Area Of Interest(s)"
                >
                </FloatingLabel>
              </Block>


            </Block>
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
                Leader ID :
              </Text>
              <Block style={{ flexDirection: 'column' }}>

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(leaderID) => this.setState({ leaderID })}
                  placeholder="ID"
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
                Member 1 ID :
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(member1ID) => this.setState({ member1ID })}
                  placeholder="ID"
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
                Member 2 ID :
              </Text>
              <Block style={{ flexDirection: 'column' }}>

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(member2ID) => this.setState({ member2ID })}
                  placeholder="ID"
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
                Supervisor ID :
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(supervisor) => this.setState({ supervisor })}
                  placeholder="ID"
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
                Co-supervisor(s) (if any) ID :
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(cosupervisor) => this.setState({ cosupervisor })}
                  placeholder="ID"
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
          {/* {this.renderInterest()} */}
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
export default FYP1_Proposal;
