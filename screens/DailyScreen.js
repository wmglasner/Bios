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

import { MonoText } from '../components/StyledText';
const fetch = require("node-fetch");
import firebase from 'firebase/app';
import {firebaseConfig} from '../secret.config';
require("firebase/firestore");

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default class DailyScreen extends React.Component {
  constructor(props) {
    super()
    this.state ={
      tracked: false,
      name: null,
      identifier:null,
      scientificName:null,
      imageUrl:null,
      description: null

    }
  }


  componentDidMount () {
    fetch('https://eol.org/api/pages/1.0/491995.json?details=true&images_per_page=1&common_names=true&texts_per_page=10')
    .then(response => response.json())
    .then( 
      (data) => {
        let nameObj = data.taxonConcept.vernacularNames.find(obj => obj.language == 'en').vernacularName;
        console.log(nameObj);
        let id = data.taxonConcept.identifier;
        let sciName = data.taxonConcept.scientificName;
        let image = "https://cdn5.vectorstock.com/i/1000x1000/26/19/yellow-sad-face-vector-5292619.jpg"
        let description = "No English Description Found"
        if(data.taxonConcept.dataObjects !== undefined) {
          // image = data.taxonConcept.dataObjects[0].eolMediaURL
          let imageOb = data.taxonConcept.dataObjects.find(obj => obj.mediumType == "image")
          if (imageOb.eolMediaURL !==undefined) {
            image= imageOb.eolMediaURL
          }
          
          let descriptionOb = data.taxonConcept.dataObjects.find(obj => obj.dataType == "http://purl.org/dc/dcmitype/Text" && obj.language == "en")
          if (descriptionOb !== undefined) {
            description = descriptionOb.description
            description = description.replace(/<\/?[^>]+(>|$)/g, "");

            
          }


        }

        
        this.setState({ tracked: true,
          name: nameObj,
          identifier: id,
          scientificName:sciName,
          imageUrl: image,
          description: description
        })
        
    })

  }

  componentWillMount() {

    if(this.unsubscribeTracked) {
      //unsubscribe listeners to prevent mem leaks
      this.unsubscribeTracked();
    }
  }
  checkTracked() {
    db.collection("tracked").doc(this.state.id).get()
    .then(snapshot => {
      if (snapshot.exists){
        this.setState({
          tracked: true,
        });
      }
    })
  }



  removeItemFromList = (event) => {
    event.stopPropagation();

    db.collection("tracked")
      .doc(this.state.id)
      .delete();
  };

  onClick = () => {
    this.setState({})
  }
  
  
  render() {
    const {name, scientificName, imageUrl, description, tracked} = this.state;
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={{
              uri: imageUrl            }}
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
        <Text>Name</Text>
              <Text style={styles.getStartedText}>{name}</Text>
          <View
            style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <Text>Scientific Name</Text>
            <MonoText>{scientificName}</MonoText>
          </View>

          <Text>Description</Text>
          <Text style={styles.getStartedText}>
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

DailyScreen.navigationOptions = {
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
    resizeMode: 'contain',
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
    fontSize: 17,
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
