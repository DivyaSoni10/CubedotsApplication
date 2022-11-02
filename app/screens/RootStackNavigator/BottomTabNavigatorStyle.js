import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale , {verticalScale} from '../../utils/Scale';
import COLOR_CONST, { FONTS } from '../../../app/theme/ColorConstants';

export default StyleSheet.create({
    container: {
        width: scale(375),
        height: scale(50),
        flexDirection: 'row',
        // justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: {width: 1, height: 7}
    },

    outerContainer: { 
        width: scale(375),
        height: scale(76),
        flex: 1, 
        // paddingHorizontal: scale(16),
    },

    tabContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: scale(50),
        borderRadius: scale(16),
    },

    labelStyle: {
        fontSize: scale(11),
        lineHeight: scale(16.5),
        color: '#FF6347',
        // fontWeight: '500',
        marginTop: verticalScale(5),
    },

    menuIcons: {
        width: scale(15),
        height: scale(15),
    },

    cartIcons: {
        width: scale(15),
        height: scale(17),
    },

    homelIcon: {
        width: scale(30),
        height: scale(30),
    },

    mreIcon: {
        width: scale(18),
        height: scale(18),
    },

    bagIcon: {
        width: scale(18),
        height: scale(18),
    },

    manIcon: {
        width: scale(27),
        height: scale(19),
    },

    homeView1: {
        width: scale(80),
        height: scale(80),
        borderRadius: scale(50),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        position: 'absolute',
        bottom: verticalScale(10)
    },

    homeView2: {
        width: scale(60),
        height: scale(60),
        borderRadius: scale(50),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR_CONST.btnBgColor,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: {width: 1, height: 7}
    }
});