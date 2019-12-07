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
import firebase, {firebaseConfig} from '../secret.config';
import { italic } from 'ansi-colors';
require("firebase/firestore");

const db = firebase.firestore();



export default class DailyScreen extends React.Component {
  constructor(props) {
    super()
    this.state ={
      tracked: null,
      name: null,
      identifier:null,
      scientificName:null,
      imageUrl:null,
      description: null

    }

  }

  componentDidMount () {
    let selection = ['1700', '1174377','491995', '620727','311544', '597357', '1195786', '1644', '46554113']
    var randomIndex = Math.floor(Math.random() * selection.length); 
    var randomElement = selection[randomIndex];
    
    fetch('https://eol.org/api/pages/1.0/'+randomElement+'.json?details=true&images_per_page=1&common_names=true&texts_per_page=30')
    .then(response => response.json())
    .then( 
      (data) => {
        let name = "No Vernacular Name found"
        if (data.taxonConcept.vernacularNames !== undefined) {
          let nameObj = data.taxonConcept.vernacularNames.find(obj => obj.language == "en");
          if(nameObj !== undefined) {
            name = nameObj.vernacularName
            // console.log(name);
          }
        }
        let id = data.taxonConcept.identifier;
        let sciName = data.taxonConcept.scientificName;
        let image = "https://cdn5.vectorstock.com/i/1000x1000/26/19/yellow-sad-face-vector-5292619.jpg";
        let description = "No English Description Found";
        if(data.taxonConcept.dataObjects !== undefined) {
          let imageOb = data.taxonConcept.dataObjects.find(obj => obj.mediumType == "image")
          if (imageOb !==undefined) {
            image= imageOb.eolMediaURL
          }
          let descriptionOb = data.taxonConcept.dataObjects.find(obj => obj.dataType == "http://purl.org/dc/dcmitype/Text" && obj.language == "en")
          if (descriptionOb !== undefined) {
            description = descriptionOb.description
            description = description.replace(/<\/?[^>]+(>|$)/g, ""); 
            // console.log(description);       
          }
        }
        this.setState({ 
          name: name,
          identifier: id,
          scientificName:sciName,
          imageUrl: image,
          description: description
        })
    })
    let tracked = this.state.tracked;
    let docRef = db.collection("tracked").doc(randomElement);
    var self=this;
    docRef.get()
    .then(function(doc) {
      if (doc.exists) {
        tracked = doc.exists;
        // console.log(tracked);
          // console.log("Document data:", doc.data());
      } else {
        tracked = doc.exists;
          // doc.data() will be undefined in this case
          // console.log("No such document!");
      }
      self.setState({tracked:tracked})
    }).catch(function(error) {
      // console.log("Error getting document:", error);
    });
    // this.setState({tracked: tracked})
  }

  componentWillMount() {

    if(this.unsubscribeTracked) {
      //unsubscribe listeners to prevent mem leaks
      this.unsubscribeTracked();
    }
  }
  
  
  render() {
    const {name, scientificName, imageUrl, description, tracked} = this.state;
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
                <View style={[styles.getStartedContainer, styles.codeHighlightContainer, {marginTop: 50, height:50}]}><Text style={[styles.getStartedText, { marginTop:15, fontSize:25, color:'black'}]}>Species of the Day</Text></View>

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
          <Button style={{width: 200, margin: 20,}} title={tracked ? "Untrack" : "Track"} buttonStyle={{backgroundColor: tracked ? 'red' : 'green'}} onPress={() => {
    let id = this.state.identifier;
    let stateObj = {
      eol_id: this.state.identifier,
      name: this.state.name,
      scientificName:this.state.scientificName,
      imageUrl:this.state.imageUrl,
      description: this.state.description
    }

    // console.log(tracked);
    if(tracked) {
      db.collection('tracked').doc(id.toString()).delete();
    }
    else {
      db.collection('tracked').doc(id.toString()).set(stateObj);
    }
    this.setState({
      tracked: !tracked
    })
  }}/>

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

DailyScreen.navigationOptions = {
  header: null,
};



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
