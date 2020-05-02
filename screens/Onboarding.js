import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants/';
import { Icon, Input} from '../components';
import { AsyncStorage } from 'react-native';
import {

  TouchableHighlight,

} from 'react-native';

export default class Onboarding extends React.Component {
  state = {
    email: '',
    password: '',
  };

  componentDidMount(){
    AsyncStorage.setItem('ip', '192.168.0.102');
  }

  async onLogin() {
    // const { email, password } = this.state;
    // let ip = await AsyncStorage.getItem('ip');
    // await fetch('http://'+ip+':3006/userlogin?Email=' + email + '&Password=' + password + '')
    //   .then(res => res.json())
    //   .then(users => {
    //     if (users == 0) {
    //       alert("invalid credentials");
    //     }
    //     else {
    //       console.warn(users[0]);
    //       if (users[0].Role == "Student") {
    //         AsyncStorage.setItem('email', email);
            // AsyncStorage.setItem('ID', 163942);
            // this.props.navigation.navigate('Student_Home');
  //         }
  //         else if (users[0].Role == "Teacher") {
  //           AsyncStorage.setItem('email',email);
  //           AsyncStorage.setItem('name', users[0].Name);
  AsyncStorage.setItem('ID', 123);
            this.props.navigation.navigate('Teacher_Home');
  //         }
  //         else {
  //           AsyncStorage.setItem('email', email);
  //           AsyncStorage.setItem('name', users[0].Name);
  
  //           this.props.navigation.navigate('External_Home');
  //         }
  //       }
  //     })
  }

  handleSubmitSignup = () => {
    this.props.navigation.navigate('Account');
  }

  render() {

    return (
      <Block style={styles.container}>
        <ImageBackground
          source={Images.Onboarding}
          style={styles.background}
        >
          <Block style={{ flex: 0.33, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text
              h3
              style={{
                fontFamily: 'montserrat-regular',
                marginBottom: theme.SIZES.BASE / 2
              }}
              color={nowTheme.COLORS.WHITE}
            >
              FAST NUCES, Karachi
            </Text>
          </Block>

          <Block style={{ flex: 0.33, marginTop: theme.SIZES.BASE, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Input
              right
              placeholder="  Email"
              shadowless
              style={{ width: width / 1.5 }}
              iconContent={
                <Icon size={11} color={nowTheme.COLORS.ICON} name="email-852x" family="NowExtra" />
              }
              onChangeText={(email) => this.setState({ email })}
            />
            <Input
              right
              placeholder="  Password"
              shadowless
              style={{ width: width / 1.5 }}
              iconContent={
                <Icon size={11} color={nowTheme.COLORS.ICON} name="lock-circle-open2x" family="NowExtra" />
              }
              onChangeText={(password) => this.setState({ password })}
            />
            <TouchableHighlight style={styles.buttonContainer} onPress={this.handleSubmitSignup}>
              <Text color="white" size={16} style={{ fontFamily: 'montserrat-regular' }, styles.underline}>Create New Account</Text>
            </TouchableHighlight>
          </Block>



          <Block style={{ flex: 0.33, flexDirection: 'row', marginTop: theme.SIZES.BASE, justifyContent: 'center', alignItems: 'center' }}>
            <Button
              shadowless
              style={styles.button}
              color={nowTheme.COLORS.PRIMARY}
              onPress={this.onLogin.bind(this)}
            >
              <Text
                style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                color={theme.COLORS.WHITE}
              >
                SIGN IN
              </Text>
            </Button>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: width,
    height: height,
  },
  padded: {
    flex: 1,
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66
  }
});
