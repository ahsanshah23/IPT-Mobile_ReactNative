import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { View } from 'react-native';


class FYP2_Home_Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ButtonStateHolder: false,
      name: "",
    };
  }

  


  render() {

    return (
      <Block>
        <ScrollView>

          <TouchableOpacity style={[styles.card, { backgroundColor: '#008080' }]} onPress={() => { this.props.navigation.navigate("FYP2_Mid_Evaluation_View"); }}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>Mid Evaluation Form</Text>
              <Image style={styles.icon} source={{ uri: "https://img.icons8.com/ios/40/000000/settings.png" }} />
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.subTitle}>FYP 2</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, { backgroundColor: '#008080' }]} onPress={() => { this.props.navigation.navigate("FYP2_Final_Evaluation_Internal_View"); }}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>Final Evaluation Internal Form</Text>
              <Image style={styles.icon} source={{ uri: "https://img.icons8.com/ios/40/000000/settings.png" }} />
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.subTitle}>FYP 2</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, { backgroundColor: '#008080' }]} onPress={() => { this.props.navigation.navigate("FYP2_Final_Evaluation_External_View"); }}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>Final Evaluation External Form</Text>
              <Image style={styles.icon} source={{ uri: "https://img.icons8.com/ios/40/000000/settings.png" }} />
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.subTitle}>FYP 2</Text>
            </View>
          </TouchableOpacity>


        </ScrollView>
      </Block>

    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 2,
    marginVertical: 2,
    flexBasis: '48%',
    marginTop: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  icon: {
    height: 20,
    width: 20,
  },
  title: {
    fontFamily: 'montserrat-regular',
    fontSize: 20,
    flex: 1,
    color: "#FFFFFF",
    fontWeight: '500'
  },
  subTitle: {
    fontFamily: 'montserrat-regular',
    fontSize: 16,
    flex: 1,
    color: "#FFFFFF",
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
});


export default FYP2_Home_Student;
