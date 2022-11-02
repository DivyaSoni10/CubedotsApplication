import { StyleSheet } from 'react-native'
import scale, { verticalScale } from '../../utils/Scale'
import COLOR_CONST from '../../theme/ColorConstants'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    textInputContaier: {
        alignSelf: 'center',
        marginTop: verticalScale(50)
    },

    menuIcon: {
        height: scale(25),
        width: scale(25),
        // marginLeft: scale(20)
    },
    
    headingText: {
        fontSize: scale(24),
        // alignSelf: 'center',
        // textAlign: 'center',
        color: '#000',
    },

    inputContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf: 'flex-start'
    },

    subheadText: {
        fontSize: scale(14),
        color: '#000',
        marginTop: verticalScale(50)
    },

    fixedView: {
        height: scale(50),
        width: scale(320),
        borderRadius: scale(5),
        borderWidth: scale(0.5),
        borderColor: "#00000040",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(20),
        alignSelf: 'center',
        backgroundColor: '#e4e7eb'
    },

    dropdownView: {
        height: scale(50),
        width: scale(320),
        borderRadius: scale(5),
        borderWidth: scale(0.5),
        borderColor: "#00000040",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: verticalScale(20),
        alignSelf: 'center',
        flexDirection: 'row'
    },
    
    openedDropDown: {
        // height: scale(250),
        width: scale(320),
        borderRadius: scale(5),
        borderWidth: scale(0.5),
        borderColor: "#00000040",
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(10),
        alignSelf: 'center',
        flexDirection: 'row',
        paddingVertical: verticalScale(5),
        paddingHorizontal: scale(20)
    },

    emailView: {
        height: scale(50),
        width: scale(320),
        borderRadius: scale(5),
        borderWidth: scale(0.5),
        borderColor: "#00000040",
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(20),
        alignSelf: 'center',
        flexDirection: 'row'
    },

    messageView: {
        height: scale(100),
        width: scale(320),
        borderRadius: scale(5),
        borderWidth: scale(0.5),
        borderColor: "#00000040",
        // justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: verticalScale(20),
        alignSelf: 'center',
        flexDirection: 'row',
        paddingTop: verticalScale(5)
    },

    countryCode: {
        height: scale(49),
        width: scale(60),
        borderTopLeftRadius: scale(5),
        borderBottomLeftRadius: scale(5),
        borderWidth: scale(0.5),
        borderColor: "#00000040",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#e4e7eb'
    },
    
    writeMsgView: {
        height: scale(50),
        width: scale(320),
        borderRadius: scale(5),
        borderBottomWidth: scale(0.5),
        borderColor: "#00000040",
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(20),
        alignSelf: 'center',
        flexDirection: 'row'
    },

    passView: {
        height: scale(50),
        width: scale(320),
        borderRadius: scale(5),
        borderWidth: scale(0.5),
        borderColor: "#00000040",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: verticalScale(20),
        alignSelf: 'center',
        flexDirection: 'row'
    },

    userIcon: {
        height: scale(17),
        width: scale(17),
        marginLeft: scale(20),
        // alignSelf: 'center'
    },

    mailIcon: {
        height: scale(17),
        width: scale(17),
        marginLeft: scale(20),
        // alignSelf: 'center'
    },

    lockIcon: {
        height: scale(20),
        width: scale(20),
        marginLeft: scale(20),
        // alignSelf: 'center'
    },

    eyeIcon: {
        height: scale(20),
        width: scale(20),
        marginRight: scale(10),
        // alignSelf: 'center',
        opacity: 0.6
    },

    errorView: {
        height: scale(15),
        width: scale(15),
        borderRadius: scale(15),
        marginRight: scale(10),
        backgroundColor: 'red',
        alignSelf: 'center'
    },

    textInput: {
        fontSize: scale(14),
        color: '#000000',
        fontWeight: '300',
        marginLeft: scale(10),
        width: scale(280)
    },

    dropdown: {
        height: scale(20) , 
        width: scale(20) , 
        marginRight: scale(20) 
    },

    rememberMeView: {
        marginTop: verticalScale(20),
        flexDirection: 'row',
        // alignSelf: 'center',
        justifyContent: 'center'
    },

    rememberMeImage: {
        height: scale(15),
        width: scale(15),
        opacity: 0.6,
        marginLeft: scale(5),
    },

    tcText: {
        fontSize: scale(10), 
        color: COLOR_CONST.black,
        marginLeft: scale(10),
        width: scale(300),
    },
    
    tAndcImage: {
        fontSize: scale(10), 
        color: COLOR_CONST.black,
        textDecorationLine: 'underline',
        color: COLOR_CONST.themeOrange
    },

    logintBtn: {
        height: scale(50),
        width: scale(300),
        borderRadius: scale(10),
        backgroundColor: COLOR_CONST.themeOrange,
        marginVertical: verticalScale(15),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

    loginBtnText: { fontSize: scale(18), color: 'white' },
})