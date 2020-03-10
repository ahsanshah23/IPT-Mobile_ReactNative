import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, Picker } from "react-native";
import { Block, theme, Text } from "galio-framework";
import RadioGroup, { Radio } from "react-native-radio-input";
import { nowTheme } from '../../../constants';
import { Card, Button, Icon, Input } from "../../../components";
import { AsyncStorage } from 'react-native';
var FloatingLabel = require('react-native-floating-labels');
import ModalDropdown from 'react-native-modal-dropdown';
// import { Dropdown } from 'react-native-material-dropdown';
// import articles from "../../../constants/articles";
const { width } = Dimensions.get("screen");

class FYP1_Mid_Evaluation_Add extends React.Component {
  state = {
    ischecked: false,
  };

  constructor(props) {
    super(props);
    //Initial State
    this.state = {
      title: "",
      leadername: "",
      leaderemail: "",
      member2name: "",
      member2email: "",
      member3name: "",
      member3email: "",
      supervisor: "",
      cosupervisor: "",
      status: "",
      markcriteria1: "",
      markcriteria2: "",
      markcriteria3: "",
      markcriteria4: "",
      markcriteria5: "",
      markcriteria6: "",
      deliverable1: "",
      deliverable2: "",
      deliverable3: "",
      deliverable4: "",
      deliverable5: "",
      changes: "",
      comments: "",
      evaluator: "",
      coevaluator: "",
      fyps: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {

    const markers = [];
    let ip = await AsyncStorage.getItem('ip');

    await fetch('http://' + ip + ':3006/fypnames ')
      .then(res => res.json())

      .then(res => {
        res.map((element) => {
          const marketObj = {};
          marketObj.id = element.id;
          marketObj.title = element.title;
          marketObj.leaderemail = element.leaderemail;

          markers.push(marketObj);
        });

        this.setState({ fyps: markers });
      });
  }

  async Submit() {
    const { title, leadername, leaderemail, member2name, member2email, member3email, member3name, supervisor, cosupervisor, status, markcriteria1, markcriteria2, markcriteria3, markcriteria4, markcriteria5, markcriteria6, deliverable1, deliverable2, deliverable3, deliverable4, deliverable5, changes, comments, evaluator, coevaluator } = this.state;
    let ip = await AsyncStorage.getItem('ip');
    let session_email = await AsyncStorage.getItem('email');
    await fetch('http://' + ip + ':3006/fyp1midevaluation_add?title=' + title + ' &leadername=' + leadername + ' &leaderemail=' + leaderemail + ' &member2name=' + member2name +
      ' &member2email=' + member2email + ' &member3email=' + member3email + ' &member3name=' + member3name + ' &supervisor=' + supervisor + ' &cosupervisor=' + cosupervisor +
      '&status=' + status + '&markcriteria1=' + markcriteria1 + ' &markcriteria2=' + markcriteria2 + ' &markcriteria3=' + markcriteria3 + ' &markcriteria4=' + markcriteria4 + ' &markcriteria5=' + markcriteria5
      + '&markcriteria6=' + markcriteria6 + ' &deliverable1=' + deliverable1 + ' &deliverable2=' + deliverable2 + ' &deliverable3=' + deliverable3 + ' &deliverable4=' + deliverable4
      + '&deliverable5=' + deliverable5 + ' &changes=' + changes + ' &comments=' + comments + ' &evaluator=' + evaluator + ' &coevaluator=' + coevaluator + ' &submitted_by=' + session_email + ' ')
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
    
    let ip = await AsyncStorage.getItem('ip');

    await fetch('http://' + ip + ':3006/formfill_by_title?title='+title+' ')
    .then(res => res.json())
    .then(users => {

        this.setState({
            title: users[0].title, 
            leaderemail: users[0].leaderemail,
            member2email: users[0].member2email,
            member3email: users[0].member3email,
            supervisor: users[0].supervisor,
            cosupervisor: users[0].cosupervisor,

        })

    })
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
            Project Status
          </Text>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>

            <RadioGroup getChecked={this.getChecked}>
              <Radio iconName={"lens"} label={"Accepted"} value={"Accepted"} />
              <Radio iconName={"lens"} label={"Accepted with changes"} value={"Accepted with changes"} />
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
                1) Project Background and Problem
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
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
                2) Objectives
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
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
                3) Significance of Study
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
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
                4) Literature Review
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
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
                5) Project Methodology
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
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
                6) Presentation and Writing of the Report
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
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
                Member 1 : (Leader) 
              </Text>
              <Block style={{ flexDirection: 'column' }}>

                {/* <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(leadername) => this.setState({ leadername })}
                  placeholder="Name"
                >
                </FloatingLabel> */}

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  value={this.state.leaderemail}
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
                {/* <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(member2name) => this.setState({ member2name })}
                  placeholder="Name"
                >
                </FloatingLabel> */}

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  value={this.state.member2email}
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
                {/* <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(member3name) => this.setState({ member3name })}
                  placeholder="Name"
                >
                </FloatingLabel> */}

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  value={this.state.member3email}
                >
                  
                </FloatingLabel>
              </Block>
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
                Supervisor NU Email :
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  value={this.state.supervisor}
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
                  value={this.state.cosupervisor}
                >
                  
                </FloatingLabel>
              </Block>
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
                Deliverable # 1:
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(deliverable1) => this.setState({ deliverable1 })}
                  placeholder="Descriptionn"
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

  renderComments = () => {
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
            Comments to the FYP Committee:
          </Text>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Block style={{ flexDirection: 'column' }}>

              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(comments) => this.setState({ comments })}
                  placeholder="Comments"
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
                Evaluator's Name:
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(evaluator) => this.setState({ evaluator })}
                  placeholder="Descriptionn"
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
                Co-Evaluator's Name
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(coevaluator) => this.setState({ coevaluator })}
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


  render() {
    return (
      <Block flex center>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
          {this.renderHeading()}
          {this.renderTitle()}
          {this.renderTeam()}
          {this.renderSupervisors()}
          {this.renderStatus()}
          {this.renderAssesment()}
          {this.renderDeliverables()}
          {this.renderChanges()}
          {this.renderComments()}
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
    color:'black'
  },
  input1: {
    borderWidth: 0,
    fontSize: 16
  }
})
export default FYP1_Mid_Evaluation_Add;
