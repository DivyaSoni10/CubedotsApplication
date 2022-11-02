import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import styles from './SignUpStyle';
import COLOR_CONST from '../../theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import * as STRING_CONST from '../../theme/StringConstants';
import scale, { verticalScale } from '../../utils/Scale';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-gesture-handler';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEyeClicked: true,
            isInvalidOtp: false,
            isRemebered: false,
        };
    }

    renderTextInputsContainer = () => {
        return (
            <View style={styles.textInputContaier}>
                <Text style={styles.headingText}>Enrollment Request</Text>
                <View style={[styles.emailView, { borderColor: this.state.isInvalidphoneNo ? 'red' : '#00000040', marginTop: verticalScale(25) }]}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor='#00000070'
                        placeholder="First Name *"
                        onChangeText={(text) => this.setState({ phoneNo: text, isInvalidphoneNo: false })}
                    />
                    {this.state.isInvalidphoneNo ? <View style={styles.errorView} /> : null}
                </View>
                <View style={[styles.emailView, { borderColor: this.state.isInvalidphoneNo ? 'red' : '#00000040' }]}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor='#00000070'
                        placeholder="Last Name *"
                        onChangeText={(text) => this.setState({ phoneNo: text, isInvalidphoneNo: false })}
                    />
                    {this.state.isInvalidphoneNo ? <View style={styles.errorView} /> : null}
                </View>
                <View style={[styles.emailView, { borderColor: this.state.isInvalidphoneNo ? 'red' : '#00000040' }]}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor='#00000070'
                        placeholder="Email *"
                        keyboardType='email-address'
                        onChangeText={(text) => this.setState({ phoneNo: text.toLowerCase(), isInvalidphoneNo: false })}
                    />
                    {this.state.isInvalidphoneNo ? <View style={styles.errorView} /> : null}
                </View>
                <View style={[styles.emailView, { borderColor: this.state.isInvalidphoneNo ? 'red' : '#00000040' }]}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor='#00000070'
                        placeholder="Interested As"
                        onChangeText={(text) => this.setState({ phoneNo: text, isInvalidphoneNo: false })}
                    />
                    {this.state.isInvalidphoneNo ? <View style={styles.errorView} /> : null}
                </View>
                <View style={[styles.emailView, { borderColor: this.state.isInvalidphoneNo ? 'red' : '#00000040' }]}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor='#00000070'
                        placeholder="Select Country *"
                        onChangeText={(text) => this.setState({ phoneNo: text, isInvalidphoneNo: false })}
                    />
                    {this.state.isInvalidphoneNo ? <View style={styles.errorView} /> : null}
                </View>
                <View style={[styles.emailView, { borderColor: this.state.isInvalidphoneNo ? 'red' : '#00000040' }]}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor='#00000070'
                        placeholder="Mobile No. *"
                        keyboardType='numeric'
                        onChangeText={(text) => this.setState({ phoneNo: text, isInvalidphoneNo: false })}
                    />
                    {this.state.isInvalidphoneNo ? <View style={styles.errorView} /> : null}
                </View>
                <View style={[styles.writeMsgView, { borderColor: this.state.isInvalidOtp ? 'red' : '#00000040' }]}>
                    <TextInput
                        style={styles.textInput1}
                        placeholderTextColor='#00000070'
                        placeholder="Write Your Message"
                        secureTextEntry={this.state.isEyeClicked}
                        onChangeText={(text) => this.setState({ otp: text, isInvalidOtp: false })}
                    />
                    {/* <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.setState({ isEyeClicked: !this.state.isEyeClicked })}>
                            <Image source={this.state.isEyeClicked ? IMG_CONST.crossedEye : IMG_CONST.eye} style={styles.eyeIcon} resizeMode="contain" />
                        </TouchableOpacity>
                    </View> */}
                    {this.state.isInvalidOtp ? <View style={styles.errorView} /> : null}
                </View>
            </View>
        );
    }

    renderButtonContainer = () => {
        return (
            <View style={{ alignSelf: 'center' }}>
                <View style={styles.rememberMeView}>
                    <TouchableOpacity>
                        <Image style={styles.rememberMeImage} source={this.state.isRemebered ? IMG_CONST.checked : IMG_CONST.unchecked} resizeMode="contain" />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.tcText}>By clicking the submit button below, I hereby agree to and accept the following terms and conditions policy. <Text style={styles.tAndcImage}>{'Terms & Conditions'}</Text></Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.logintBtn}
                // onPress={() => this.onPressLoginButton()}
                ><Text style={styles.loginBtnText}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps={'always'}>
                    <StatusBar barStyle="dark-content" backgroundColor={'#f1f1f1'} />
                    {this.renderTextInputsContainer()}
                    {this.renderButtonContainer()}
                </KeyboardAwareScrollView>
            </View>
        );
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
        // onLoginUser: (data, successCallBack, failureCallBack) => dispatch(userActions.onLoginUser(data, successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
