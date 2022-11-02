import React, { Component } from 'react'
import { View, StyleSheet, Text, Modal, TouchableOpacity, Image } from 'react-native'
import { connect } from "react-redux";
import styles from './RangeSelectCalendarStyle';
import * as IMG_CONST from '../../theme/ImageConstants';
import * as commonActions from '../../redux/actions/commonActions';
import CalendarPicker from 'react-native-calendar-picker';
import scale, { verticalScale } from '../../utils/Scale';

class RangeSelectCalendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            selectedStartDate: null,
            selectedEndDate: null,
        }
        this.onDateChange = this.onDateChange.bind(this);
    }

    convertDate = (str) => {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        // console.log("@@@ DATEEEE ======", [day, mnth, date.getFullYear()].join("/"))
        return [day, mnth, date.getFullYear()].join("/");
    }

    onDateChange(date, type) {
        if (type === 'END_DATE') {
            this.setState({ selectedEndDate: date }, 
                // console.log('@@@ Range End Date =====', this.convertDate(this.state.selectedEndDate))
                );
        } else {
            this.setState({
                selectedStartDate: date,
                selectedEndDate: null,
            }, 
            // console.log('@@@ Range Start Date =====', this.convertDate(this.state.selectedStartDate))
            );
        }
    }

    onTrigger = (event) => {
        // console.log('@@@ Date Event ========', event)
        this.props.updateState(this.convertDate(this.state.selectedEndDate), this.convertDate(this.state.selectedStartDate));
        this.setState({ showCalendarModal: false })
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showCalendarModal}
                onRequestClose={() => {
                    this.setState({ showCalendarModal: false })
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.bottomView}>
                        <TouchableOpacity onPress={() => this.setState({ showCalendarModal: false })} style={{ marginBottom: verticalScale(10) }}>
                            <Image
                                source={IMG_CONST.modalCross}
                                style={styles.crossIcon}
                            />
                        </TouchableOpacity>
                        <CalendarPicker
                            onDateChange={this.onDateChange}
                            allowRangeSelection={true}
                            monthTitleStyle={styles.monthTitleStyle}
                            yearTitleStyle={styles.yearTitleStyle}
                            // weekdays={this.state.weekdays}
                            startFromMonday={true}
                            // previousTitle={this.state.month}
                            // nextTitle={}
                            minDate={moment().toDate()}
                            previousTitleStyle={styles.previousTitleStyle}
                            nextTitleStyle={styles.nextTitleStyle}
                            selectedDayStyle={styles.selectedDayStyle}
                            selectedDayTextStyle={styles.selectedDayTextStyle}
                            disabledDatesTextStyle={styles.disabledDatesTextStyle}
                            todayTextStyle={styles.todayTextStyle}
                            textStyle={styles.textStyle}
                            dayOfWeekStyles={styles.dayOfWeekStyles}
                            selectedDayColor={COLOR_CONST.themeOrange}
                            horizontal={true}
                            height={scale(320)}
                        />
                        <TouchableOpacity style={[styles.submitBtn]} onPress={this.onTrigger}><Text style={styles.submitBtnText}>OK</Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        showModal: state.common.showModal,
        message: state.common.message,
        isShowError: state.common.isShowError,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RangeSelectCalendar);