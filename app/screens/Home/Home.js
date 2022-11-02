import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, Dimensions, Modal, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import styles from './HomeStyle';
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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import Spinner from 'react-native-loading-spinner-overlay';

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

export class Home extends Component {
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
                { id: 0, label: 'Appointments', image: IMG_CONST.appointment, colour: COLOR_CONST.dashPink, isSelected: false },
                { id: 1, label: 'Meetings', image: IMG_CONST.meetings, colour: COLOR_CONST.dashDBlue, isSelected: false },
                { id: 2, label: 'Customers', image: IMG_CONST.customers, colour: COLOR_CONST.themeOrange, isSelected: false },
                { id: 3, label: 'Sales', value: '0', image: IMG_CONST.sales, colour: COLOR_CONST.dashBlue, isSelected: false }
            ],
            totalSale: [],
            totalAppointment: [],
            totalMeetings: [],
            totalPayment: []
        };
    }

    componentDidMount() {
        this.postOrgzitApi();
        this.postWelcomeApi();
        this.getSalesList();
        this.getAppointmentsList();
        this.getMeetingList();
        this.getPaymentsList();
    }

    callAPis = () => {
        this.postOrgzitApi();
        this.postWelcomeApi();
        // this.getSalesList();
        // this.getAppointmentsList();
    }

    setNavigationHeaderConfiguration = () => {
        this.props.navigation.setOptions({
            headerStyle: { backgroundColor: COLOR_CONST.detailHeading, shadowColor: 'transparent', elevation: 0, },
            headerTitle: () => (<Text>rbrtbtrb</Text>),
            headerLeft: () => (
                <View style={styles.leftIconContainer}>
                    <TouchableOpacity onPress={() => this.setState({ isAppointmentSelected: false, isProfileSelected: false }, () => this.props.navigation.openDrawer())} style={styles.backButton}><Image source={IMG_CONST.WHITE_MENU} style={styles.menuIcon} /></TouchableOpacity>
                    <Image source={IMG_CONST.HEADER_4MOLES_ICON} style={styles.whiteLogo} />
                </View>),
            headerRight: () => (
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Notification') }}><Image source={IMG_CONST.NOTIFICATION_DEACTIVE_ICON} style={styles.notifIcon} /></TouchableOpacity>
                </View>
            )
        })
    }

    postOrgzitApi = async () => {
        let token = await AsyncStorage.getItem('USER_TOKEN')
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        }
        // console.log("@@@ Orgzit Api = Callback========", requestOptions)
        fetch('https://portal.cubedots.com/api/v1/orgzit', requestOptions)
            .then((response) => response.json())
            .then(async (json) => {
                let tI = []
                // console.log("@@@ Orgzit Api Callback========", json)
                if (!json.status) {
                }
                else {
                    this.state.totalItems.map((item) => {
                        item['value'] = item.id === 0 ? json.data.TotalAppointments : item.id === 1 ? json.data.TotalMeetings : item.id === 2 ? json.data.TotalOppotunitie : json.data.TotalSales,
                            tI.push(item)
                    })
                    this.setState({ totalItems: tI, isLoading: false })
                    // console.log("@@@ Orgzit Api Success Callback========", tI)
                }
            })
            .catch((error) => {
                alert("Something went wrong, could not get the data.")
                // console.log("@@@ Orgzit Api Failure Callback========", error)
            });
    }

    postWelcomeApi = async () => {
        let token = await AsyncStorage.getItem('USER_TOKEN')
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        }
        // console.log("@@@ Welcome Api = Callback========", requestOptions)
        fetch('https://portal.cubedots.com/api/v1/orgzit/welcomeinfo', requestOptions)
            .then((response) => response.json())
            .then(async (json) => {
                // console.log("@@@ Orgzit Api Callback========", json)
                if (!json.status) {
                }
                else {
                    this.setState({ totalAppointmentOfTheMonth: json.data.totalAppointmentOfMonth, totalAppointmentOfTheWeek: json.data.totalAppointmentOfWeek })
                    // console.log("@@@ Welcome Api Success Callback========")
                }
            })
            .catch((error) => {
                alert("Something went wrong, could not get the data.")
                // console.log("@@@ Welcome Api Failure Callback========", error)
            });
    }

    getSalesList = async () => {
        let token = await AsyncStorage.getItem('USER_TOKEN')
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                "test": null, "start_date": "2022-06-01T00:00:00.000Z", "end_date": "2022-06-30T00:00:00.000Z"
            })
        }
        // console.log("@@@ Sales List Api = Callback========", requestOptions)
        fetch('https://portal.cubedots.com/api/v1/orgzit/sales', requestOptions)
            .then((response) => response.json())
            .then(async (json) => {
                // console.log("@@@ Sales List Callback========", json)
                if (!json.status) {
                }
                else {
                    this.setState({ totalSale: json.data })
                    // console.log("@@@ Sales List Success Callback========", this.state.totalSale)
                }
            })
            .catch((error) => {
                alert("Something went wrong, could not get the data.")
                // console.log("@@@ Sales List Failure Callback========", error)
            });
    }

    getAppointmentsList = async () => {
        let token = await AsyncStorage.getItem('USER_TOKEN')
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                "test": null, "start_date": "2022-06-01T00:00:00.000Z", "end_date": "2022-06-30T00:00:00.000Z"
            })
        }
        // console.log("@@@ Appointment List Api = Callback========", requestOptions)
        fetch('https://portal.cubedots.com/api/v1/orgzit/appointments', requestOptions)
            .then((response) => response.json())
            .then(async (json) => {
                // console.log("@@@ Appointment List Callback========", json)
                if (!json.status) {
                }
                else {
                    this.setState({ totalAppointment: json.data })
                    // console.log("@@@ Appointment List Success Callback========", this.state.totalAppointment)
                }
            })
            .catch((error) => {
                alert("Something went wrong, could not get the data.")
                // console.log("@@@ Appointment List Failure Callback========", error)
            });
    }

    getMeetingList = async () => {
        let token = await AsyncStorage.getItem('USER_TOKEN')
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                "test": null, "start_date": "2022-06-01T00:00:00.000Z", "end_date": "2022-06-30T00:00:00.000Z"
            })
        }
        // console.log("@@@ Meetings List Api = Callback========", requestOptions)
        fetch('https://portal.cubedots.com/api/v1/orgzit/meeting', requestOptions)
            .then((response) => response.json())
            .then(async (json) => {
                // console.log("@@@ Meetings List Callback========", json)
                if (!json.status) {
                }
                else {
                    this.setState({ totalMeetings: json.data })
                    // console.log("@@@ Meetings List Success Callback========", this.state.totalMeetings)
                }
            })
            .catch((error) => {
                alert("Something went wrong, could not get the data.")
                // console.log("@@@ Meetings List Failure Callback========", error)
            });
    }

    getPaymentsList = async () => {
        let token = await AsyncStorage.getItem('USER_TOKEN')
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                "test": null, "start_date": "2022-06-01T00:00:00.000Z", "end_date": "2022-06-30T00:00:00.000Z"
            })
        }
        // console.log("@@@ Payments List Api = Callback========", requestOptions)
        fetch('https://portal.cubedots.com/api/v1/orgzit/payplans', requestOptions)
            .then((response) => response.json())
            .then(async (json) => {
                // console.log("@@@ Payments List Callback========", json)
                if (!json.status) {
                }
                else {
                    this.setState({ totalPayment: json.data })
                    // console.log("@@@ Payments List Success Callback========", this.state.totalPayment)
                }
            })
            .catch((error) => {
                alert("Something went wrong, could not get the data.")
                // console.log("@@@ Payments List Failure Callback========", error)
            });
    }

    renderProfileContainer = () => {
        return (<Profile />);
    }

    updateState = (n) => {
        this.setState({ isAppointmentSelected: n }, () => this.callAPis())
    }

    convertDate = (str) => {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        // console.log("@@@ APPOINTMENT DATEEEE ======", [day, mnth, date.getFullYear()].join("/"))
        return [day, mnth, date.getFullYear()].join("/");
    }

    renderAppointmentContainer = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.isAppointmentSelected}
                onRequestClose={() => {
                    this.setState({ isAppointmentSelected: false })
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.transparentBg} />
                    <View style={styles.bottomView}>
                        <TouchableOpacity onPress={() => this.setState({ isAppointmentSelected: false })}>
                            <Image source={IMG_CONST.modalCross} style={styles.crossIcon} />
                        </TouchableOpacity>
                        <CreateAppointment updateState={(n) => this.updateState(n)} />
                    </View>
                </View>
            </Modal>
        );
    }

    renderShowCellDetailContainer = (item, tableName) => {
        // console.log("RR$$$%%%")
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showCellDetail}
                onRequestClose={() => {
                    this.setState({ showCellDetail: false })
                }}
            >
                <View style={styles.showTableDetailModalContainer}>
                    <View style={styles.showTableContentBottomView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: verticalScale(10) }}>
                            <Text style={styles.modalDetailHeading}>{tableName} Detail of #{item.id}</Text>
                            <TouchableOpacity onPress={() => this.setState({ showCellDetail: false })}>
                                <Image source={IMG_CONST.modalCross} style={styles.showTableCrossIcon} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(10) }}>
                            <Text style={styles.modalDetailHeading}>Id</Text>
                            <Text style={styles.modalDetailText}>{item.id}</Text>
                        </View>
                        <View style={styles.modalHedongDivider} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(10) }}>
                            <Text style={styles.modalDetailHeading}>{tableName} Date</Text>
                            <Text style={styles.modalDetailText}>{item.createdDate}</Text>
                        </View>
                        <View style={styles.modalHedongDivider} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(10) }}>
                            <Text style={styles.modalDetailHeading}>{tableName} Time</Text>
                            <Text style={styles.modalDetailText}>{item.createdTime}</Text>
                        </View>
                        <View style={styles.modalHedongDivider} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(10) }}>
                            <Text style={styles.modalDetailHeading}>Location</Text>
                            <Text style={styles.modalDetailText}>{item.source}</Text>
                        </View>
                        <View style={styles.modalHedongDivider} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(10) }}>
                            <Text style={styles.modalDetailHeading}>Status</Text>
                            <Text style={styles.modalDetailText}>{item.stage}</Text>
                        </View>
                        <View style={styles.modalHedongDivider} />
                    </View>
                </View>
            </Modal>
        );
    }

    renderDateCalendar = (tableName) => {
        return (
            <View style={{ marginTop: verticalScale(10), alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <DatePicker
                    style={{ height: 100 }}
                    date={this.state.date}
                    minDate={moment().toDate()}
                    onDateChange={(date) => this.setState({ date: date, showCalendar: false })}
                    mode='date'
                />
            </View>
        );
    }

    renderHeadingContainer = () => {
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: verticalScale(40) }}>
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => this.setState({ isAppointmentSelected: false, isProfileSelected: false }, () => this.props.navigation.openDrawer())}><Image style={styles.menuIcon} source={require('../../assets/dashboard/menu.png')} /></TouchableOpacity>
                    <Text style={styles.headingText}>Cubedots</Text>
                    <TouchableOpacity style={{ padding: 10 }}><Image style={styles.bellIcon} source={require('../../assets/dashboard/bell.png')} /></TouchableOpacity>
                </View>
                <View style={styles.tabView}>
                    <TouchableOpacity onPress={() => this.setState({ isAppointmentSelected: !this.state.isAppointmentSelected, isProfileSelected: false })}
                        style={this.state.isAppointmentSelected ? styles.selectedTabView : styles.deselectedTabView}>
                        <Text style={[styles.selectedText, { color: this.state.isAppointmentSelected ? COLOR_CONST.themeOrange : "#00000060" }]}>Create Appointment</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ isAppointmentSelected: false, isProfileSelected: !this.state.isProfileSelected })}
                        style={this.state.isProfileSelected ? styles.selectedTabView : styles.deselectedTabView}>
                        <Text style={[styles.selectedText, { color: this.state.isProfileSelected ? COLOR_CONST.themeOrange : "#00000060" }]}>Profile</Text></TouchableOpacity>
                </View>
            </View>
        );
    }

    renderTotalCell = (item) => {
        return (
            <View style={[styles.totalCellView, { backgroundColor: item.colour }]}>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: scale(130) }}>
                    {
                        this.state.isLoading ? <ActivityIndicator size="small" color={COLOR_CONST.white} />
                            :
                            <Text style={styles.totalCellText}>{item.value}</Text>
                    }
                    <Text style={styles.totalCellText}>Total {item.label}</Text>
                </View>
                <Image style={styles.totalCellImage} source={item.image} />
            </View>
        );
    }

    renderTotalListing = () => {
        return (
            <FlatList
                style={{ marginTop: verticalScale(20), marginRight: scale(15) }}
                data={this.state.totalItems}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                renderItem={({ item }) => this.renderTotalCell(item)}
            />
        );
    }

    renderWelcomeAgentView = () => {
        return (
            <View>
                <LinearGradient colors={[COLOR_CONST.dashDBlue, COLOR_CONST.dashBlue]} style={styles.linearGradient}>
                    <View>
                        <Text style={styles.welcomeAgentText}>Welcome Agent</Text>
                        <Text style={styles.welcomeAgentSubText}>Last Login :  {this.convertDate(this.state.lastLoggedIn)}</Text>
                    </View>
                    <View style={styles.appointmentViews}>
                        <Text style={[styles.welcomeAgentSubText, { color: COLOR_CONST.black, alignSelf: 'center' }]}>Appointments</Text>
                        <View style={styles.thisView}>
                            <View style={[styles.weekView, { backgroundColor: COLOR_CONST.dashPink }]}>
                                {
                                    this.state.isLoading ? <ActivityIndicator size="small" color={COLOR_CONST.white} />
                                        :
                                        <Text style={styles.totalCellText}>{this.state.totalAppointmentOfTheWeek}</Text>
                                }
                                <Text style={[styles.totalCellText, { fontSize: scale(11) }]}>This Week</Text>
                            </View>
                            <View style={[styles.weekView, { backgroundColor: COLOR_CONST.dashBlue }]}>
                                {
                                    this.state.isLoading ? <ActivityIndicator size="small" color={COLOR_CONST.white} />
                                        :
                                        <Text style={styles.totalCellText}>{this.state.totalAppointmentOfTheMonth}</Text>
                                }
                                <Text style={[styles.totalCellText, { fontSize: scale(11) }]}>This Month</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        );
    }

    renderSalesCell = (item, index) => {
        return (
            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: verticalScale(5) }}>
                <Text style={[styles.salesHeadingTable, { width: scale(30) }]}>{index + 1}</Text>
                <Text style={styles.salesHeadingTable}>{item.soldDate}</Text>
                <Text style={[styles.salesHeadingTable, { width: scale(70) }]}>{item.ProjectName}</Text>
                <Text style={styles.salesHeadingTable}>{item.NetSalesPrice}</Text>
                <Text style={styles.salesHeadingTable}>{item.salesStatus}</Text>
                <Text style={styles.salesHeadingTable}>{item.grand_total} {item.currency}</Text>
                <TouchableOpacity onPress={() => this.setState({ showCellDetail: true, showTableFor: 'Sale', showTableContent: item })} style={[styles.salesHeadingTable, { alignSelf: 'flex-end', textAlign: 'right' }]}>
                    <Image source={IMG_CONST.eye} style={{ height: scale(15), width: scale(15), alignSelf: 'center' }} />
                </TouchableOpacity>
            </View>
        );
    }

    renderSaleTableContainer = () => {
        return (
            <View style={styles.saleTable}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: verticalScale(10) }}>
                    <Text style={styles.headTableText}>Sales</Text>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.calendarContainer}>

                        </View>
                        <TouchableOpacity style={[styles.submitBtn, { alignSelf: 'flex-end' }]}><Text style={styles.submitBtnText}>Go</Text></TouchableOpacity>
                    </View> */}
                </View>
                <KeyboardAwareScrollView horizontal={true}
                    style={{ paddingBottom: verticalScale(20) }}
                // showsHorizontalScrollIndicator={false}
                >
                    <View>
                        <View style={styles.salesHeaderTable}>
                            <Text style={[styles.salesHeadingTable, { width: scale(30) }]}>#</Text>
                            <Text style={[styles.salesHeadingTable]}>Date</Text>
                            <Text style={[styles.salesHeadingTable, { width: scale(70) }]}>Location</Text>
                            <Text style={styles.salesHeadingTable}>Price</Text>
                            <Text style={styles.salesHeadingTable}>Status</Text>
                            <Text style={styles.salesHeadingTable}>Net Price</Text>
                            <Text style={[styles.salesHeadingTable, { alignSelf: 'flex-end', textAlign: 'right' }]}>View</Text>
                        </View>
                        <View style={styles.hedongDivider} />
                        {this.state.totalSale.length ?
                            <FlatList
                                // style={{paddingBottom: verticalScale(20) }}
                                data={this.state.totalSale}
                                renderItem={({ item, index }) => this.renderSalesCell(item, index)}
                            />
                            :
                            <Text style={styles.noDataText}>No data available.</Text>
                        }
                        <View style={[styles.hedongDivider, { opacity: 0.2 }]} />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }

    renderAppointmentCell = (item, index) => {
        return (
            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: verticalScale(5) }}>
                <Text style={[styles.appointmentHeadingTable, { width: scale(15), alignSelf: 'center', textAlign: 'right' }]}>{index + 1}</Text>
                <Text style={styles.appointmentHeadingTable}>{item.createdDate}</Text>
                <Text style={[styles.appointmentHeadingTable]}>{item.createdTime}</Text>
                <Text style={styles.appointmentHeadingTable}>{item.source}</Text>
                <Text style={styles.appointmentHeadingTable}>{item.stage}</Text>
                <TouchableOpacity onPress={() => this.setState({ showCellDetail: true, showTableFor: 'Appointment', showTableContent: item })} style={[styles.appointmentHeadingTable, { alignSelf: 'flex-end', width: scale(30) }]}>
                    <Image source={IMG_CONST.eye} style={{ height: scale(15), width: scale(15), alignSelf: 'center', opacity: 0.5 }} resizeMode="contain" />
                </TouchableOpacity>
            </View>
        );
    }

    renderAppointmentTableContainer = () => {
        return (
            <View style={styles.saleTable}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: verticalScale(10) }}>
                    <Text style={styles.headTableText}>Appointments</Text>
                    {/* <TouchableOpacity style={[styles.submitBtn, { alignSelf: 'flex-end' }]}><Text style={styles.submitBtnText}>Go</Text></TouchableOpacity> */}
                </View>
                <KeyboardAwareScrollView horizontal={true}
                    style={{ paddingBottom: verticalScale(20) }}
                // showsHorizontalScrollIndicator={false}
                >
                    <View>
                        <View style={styles.appointmentHeaderTable}>
                            <Text style={[styles.appointmentHeadingTableHEad, { width: scale(30) }]}>#</Text>
                            <Text style={[styles.appointmentHeadingTableHEad, { textAlign: 'left' }]}>Date</Text>
                            <Text style={[styles.appointmentHeadingTableHEad, { textAlign: 'left'}]}>Time</Text>
                            <Text style={[styles.appointmentHeadingTableHEad, { textAlign: 'right' }]}>Location</Text>
                            <Text style={[styles.appointmentHeadingTableHEad, { textAlign: 'right' }]}>Status</Text>
                            <Text style={[styles.appointmentHeadingTableHEad, { alignSelf: 'flex-end', textAlign: 'right' }]}>View</Text>
                        </View>
                        <View style={styles.hedongDivider} />
                        {this.state.totalAppointment.length ?
                            <FlatList
                                // style={{paddingBottom: verticalScale(20) }}
                                data={this.state.totalAppointment}
                                renderItem={({ item, index }) => this.renderAppointmentCell(item, index)}
                            />
                            :
                            <Text style={styles.noDataText}>No data available.</Text>
                        }
                        <View style={[styles.hedongDivider, { opacity: 0.2 }]} />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }

    renderMeetingCell = (item, index) => {
        return (
            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: verticalScale(5) }}>
                <Text style={[styles.salesHeadingTable, { width: scale(30) }]}>{item.value}</Text>
                <Text style={styles.salesHeadingTable}>{item.value}</Text>
                <Text style={[styles.salesHeadingTable]}>{item.value}</Text>
                <Text style={styles.salesHeadingTable}>{item.value}</Text>
                <Text style={styles.salesHeadingTable}>{item.value}</Text>
                <Text style={styles.salesHeadingTable}>{item.value}</Text>
                <TouchableOpacity onPress={() => this.setState({ showCellDetail: true, showTableFor: 'Meeting', showTableContent: item })} style={[styles.salesHeadingTable, { alignSelf: 'flex-end', textAlign: 'right' }]}>
                    <Image source={IMG_CONST.eye} style={{ height: scale(15), width: scale(15), alignSelf: 'center' }} />
                </TouchableOpacity>
            </View>
        );
    }

    renderMeetingTableContainer = () => {
        return (
            <View style={styles.saleTable}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: verticalScale(10) }}>
                    <Text style={styles.headTableText}>Meetings</Text>
                    {/* <TouchableOpacity style={[styles.submitBtn, { alignSelf: 'flex-end' }]}><Text style={styles.submitBtnText}>Go</Text></TouchableOpacity> */}
                </View>
                <KeyboardAwareScrollView horizontal={true}
                    style={{ paddingBottom: verticalScale(20) }}
                // showsHorizontalScrollIndicator={false}
                >
                    <View>
                        <View style={styles.salesHeaderTable}>
                            <Text style={[styles.salesHeadingTable, { width: scale(30) }]}>#</Text>
                            <Text style={styles.salesHeadingTable}>Title</Text>
                            <Text style={[styles.salesHeadingTable]}>Location</Text>
                            <Text style={[styles.salesHeadingTable]}>Date</Text>
                            <Text style={styles.salesHeadingTable}>Time</Text>
                            <Text style={styles.salesHeadingTable}>Customer</Text>
                            <Text style={[styles.salesHeadingTable, { alignSelf: 'flex-end', textAlign: 'right' }]}>View</Text>
                        </View>
                        <View style={styles.hedongDivider} />
                        {this.state.totalMeetings.length ?
                            <FlatList
                                // style={{paddingBottom: verticalScale(20) }}
                                data={this.state.totalMeetings}
                                renderItem={({ item, index }) => this.renderMeetingCell(item, index)}
                            />
                            :
                            <Text style={styles.noDataText}>No data available.</Text>
                        }
                        <View style={[styles.hedongDivider, { opacity: 0.2 }]} />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }

    renderPaymentPlanCell = (item, index) => {
        return (
            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: verticalScale(5) }}>
                <Text style={[styles.paymentHeadingTable, { width: scale(30) }]}>{item.value}</Text>
                <Text style={styles.paymentHeadingTable}>{item.value}</Text>
                <Text style={[styles.paymentHeadingTable]}>{item.value}</Text>
                <Text style={styles.paymentHeadingTable}>{item.value}</Text>
                <Text style={styles.paymentHeadingTable}>{item.value}</Text>
                <Text style={styles.paymentHeadingTable}>{item.value}</Text>
                <Text style={styles.paymentHeadingTable}>{item.value}</Text>
                <Text style={styles.paymentHeadingTable}>{item.value}</Text>
                <TouchableOpacity onPress={() => this.setState({ showCellDetail: true, showTableFor: 'Payment', showTableContent: item })} style={[styles.paymentHeadingTable, { alignSelf: 'flex-end', textAlign: 'right' }]}>
                    <Image source={IMG_CONST.eye} style={{ height: scale(15), width: scale(15), alignSelf: 'center' }} />
                </TouchableOpacity>
            </View>
        );
    }

    renderPaymentPlanTableContainer = () => {
        return (
            <View style={styles.saleTable}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: verticalScale(10) }}>
                    <Text style={styles.headTableText}>Payment Plans</Text>
                    {/* <TouchableOpacity style={[styles.submitBtn, { alignSelf: 'flex-end' }]}><Text style={styles.submitBtnText}>Go</Text></TouchableOpacity> */}
                </View>
                <KeyboardAwareScrollView horizontal={true}
                    style={{ paddingBottom: verticalScale(20) }}
                // showsHorizontalScrollIndicator={false}
                >
                    <View>
                        <View style={styles.paymentHeaderTable}>
                            <Text style={[styles.paymentHeadingTable, { width: scale(30) }]}>#</Text>
                            <Text style={styles.paymentHeadingTable}>Project Name</Text>
                            <Text style={[styles.paymentHeadingTable]}>Sales Person</Text>
                            <Text style={[styles.paymentHeadingTable]}>Payment Type</Text>
                            <Text style={[styles.paymentHeadingTable]}>Payment Status</Text>
                            <Text style={styles.paymentHeadingTable}>Currency</Text>
                            <Text style={styles.paymentHeadingTable}>Expected Payment Amount</Text>
                            <Text style={styles.paymentHeadingTable}>Expected Payment Date</Text>
                            <Text style={[styles.paymentHeadingTable, { textAlign: 'right' }]}>View</Text>
                        </View>
                        <View style={[styles.hedongDivider, { width: scale(620) }]} />
                        {this.state.totalPayment.length ?
                            <FlatList
                                // style={{paddingBottom: verticalScale(20) }}
                                data={this.state.totalPayment}
                                renderItem={({ item, index }) => this.renderPaymentPlanCell(item, index)}
                            />
                            :
                            <Text style={styles.noDataText}>No data available.</Text>
                        }
                        <View style={[styles.hedongDivider, { opacity: 0.2, width: scale(620) }]} />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }

    render() {
        // this.trackParams()
        return (
            <View style={styles.container} >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} style={{ flex: 1 }} keyboardShouldPersistTaps={'always'} scrollEnabled={true}>
                        <StatusBar barStyle="dark-content" backgroundColor={'#f1f1f1'} />
                        {this.renderHeadingContainer()}
                        {/* <RangeSelectCalendar updateState={(n, m) => this.updateState(n, m)}/> */}
                        {!this.state.isProfileSelected && !this.state.isAppointmentSelected &&
                            <View>
                                {this.renderTotalListing()}
                                {this.renderWelcomeAgentView()}
                                {this.renderSaleTableContainer()}
                                {this.renderAppointmentTableContainer()}
                                {this.renderMeetingTableContainer()}
                                {this.renderPaymentPlanTableContainer()}
                            </View>}
                        {this.state.isProfileSelected && !this.state.isAppointmentSelected && this.renderProfileContainer()}
                        {this.state.isAppointmentSelected && !this.state.isProfileSelected && this.renderAppointmentContainer()}
                        {this.state.showCellDetail && this.renderShowCellDetailContainer(this.state.showTableContent, this.state.showTableFor)}
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
        // onLoginUser: (data, successCallBack, failureCallBack) => dispatch(userActions.onLoginUser(data, successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);