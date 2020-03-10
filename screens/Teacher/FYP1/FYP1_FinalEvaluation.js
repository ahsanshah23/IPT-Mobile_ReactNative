import React from "react";
import { StyleSheet, Dimensions, ScrollView, CheckBox, TextInput, AsyncStorage , Picker} from "react-native";
import { Block, theme, Text } from "galio-framework";
var FloatingLabel = require('react-native-floating-labels');
import { nowTheme } from '../../../constants';
import { Button } from "../../../components";

class FYP1_FinalEvaluation extends React.Component {
  state = {
    ischecked: false,
  };

  constructor(props) {
    super(props);
    //Initial State
    this.state = {
      title: "",
      leadername: "",     
      member2name: "",     
      member3name: "",
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
      leaderemail: "",
      leadermarks:"",
      member2email: "",
      member2marks:"",
      member3email: "",
      member3marks:"",
      evaluator:"",
      coevaluator:"",
      fyps:[]

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
    console.warn(this.state.evaluator);
    const { title, leadername, leaderemail, member2name, member2email, member3email, member3name, supervisor, cosupervisor, deliverable1detail, deliverable1completed, deliverable2detail, deliverable2completed, deliverable3detail, deliverable3completed, deliverable4detail, deliverable4completed, deliverable5detail, deliverable5completed, fyp2deliverables, leadermarks, member2marks, member3marks, evaluator, coevaluator } = this.state;
    let ip = await AsyncStorage.getItem('ip');
    let session_email = await AsyncStorage.getItem('email');
    await fetch('http://' + ip + ':3006/fyp1finalevaluation_add?title=' + title + ' &leadername=' + leadername + ' &member2name=' + member2name + ' &member3name=' + member3name +
    ' &supervisor=' + supervisor + ' &cosupervisor=' + cosupervisor + ' &deliverable1detail=' + deliverable1detail + ' &deliverable1completed=' + deliverable1completed +
    ' &deliverable2detail=' + deliverable2detail +'&deliverable2completed=' + deliverable2completed + '&deliverable3detail=' + deliverable3detail + ' &deliverable3completed=' +
     deliverable3completed + ' &deliverable4detail=' + deliverable4detail + ' &deliverable4completed=' + deliverable4completed + ' &deliverable5detail=' + deliverable5detail+ 
     '&deliverable5completed=' + deliverable5completed + ' &fyp2deliverables=' + fyp2deliverables + ' &leaderemail=' + leaderemail + ' &leadermarks=' + leadermarks +
     ' &member2email=' + member2email+ '&member2marks=' + member2marks + ' &member3email=' + member3email + ' &member3marks=' + member3marks + ' &evaluator=' + evaluator + 
     ' &coevaluator=' + coevaluator +' &submitted_by=' + session_email +' ')
      .then(users => {

        alert("inserted");
        this.props.navigation.navigate('Teacher_Home')
      })
  

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
            FYP II Deliverables expected
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
              fontSize:16
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
              fontSize:16
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
              fontSize:16
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
              fontSize:16
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
              fontSize:16
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
              fontSize:16
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
                Deliverable #1:
              </Text>
              <Block style={{ flexDirection: 'column' }}>

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(deliverable1detail) => this.setState({ deliverable1detail })}
                  placeholder="Detail"
                >
                </FloatingLabel>

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
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
                Deliverable  #2:
              </Text>
              <Block style={{ flexDirection: 'column' }}>

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(deliverable2detail) => this.setState({ deliverable2detail })}
                  placeholder="Detail"
                >
                </FloatingLabel>

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
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
                Deliverable  #3:
              </Text>
              <Block style={{ flexDirection: 'column' }}>

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(deliverable3detail) => this.setState({ deliverable3detail })}
                  placeholder="Detail"
                >
                </FloatingLabel>

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
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
                Deliverable  #4:
              </Text>
              <Block style={{ flexDirection: 'column' }}>

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(deliverable4detail) => this.setState({ deliverable4detail })}
                  placeholder="Detail"
                >
                </FloatingLabel>

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
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
                Deliverable  #5:
              </Text>
              <Block style={{ flexDirection: 'column' }}>

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(deliverable5detail) => this.setState({ deliverable5detail })}
                  placeholder="Detail"
                >
                </FloatingLabel>

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
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
                Member 1 : (Leader)
              </Text>
              <Block style={{ flexDirection: 'column' }}>

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  value={this.state.leaderemail}
                >
                </FloatingLabel>

                <FloatingLabel
                  inputStyle={styles.input1}
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
                Member #2:
              </Text>
              <Block style={{ flexDirection: 'column' }}>

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  value={this.state.member2email}
                >
                </FloatingLabel>

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(member2marks) => this.setState({ member2marks })}
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
                  value={this.state.member3email}
                >
                </FloatingLabel>

                <FloatingLabel
                  inputStyle={styles.input1}
                  style={styles.formInput}
                  onChangeText={(member3marks) => this.setState({ member3marks })}
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {this.renderHeading()}
          {this.renderTitle()}

          {/* {this.renderTeam()} */}
          {this.renderSupervisors()}

          {this.renderrules()}
          {this.renderDeliverables()}

          {this.renderFYP2expected()}
          {this.renderMarks()}
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
    fontSize: 16
  },
  input1: {
    borderWidth: 0,
    fontSize: 16
  }
})

export default FYP1_FinalEvaluation;
