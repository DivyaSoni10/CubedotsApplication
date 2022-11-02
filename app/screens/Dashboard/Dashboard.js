import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, Dimensions, Modal, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import styles from './DashboardStyle';
import COLOR_CONST from '../../theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import * as STRING_CONST from '../../theme/StringConstants';
import scale, { verticalScale } from '../../utils/Scale';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import CreateAppointment from '../CreateAppointment/CreateAppointment';
import Profile from '../Profile/Profile';
import LinearGradient from 'react-native-linear-gradient';
import RangeSelectCalendar from '../../components/RangeSelectCalendar/RangeSelectCalendar';

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isEyeClicked: true,
            isAppointmentSelected: false,
            isProfileSelected: false,
            isLoadingTotal: true,
            lastLoggedIn: new Date(Date.now() + (6 * 1000)),
            date: new Date(Date.now() + (6 * 1000)),
            totalAppointmentOfTheMonth: '',
            totalAppointmentOfTheWeek: '',
            date1: new Date(),
            date2: new Date(),
            totalItems: [
                { id: 0, label: 'Appointment', image: IMG_CONST.wDAppoint, isSelected: false },
                { id: 1, label: 'Sales', image: IMG_CONST.wDSales, isSelected: false },
                { id: 2, label: 'Reservation', image: IMG_CONST.wDReserve, isSelected: false },
                { id: 3, label: 'Meetings', value: '0', image: IMG_CONST.wDMeetings, isSelected: false },
                { id: 4, label: 'Meeting with customer', value: '0', image: IMG_CONST.wDMeet, isSelected: false }
            ],
            totalSale: [],
            totalAppointment: [],
            totalMeetings: [],
            totalPayment: []
        };
    }

    componentDidMount() {
        // this.postOrgzitApi();
        // this.postWelcomeApi();
        // this.getSalesList();
        // this.getAppointmentsList();
        // this.getMeetingList();
        // this.getPaymentsList();
    }

    callAPis = () => {
        this.postOrgzitApi();
        this.postWelcomeApi();
        // this.getSalesList();
        // this.getAppointmentsList();
    }

    renderHeadingContainer = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: verticalScale(40) }}>
                <TouchableOpacity style={{ padding: 10 }} onPress={() => this.setState({ isAppointmentSelected: false, isProfileSelected: false }, () => this.props.navigation.openDrawer())}><Image style={styles.menuIcon} source={require('../../assets/wdashboard/wDMenu.png')} /></TouchableOpacity>
                <Text style={styles.headingText}>Dashboard</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ padding: 10 }}><Image style={styles.heartIcon} source={require('../../assets/wdashboard/wDHeart.png')} /></TouchableOpacity>
                    <TouchableOpacity style={{ padding: 10 }}><Image style={styles.bellIcon} source={require('../../assets/wdashboard/wDNotification.png')} /></TouchableOpacity>
                </View>
            </View>
        );
    }

    renderTotalCell = (item) => {
        return (
            item.id == 4 ?
                <View style={[styles.wDTotalCellView, {justifyContent: 'center', alignItems: 'center', paddingHorizontal: scale(50)}]}>
                    <Image style={styles.wDTotalCellImage} source={item.image} resizeMode={'contain'} />
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: scale(5) }}>
                        <Text style={[styles.wDTotalCellText, { fontSize: scale(16) }]}>{item.value}</Text>
                        <Text style={styles.wDTotalCellText}>{item.label}</Text>
                    </View>
                </View>
                :
                <View style={styles.wDTotalCellView}>
                    <Image style={styles.wDTotalCellImage} source={item.image} resizeMode={'contain'} />
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: scale(60), marginLeft: scale(5) }}>
                        <Text style={[styles.wDTotalCellText, { fontSize: scale(16) }]}>{item.value}</Text>
                        <Text style={styles.wDTotalCellText}>{item.label}</Text>
                    </View>
                </View>
        );
    }

    renderTotalListing = () => {
        return (
            <FlatList
                style={styles.wDTotalListView}
                data={this.state.totalItems}
                showsHorizontalScrollIndicator={false}
                // horizontal={true}
                numColumns={2}
                renderItem={({ item }) => this.renderTotalCell(item)}
            />
        );
    }

    updateState = (n) => {
        this.setState({ isAppointmentSelected: n }, () => this.callAPis())
    }

    render() {
        return (
            <View style={styles.container} >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} style={{ flex: 1 }} keyboardShouldPersistTaps={'always'} scrollEnabled={true}>
                        <StatusBar barStyle="dark-content" backgroundColor={'#f1f1f1'} />
                        {this.renderHeadingContainer()}
                        {/* <RangeSelectCalendar updateState={(n, m) => this.updateState(n, m)}/> */}
                        {this.renderTotalListing()}
                        {/* {this.renderWelcomeAgentView()}
                        {this.renderSaleTableContainer()}
                        {this.renderAppointmentTableContainer()}
                        {this.renderMeetingTableContainer()}
                        {this.renderPaymentPlanTableContainer()} */}
                        {/* {this.state.isProfileSelected && !this.state.isAppointmentSelected && this.renderProfileContainer()}
                {this.state.isAppointmentSelected && !this.state.isProfileSelected && this.renderAppointmentContainer()}
                {this.state.showCellDetail && this.renderShowCellDetailContainer(this.state.showTableContent, this.state.showTableFor)} */}
                    </KeyboardAwareScrollView>
                </ScrollView>
            </View >
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
        // onLoginUser: (data, successCallBack, failureCallBack) => dispatch(userActions.onLoginUser(data, successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);