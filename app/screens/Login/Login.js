import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import styles from './LoginStyle';
import COLOR_CONST from '../../theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import * as STRING_CONST from '../../theme/StringConstants';
import scale, { verticalScale } from '../../utils/Scale';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import DeviceInfo from 'react-native-device-info';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEyeClicked: true,
            isInvalidphoneNo: false,
            isInvalidOtp: false,
            isRemebered: false,
            showForgotModal: false,
            email: '',
            password: ''
        };
    }

    async componentDidMount() {
        let isRemember = await AsyncStorage.getItem('IS_REMEMBER_USER');
        if (isRemember === 'true') {
            let email = await AsyncStorage.getItem('USER_EMAIL');
            let pass = await AsyncStorage.getItem('USER_PASSWORD');
            // console.log('@@@ Login Success if ===================', pass, email, isRemember);
            this.setState({ email: email, password: pass, isRemebered: false })
        }
    }

    onPressLoginButton = async () => {
        let deviceId= DeviceInfo.getDeviceId();
        this.setState({ email: this.state.email.toLowerCase() })
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!reg.test(this.state.email)) {
            this.setState({ isInvalidphoneNo: true }, alert('Please enter a valid Email id'))
            return
        } else if (this.state.password.trim().length < 4) {
            this.setState({ isInvalidOtp: true }, alert('Please enter a valid Password'))
            return
        }
        let data = new FormData()
        data.append("email", this.state.email)
        data.append("password", this.state.password)
        data.append("rememberMe", this.state.isRemebered)
        data.append("device_id", deviceId)
        // this.props.onLoginUser(data, (res) => this.onLoginUserSuccessCallBack(res), (err) => this.onLoginUserFailureCallBack(err))
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: data
        };
        // console.log("@@@ Login = Callback========", requestOptions)
        fetch('https://portal.cubedots.com/api/v1/auth', requestOptions)
            .then((response) => response.json())
            .then(async (json) => {
                // console.log("@@@ Login Callback========", json)
                if (!json.status) {
                    alert(JSON.stringify(json.errors))
                }
                else {
                    // console.log('@@@ Login Success CallBack ===================', json);
                    let userData = json.data;
                    let userRes = json.data.user
                    let cName = json.data.user.company_name != null ? json.data.user.company_name : ''
                    let phone = json.data.user.phone != null ? json.data.user.phone : ''
                    let last_login = json.data.user.last_login != null ? json.data.user.last_login : ''
                    await AsyncStorage.setItem('USER_TOKEN', userData.token);
                    await AsyncStorage.setItem('USER_NAME', userRes.name);
                    await AsyncStorage.setItem('USER_EMAIL', userRes.email);
                    await AsyncStorage.setItem('USER_PASSWORD', this.state.password);
                    await AsyncStorage.setItem('USER_COMPANY', cName);
                    await AsyncStorage.setItem('USER_PHONE', phone);
                    await AsyncStorage.setItem('USER_LAST_LOGGEDIN', last_login);
                    if (this.state.isRemebered) {
                        await AsyncStorage.setItem('IS_REMEMBER_USER', 'true');
                    } else await AsyncStorage.setItem('IS_REMEMBER_USER', '');
                    this.setState({ email: '', password: '' }, () => alert('You have been Logged In Successfully'));
                    this.props.navigation.replace("MainStackScreen");
                }
            })
            .catch((error) => {
                alert("Something went wrong, could not send enquiry request.")
                // console.log("@@@ Login Failure Callback========", error)
            });
    }

    onLoginUserSuccessCallBack = async (res) => {
        // console.log('@@@ Login Success CallBack ===================', res);
        let userData = res.data.data;
        let userRes = res.data.data.user
        let cName = res.data.data.user.company_name != null ? res.data.data.user.company_name : ''
        let phone = res.data.data.user.phone != null ? res.data.data.user.phone : ''
        let last_login = res.data.data.user.last_login != null ? res.data.data.user.last_login : ''
        await AsyncStorage.setItem('USER_TOKEN', userData.token);
        await AsyncStorage.setItem('USER_NAME', userRes.name);
        await AsyncStorage.setItem('USER_EMAIL', userRes.email);
        await AsyncStorage.setItem('USER_PASSWORD', this.state.password);
        await AsyncStorage.setItem('USER_COMPANY', cName);
        await AsyncStorage.setItem('USER_PHONE', phone);
        await AsyncStorage.setItem('USER_LAST_LOGGEDIN', last_login);
        if (this.state.isRemebered) {
            await AsyncStorage.setItem('IS_REMEMBER_USER', 'true');
        } else await AsyncStorage.setItem('IS_REMEMBER_USER', '');
        this.setState({ email: '', password: '' }, () => alert('You have been Logged In Successfully'));
        this.props.navigation.replace("MainStackScreen");
    }

    onLoginUserFailureCallBack = (error) => {
        if (error) {
            // console.log('@@@ Login Failure CallBack ===================', error);
            alert(error.message === 'Request failed with status code 422' ? 'Unauthorised' : 'Something went wrong');
        } else {
            // console.log('@@@ Login Failure CallBack Network Error ===================', error);
            alert('Network Error!');
        }
    }

    renderTextInputsContainer = () => {
        return (
            <View style={styles.textInputContaier}>
                <Text style={styles.headingText}>Sign In</Text>
                <Text style={styles.subheadText}>Welcome back to Cubedots</Text>
                <View style={[styles.emailView, { borderColor: this.state.isInvalidphoneNo ? 'red' : '#00000040' }]}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor='#00000070'
                        value={this.state.email}
                        placeholder="Email Address"
                        keyboardType='email-address'
                        autoCapitalize={'none'}
                        onChangeText={(text) => this.setState({ email: text, isInvalidphoneNo: false })}
                    />
                    {this.state.isInvalidphoneNo ? <View style={styles.errorView} /> : null}
                </View>
                <View style={[styles.passView, { borderColor: this.state.isInvalidOtp ? 'red' : '#00000040' }]}>
                    <TextInput
                        style={styles.textInput1}
                        placeholderTextColor='#00000070'
                        placeholder="Password"
                        value={this.state.password}
                        secureTextEntry={this.state.isEyeClicked}
                        onChangeText={(text) => this.setState({ password: text, isInvalidOtp: false })}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.setState({ isEyeClicked: !this.state.isEyeClicked })}>
                            <Image source={this.state.isEyeClicked ? IMG_CONST.crossedEye : IMG_CONST.eye} style={styles.eyeIcon} resizeMode="contain" />
                        </TouchableOpacity>
                        {this.state.isInvalidOtp ? <View style={styles.errorView} /> : null}
                    </View>
                </View>
            </View>
        );
    }

    renderButtonContainer = () => {
        return (
            <View style={{ alignSelf: 'center' }}>
                <View style={styles.rememberMeView}>
                    <TouchableOpacity onPress={() => this.setState({ isRemebered: !this.state.isRemebered })}>
                        <Image style={styles.rememberMeImage} source={this.state.isRemebered ? IMG_CONST.checked : IMG_CONST.unchecked} resizeMode="contain" />
                    </TouchableOpacity>
                    <Text style={styles.rememberMeText}>Remember me</Text>
                </View>
                <TouchableOpacity style={styles.logintBtn}
                    onPress={() => this.onPressLoginButton()}
                // onPress={() => this.onPressLoginButton()}
                >
                    <Text style={styles.loginBtnText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ showForgotModal: true })} style={styles.forgetPass}>
                    <Text style={[styles.haveAccountLink, { textDecorationLine: 'underline' }]}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderForgotContainer = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showForgotModal}
                onRequestClose={() => {
                    this.setState({ showForgotModal: false })
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.transparentBg} />
                    <View style={styles.bottomView}>
                        <TouchableOpacity onPress={() => this.setState({ showForgotModal: false })}>
                            <Image
                                source={IMG_CONST.modalCross}
                                style={styles.crossIcon}
                            />
                        </TouchableOpacity>
                        <ForgotPassword updateState={(n) => this.setState({ showForgotModal: n })} />
                    </View>
                </View>
            </Modal>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps={'always'}>
                    <StatusBar barStyle="dark-content" backgroundColor={'#f1f1f1'} />
                    {this.renderTextInputsContainer()}
                    {this.renderButtonContainer()}
                    {/* <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 100, alignSelf: 'center' }}>
                        <Text style={styles.haveAccountLink}>Not yet a memeber of Cubedots</Text>
                        <TouchableOpacity onPress={() => { }} style={{ alignSelf: 'center' }}>
                            <Text style={[styles.haveAccountLink, { textDecorationLine: 'underline' }]}>Become Our Partner</Text>
                        </TouchableOpacity>
                    </View> */}
                    {this.state.showForgotModal && this.renderForgotContainer()}
                    {/* <Iframe
                        width="600"
                        height="450"
                        style="border:0"
                        loading="lazy"
                        allowfullscreen
                        referrerpolicy="no-referrer-when-downgrade"
                        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBYSxhef19jGAdA632PQFUCyBtDkZ7OVk4
    &q=Space+Needle,Seattle+WA">
                    </Iframe> */}
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
        onLoginUser: (data, successCallBack, failureCallBack) => dispatch(userActions.onLoginUser(data, successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
