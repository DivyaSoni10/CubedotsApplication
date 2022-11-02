import { StyleSheet } from 'react-native'
import scale, { verticalScale } from '../../utils/Scale'
import COLOR_CONST from '../../theme/ColorConstants'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_CONST.themeBlue
    },

    menuIcon: {
        height: scale(25),
        width: scale(25),
        marginLeft: scale(10)
    },

    textInputContaier: {
        // alignSelf: 'center',
        marginTop: verticalScale(60),
        marginBottom: verticalScale(20)
    },

    headingText: {
        fontSize: scale(24),
        // alignSelf: 'center',
        // textAlign: 'center',
        color: COLOR_CONST.themeOrange,
        fontWeight: '500',
    },

    projectCell: {
        width: scale(350),
        backgroundColor: COLOR_CONST.white,
        borderRadius: scale(10),
        paddingBottom: verticalScale(10),
        marginTop: verticalScale(20),
        // justifyContent: 'center',
        alignSelf: 'center'
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

    imageList: {
        height: scale(150),
        width: scale(330),
        borderRadius: scale(20),
        marginLeft: scale(10),
        marginTop: verticalScale(5)
    },

    projectName: {
        color: COLOR_CONST.themeOrange,
        fontSize: scale(16),
        fontWeight: '700',
        marginLeft: scale(10),
        // marginTop: verticalScale(5)
    },

    projectPrice: {
        color: COLOR_CONST.themeBlue,
        fontSize: scale(12),
        fontWeight: '600',
        marginLeft: scale(10),
        marginTop: verticalScale(5)
    },

    projectAdd: {
        color: COLOR_CONST.themeBlue,
        fontSize: scale(10),
        // fontWeight: '700',
        marginLeft: scale(10),
    },

})