import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import {Button} from 'react-native-elements';

import firebase, {firebaseConfig} from '../secret.config';
require("firebase/firestore");

const db = firebase.firestore();

export default class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
          species: ["koala", "elephant"],
          images: ["https://content.eol.org/data/media/80/84/6f/542.6121718655.jpg","https://content.eol.org/data/media/80/e2/87/542.6963643892.jpg"],
          triviaList: [["The average koala weighs 50 pounds", "The average koala lives 13-18 years"],
        ["The average elephant weighs up to 13000 pounds", "the average elephant lives for up to 50 years"]],
          speciesIndex: 0,
          triviaIndex:0

        }
    }
    componentWillUpdate() {

    }

    render() {
      const {species, images, triviaList, speciesIndex, triviaIndex} = this.state;
      console.log(images[speciesIndex]);
      let newimg = images[speciesIndex];
        return (
            <View style={[styles.container, {marginTop:40}]}>
<ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
                 <View style={[styles.getStartedContainer, styles.codeHighlightContainer, {marginTop: 50, height:50}]}><Text style={[styles.getStartedText, { marginTop:15, fontSize:25, color:'black'}]}>Species Trivia</Text></View>

                <View style={styles.welcomeContainer}>

            <Image source={{uri: newimg}} style={styles.welcomeImage} />
            </View>

            <View style={styles.getStartedContainer}>
            <Text style={{fontSize: 40}}>{species[speciesIndex]}</Text>
            {console.log("Species index " +speciesIndex + "trivia index " +triviaIndex)}
            <Text>{triviaList[speciesIndex][triviaIndex]}</Text>

            <Button style={{width: 200, margin: 20,}} title={"Next Trivia"} buttonStyle={{backgroundColor: 'green'}} onPress={ () => {
              if(triviaList.length==triviaIndex+1) {
                this.setState({triviaIndex:0})
              }
              else {
                let index = triviaIndex+1;
                this.setState({triviaIndex: index})
              }

            }}/>
            <Button style={{width: 200, margin: 20,}} title={"Next Species"} buttonStyle={{backgroundColor: 'red'}} onPress={ () => {
              if(speciesIndex.length==speciesIndex+1) {
                this.setState({speciesIndex:0, triviaIndex:0})
                this.forceUpdate()
              }
              else {
                let index = speciesIndex+1;
                this.setState({speciesIndex: index})
                this.forceUpdate()
              }
            }} />
            </View>


</ScrollView>
            </View>
          );
    }
  
}

Quiz.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
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
