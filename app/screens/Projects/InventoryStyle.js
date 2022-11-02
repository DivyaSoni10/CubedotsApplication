import { StyleSheet } from 'react-native'
import scale, { verticalScale } from '../../utils/Scale'
import COLOR_CONST from '../../theme/ColorConstants'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_CONST.themeBlue
    },

    headingText: {
        fontSize: scale(24),
        marginLeft: scale(20),
        color: COLOR_CONST.themeOrange,
        fontWeight: '600',
    },

    projectName: {
        fontSize: scale(24),
        marginLeft: scale(20),
        color: COLOR_CONST.themeOrange,
        marginTop: verticalScale(30),
    },

    allDD: {
        width: scale(350),
        alignSelf: 'center',
        backgroundColor: COLOR_CONST.white,
        borderRadius: scale(20),
        paddingBottom: verticalScale(20),
        marginTop: verticalScale(20),
        // padding: 20
    },

    basicConatiner: {
        height: scale(40),
        width: scale(300),
        borderRadius: scale(20),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: verticalScale(10),
        backgroundColor: COLOR_CONST.themeBlue
    },

    buttonConatiner: {
        height: scale(40),
        width: scale(300),
        borderRadius: scale(20),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: verticalScale(20),
        backgroundColor: COLOR_CONST.themeOrange
    },

    buttonText: {
        fontSize: scale(16),
        color: '#fff',
        fontWeight: '500',
    },

    ddImage: {
        height: scale(20) , 
        width: scale(20) ,
    },

    textInput: {
        fontSize: scale(16),
        color: '#fff',
        fontWeight: '400',
        marginLeft: scale(10),
    },

    dropdown: {
        height: scale(20) , 
        width: scale(20) , 
        marginRight: scale(20) 
    },

    openedDropDown: {
        // height: scale(150),
        width: scale(320),
        borderRadius: scale(5),
        // borderWidth: scale(0.5),
        borderColor: "#00000040",
        // justifyContent: 'center',
        alignItems: 'center',
        // marginTop: verticalScale(10),
        alignSelf: 'center',
        flexDirection: 'row',
        // paddingVertical: verticalScale(5),
        paddingHorizontal: scale(20)
    },

    saleTable: {
        alignItems: 'center',
        justifyContent: 'center',
        // height: scale(240),
        width: scale(350),
        alignSelf: 'center',
        borderRadius: scale(10),
        marginTop: verticalScale(20),
        backgroundColor: 'transparent',
        // paddingBottom: verticalScale(20),
        paddingHorizontal: scale(10)
    },

    headTableText: { 
        fontSize: scale(13), 
        color: COLOR_CONST.white,
        alignSelf: 'flex-start'
    },

    salesHeaderTable: {
        flexDirection: 'row',
        // width: scale(350),
        alignItems: 'center',
        // justifyContent: 'space-between',
        marginTop: verticalScale(10)
    },

    trView: {
        // width: scale(70),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // height: scale(30),
        padding: 2,
        borderRadius: scale(7),
        backgroundColor: COLOR_CONST.themeOrange
    },

    salesHeadingTable: {
        width: scale(70),
        color: COLOR_CONST.white,
        alignSelf: 'flex-start',
        textAlign: 'center',
        fontSize: scale(13), 
    },

    hedongDivider: {
        width: scale(770),
        height: 1,
        backgroundColor: COLOR_CONST.white,
        alignSelf: 'center',
        marginTop: verticalScale(5)
    },

    noDataText: { 
        fontSize: scale(12), 
        color: COLOR_CONST.white, 
        opacity: 0.9, 
        // textAlign: 'center', 
        // alignSelf: 'center',
        marginTop: verticalScale(5)
    },

    modalContainer: {
        flex: 1,
        backgroundColor: '#00000090',
        justifyContent: 'center',
        alignItems: 'center',
    },

    transparentBg: {
        flex: 1,
        // backgroundColor: '#3e3e3e',
        // opacity: 0.55,
    },

    bottomView: {
        width: scale(350),
        // height: scale(450),
        backgroundColor: '#fff',
        borderRadius: scale(20),
        alignSelf: 'center',
        justifyContent: 'center',
        paddingBottom: verticalScale(20)
    },

    crossIcon: {
        height: scale(25),
        width: scale(25),
        marginRight: scale(20),
        marginTop: verticalScale(10),
        alignSelf: 'flex-end' 
    },

    floorImage: {
        height: scale(400),
        width: scale(375),
        alignSelf: 'center',
        marginTop: verticalScale(40)
    },
});