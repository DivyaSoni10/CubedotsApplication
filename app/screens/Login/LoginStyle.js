import { StyleSheet } from 'react-native'
import scale, { verticalScale } from '../../utils/Scale'
import COLOR_CONST from '../../theme/ColorConstants'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    textInputContaier: {
        alignSelf: 'center',
        paddingHorizontal: scale(20),
        marginTop: verticalScale(70)
    },

    headingText: {
        fontSize: scale(24),
        alignSelf: 'center',
        textAlign: 'center',
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
        color: COLOR_CONST.black,
        fontWeight: '500',
        marginLeft: scale(10),
        width: scale(270)
    },

    textInput1: {
        fontSize: scale(14),
        color: COLOR_CONST.black,
        fontWeight: '500',
        marginLeft: scale(10),
        width: scale(200)
    },

    rememberMeView: {
        marginTop: verticalScale(20),
        flexDirection: 'row',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center'
    },

    rememberMeImage: {
        height: scale(20),
        width: scale(20),
        opacity: 0.6
    },

    rememberMeText: {
        fontSize: scale(14), 
        color: COLOR_CONST.black,
        marginLeft: scale(15)
    },

    logintBtn: {
        height: scale(50),
        width: scale(300),
        borderRadius: scale(50),
        backgroundColor: COLOR_CONST.themeOrange,
        marginTop: verticalScale(50),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

    loginBtnText: { fontSize: scale(18), color: 'white' },

    forgetPass: {
        alignSelf: 'flex-end',
        marginTop: verticalScale(15)
    },

    haveAccountLink: {
        fontSize: scale(14),
        lineHeight: scale(25),
        color: '#000',
        alignSelf: 'center'
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
        height: scale(450),
        backgroundColor: '#fff',
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(20)
    },

    crossIcon: {
        height: scale(25),
        width: scale(25),
        marginRight: scale(20),
        marginTop: verticalScale(10),
        alignSelf: 'flex-end' 
    },
})