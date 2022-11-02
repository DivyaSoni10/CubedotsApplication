import { StyleSheet } from 'react-native'
import scale, { verticalScale } from '../../utils/Scale'
import COLOR_CONST from '../../theme/ColorConstants'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: scale(20),
        // justifyContent: 'space-between',
        // flexDirection: 'row'
    },

    textInputContaier: {
        alignSelf: 'center',
        paddingHorizontal: scale(20),
        marginTop: verticalScale(0)
    },

    headingText: {
        fontSize: scale(24),
        // fontWeight: '700',
        color: COLOR_CONST.themeBlue,
    },

    inputContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf: 'flex-start'
    },

    subheadTextHead: {
        fontSize: scale(14),
        color: '#000',
        fontWeight: '500',
        marginTop: verticalScale(30)
    },

    subheadText: {
        fontSize: scale(14),
        color: '#000',
        marginTop: verticalScale(30)
    },

    logintBtn: {
        height: scale(45),
        width: scale(180),
        borderRadius: scale(50),
        backgroundColor: COLOR_CONST.themeOrange,
        marginTop: verticalScale(50),
        // alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

    loginBtnText: { fontSize: scale(18), color: 'white' },

    modalContainer: {
        flex: 1,
        backgroundColor: '#3e3e3e',
    },

    transparentBg: {
        flex: 1,
        backgroundColor: '#3e3e3e',
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

    emailView: {
        height: scale(50),
        width: scale(320),
        borderRadius: scale(5),
        borderWidth: scale(0.5),
        borderColor: "#00000040",
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(15),
        alignSelf: 'center',
        flexDirection: 'row'
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
})