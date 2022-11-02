import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, ScrollView, TextInput, Linking } from 'react-native';
import styles from './PropertyEnquiryStyle';
import COLOR_CONST from '../../theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import * as STRING_CONST from '../../theme/StringConstants';
import scale, { verticalScale } from '../../utils/Scale';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import * as homeActions from '../../redux/actions/homeActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-element-dropdown';
import moment from 'moment';
import DatePicker from 'react-native-date-picker'

class PropertyEnquiry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEyeClicked: true,
            isInvalidOtp: false,
            isRemebered: false,
            myName: '',
            myLName: '',
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
            isLocationBlured: false,
            isLocationFocused: false,
            locationItems: [
                { id: 0, label: 'Real Estate Agency', value: 'Real Estate Agency', isSelected: false },
                { id: 1, label: 'Developer', value: 'Developer', isSelected: false },
                { id: 2, label: 'Others', value: 'Others', isSelected: false }
            ],
            locationValue: '',
            openLocation: false,
            showCalendar: false,
            showTime: false,
            selectedStartDate: null,
            selectedEndDate: null,
            date: new Date(Date.now() + (6 * 1000)),
            time: new Date(Date.now() + (6 * 1000)),
        };
    }

    componentDidMount = async () => {
        let con;
        fetch('https://www.cubedots.com/assets/data/countries.json')
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

    addZero = (i) => {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    convertTime = (str) => {
        let date = new Date(str);
        let h = this.addZero(date.getHours());
        let m = this.addZero(date.getMinutes());
        let ampm = h >= 12 ? 'PM' : 'AM';
        h = (h % 12) || 12
        let finalTime = h + ':' + m +' '+ ampm
        // console.log("@@@ APPOINTMENT TIMEEEE ======", h)
        return finalTime ;
    }

    convertDate = (str) => {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        // console.log("@@@ APPOINTMENT DATEEEE ======", [day, mnth, date.getFullYear()].join("/"))
        return [day, mnth, date.getFullYear()].join("/");
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

    onPressSubmitButton = () => {
        this.setState({myEmail: this.state.myEmail.toLowerCase()})
        let regex = /^[A-Za-z]+$/;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        // if (!regex.test(this.state.myName)) {
        if (!regex.test(this.state.myName.replace(/ /g, ''))) {
            this.setState({ isInvalidName: true }, alert('First name field is required'))
            return
        } else if (!regex.test(this.state.myLName.replace(/ /g, ''))) {
            this.setState({ isInvalidLName: true }, alert('Last name field is required'))
            return
        } else if (!reg.test(this.state.myEmail)) {
            this.setState({ isInvalidEmail: true }, alert('Please enter a valid Email id'))
            return
        } else if (this.state.locationValue === '') {
            this.setState({ isInvalidLocation: true }, alert('Occupation field is required'))
            return
        } else if (this.state.countryValue === '') {
            this.setState({ isInvalidCountry: true }, alert('Please select your country'))
            return
        } else if (this.state.phoneNo.length < 10 || this.state.phoneNo.length > 15 ) {
            this.setState({ isInvalidphoneNo: true }, alert('Please enter a valid mobile number'))
            return
            // } else if (this.state.message.trim().length == 0) {
            //     this.setState({ isInvalidMessage: true })
            //     return
        } else if (!this.state.isRemebered) {
            alert("Please accept our T&C")
            return
        }
        let slug = this.props.route.params.slug
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "first_name": this.state.myName,
                "last_name": this.state.myLName,
                "email": this.state.myEmail,
                "occupation": this.state.locationValue,
                "country": this.state.countryValue,
                "mobile": this.state.phoneNo,
                "appointment_date": this.state.date,
                "appointment_time": this.state.time,
                "project_interest": slug,
                "message": this.state.message,
                "dial_code": this.state.selectedCountryCode
            })
        };
        // console.log("@@@ Project Enquiry = Callback========", requestOptions)
        fetch('https://portal.cubedots.com/api/v1/orgzit/projectEnquireRequest', requestOptions)
            .then((response) => response.json())
            .then(async (json) => {
                // console.log("@@@ Project Enquiry Success Callback========", json)
                if (!json.status) {
                    alert(JSON.stringify("Something went wrong"))
                }
                else {
                    alert(JSON.stringify(json.message))
                    this.setState({
                        isRemebered: false,
                        myName: '', myLName: '', myEmail: '', phoneNo: '', message: '',
                        openCountry: false, countryValue: '', countryItems: [], selectedCountryCode: '+90',
                        isCountryFocused: false, isCountryBlured: false, isLocationBlured: false, isLocationFocused: false,
                        locationItems: [
                            { id: 0, label: 'Real Estate Agency', value: 'Real Estate Agency', isSelected: false },
                            { id: 1, label: 'Developer', value: 'Developer', isSelected: false },
                            { id: 2, label: 'Others', value: 'Others', isSelected: false }
                        ],
                        locationValue: '', countryItems: this.state.countryApiResponse,
                        date: new Date(Date.now() + (6 * 1000)),
                        time: new Date(Date.now() + (6 * 1000))
                    })
                }
            })
            .catch((error) => {
                alert("Something went wrong, could not send enquiry request.")
                // console.log("@@@ Project Enquiry Failure Callback========", error)
            });
    }

    renderCountryCellContainer = (item) => {
        return (<TouchableOpacity onPress={() => this.onPressCountryItem(item)}><Text style={{ marginVertical: verticalScale(5), color: item.isSelected ? '#000' : '#00000090' }}>{item.country_name}</Text></TouchableOpacity>);
    }

    renderLocationCellContainer = (item) => {
        return (<TouchableOpacity onPress={() => this.onPressLocationItem(item)}><Text style={{ marginVertical: verticalScale(5), color: item.isSelected ? '#000' : '#00000090' }}>{item.label}</Text></TouchableOpacity>);
    }

    renderTextInputsContainer = () => {
        return (
            <View style={styles.textInputContaier}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                        style={{ padding: 5, marginLeft: scale(10) }}><Image source={IMG_CONST.greyBackArrow} style={{ height: 20, width: 20 }} /></TouchableOpacity>
                    <Text style={styles.headingText}>Enquire about this property</Text>
                </View>
                <Text style={[styles.textInputHead, { marginTop: verticalScale(20) }]}>First Name</Text>
                <View style={[styles.emailView, { borderColor: this.state.isInvalidName ? 'red' : '#00000040' }]}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor='#00000080'
                        placeholder="First Name *"
                        value={this.state.myName}
                        onChangeText={(text) => this.setState({ myName: text, isInvalidName: false })}
                    />
                    {this.state.isInvalidName ? <View style={styles.errorView} /> : null}
                </View>
                <Text style={[styles.textInputHead, { marginTop: verticalScale(20) }]}>Last Name</Text>
                <View style={[styles.emailView, { borderColor: this.state.isInvalidLName ? 'red' : '#00000040' }]}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor='#00000080'
                        placeholder="Last Name *"
                        value={this.state.myLName}
                        onChangeText={(text) => this.setState({ myLName: text, isInvalidLName: false })}
                    />
                    {this.state.isInvalidLName ? <View style={styles.errorView} /> : null}
                </View>
                <Text style={[styles.textInputHead, { marginTop: verticalScale(20) }]}>Email Address</Text>
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
                <Text style={[styles.textInputHead, { marginTop: verticalScale(20) }]}>Occupation</Text>
                <TouchableOpacity style={[styles.dropdownView, { borderColor: this.state.isInvalidLocation ? 'red' : '#00000040' }]} onPress={() => this.setState({ isLocationFocused: !this.state.isLocationFocused })}>
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
                <Text style={[styles.textInputHead, { marginTop: verticalScale(20) }]}>Country</Text>
                <TouchableOpacity style={[styles.dropdownView, { borderColor: this.state.isInvalidCountry ? 'red' : '#00000040' }]} onPress={() => this.setState({ isCountryFocused: !this.state.isCountryFocused })}>
                    <Text style={[styles.textInput]}>{this.state.countryValue ? this.state.countryValue : 'Select Country'}</Text>
                    <Image style={styles.dropdown} source={this.state.isCountryFocused ? IMG_CONST.upArow : IMG_CONST.downArrow} />
                </TouchableOpacity>
                {this.state.isCountryFocused ?
                    <ScrollView>
                        <View style={[styles.openedDropDown, { height: Platform.OS === 'android' ? null : scale(250) }]}>
                            <FlatList
                                data={this.state.countryItems}
                                renderItem={({ item }) => this.renderCountryCellContainer(item)}
                            />
                        </View>
                    </ScrollView>
                    :
                    null}
                <Text style={[styles.textInputHead, { marginTop: verticalScale(20) }]}>Mobile</Text>
                <View style={[styles.emailView, { borderColor: this.state.isInvalidphoneNo ? 'red' : '#00000040' }]}>
                    <View style={styles.countryCode}><Text>{this.state.selectedCountryCode}</Text></View>
                    <TextInput
                        style={[styles.textInput, { width: scale(200) }]}
                        placeholderTextColor='#00000090'
                        placeholder="Mobile *"
                        keyboardType='numeric'
                        value={this.state.phoneNo}
                        onChangeText={(text) => this.setState({ phoneNo: text, isInvalidphoneNo: false })}
                    />
                    {this.state.isInvalidphoneNo ? <View style={styles.errorView} /> : null}
                </View>
                <Text style={[styles.textInputHead, { marginTop: verticalScale(20) }]}>Appointment Date</Text>
                <TouchableOpacity style={[styles.dropdownView]} onPress={() => this.setState({ showCalendar: !this.state.showCalendar })}>
                    <Text style={[styles.textInput]}>{this.convertDate(this.state.date)}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderTime = () => {
        return (
            <View style={{ alignSelf: 'center' }}>
                <Text style={[styles.textInputHead, { marginTop: verticalScale(20), marginLeft: scale(10) }]}>Appointment Time</Text>
                <TouchableOpacity style={[styles.dropdownView]} onPress={() => this.setState({ showTime: !this.state.showTime })}>
                    <Text style={[styles.textInput]}>{this.convertTime(this.state.time)}</Text>
                </TouchableOpacity>
                {this.state.showTime && this.renderTimeCalendar()}
                <Text style={[styles.textInputHead, { marginTop: verticalScale(20), marginLeft: scale(10) }]}>Message</Text>
                <View style={[styles.messageView, { borderColor: this.state.isInvalidMessage ? 'red' : '#00000040' }]}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor='#00000090'
                        placeholder="Write Your Message"
                        multiline={true}
                        enablesReturnKeyAutomatically={true}
                        value={this.state.message}
                        onChangeText={(text) => this.setState({ message: text, isInvalidMessage: false })}
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

    renderDateCalendar = () => {
        return (
            <View style={{ marginTop: verticalScale(10), alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <DatePicker
                    style={{ height: 100 }}
                    date={this.state.date}
                    onDateChange={(date) => this.setState({ date: date, showCalendar: false }, () => { this.state.date >= new Date() ? null : this.setState({ date: new Date() }, () => alert('Please select correct date')) })}
                    mode='date'
                />
            </View>
        );
    }

    renderTimeCalendar = () => {
        let currentTime = new Date(Date.now() + (6 * 1000))
        return (
            <View style={{ marginTop: verticalScale(10), alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <DatePicker
                    style={{ height: 100 }}
                    date={this.state.time}
                    onDateChange={(time) => this.setState({ time: time, showTime: false }
                        , () => {this.state.date >= new Date() ? null : currentTime >= this.state.time ? this.setState({time: currentTime}, () => alert('Please select correct time')) : this.setState({time: time}) }
                        )}
                    mode='time'
                />
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
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps={'always'}>
                        <StatusBar barStyle="dark-content" backgroundColor={'#f1f1f1'} />
                        {this.renderTextInputsContainer()}
                        {this.state.showCalendar && this.renderDateCalendar()}
                        {this.renderTime()}
                        {this.renderButtonContainer()}
                    </KeyboardAwareScrollView>
                </ScrollView>
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
        projectEquiryForm: (data, successCallBack, failureCallBack) => dispatch(homeActions.projectEquiryForm(data, successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyEnquiry);
