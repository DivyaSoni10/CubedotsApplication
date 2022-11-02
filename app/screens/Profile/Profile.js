import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, TextInput, Modal, DevSettings, NativeModules } from 'react-native';
import styles from './ProfileStyle';
import COLOR_CONST from '../../theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import * as STRING_CONST from '../../theme/StringConstants';
import scale, { verticalScale } from '../../utils/Scale';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DeviceInfo from 'react-native-device-info';

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            company: '',
            phone: '',
            showChangePassModal: false,
            pass: '',
            newPass: '',
            conPass: '',
            isInvalidPass: false,
            isInvalidNewPass: false,
            isInvalidConPass: false
        };
    }

    componentDidMount = async () => {
        let nam = await AsyncStorage.getItem("USER_NAME")
        let eml = await AsyncStorage.getItem("USER_EMAIL")
        let comp = await AsyncStorage.getItem("USER_COMPANY")
        let phn = await AsyncStorage.getItem("USER_PHONE")
        this.setState({ name: nam, email: eml, company: comp, phone: phn })
    }

    onPressSubmitButton = async () => {
        if (this.state.newPass.trim().length < 8) {
            this.setState({ isInvalidNewPass: true }, () => alert('Please enter atleast 8 digits'))
            return
        } else if (this.state.conPass.trim().length < 8) {
            this.setState({ isInvalidConPass: true })
            return
        } else if (this.state.newPass !== this.state.conPass) {
            this.setState({ isInvalidNewPass: true, isInvalidConPass: true })
            return
        }
        // let data = {}
        // data["old_password"] = this.state.pass;
        // data["password"] = this.state.newPass
        // data["password_confirmation"] = this.state.conPass
        // this.props.changePassword(data, (res) => this.changePasswordSuccessCallBack(res), (err) => this.changePasswordFailureCallBack(err))
        let token = await AsyncStorage.getItem('USER_TOKEN')
        let deviceId = DeviceInfo.getDeviceId();
        let dta = {
            "old_password": this.state.pass,
            "password": this.state.newPass,
            "password_confirmation": this.state.conPass,
            "device_id": deviceId
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(dta)
        };
        // console.log("@@@ Update Password = Callback========", requestOptions)
        fetch('https://portal.cubedots.com/api/v1/auth/updatePassword', requestOptions)
            .then((response) => response.json())
            .then(async (json) => {
                // console.log("@@@ Update Password Success Callback========", json)
                if (!json.status) {
                    this.setState({ showChangePassModal: false })
                    alert(JSON.stringify(json.errors.password))
                }
                else {
                    alert(JSON.stringify(json.message))
                    this.setState({ showChangePassModal: false, isInvalidNewPass: false })
                    await AsyncStorage.removeItem('USER_TOKEN');
                    NativeModules.DevSettings.reload()
                }
            })
            .catch((error) => {
                alert("Something went wrong, could not change password.")
                this.setState({ showChangePassModal: false })
                // console.log("@@@ Update Password Failure Callback========", error)
            });
    }

    changePasswordSuccessCallBack = async (res) => {
        // console.log('@@@ Update Password Success CallBack ===================', res);
        await AsyncStorage.removeItem('USER_TOKEN');
        alert(res.data.message)
        this.setState({ showChangePassModal: false }, () => DevSettings.reload())
    }

    changePasswordFailureCallBack = (error) => {
        if (error) {
            this.setState({ showChangePassModal: false })
            // console.log('@@@ Update Password Failure CallBack ===================', error);
            alert(error);
        } else {
            this.setState({ showChangePassModal: false })
            // console.log('@@@ Update Password Failure CallBack Network Error ===================', error);
            alert('Network Error!');
        }
    }

    renderForgotContainer = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showChangePassModal}
                onRequestClose={() => {
                    this.setState({ showChangePassModal: false })
                }}
            >
                <View style={styles.modalContainer}>
                    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps={'always'}>
                        <View style={styles.transparentBg} />
                        <View style={styles.bottomView}>
                            <TouchableOpacity onPress={() => this.setState({ showChangePassModal: false })}>
                                <Image
                                    source={IMG_CONST.modalCross}
                                    style={styles.crossIcon}
                                />
                            </TouchableOpacity>
                            <View style={styles.textInputContaier}>
                                <Text style={styles.headingText}>Update Password</Text>
                                <Text style={[styles.subheadText, { marginTop: verticalScale(20) }]}>Type and confirm a secure new password for the account</Text>
                                <View style={[styles.emailView, { borderColor: this.state.isInvalidPass ? 'red' : '#00000040' }]}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholderTextColor='#00000070'
                                        placeholder="Old Password"
                                        onChangeText={(text) => this.setState({ pass: text, isInvalidPass: false })}
                                    />
                                    {this.state.isInvalidPass ? <View style={styles.errorView} /> : null}
                                </View>
                                <View style={[styles.emailView, { borderColor: this.state.isInvalidNewPass ? 'red' : '#00000040' }]}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholderTextColor='#00000070'
                                        placeholder="New Password"
                                        secureTextEntry={this.state.isEyeClicked}
                                        onChangeText={(text) => this.setState({ newPass: text, isInvalidNewPass: false })}
                                    />
                                    {this.state.isInvalidNewPass ? <View style={styles.errorView} /> : null}
                                </View>
                                <View style={[styles.emailView, { borderColor: this.state.isInvalidConPass ? 'red' : '#00000040' }]}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholderTextColor='#00000070'
                                        placeholder="Confirm Password"
                                        secureTextEntry={this.state.isEyeClicked}
                                        onChangeText={(text) => this.setState({ conPass: text, isInvalidConPass: false })}
                                    />
                                    {this.state.isInvalidConPass ? <View style={styles.errorView} /> : null}
                                </View>
                            </View>
                            <TouchableOpacity style={[styles.logintBtn, { alignSelf: 'center' }]} onPress={() => this.onPressSubmitButton()} >
                                <Text style={styles.loginBtnText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </Modal>
        );
    }

    renderGetProfileData = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ marginLeft: scale(20) }}>
                    <Text style={styles.subheadTextHead}>Name</Text>
                    <Text style={styles.subheadTextHead}>Email</Text>
                    <Text style={styles.subheadTextHead}>Company</Text>
                    <Text style={styles.subheadTextHead}>Phone</Text>
                </View>
                <View style={{ marginLeft: scale(50) }}>
                    <Text style={styles.subheadText}>{this.state.name}</Text>
                    <Text style={styles.subheadText}>{this.state.email}</Text>
                    <Text style={styles.subheadText}>{this.state.company}</Text>
                    <Text style={styles.subheadText}>{this.state.phone}</Text>
                </View>
            </View>
        );
    }

    renderChangePassButton = () => {
        return (<TouchableOpacity style={styles.logintBtn} onPress={() => this.setState({ showChangePassModal: true })} >
            <Text style={styles.loginBtnText}>Change Password</Text>
        </TouchableOpacity>);
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps={'always'}>
                    {/* <Text style={styles.headingText}>Profile</Text> */}
                    {this.renderGetProfileData()}
                    {this.renderChangePassButton()}
                    {this.state.showChangePassModal && this.renderForgotContainer()}
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
        changePassword: (data, successCallBack, failureCallBack) => dispatch(userActions.changePassword(data, successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);