import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, ScrollView, TextInput, Platform } from 'react-native';
import createModalStyles from './CreateAppointmentStyle';
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
import { Input } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';

class CreateAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEyeClicked: true,
            isInvalidOtp: false,
            isRemebered: false,
            myName: '',
            myEmail: '',
            phoneNo: '',
            openCountry: false,
            myNote: '',
            countryValue: '',
            countryApiResponse: [],
            countryItems: [],
            selectedCountryCode: '+90',
            isCountryFocused: false,
            isCountryBlured: false,
            isLocationBlured: false,
            isLocationFocused: false,
            locationItems: [
                { id: 0, label: 'Tema Istanbul 2', value: 'tema-istanbul-2', isSelected: false },
                { id: 0, label: 'Four Winds Residence', value: 'four-winds-residence', isSelected: false },
                { id: 0, label: 'Torino', value: 'z6ry4um2ns', isSelected: false },
                { id: 1, label: 'Skyland', value: 'i0p1az8p61', isSelected: false },
                { id: 2, label: 'Beylikduzu', value: 'py2xyrm7lb', isSelected: false },
                { id: 3, label: 'Nisantasi Koru', value: 'e61uaunghz', isSelected: false },
                { id: 4, label: 'Yamanevler', value: 'utbqsaqd5t', isSelected: false }
            ],
            locationValue: '',
            locationRValue: '',
            openLocation: false,
            showCalendar: false,
            showTime: false,
            selectedStartDate: null,
            selectedEndDate: null,
            isInvalidCountry: false,
            isInvalidLocation: false,
            date: new Date(Date.now() + (6 * 1000)),
            time: new Date(Date.now() + (6 * 1000)),
        };
    }

    componentDidMount = async () => {
        let nam = await AsyncStorage.getItem("USER_NAME")
        let eml = await AsyncStorage.getItem("USER_EMAIL")
        let con;
        let deviceId= DeviceInfo.getDeviceId();
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
                this.setState({ myName: nam, myEmail: eml, countryItems: con, countryApiResponse: con })
                return json.data;
            })
            .catch((error) => {
                console.log("@@@ Country List Failure Callback========", error)
            });
    }

    onPressSubmitButton = async () => {
        let phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (this.state.countryValue === '') {
            this.setState({ isInvalidCountry: true }, alert('Please select your Country'))
            return
        } else if (this.state.phoneNo.trim().length < 10 && this.state.phoneNo.trim().length > 15 ) {
            this.setState({ isInvalidphoneNo: true }, alert('Please enter a valid mobile number'))
            return
        } else if (this.state.locationValue === '') {
            this.setState({ isInvalidLocation: true }, alert('Location field is required'))
            return
        }
        // let data = {}
        // data["first_name"] = this.state.myName
        // data["last_name"] = ""
        // data["email"] = this.state.myEmail
        // data["country"] = this.state.countryValue
        // data["mobile"] = this.state.phoneNo
        // data["appointment_date"] = this.state.date
        // data["appointment_time"] = this.convertTime(this.state.time)
        // data["location"] = this.state.locationRValue
        // data["message"] = this.state.myNote
        // data["dial_code"] = this.state.selectedCountryCode
        // console.log("@@@ Create Appointment's Data====", data)
        // this.props.createAppointment(data, (res) => this.createAppointmentSuccessCallBack(res), (err) => this.createAppointmentFailureCallBack(err))
        let token = await AsyncStorage.getItem('USER_TOKEN')
        let deviceId= DeviceInfo.getDeviceId();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                "first_name": this.state.myName,
                "last_name": "",
                "email": this.state.myEmail,
                "country": this.state.countryValue,
                "mobile": this.state.phoneNo,
                "appointment_date": this.state.date,
                "appointment_time": this.state.time,
                "location": this.state.locationRValue,
                "message": this.state.myNote,
                "dial_code": this.state.selectedCountryCode,
                "device_id": deviceId
            })
        };
        console.log("@@@ Create Appointment = Callback========", requestOptions)
        fetch('https://portal.cubedots.com/api/v1/orgzit/create_appointment', requestOptions)
            .then((response) => response.json())
            .then(async (json) => {
                console.log("@@@ Create Appointment Callback========", json)
                if (!json.status) {
                    alert(JSON.stringify(json.message === 'Validation errors' ? json.errors : json.errors.errors[0].error))
                }
                else {
                    console.log("@@@ Create Appointment Success Callback========", json)
                    alert(JSON.stringify(json.message))
                    this.setState({ show: false }, () => this.onTrigger())
                }
            })
            .catch((error) => {
                alert("Something went wrong, could not send your request.")
                console.log("@@@ Create Appointment Failure Callback========", error)
            });
    }

    createAppointmentSuccessCallBack = async (res) => {
        console.log('@@@ Create Appointment Success CallBack ===================', res);
        this.setState({ show: false }, () => this.onTrigger())
    }

    createAppointmentFailureCallBack = (error) => {
        if (error) {
            console.log('@@@ Create Appointment Failure CallBack ===================', error);
            alert(error);
        } else {
            console.log('@@@ Create Appointment Failure CallBack Network Error ===================', error);
            alert('Network Error!');
        }
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
            } else tempList[i]["isSelected"] = false;
        } this.setState({ countryItems: tempList, isCountryFocused: false })
    }

    onPressLocationItem = (item) => {
        var tempList = this.state.locationItems;
        for (var i = 0; i < tempList.length; i++) {
            if (tempList[i].id == item.id) {
                tempList[i]["isSelected"] = true;
                this.setState({ locationValue: item.label, locationRValue: item.value })
            } else tempList[i]["isSelected"] = false;
        } this.setState({ locationItems: tempList, isLocationFocused: false })
    }

    renderCountryCellContainer = (item) => {
        return (<TouchableOpacity onPress={() => this.onPressCountryItem(item)}><Text style={[createModalStyles.contryCellText, { color: item.isSelected ? '#000' : '#00000090' }]}>{item.country_name}</Text></TouchableOpacity>);
    }

    renderLocationCellContainer = (item) => {
        return (<TouchableOpacity onPress={() => this.onPressLocationItem(item)}><Text style={[createModalStyles.contryCellText, { color: item.isSelected ? '#000' : '#00000090' }]}>{item.label}</Text></TouchableOpacity>);
    }

    renderTextInputsContainer = () => {
        return (
            <View style={createModalStyles.textInputContaier}>
                <Text style={createModalStyles.headingText}>Create Appointment</Text>
                <View style={[createModalStyles.fixedView, { marginTop: verticalScale(30) }]}>
                    <Text style={[createModalStyles.textInput, { width: scale(290) }]}>{this.state.myName}</Text>
                </View>
                <View style={createModalStyles.fixedView}>
                    <Text style={[createModalStyles.textInput, { width: scale(290) }]}>{this.state.myEmail}</Text>
                </View>

                <TouchableOpacity style={[createModalStyles.dropdownView, { borderColor: this.state.isInvalidCountry ? 'red' : '#00000040' }]} onPress={() => this.setState({ isCountryFocused: !this.state.isCountryFocused, isInvalidCountry: false })}>
                    <Text style={[createModalStyles.textInput]}>{this.state.countryValue ? this.state.countryValue : 'Select Country'}</Text>
                    <Image style={createModalStyles.dropdown} source={this.state.isCountryFocused ? IMG_CONST.upArow : IMG_CONST.downArrow} />
                </TouchableOpacity>
                {this.state.isCountryFocused ?
                    <View style={[createModalStyles.openedDropDown, { height: Platform.OS === 'android' ? null : scale(250) }]}>
                        <FlatList
                            data={this.state.countryItems}
                            scrollEnabled={true}
                            renderItem={({ item }) => this.renderCountryCellContainer(item)}
                        />
                    </View>
                    :
                    null}
                <View style={[createModalStyles.emailView, { borderColor: this.state.isInvalidphoneNo ? 'red' : '#00000040' }]}>
                    <View style={createModalStyles.countryCode}><Text>{this.state.selectedCountryCode}</Text></View>
                    <TextInput
                        style={[createModalStyles.textInput, { width: scale(220) }]}
                        placeholderTextColor='#00000090'
                        placeholder="Mobile *"
                        keyboardType='numeric'
                        onChangeText={(text) => this.setState({ phoneNo: text, isInvalidphoneNo: false })}
                    />
                    {this.state.isInvalidphoneNo ? <View style={createModalStyles.errorView} /> : null}
                </View>
                <Text style={[createModalStyles.textInput, { marginTop: verticalScale(20) }]}>Appointment Date</Text>
                <TouchableOpacity style={[createModalStyles.dropdownView, { marginTop: verticalScale(5) }]} onPress={() => this.setState({ showCalendar: !this.state.showCalendar })}>
                    <Text style={[createModalStyles.textInput]}>{this.convertDate(this.state.date)}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderTime = () => {
        return (
            <View style={{ alignSelf: 'center' }}>
                <Text style={[createModalStyles.textInput, { marginTop: verticalScale(20) }]}>Appointment Time</Text>
                <TouchableOpacity style={[createModalStyles.dropdownView, { marginTop: verticalScale(5) }]} onPress={() => this.setState({ showTime: !this.state.showTime })}>
                    <Text style={[createModalStyles.textInput]}>{this.convertTime(this.state.time)}</Text>
                </TouchableOpacity>
                {this.state.showTime && this.renderTimeCalendar()}
                <View style={[createModalStyles.messageView, { borderColor: this.state.isInvalidMessage ? 'red' : '#00000040' }]}>
                    <TextInput
                        style={[createModalStyles.textInput, { width: scale(300) }]}
                        placeholderTextColor='#00000090'
                        placeholder="Write Your Notes"
                        multiline={true}
                        onChangeText={(text) => this.setState({ myNote: text, isInvalidMessage: false })}
                    />
                    {this.state.isInvalidMessage ? <View style={styles.errorView} /> : null}
                </View>
                <TouchableOpacity style={[createModalStyles.dropdownView, { borderColor: this.state.isInvalidLocation ? 'red' : '#00000040' }]} onPress={() => this.setState({ isLocationFocused: !this.state.isLocationFocused, isInvalidLocation: false })}>
                    <Text style={[createModalStyles.textInput]}>{this.state.locationValue ? this.state.locationValue : 'Select Location'}</Text>
                    <Image style={createModalStyles.dropdown} source={this.state.isLocationFocused ? IMG_CONST.upArow : IMG_CONST.downArrow} />
                </TouchableOpacity>
                {this.state.isLocationFocused ?
                    <View style={createModalStyles.openedDropDown}>
                        <FlatList
                            data={this.state.locationItems}
                            renderItem={({ item }) => this.renderLocationCellContainer(item)}
                        />
                    </View>
                    :
                    null}
            </View>
        );
    }

    renderDateCalendar = () => {
        // console.log("@@@### Create Selected Dat", this.convertDate(this.state.date), this.convertDate(new Date()))
        return (
            <View style={{ marginTop: verticalScale(10), alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <DatePicker
                    style={{ height: 100 }}
                    date={this.state.date}
                    minDate={moment().toDate()}
                    onDateChange={(date) => this.setState({ date: date, showCalendar: false }, () => { this.state.date >= new Date() ? null : this.setState({ date: new Date() }, () => alert('Please select correct date')) })}
                    mode='date'
                />
            </View>
        );
    }

    renderTimeCalendar = () => {
        let currentTime = new Date(Date.now() + (6 * 1000))
        // console.log("@@@ Show Timw", this.state.time)
        // console.log("@@@ Show Timwr", new Date(Date.now() + (6 * 1000)))
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
        return (<TouchableOpacity style={[createModalStyles.logintBtn]}
            onPress={() => this.onPressSubmitButton()}
        ><Text style={createModalStyles.loginBtnText}>Submit</Text></TouchableOpacity>);
    }

    onTrigger = () => {
        // console.log('@@@ Date Event ========', event)
        this.props.updateState(false);
    }

    render() {
        return (
            <View style={createModalStyles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps={'always'} >
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
        createAppointment: (data, successCallBack, failureCallBack) => dispatch(homeActions.onCreateAppointmrnt(data, successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAppointment);
