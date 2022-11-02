import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, ScrollView, TextInput, Platform } from 'react-native';
import React, { Component } from 'react'
import styles from './Hepl&SupportStyle';
import scale, { verticalScale } from '../../utils/Scale';
import * as IMG_CONST from '../../theme/ImageConstants';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import * as homeActions from '../../redux/actions/homeActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DeviceInfo from 'react-native-device-info';

class HeplSupport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInvalidOtp: false,
            isRemebered: false,
            myName: '',
            myEmail: '',
            phoneNo: '',
            message: '',
            openCountry: false,
            countryValue: '',
            countryApiResponse: [],
            countryItems: [],
            selectedCountryCode: '+90',
            isCountryFocused: false,
            isCountryBlured: false,
        };
    }

    componentDidMount = async () => {
        let con;
        let deviceId = DeviceInfo.getDeviceId();
        fetch(`https://www.cubedots.com/assets/data/countries.json?device_id=${deviceId}`)
            .then((response) => response.json())
            .then((json) => {
                let t = [];
                json.data.map((item) => {
                    item['isSelected'] = false
                    t.push(item)
                })
                con = t;
                // console.log("@@@ Country List Success Callback========", con)
                this.setState({ countryItems: con, countryApiResponse: con })
                return json.data;
            })
            .catch((error) => {
                // console.log("@@@ Country List Failure Callback========", error)
            });
    }

    onPressCountryItem = (item) => {
        var tempList = this.state.countryItems;
        for (var i = 0; i < tempList.length; i++) {
            if (tempList[i].id == item.id) {
                tempList[i]["isSelected"] = true;
                this.setState({ countryValue: item.country_name, selectedCountryCode: item.dial_code })
            }
        } this.setState({ countryItems: tempList, isCountryFocused: false, isInvalidCountry: false })
    }

    onPressSubmitButton = async () => {
        this.setState({ myEmail: this.state.myEmail.toLowerCase() })
        let regex = /^[A-Za-z]+$/;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        // if (!regex.test(this.state.myName)) {
        if (!regex.test(this.state.myName.replace(/ /g, ''))) {
            this.setState({ isInvalidName: true }, alert('Enter a valid Name'))
            return
        } else if (!reg.test(this.state.myEmail)) {
            this.setState({ isInvalidEmail: true }, alert('Please enter a valid Email id'))
            return
        } else if (this.state.countryValue === '') {
            this.setState({ isInvalidCountry: true }, alert('Country field is required'))
            return
        } else if (this.state.phoneNo.length < 10 || this.state.phoneNo.length > 15 || this.state.phoneNo.length == 0) {
            this.setState({ isInvalidphoneNo: true }, alert('Please enter a valid mobile number'))
            return
        } else if (this.state.message.trim().length == 0) {
            this.setState({ isInvalidMessage: true }, alert('Message field is required'))
            return
        }
        // let data = {}
        // data["name"] = this.state.myName
        // data["email"] = this.state.myEmail
        // data["country"] = this.state.countryValue
        // data["mobile"] = this.state.phoneNo
        // data["message"] = this.state.message
        // data["dial_code"] = this.state.selectedCountryCode
        // console.log("@@@ Help & Support Data====", data)
        // this.props.helpAndSupport(data, (res) => this.helpAndSupportSuccessCallBack(res), (err) => this.helpAndSupportFailureCallBack(err))
        let token = await AsyncStorage.getItem('USER_TOKEN')
        let deviceId = DeviceInfo.getDeviceId();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                "name": this.state.myName,
                "email": this.state.myEmail,
                "country": this.state.countryValue,
                "mobile": this.state.phoneNo,
                "message": this.state.message,
                "dial_code": this.state.selectedCountryCode,
                "device_id": deviceId
            })
        };
        // console.log("@@@ Help & Support = Callback========", requestOptions)
        fetch('https://portal.cubedots.com/api/v1/orgzit/help_support_email', requestOptions)
            .then((response) => response.json())
            .then(async (json) => {
                // console.log("@@@ Help & Support Callback========", json)
                if (!json.status) {
                    alert(JSON.stringify(json.errors))
                }
                else {
                    // console.log("@@@ Help & Support Success Callback========", json)
                    this.setState({ myName: '', myEmail: '', phoneNo: '', message: '', countryValue: '', selectedCountryCode: '+90', countryItems: this.state.countryApiResponse }, () => alert(json.message))
                }
            })
            .catch((error) => {
                alert("Something went wrong, could not send your request.")
                // console.log("@@@ Help & Support Failure Callback========", error)
            });
    }

    helpAndSupportSuccessCallBack = async (res) => {
        // console.log('@@@ Help & Support Success CallBack ===================', res);
        this.setState({ myName: '', myEmail: '', phoneNo: '', message: '', countryValue: '', selectedCountryCode: '+90' }, () => alert(res.data.message))
    }

    helpAndSupportFailureCallBack = (error) => {
        if (error) {
            // console.log('@@@ Help & Support Failure CallBack ===================', error);
            alert(error);
        } else {
            // console.log('@@@ Help & Support Failure CallBack Network Error ===================', error);
            alert('Network Error!');
        }
    }

    renderCountryCellContainer = (item) => {
        return (<TouchableOpacity onPress={() => this.onPressCountryItem(item)}><Text style={{ marginVertical: verticalScale(5), color: item.isSelected ? '#000' : '#00000090' }}>{item.country_name}</Text></TouchableOpacity>);
    }

    renderTextInputsContainer = () => {
        return (
            <View style={styles.textInputContaier}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: scale(375) }}>
                    <TouchableOpacity style={{ padding: 10, marginLeft: scale(10) }} onPress={() => this.props.navigation.openDrawer()}><Image style={styles.menuIcon} source={require('../../assets/dashboard/menu.png')} /></TouchableOpacity>
                    <Text style={styles.headingText}>Generate Ticket</Text>
                    <TouchableOpacity style={[styles.menuIcon, { marginRight: scale(10) }]} onPress={() => this.props.navigation.openDrawer()}></TouchableOpacity>
                </View>
                <View style={[styles.emailView, { borderColor: this.state.isInvalidName ? 'red' : '#00000040', }]}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor='#00000080'
                        placeholder="Enter Name *"
                        value={this.state.myName}
                        onChangeText={(text) => this.setState({ myName: text, isInvalidName: false })}
                    />
                    {this.state.isInvalidName ? <View style={styles.errorView} /> : null}
                </View>
                <View style={[styles.emailView, { borderColor: this.state.isInvalidEmail ? 'red' : '#00000040' }]}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor='#00000080'
                        placeholder="Enter Email *"
                        value={this.state.myEmail}
                        onChangeText={(text) => this.setState({ myEmail: text, isInvalidEmail: false })}
                    />
                    {this.state.isInvalidEmail ? <View style={styles.errorView} /> : null}
                </View>
                <TouchableOpacity style={[styles.dropdownView, { borderColor: this.state.isInvalidCountry ? 'red' : '#00000040' }]} onPress={() => this.setState({ isCountryFocused: !this.state.isCountryFocused })}>
                    <Text style={[styles.textInput]}>{this.state.countryValue ? this.state.countryValue : 'Select Country *'}</Text>
                    <Image style={styles.dropdown} source={this.state.isCountryFocused ? IMG_CONST.upArow : IMG_CONST.downArrow} />
                </TouchableOpacity>
                {this.state.isCountryFocused ?
                    <View style={[styles.openedDropDown, { height: Platform.OS === 'android' ? null : scale(250) }]}>
                        <FlatList
                            data={this.state.countryItems}
                            renderItem={({ item }) => this.renderCountryCellContainer(item)}
                        />
                    </View>
                    :
                    null}
                <View style={[styles.emailView, { borderColor: this.state.isInvalidphoneNo ? 'red' : '#00000040' }]}>
                    <View style={styles.countryCode}><Text>{this.state.selectedCountryCode}</Text></View>
                    <TextInput
                        style={[styles.textInput, { width: scale(220) }]}
                        placeholderTextColor='#00000090'
                        placeholder="Mobile No. *"
                        keyboardType='numeric'
                        value={this.state.phoneNo}
                        onChangeText={(text) => this.setState({ phoneNo: text, isInvalidphoneNo: false })}
                    />
                    {this.state.isInvalidphoneNo ? <View style={styles.errorView} /> : null}
                </View>
                <View style={[styles.messageView, { borderColor: this.state.isInvalidMessage ? 'red' : '#00000040' }]}>
                    <TextInput
                        style={[styles.textInput, {}]}
                        placeholderTextColor='#00000090'
                        placeholder="Message *"
                        multiline={true}
                        value={this.state.message}
                        onChangeText={(text) => this.setState({ message: text, isInvalidMessage: false })}
                    />
                    {this.state.isInvalidMessage ? <View style={styles.errorView} /> : null}
                </View>
            </View>
        );
    }

    renderButtonContainer = () => {
        return (<TouchableOpacity style={[styles.logintBtn]}
            onPress={() => this.onPressSubmitButton()}
        ><Text style={styles.loginBtnText}>Submit</Text></TouchableOpacity>);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps={'always'}>
                    <StatusBar barStyle="dark-content" backgroundColor={'#f1f1f1'} />
                    {this.renderTextInputsContainer()}
                    {this.renderButtonContainer()}
                </KeyboardAwareScrollView>
            </ScrollView>
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
        helpAndSupport: (data, successCallBack, failureCallBack) => dispatch(homeActions.helpAndSupport(data, successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeplSupport);
