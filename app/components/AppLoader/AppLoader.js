import React, { Component } from 'react'
import { View, StyleSheet, Text, ActivityIndicator, Platform } from 'react-native';
import COLOR_CONST, { FONTS } from '../../theme/ColorConstants';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from "react-redux";
import styles from './AppLoaderStyle';

class ApplicationLoader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
        }
    }

    render() {
        if (!this.props.isFetching) {
            return null;
          } else {
            return (
                <View style={styles.container}>
                    {Platform.OS === 'ios' ? <ActivityIndicator size="large" color={COLOR_CONST.black} /> :
                    <Spinner
                        cancelable
                        color={COLOR_CONST.primaryThemeGradient}
                        visible={this.state.isLoading}
                        textStyle={{ color: '#fff' }}
                    />}
                </View>
        )}       
    }
}

function mapStateToProps(state) {
  return {
    isFetching: state.common.isFetching,
  };
}

export default connect(mapStateToProps)(ApplicationLoader);