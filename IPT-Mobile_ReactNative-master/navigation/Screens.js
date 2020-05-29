import React from 'react';
import { Block } from "galio-framework";
import { Easing, Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

// screens

import Register from '../screens/Register';
import Onboarding from '../screens/Onboarding';



//Student
import FYP1_Proposal from '../screens/Student/FYP1/FYP1_Proposal';
import FYP1_Home_Student from '../screens/Student/FYP1/FYP1_Home_Student';
import FYP1_Proposal_View_Student from '../screens/Student/FYP1/FYP1_Proposal_View_Student';
import Student_Home from '../screens/Student/Student_Home';
import FYP2_Home_Student from '../screens/Student/FYP2/FYP2_Home_Student';
import FYP2_Mid_Evaluation_View from '../screens/Student/FYP2/FYP2_Mid_Evaluation_View'
import FYP1_Mid_Evaluation_View from '../screens/Student/FYP1/FYP1_Mid_Evaluation_View'
import FYP2_Final_Evaluation_Internal_View from '../screens/Student/FYP2/FYP2_Final_Evaluation_Internal_View'
import FYP2_Final_Evaluation_External_View from '../screens/Student/FYP2/FYP2_Final_Evaluation_External_View'
import FYP1_FinalEvaluation_View from '../screens/Student/FYP1/FYP1_FinalEvaluation_View';

//Teacher
import Teacher_Home from '../screens/Teacher/Teacher_Home'
import FYP1_ProposalForm_View from '../screens/Teacher/FYP1/FYP1_ProposalForm_View';
import FYP1_Proposal_List from '../screens/Teacher/FYP1/FYP1_Proposal_List';
import FYP1_FinalEvaluation from '../screens/Teacher/FYP1/FYP1_FinalEvaluation';
import FYP2_FinalEvaluation_Internal from '../screens/Teacher/FYP2/FYP2_FinalEvaluation_Internal';
import FYP1_Home_Teacher from '../screens/Teacher/FYP1/FYP1_Home_Teacher';
import FYP2_Home_Teacher from '../screens/Teacher/FYP2/FYP2_Home_Teacher';
import FYP_Groups from '../screens/Teacher/FYP_Groups';
import FYP1_Mid_Evaluation_Add from '../screens/Teacher/FYP1/FYP1_Mid_Evaluation_Add';
import FYP2_MidEvaluation_Add from '../screens/Teacher/FYP2/FYP2_MidEvaluation_Add';

//External
import FYP2_FinalEvaluation_External from '../screens/External/FYP2_FinalEvaluation_External';
import External_Home from '../screens/External/External_Home';


// drawer
import Menu from './Menu';
import DrawerItem from '../components/DrawerItem';

// header for screens
import Header from '../components/Header';

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = 'Search';

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});


const AccountStack = createStackNavigator(
  {
    Account: {
      screen: Register,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header transparent title="Create Account" iconColor={'#333'} navigation={navigation} />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: { backgroundColor: '#FFFFFF' },
    transitionConfig
  }
);

const StudentFYP1Stack = createStackNavigator(
  {
    Student_Home: {
      screen: Student_Home,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="Student Home" navigation={navigation} />
      })
    },
    FYP1_Home_Student: {
      screen: FYP1_Home_Student,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="FYP 1 Home" navigation={navigation} />
      })
    },
    FYP1_Proposal: {
      screen: FYP1_Proposal,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="FYP 1 Proposal" navigation={navigation} />
      })
    },
    FYP1_Proposal_View_Student: {
      screen: FYP1_Proposal_View_Student,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="FYP 1 Proposal Form" navigation={navigation} />
      })
    },
    FYP1_Mid_Evaluation_View: {
      screen: FYP1_Mid_Evaluation_View,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="FYP 1 Mid Evaluation Form" navigation={navigation} />
      })
    },
    FYP1_FinalEvaluation_View: {
      screen: FYP1_FinalEvaluation_View,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="FYP1 Final Evaluation" navigation={navigation} />
      })
    },


  },
  {
    cardStyle: {
      backgroundColor: '#FFFFFF'
    },
    transitionConfig
  }
);

