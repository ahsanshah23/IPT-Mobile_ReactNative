import React from 'react';
import { Block, Text, theme } from 'galio-framework';
import { articles, nowTheme } from '../../../constants/';
import { Card } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Dimensions, ScrollView, CheckBox, TextInput } from "react-native";
import RadioGroup, { Radio } from "react-native-radio-input";
var FloatingLabel = require('react-native-floating-labels');
const { width } = Dimensions.get("screen");
import Spinner from 'react-native-loading-spinner-overlay';

class FYP2_Mid_Evaluation_View extends React.Component {
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
      projectProgress: "",
      documentationStatus: "",
      progressComments: "",
    };
  }

  componentDidMount() {
    this.getdata();
  }

  async getdata() {

    this.setState({
      spinner: true
    });


    let ID1 = await AsyncStorage.getItem('ID1');

    let ip = await AsyncStorage.getItem('ip');

    fetch('http://' + ip + '/api/FYP2Get/GetMidEvaluationByID?id=' + ID1 + '')
      .then(res => res.json())
      .then(users => {

        if (users[0] == undefined) {
          alert("Data not available");
          this.setState({
            spinner: false
          });
        }
        else {
          this.setState({
            title: users[0].ProjectName,
            leaderID: users[0].LeaderID,
            member1ID: users[0].Member1ID,
            member2ID: users[0].Member2ID,
            supervisor: users[0].SuperVisorEmpID,
            cosupervisor: users[0].CoSuperVisorID,
            projectProgress: users[0].ProjectProgress,
            documentationStatus: users[0].DocumentationStatus,
            progressComments: users[0].ProgressComments,
          })
          this.setState({
            spinner: false
          });
        }
      })
      .catch((error) => {
        //Error 
        alert("Error");
        console.error(error);
        this.setState({
          spinner: false
        });
      });

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
    const { leaderID, member1ID, member2ID } = this.state;

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
                Leader ID :
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
                  {leaderID}
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
                Member 1 ID :
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
                  {member1ID}
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
                Member 2 ID :
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
                  {member2ID}
                </Text>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };

  renderAdvisors = () => {
    const { supervisor, cosupervisor } = this.state;

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
                  {supervisor}
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
                  {cosupervisor}
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

  render() {
    return (
      <Block flex center>
        <Spinner
          visible={this.state.spinner}
          textContent={'Gathering Details ...'}
          textStyle={{ color: 'white' }}
        />
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
  button: {
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