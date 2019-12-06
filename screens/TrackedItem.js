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

import { MonoText } from '../components/StyledText';
const fetch = require("node-fetch");

const trackedItem = props => {
    return (
<ListItem
key={props.eol_id}
roundAvatar
avatar={{ uri: props.imageUrl }}
title={`${props.name.toUpperCase()}`}
subtitle={props.scientificName}
onPress={() => props.showTrackedDetail(props.species)}
/>
    );
};
export default trackedItem;