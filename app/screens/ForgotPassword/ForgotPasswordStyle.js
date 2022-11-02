import { StyleSheet } from 'react-native'
import scale, { verticalScale } from '../../utils/Scale'
import COLOR_CONST from '../../theme/ColorConstants'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headingText: {
        fontSize: scale(24),
        alignSelf: 'center',
        textAlign: 'center',
        color: '#000',
    },

    subheadText: {
        fontSize: scale(14),
        color: '#000',
        marginTop: verticalScale(20),
        marginLeft: scale(20),
        // width: scale(375)
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

    logintBtn: {
        height: scale(50),
        width: scale(300),
        borderRadius: scale(50),
        backgroundColor: COLOR_CONST.themeBlue,
        marginTop: verticalScale(50),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

    loginBtnText: { fontSize: scale(18), color: 'white' },
})