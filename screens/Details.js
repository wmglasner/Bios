import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-elements';

import { MonoText } from '../components/StyledText';
const fetch = require("node-fetch");

export default class Details extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {name, scientificName, imageUrl, description} = this.props.navigation.state.params;
        return (
          <View style={styles.container}>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainer}>
              <View style={styles.welcomeContainer}>
                <Image
                  source={{uri: imageUrl}}
                  style={styles.welcomeImage}
                />
              </View>
      
              <View style={styles.getStartedContainer}>
              <Text style={[styles.getStartedText, {color: 'black'}]}>Species Name:</Text>
                    <Text style={styles.getStartedText}>{name}</Text>
                <View
                  style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
                  <Text style={[styles.getStartedText, {fontStyle: 'italic', color:'black'}]}>Scientific Name:</Text>
                  <MonoText>{scientificName}</MonoText>
                </View>

      
                <Text style={[styles.getStartedText, {color: 'black'}]}>Description:</Text>
                <Text style={[styles.getStartedText, {marginBottom:50, fontSize:17, lineHeight:16}]}>
                {description}
      
                </Text>
      
              </View>
      
           
            </ScrollView>
      
            <View style={styles.tabBarInfoContainer}>
      
      
              <View
                style={[styles.codeHighlightContainer, styles.navigationFilename]}>
                <MonoText style={styles.codeHighlightText}>
                  navigation/MainTabNavigator.js
                </MonoText>
              </View>
            </View>
          </View>
        );
                }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    developmentModeText: {
      marginBottom: 20,
      color: 'rgba(0,0,0,0.4)',
      fontSize: 14,
      lineHeight: 19,
      textAlign: 'center',
    },
    contentContainer: {
      paddingTop: 30,
    },
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    welcomeImage: {
      width: 200,
      height: 200,
      resizeMode: 'cover',
      marginTop: 3,
      marginLeft: -10,
      borderRadius:70,
    },
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    homeScreenFilename: {
      marginVertical: 7,
    },
    codeHighlightText: {
      color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 3,
      paddingHorizontal: 4,
    },
    getStartedText: {
      fontSize: 24,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,
      textAlign: 'center',
    },
    tabBarInfoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 20,
        },
      }),
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      paddingVertical: 20,
    },
    tabBarInfoText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      textAlign: 'center',
    },
    navigationFilename: {
      marginTop: 5,
    },
    helpContainer: {
      marginTop: 15,
      alignItems: 'center',
    },
    helpLink: {
      paddingVertical: 15,
    },
    helpLinkText: {
      fontSize: 14,
      color: '#2e78b7',
    },
  });
  