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
  List,
  ListItem
} from 'react-native';
import {Button} from 'react-native-elements';
import TrackedItem from './TrackedItem';

import { MonoText } from '../components/StyledText';
const fetch = require("node-fetch");
import firebase, {firebaseConfig} from '../secret.config';
require("firebase/firestore");

const db = firebase.firestore();


export default class TrackedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracked: [],
      dataReceived: false
    }
  }
  
  componentDidMount() {
    var self=this;
    console.log(Array.isArray(this.state.tracked));
    var collectionRef = db.collection("tracked");
    this.unsubscribeTracked = collectionRef.onSnapshot((querySnapshot) => {
      let tracked=this.state.tracked;
      console.log("Tracking initial" + typeof tracked);
      querySnapshot.forEach((snapshot) => {
        let snapObj ={...snapshot.data(), id: snapshot.id};
        if(!tracked.some(item => item.id === snapObj.id)) {
          tracked.push({
            ...snapshot.data(),
            id: snapshot.id
          });
          console.log("Tracking pushed" + tracked);
        }


      });
      
      console.log("Tracked items to be set" + tracked);
      self.setState({tracked: tracked, dataReceived: true});

    });
  }
  componentWillMount() {


    if(this.unsubscribeTracked) {
      //unsubscribe listeners to prevent mem leaks
      this.unsubscribeTracked();
    }

  }
  componentWillUpdate() {

  }
  
  showTrackedDetail = (tracked) => {
    this.props.navigation.navigate('Details', {...tracked});
  }
  render() {
  const {tracked, dataReceived} = this.state;
  // console.log(trackedList);
  console.log(Array.isArray(tracked));
  if(dataReceived) {

  
  return (
    <View style={styles.container}>

      <ScrollView>
      <View style={[styles.getStartedContainer, styles.codeHighlightContainer, {marginTop: 50, height:50}]}><Text style={[styles.getStartedText, { marginTop:15, fontSize:25, color:'black'}]}>Tracked Species</Text></View>
        <View >
          {tracked.map((species, idx) => (
            <Button style={{margin:20}} key={idx} title={species.name + "\n " + species.scientificName} onPress={() => this.showTrackedDetail(species)} />
          ))}
      </View>
      </ScrollView>
      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>
          This is a tab bar. You can edit it in:
        </Text>
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
else {
  return (
    <View><Text>Awaiting Data</Text><Button title={"Check Data"} onPress={()=> {
      if(this.state.dataReceived){
        this.forceUpdate();
        console.log(this.state.tracked);
      }
    }}></Button></View>
  );
}
}
}

TrackedScreen.navigationOptions = {
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
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
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
