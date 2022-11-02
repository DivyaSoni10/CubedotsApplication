import { StyleSheet } from 'react-native'
import scale, { verticalScale } from '../../utils/Scale'
import COLOR_CONST from '../../theme/ColorConstants'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    menuIcon: {
        height: scale(25),
        width: scale(25),
        marginLeft: scale(20)
    },

    headingText: {
        fontSize: scale(24),
        // fontWeight: '700',
        color: COLOR_CONST.themeBlue,
    },

    bellIcon: {
        height: scale(20),
        width: scale(20),
        marginRight: scale(20)
    },

    tabView: {
        marginLeft: scale(20),
        flexDirection: 'row',
        marginTop: verticalScale(20),
        alignItems: 'center',
        justifyContent: 'space-between',
        width: scale(150)
    },

    selectedTabView: {
        // height: scale(40),
        width: scale(170),
        borderRadius: scale(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(3),
        // backgroundColor: COLOR_CONST.white,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 1, height: 3 }
    },

    selectedText: {
        fontSize: scale(14),
        fontWeight: '500',
    },

    deselectedTabView: {
        // height: scale(40),
        width: scale(170),
        borderRadius: scale(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(3),
        // backgroundColor: "#eeeef5",
    },

    modalContainer: {
        flex: 1,
        backgroundColor: '#00000090',
    },

    transparentBg: {
        flex: 1,
        // backgroundColor: '#3e3e3e',
        // opacity: 0.55,
    },

    bottomView: {
        width: scale(375),
        height: scale(600),
        backgroundColor: '#fff',
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(20),
        paddingBottom: verticalScale(20)
    },

    crossIcon: {
        height: scale(25),
        width: scale(25),
        marginRight: scale(20),
        marginTop: verticalScale(10),
        alignSelf: 'flex-end'
    },

    totalCellView: {
        height: scale(110),
        width: scale(200),
        marginLeft: scale(20),
        marginTop: verticalScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scale(10),
        borderRadius: scale(10)
    },

    totalCellText: {
        fontSize: scale(14),
        fontWeight: '500',
        color: COLOR_CONST.white,
        textAlign: 'center',
        alignSelf: 'center'
    },

    totalCellImage: {
        height: scale(30),
        width: scale(30),
        // marginRight: scale(5),
        alignSelf: 'center'
    },

    linearGradient: {
        height: scale(130),
        width: scale(350),
        // marginRight: scale(20),
        marginTop: verticalScale(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scale(10),
        borderRadius: scale(10),
        alignSelf: 'center',
        // alignItems: 'center'
    },

    welcomeAgentText: {
        fontSize: scale(20),
        fontWeight: '500',
        color: COLOR_CONST.white,
        alignSelf: 'flex-start',
        marginTop: verticalScale(20)
    },

    welcomeAgentSubText: {
        fontSize: scale(12),
        // fontWeight: '500',
        color: COLOR_CONST.white,
        alignSelf: 'flex-start',
        marginTop: verticalScale(5)
    },

    appointmentViews: {
        height: scale(95),
        width: scale(170),
        marginTop: verticalScale(20),
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // paddingHorizontal: scale(5),
        borderRadius: scale(10),
        backgroundColor: COLOR_CONST.white
    },

    thisView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scale(10)
    },

    weekView: {
        height: scale(60),
        width: scale(70),
        marginTop: verticalScale(10),
        // paddingHorizontal: scale(10),
        borderRadius: scale(10),
        justifyContent: 'center',
        alignItems: 'center'
    },

    saleTable: {
        alignItems: 'center',
        justifyContent: 'center',
        // height: scale(240),
        width: scale(350),
        alignSelf: 'center',
        borderRadius: scale(10),
        marginTop: verticalScale(20),
        backgroundColor: COLOR_CONST.white,
        // paddingBottom: verticalScale(20),
        paddingHorizontal: scale(10)
    },

    headTableText: { 
        fontSize: scale(18), 
        color: COLOR_CONST.themeOrange,
        alignSelf: 'flex-start'
    },

    salesHeaderTable: {
        flexDirection: 'row',
        // width: scale(350),
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: verticalScale(10)
    },

    salesHeadingTable: {
        width: scale(70),
        // backgroundColor: COLOR_CONST.themeOrange,
        alignSelf: 'flex-start',
        fontSize: scale(13), 
    },

    hedongDivider: {
        width: scale(650),
        height: 1,
        backgroundColor: COLOR_CONST.black,
        alignSelf: 'center',
        marginTop: verticalScale(5)
    },

    appointmentHeaderTable: {
        flexDirection: 'row',
        // width: scale(350),
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: verticalScale(10)
    },

    appointmentHeadingTableHEad: {
        // width: scale(100),
        // backgroundColor: COLOR_CONST.themeOrange,
        alignSelf: 'flex-start',
        fontSize: scale(13), 
        textAlign: 'center'
        // justifyContent: 'center',
        // alignItems: 'center'
    },

    appointmentHeadingTable: {
        width: scale(80),
        // backgroundColor: COLOR_CONST.themeOrange,
        alignSelf: 'flex-start',
        textAlign: 'left',
        fontSize: scale(13), 
        // justifyContent: 'center',
        // alignItems: 'center'
    },

    paymentHeaderTable: {
        flexDirection: 'row',
        // width: scale(350),
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: verticalScale(10)
    },

    paymentHeadingTable: {
        width: scale(75),
        // backgroundColor: COLOR_CONST.themeOrange,
        alignSelf: 'flex-start',
        fontSize: scale(13), 
    },

    noDataText: { 
        fontSize: scale(12), 
        color: COLOR_CONST.black, 
        opacity: 0.6, 
        textAlign: 'center', 
        alignSelf: 'center',
        marginTop: verticalScale(5)
    },

    submitBtn: {
        height: scale(25),
        width: scale(30),
        borderRadius: scale(5),
        backgroundColor: COLOR_CONST.themeOrange,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

    submitBtnText: { fontSize: scale(14), color: 'white' },

    showTableDetailModalContainer: {
        // flex: 1,
        backgroundColor: '#00000090',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },

    showTableContentBottomView: {
        width: scale(340),
        // height: scale(600),
        backgroundColor: '#fff',
        padding: verticalScale(10),
        borderRadius: scale(10),
        alignSelf: 'center'
    },

    showTableCrossIcon: {
        height: scale(20),
        width: scale(20),
        // marginRight: scale(10),
        // marginTop: verticalScale(10),
        alignSelf: 'flex-end'
    },

    modalDetailHeading: { fontSize: scale(14), color: 'black', fontWeight: '500', textAlign: 'left', marginLeft: scale(5), width: scale(150) },

    modalDetailText: { fontSize: scale(14), color: 'black', textAlign: 'left', marginLeft: scale(10) },

    modalHedongDivider: {
        width: scale(310),
        height: 0.8,
        opacity: 0.3,
        backgroundColor: COLOR_CONST.black,
        alignSelf: 'center',
        marginTop: verticalScale(5)
    },

})