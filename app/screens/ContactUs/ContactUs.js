import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, ScrollView, TextInput, Platform, Linking } from 'react-native';
import React, { Component } from 'react'
import styles from './ContactUsStyle';
import scale, { verticalScale } from '../../utils/Scale';
import * as IMG_CONST from '../../theme/ImageConstants';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import * as homeActions from '../../redux/actions/homeActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DeviceInfo from 'react-native-device-info';

const epochs = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
];

class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInvalidOtp: false,
            isRemebered: false,
            myName: '',
            myEmail: '',
            phoneNo: '',
            myMessage: '',
            openCountry: false,
            countryValue: '',
            countryApiResponse: [],
            countryItems: [],
            selectedCountryCode: '+90',
            isCountryFocused: false,
            isCountryBlured: false,
            isLocationBlured: false,
            isLocationFocused: false,
            locationItems: [
                { id: 0, label: 'Real Estate Agency', value: 'Real Estate Agency', isSelected: true },
                { id: 1, label: 'Developer', value: 'Developer', isSelected: false },
                { id: 2, label: 'Others', value: 'Others', isSelected: false }
            ],
            locationValue: '',
            openLocation: false,
            isProjectsBlured: false,
            isProjectsFocused: false,
            projectItems: [
                { id: 0, label: 'Torino', value: 'z6ry4um2ns', isSelected: false },
                { id: 1, label: 'Skyland', value: 'i0p1az8p61', isSelected: false },
                { id: 2, label: 'Beylikduzu', value: 'py2xyrm7lb', isSelected: false },
                { id: 3, label: 'Nisantasi Koru', value: 'e61uaunghz', isSelected: false },
                { id: 4, label: 'Yamanevler', value: 'utbqsaqd5t', isSelected: false }
            ],
            projectsValue: '',
            openProjects: false,
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
                console.log("@@@ Country List Success Callback========", con)
                this.setState({ countryItems: con, countryApiResponse: con })
                return json.data;
            })
            .catch((error) => {
                console.log("@@@ Country List Failure Callback========", error)
            });
    }

    onPressSubmitButton = () => {
        this.setState({ myEmail: this.state.myEmail.toLowerCase() })
        let regex = /^[A-Za-z]+$/;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!regex.test(this.state.myName.replace(/ /g, ''))) {
            this.setState({ isInvalidName: true }, alert('Enter a valid Name'))
            return
            // } else if (this.state.myName.length == 0) {
            //     this.setState({ isInvalidName: true }, alert('Name field is required'))
            //     return
        } else if (!reg.test(this.state.myEmail)) {
            this.setState({ isInvalidEmail: true }, alert('Please enter a valid Email id'))
            return
        } else if (this.state.countryValue === '') {
            this.setState({ isInvalidCountry: true }, alert('Please select your Country'))
            return
        } else if (this.state.phoneNo.length < 10 || this.state.phoneNo.length > 15) {
            this.setState({ isInvalidphoneNo: true }, alert('Please enter a valid mobile number'))
            return
        } else if (this.state.locationValue === '') {
            this.setState({ isInvalidLocation: true }, alert('Occupation field is required'))
            return
        } else if (this.state.locationValue === 'Real Estate Agency') {
            if (this.state.projectsValue === '') {
                this.setState({ isInvalidProject: true }, alert('Project field is required'))
                return
            } else return
            // } else if (this.state.myMessage.trim().length == 0
            //     this.setState({ isInvalidMessage: true })
            //     return
        } else if (!this.state.isRemebered) {
            alert("Please accept our T&C")
            return
        }
        // let data = {}
        // data["first_name"] = this.state.myName
        // data["last_name"] = this.state.myName
        // data["email"] = this.state.myEmail
        // data["country"] = this.state.countryValue
        // data["mobile"] = this.state.phoneNo
        // data["project_interest"] = this.state.projectsValue
        // data["occupation"] = this.state.locationValue
        // data["message"] = this.state.myMessage
        // data["dial_code"] = this.state.selectedCountryCode
        // data["terms"] = this.state.isRemebered
        // console.log("@@@ Contact Us Data====", data)
        // this.props.contactUs(data, (res) => this.contactUsSuccessCallBack(res), (err) => this.contactUsFailureCallBack(err))
        let deviceId = DeviceInfo.getDeviceId();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "first_name": this.state.myName,
                "last_name": this.state.myName,
                "email": this.state.myEmail,
                "country": this.state.countryValue,
                "mobile": this.state.phoneNo,
                "project_interest": this.state.projectsValue,
                "occupation": this.state.locationValue,
                "message": this.state.myMessage,
                "dial_code": this.state.selectedCountryCode,
                "terms": this.state.isRemebered,
                "device_id": deviceId
            })
        };
        console.log("@@@ Contact Us = Callback========", requestOptions)
        fetch('https://portal.cubedots.com/api/v1/orgzit/requestEnrollment', requestOptions)
            .then((response) => response.json())
            .then(async (json) => {
                console.log("@@@ Contact Us Success Callback========", json)
                if (!json.status) {
                    alert(JSON.stringify(json.message))
                }
                else {
                    this.setState({ isRemebered: false, myName: '', myEmail: '', phoneNo: '', myMessage: '', countryValue: '', locationValue: '', projectsValue: false, selectedCountryCode: '+90', countryItems: this.state.countryApiResponse }, () => alert(json.message))
                }
            })
            .catch((error) => {
                alert("Something went wrong, could not send your enquiry.")
                console.log("@@@ Contact Us Failure Callback========", error)
            });
    }

    contactUsSuccessCallBack = async (res) => {
        console.log('@@@ Contact Us Success CallBack ===================', res);
        this.setState({ isRemebered: false, myName: '', myEmail: '', phoneNo: '', myMessage: '', countryValue: '', locationValue: '', projectsValue: false, selectedCountryCode: '+90' }, () => alert(res.data.message))
    }

    contactUsFailureCallBack = (error) => {
        if (error) {
            console.log('@@@ Contact Us Failure CallBack ===================', error);
            alert(error.message);
        } else {
            console.log('@@@ Contact Us Failure CallBack Network Error ===================', error);
            alert('Network Error!');
        }
    }

    onPressCountryItem = (item) => {
        var tempList = this.state.countryItems;
        for (var i = 0; i < tempList.length; i++) {
            if (tempList[i].id == item.id) {
                tempList[i]["isSelected"] = true;
                this.setState({ countryValue: item.country_name, selectedCountryCode: item.dial_code })
            } else { tempList[i]["isSelected"] = false; }
        } this.setState({ countryItems: tempList, isCountryFocused: false, isInvalidCountry: false })
    }

    onPressLocationItem = (item) => {
        var tempList = this.state.locationItems;
        for (var i = 0; i < tempList.length; i++) {
            if (tempList[i].id == item.id) {
                tempList[i]["isSelected"] = true;
                this.setState({ locationValue: item.label })
            } else { tempList[i]["isSelected"] = false; }
        } this.setState({ locationItems: tempList, isLocationFocused: false, isInvalidLocation: false })
    }

    onPressProjectItem = (item) => {
        var tempList = this.state.projectItems;
        for (var i = 0; i < tempList.length; i++) {
            if (tempList[i].id == item.id) {
                tempList[i]["isSelected"] = true;
                this.setState({ projectsValue: item.label })
            } else { tempList[i]["isSelected"] = false; }
        } this.setState({ projectItems: tempList, isProjectsFocused: false, isInvalidProject: false })
    }

    renderCountryCellContainer = (item) => {
        return (<TouchableOpacity onPress={() => this.onPressCountryItem(item)}><Text style={{ marginVertical: verticalScale(5), color: item.isSelected ? '#000' : '#00000090' }}>{item.country_name}</Text></TouchableOpacity>);
    }

    renderLocationCellContainer = (item) => {
        return (<TouchableOpacity onPress={() => this.onPressLocationItem(item)}><Text style={{ marginVertical: verticalScale(5), color: item.isSelected ? '#000' : '#00000090' }}>{item.label}</Text></TouchableOpacity>);
    }

    renderProjectCellContainer = (item) => {
        return (<TouchableOpacity onPress={() => this.onPressProjectItem(item)}><Text style={{ marginVertical: verticalScale(5), color: item.isSelected ? '#000' : '#00000090' }}>{item.label}</Text></TouchableOpacity>);
    }

    renderTextInputsContainer = () => {
        return (
            <View style={styles.textInputContaier}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => this.props.navigation.openDrawer()}><Image style={styles.menuIcon} source={require('../../assets/dashboard/menu.png')} /></TouchableOpacity>
                    <Text style={styles.headingText}>Enquire Now</Text>
                    <TouchableOpacity style={[styles.menuIcon, { marginRight: scale(10) }]} onPress={() => this.props.navigation.openDrawer()}></TouchableOpacity>
                </View>
                <View style={[styles.emailView, { borderColor: this.state.isInvalidName ? 'red' : '#00000040' }]}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor='#00000080'
                        placeholder="Name *"
                        keyboardType='default'
                        value={this.state.myName}
                        onChangeText={(text) => this.setState({ myName: text, isInvalidName: false })}
                    />
                    {this.state.isInvalidName ? <View style={styles.errorView} /> : null}
                </View>
                <View style={[styles.emailView, { borderColor: this.state.isInvalidEmail ? 'red' : '#00000040' }]}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor='#00000080'
                        placeholder="Email Address *"
                        keyboardType='email-address'
                        autoCapitalize={'none'}
                        value={this.state.myEmail}
                        onChangeText={(text) => this.setState({ myEmail: text, isInvalidEmail: false })}
                    />
                    {this.state.isInvalidEmail ? <View style={styles.errorView} /> : null}
                </View>
                <TouchableOpacity style={[styles.dropdownView, { borderColor: this.state.isInvalidCountry ? 'red' : '#00000040' }]} onPress={() => this.setState({ isCountryFocused: !this.state.isCountryFocused, isInvalidCountry: false })}>
                    <Text style={[styles.textInput]}>{this.state.countryValue ? this.state.countryValue : 'Select Country *'}</Text>
                    <Image style={styles.dropdown} source={this.state.isCountryFocused ? IMG_CONST.upArow : IMG_CONST.downArrow} />
                </TouchableOpacity>
                {this.state.isCountryFocused ?
                    // <ScrollView style={{ fle: 1 }}>
                    <View style={[styles.openedDropDown, { height: Platform.OS === 'android' ? null : scale(250) }]}>
                        <FlatList
                            data={this.state.countryItems}
                            renderItem={({ item }) => this.renderCountryCellContainer(item)}
                        />
                    </View>
                    // </ScrollView>
                    :
                    null}
                <View style={[styles.emailView, { borderColor: this.state.isInvalidphoneNo ? 'red' : '#00000040' }]}>
                    <View style={styles.countryCode}><Text>{this.state.selectedCountryCode}</Text></View>
                    <TextInput
                        style={[styles.textInput, { width: scale(210) }]}
                        placeholderTextColor='#00000090'
                        placeholder="Mobile *"
                        keyboardType='numeric'
                        value={this.state.phoneNo}
                        onChangeText={(text) => this.setState({ phoneNo: text, isInvalidphoneNo: false })}
                    />
                    {this.state.isInvalidphoneNo ? <View style={styles.errorView} /> : null}
                </View>
                {/* <Text style={[styles.textInput, { marginTop: verticalScale(20) }]}>Appointment Date</Text> */}
                <TouchableOpacity style={[styles.dropdownView, { borderColor: this.state.isInvalidLocation ? 'red' : '#00000040' }]} onPress={() => this.setState({ isLocationFocused: !this.state.isLocationFocused, isInvalidLocation: false })}>
                    <Text style={[styles.textInput]}>{this.state.locationValue ? this.state.locationValue : 'Interested As'}</Text>
                    <Image style={styles.dropdown} source={this.state.isLocationFocused ? IMG_CONST.upArow : IMG_CONST.downArrow} />
                </TouchableOpacity>
                {this.state.isLocationFocused ?
                    <View style={styles.openedDropDown}>
                        <FlatList
                            data={this.state.locationItems}
                            renderItem={({ item }) => this.renderLocationCellContainer(item)}
                        />
                    </View>
                    :
                    null}
                {
                    this.state.locationValue === 'Real Estate Agency' &&
                    <View>
                        <TouchableOpacity style={[styles.dropdownView, { borderColor: this.state.isInvalidProject ? 'red' : '#00000040' }]} onPress={() => this.setState({ isProjectsFocused: !this.state.isProjectsFocused, isInvalidProject: false })}>
                            <Text style={[styles.textInput]}>{this.state.projectsValue ? this.state.projectsValue : 'Select Projects'}</Text>
                            <Image style={styles.dropdown} source={this.state.isProjectsFocused ? IMG_CONST.upArow : IMG_CONST.downArrow} />
                        </TouchableOpacity>
                        {this.state.isProjectsFocused ?
                            <View style={styles.openedDropDown}>
                                <FlatList
                                    data={this.state.projectItems}
                                    renderItem={({ item }) => this.renderProjectCellContainer(item)}
                                />
                            </View>
                            :
                            null}
                    </View>}
                <View style={[styles.messageView, { borderColor: this.state.isInvalidMessage ? 'red' : '#00000040' }]}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor='#00000090'
                        placeholder="Write Your Message"
                        multiline={true}
                        value={this.state.myMessage}
                        onChangeText={(text) => this.setState({ myMessage: text, isInvalidMessage: false })}
                    />
                    {this.state.isInvalidMessage ? <View style={styles.errorView} /> : null}
                </View>
                <View style={styles.rememberMeView}>
                    <TouchableOpacity onPress={() => this.setState({ isRemebered: !this.state.isRemebered })}>
                        <Image style={styles.rememberMeImage} source={this.state.isRemebered ? IMG_CONST.checked : IMG_CONST.unchecked} resizeMode="contain" />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.tcText}>By clicking the submit button below, I hereby agree to and accept the following terms and conditions policy. <TouchableOpacity onPress={() => Linking.openURL('https://staging.cubedots.com/terms')}><Text style={styles.tAndcImage}>{'Terms & Conditions'}</Text></TouchableOpacity></Text>
                    </View>
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

const mapDispatchToProps = (dispatch) => {
    return {
        showErrorModal: (message, isShowError) => dispatch(commonActions.showErrorModal(message, isShowError)),
        hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
        contactUs: (data, successCallBack, failureCallBack) => dispatch(homeActions.contactUs(data, successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
// export default ContactUs