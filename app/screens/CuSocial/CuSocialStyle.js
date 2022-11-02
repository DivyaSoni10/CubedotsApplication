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

    projectHeadingText: {
        fontSize: scale(35),
        // marginLeft: scale(10),
        color: COLOR_CONST.themeOrange,
        fontWeight: '700',
    },

    bgImageContainer: {
        height: scale(200),
        width: scale(355),
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth: scale(0.8),
        borderColor: '#ffffff',
        borderRadius: scale(10),
        marginTop: verticalScale(20),
    },

    bgImage: { 
        height: scale(195),
        width: scale(300),
        alignSelf: 'center'
    },

    btmView: {
        alignSelf: 'center',
        height: scale(70),
        backgroundColor: '#00000090',
        width: '100%',
        width: scale(350),
        position: 'absolute',
        bottom: 0
    },
    
    heading: {
        fontSize: scale(22),
        color: COLOR_CONST.themeOrange,
        fontWeight: '500',
        marginTop: verticalScale(5),
        marginLeft: scale(15),
        alignSelf: 'center',
    },

    subHead: {
        fontSize: scale(14),
        color: COLOR_CONST.white,
        marginTop: verticalScale(10),
        alignSelf: 'center',
        textAlign: 'center',
        width: scale(340)
    },
})