import { Text, View, Image, StatusBar } from 'react-native'
import React, { Component } from 'react'
import styles from './SplashStyle';
import * as IMG_CONST from '../../theme/ImageConstants';
import I18n, { changeLaguage } from '../../translations/index.js';
import * as i18next from 'react-native-i18n';
import { FONTS } from '../../theme/ColorConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

export class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    language: 'en'
  }

  async componentDidMount() {
    // changeLaguage('en')
    i18next.getLanguages().then(languages => {
      console.log('@@@ Get Language ========', languages); // ['en-US', 'en']
    });
    let userToken = await AsyncStorage.getItem('USER_TOKEN');
    setTimeout(() => {
      if (!userToken)
        this.props.navigation.replace('Login');
      else
        this.props.navigation.replace('MainStackScreen');
      // this.props.navigation.replace('Login');
      // this.props.navigation.replace('UploadProduct');
    }, 1000);
    // this.props.navigation.replace('Login');
  }

  render() {
    return (
      <View>
        <StatusBar hidden={true} />
        {/* <Text>{I18n.t('greeting')}</Text>
        <Text style={{}}>Splash</Text>
        <TouchableOpacity onPress={() => this.setState({ language: 'en' }, () => I18n.locale = this.state.language)}><Text>Change Lang</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({ language: 'fr' }, () => I18n.locale = this.state.language)}><Text>Change Lang</Text></TouchableOpacity> */}
        <Image source={IMG_CONST.SPLASH_BG} resizeMode='cover' style={styles.bgImage} />
      </View>
    )
  }
}

export default Splash