const StudentFYP2Stack = createStackNavigator(
  {
    Student_Home: {
      screen: Student_Home,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="Student Home" navigation={navigation} />
      })
    },
    FYP2_Home_Student: {
      screen: FYP2_Home_Student,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="FYP 2 Home" navigation={navigation} />
      })
    },
    FYP2_Mid_Evaluation_View: {
      screen: FYP2_Mid_Evaluation_View,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="FYP 2 Mid Evaluation View" navigation={navigation} />
      })
    },
    FYP2_Final_Evaluation_External_View: {
      screen: FYP2_Final_Evaluation_External_View,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="FYP 2 Final Evaluation External Jury View" navigation={navigation} />
      })
    },
    FYP2_Final_Evaluation_Internal_View: {
      screen: FYP2_Final_Evaluation_Internal_View,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="FYP 2 Final Evaluation Internal Jury View" navigation={navigation} />
      })
    },
  },
  {
    cardStyle: {
      backgroundColor: '#FFFFFF'
    },
    transitionConfig
  }
);

const TeacherFYP1Stack = createStackNavigator(
  {
    Teacher_Home: {
      screen: Teacher_Home,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="Teacher Home" navigation={navigation} />
      })
    },
    FYP1_Home_Teacher: {
      screen: FYP1_Home_Teacher,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="FYP 1 Teacher Home" navigation={navigation} />
      })
    },
    FYP1_Proposal_List: {
      screen: FYP1_Proposal_List,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="FYP 1 Proposal List" navigation={navigation} />
      })
    },
    FYP1_ProposalForm_View: {
      screen: FYP1_ProposalForm_View,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="FYP 1 Proposal Form View" navigation={navigation} />
      })
    },
    FYP1_FinalEvaluation: {
      screen: FYP1_FinalEvaluation,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="FYP 1 Final Evaluation" navigation={navigation} />
      })
    },
    FYP1_Mid_Evaluation_Add: {
      screen: FYP1_Mid_Evaluation_Add,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="FYP1 Mid Evaluation" navigation={navigation} />
      })
    },

  },
  {
    cardStyle: {
      backgroundColor: '#FFFFFF'
    },
    transitionConfig
  }
);

const TeacherFYP2Stack = createStackNavigator(
  {
    Teacher_Home: {
      screen: Teacher_Home,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="Teacher Home" navigation={navigation} />
      })
    },
    FYP2_Home_Teacher: {
      screen: FYP2_Home_Teacher,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="FYP 2 Teacher Home" navigation={navigation} />
      })
    },
    FYP2_MidEvaluation_Add: {
      screen: FYP2_MidEvaluation_Add,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="FYP2 Mid Evaluation" navigation={navigation} />
      })
    },
    FYP2_FinalEvaluation_Internal: {
      screen: FYP2_FinalEvaluation_Internal,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="FYP 2 Final Evaluation" navigation={navigation} />
      })
    },
  },
  {
    cardStyle: {
      backgroundColor: '#FFFFFF'
    },
    transitionConfig
  }
);

const TeacherGroupStack = createStackNavigator(
  {
    Teacher_Home: {
      screen: Teacher_Home,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="Teacher Home" navigation={navigation} />
      })
    },
    FYP_Groups: {
      screen: FYP_Groups,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="FYP Groups" navigation={navigation} />
      })
    },

  },
  {
    cardStyle: {
      backgroundColor: '#FFFFFF'
    },
    transitionConfig
  }
);



const ExternalStack = createStackNavigator(
  {
    External_Home: {
      screen: External_Home,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="FYP 2 Final Evaluation External" navigation={navigation} />
      })
    },
    FYP2_FinalEvaluation_External: {
      screen: FYP2_FinalEvaluation_External,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="FYP 2 Final Evaluation External" navigation={navigation} />
      })
    },
  },
  {
    cardStyle: {
      backgroundColor: '#FFFFFF'
    },
    transitionConfig
  }
);

const AppStack = createDrawerNavigator(
  {
    Onboarding: {
      screen: Onboarding,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },

    StudentFYP1Stack: {
      screen: StudentFYP1Stack,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },

    StudentFYP2Stack: {
      screen: StudentFYP2Stack,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },

    TeacherFYP1Stack: {
      screen: TeacherFYP1Stack,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },


    TeacherFYP2Stack: {
      screen: TeacherFYP2Stack,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },

    TeacherGroupStack: {
      screen: TeacherGroupStack,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },

    ExternalStack: {
      screen: ExternalStack,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },

    Account: {
      screen: AccountStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Register" title="Account" />
        )
      })
    }
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
