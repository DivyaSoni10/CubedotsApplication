import { View, Text, Modal, TouchableOpacity, Image, StatusBar, TextInput } from 'react-native';
import React, { Component } from 'react'
import styles from './ForgotPasswordStyle';
import scale, { verticalScale } from '../../utils/Scale';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DeviceInfo from 'react-native-device-info';

export class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEyeClicked: true,
        };
    }

    onPressForgotPass = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let deviceId= DeviceInfo.getDeviceId();
        if (!reg.test(this.state.phoneNo)) {
            this.setState({ isInvalidphoneNo: true }, alert('Please enter a valid email id'))
            return
        }
        let data = {};
        data['email'] = this.state.phoneNo;
        data['device_id']= deviceId
        this.props.onForgotPassword(data, (res) => this.onForgotPasswordSuccessCallBack(res), (err) => this.onForgotPasswordFailureCallBack(err))
    }

    onForgotPasswordSuccessCallBack = async (res) => {
        // console.log('@@@ Forgot Success CallBack ===================', res);
        alert(res.data.message)
        this.onTrigger(false)
        this.props.navigation.replace("MainStackScreen")
    }

    onForgotPasswordFailureCallBack = (error) => {
        if (error) {
            setTimeout(() => {
                this.setState({ errorMessage: error }, () => {
                    // console.log('@@@ Forgot Failure CallBack ===================', error);
                    this.props.showErrorModal(error);
                });
            }, 0);
            this.onTrigger(false)
        } else {
            setTimeout(() => {
                this.setState({ errorMessage: 'Network Error!' }, () => {
                    // console.log('@@@ SignUp Failure CallBack Network Error ===================');
                    this.props.showErrorModal('Network Error!');
                });
            }, 0);
        }
    }

    onTrigger = (event) => {
        this.props.updateState(event);
    }

    renderTextInputsContainer = () => {
        return (
            <View style={styles.textInputContaier}>
                <View style={[styles.emailView, { borderColor: this.state.isInvalidphoneNo ? 'red' : '#00000040' }]}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor='#00000070'
                        placeholder="Email Address"
                        keyboardType='email-address'
                        autoCapitalize={'none'}
                        onChangeText={(text) => this.setState({ phoneNo: text.toLowerCase(), isInvalidphoneNo: false })}
                    />
                    {this.state.isInvalidphoneNo ? <View style={styles.errorView} /> : null}
                </View>
            </View>
        );
    }

    renderButtonContainer = () => {
        return (
            <TouchableOpacity style={styles.logintBtn}
                onPress={() => this.onPressForgotPass()}
            >
                <Text style={styles.loginBtnText}>Submit</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps={'always'}>
                    <StatusBar barStyle="dark-content" hidden={true} />
                    <Text style={styles.headingText}>Forgot Password</Text>
                    <Text style={styles.subheadText}>Please enter the email address registered with Cubedots</Text>
                    {this.renderTextInputsContainer()}
                    {this.renderButtonContainer()}
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showErrorModal: (message, isShowError) => dispatch(commonActions.showErrorModal(message, isShowError)),
        hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
        onForgotPassword: (data, successCallBack, failureCallBack) => dispatch(userActions.onForgotPassword(data, successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);