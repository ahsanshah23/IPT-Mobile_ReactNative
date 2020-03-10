import React from 'react';
import { Block, Text, theme } from 'galio-framework';
import { articles, nowTheme } from '../../../constants/';
import { Card } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Dimensions, ScrollView, CheckBox, TextInput } from "react-native";
//import { Block, theme, Text } from "galio-framework";
//import { RadioButton } from 'react-native-paper';
import RadioGroup,{Radio} from "react-native-radio-input";
var FloatingLabel = require('react-native-floating-labels');
const { width } = Dimensions.get("screen");

class FYP2_Mid_Evaluation_View extends React.Component {
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

  componentDidMount() {
    this.getdata();
  }

  async getdata()
  {
    let ip = await AsyncStorage.getItem('ip');
    let session_email = await AsyncStorage.getItem('email');
    fetch('http://'+ip+':3006/fyp2midevaluation_view?Email='+session_email+'')
    .then(res => res.json())
    .then(users => {
      this.setState({
        title: users[0].Project_title,
        member1Name: users[0].project_type,
        member1Email: users[0].Team_Leader,
        member2Name: users[0].abstract,
        member2Email: users[0].Team_Member2,
        member3Name: users[0].leader_name,
        member3Email: users[0].Team_Member3,
        supervisorName: users[0].member2_name,
        supervisorEmail: users[0].supervisor_email,
        coSupervisorName: users[0].member3_name,
        coSupervisorEmail: users[0].cosupervisor_email,
        projectProgress: users[0].Project_Progress,
        documentationStatus: users[0].Documentation_Status,
        progressComments: users[0].Progress_Comments,
        evaluatorEmail: users[0].Evaluator1_Name,
        coevaluatorEmail: users[0].Evaluator2_Name,
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
    const { title } = this.state;

    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text
            h5
            style={{
              fontFamily: 'montserrat-regular',
              marginBottom: theme.SIZES.BASE / 2,
              fontWeight: '500',
            }}
            color={nowTheme.COLORS.HEADER}
          >
            Project Title : {title}
          </Text>
        </Block>
      </Block>
    );
  };

  renderTeam = () => {
    const { member1Email, member1Name, member2Email, member2Name, member3Email, member3Name } = this.state;

    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text
            h5
            style={{
              fontFamily: 'montserrat-regular',
              marginBottom: theme.SIZES.BASE / 2,
              fontWeight: '500'
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
                  marginTop: '2.5%',
                  fontWeight: '500'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Member 1 : (Leader)
              </Text>
              <Block style={{ flexDirection: 'column' }}>
              
                <Text
                  p
                  style={{
                      fontFamily: 'montserrat-regular',
                      marginBottom: theme.SIZES.BASE / 2,
                      marginTop: '2.5%',
                      fontSize: 16
                  }}
                  color={nowTheme.COLORS.HEADER}
                >
                  Email : {member1Email}
                </Text>
              </Block>
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%',
                  fontWeight: '500'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Member 2 :
              </Text>
              <Block style={{ flexDirection: 'column' }}>
             
                <Text
                  p
                  style={{
                      fontFamily: 'montserrat-regular',
                      marginBottom: theme.SIZES.BASE / 2,
                      marginTop: '2.5%',
                      fontSize: 16
                  }}
                  color={nowTheme.COLORS.HEADER}
                >
                  Email : {member2Email}
                </Text>
              </Block>
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%',
                  fontWeight: '500'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Member 3 :
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                
                <Text
                  p
                  style={{
                      fontFamily: 'montserrat-regular',
                      marginBottom: theme.SIZES.BASE / 2,
                      marginTop: '2.5%',
                      fontSize: 16
                  }}
                  color={nowTheme.COLORS.HEADER}
                >
                  Email : {member3Email}
                </Text>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };

  renderAdvisors = () => {
    const { supervisorName, supervisorEmail, coSupervisorName, coSupervisorEmail } = this.state;

    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
        <Text
            h5
            style={{
              fontFamily: 'montserrat-regular',
              marginBottom: theme.SIZES.BASE / 2,
              fontWeight: '500'
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
                  marginTop: '2.5%',
                  fontWeight: '500'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Supervisor :
              </Text>
              <Block style={{ flexDirection: 'column' }}>
              
                <Text
                  p
                  style={{
                      fontFamily: 'montserrat-regular',
                      marginBottom: theme.SIZES.BASE / 2,
                      marginTop: '2.5%',
                      fontSize: 16
                  }}
                  color={nowTheme.COLORS.HEADER}
                >
                  Email : {supervisorEmail}
                </Text>
              </Block>
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%',
                  fontWeight: '500'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Co-supervisor(s) (if any) :
              </Text>
              <Block style={{ flexDirection: 'column' }}>
               
                <Text
                  p
                  style={{
                      fontFamily: 'montserrat-regular',
                      marginBottom: theme.SIZES.BASE / 2,
                      marginTop: '2.5%',
                      fontSize: 16
                  }}
                  color={nowTheme.COLORS.HEADER}
                >
                  Email : {coSupervisorEmail}
                </Text>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };


  renderProject = () => {
    const { progressComments, projectProgress, documentationStatus } = this.state;
    return (
      <Block flex style={styles.group}>
      <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
        <Text
          h5
          style={{
            fontFamily: 'montserrat-regular',
            marginBottom: theme.SIZES.BASE / 2,
            fontWeight: '500'
          }} 
          color={nowTheme.COLORS.HEADER}
        >
          Project Progress : {projectProgress}
        </Text>
        <Text
            h5
            style={{
              marginTop: 20,
              fontFamily: 'montserrat-regular',
              marginBottom: theme.SIZES.BASE / 2,
              fontWeight: '500'
            }} 
            color={nowTheme.COLORS.HEADER}
          >
            Documentation Status : {documentationStatus}
          </Text>
          <Text
            h5
            style={{
              marginTop: 20,
              fontFamily: 'montserrat-regular',
              marginBottom: theme.SIZES.BASE / 2,
              fontWeight: '500'
            }} 
            color={nowTheme.COLORS.HEADER}
          >
            Comments about the progress : {progressComments} 
          </Text>
        </Block>
      </Block>
    );
  };

  renderJury = () => {
    const { evaluatorEmail, coevaluatorEmail } = this.state;
    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text
            h5
            style={{
              fontFamily: 'montserrat-regular',
              marginBottom: theme.SIZES.BASE / 2,
              fontWeight: '500'
            }}
            color={nowTheme.COLORS.HEADER}
          >
            Evaluators
          </Text>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Block style={{ flexDirection: 'column' }}>
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%',
                  fontWeight: '500'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Evaluator :
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <Text
                  p
                  style={{
                      fontFamily: 'montserrat-regular',
                      marginBottom: theme.SIZES.BASE / 2,
                      marginTop: '2.5%',
                      fontSize: 16
                  }}
                  color={nowTheme.COLORS.HEADER}
                >
                  Name : {evaluatorEmail}
                </Text>
              </Block>
              <Text
                p
                style={{
                  fontFamily: 'montserrat-regular',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: '2.5%',
                  fontWeight: '500'
                }}
                color={nowTheme.COLORS.HEADER}
              >
                Co-Evaluator :
              </Text>
              <Block style={{ flexDirection: 'column' }}>
                <Text
                  p
                  style={{
                      fontFamily: 'montserrat-regular',
                      marginBottom: theme.SIZES.BASE / 2,
                      marginTop: '2.5%',
                      fontSize: 16
                  }}
                  color={nowTheme.COLORS.HEADER}
                >
                  Name : {coevaluatorEmail}
                </Text>
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
          <Card style={styles.card}>
            {this.renderHeading()}
            {this.renderTitle()}
            {this.renderTeam()}
            {this.renderAdvisors()}
            {this.renderProject()}
            {this.renderJury()}
          </Card>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SIZES.BASE
  },
  card: {
    marginTop: 40,
    backgroundColor: '#F5F5F5'
},
  button:{
    backgroundColor: "orange",
    color: "white"
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER
  },
  card: {
    marginTop: 40,
    backgroundColor: '#F5F5F5'
  },
});

export default FYP2_Mid_Evaluation_View;