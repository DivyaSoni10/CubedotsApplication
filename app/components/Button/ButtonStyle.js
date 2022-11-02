import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale , {verticalScale} from '../../utils/Scale';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import { FONTS } from '../../../app/theme/ColorConstants';

export default StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems:'center',
        width: scale(311),
        height: verticalScale(54),
        backgroundColor: COLOR_CONST.buttonColor,
        borderRadius: scale(8)
    },

    disabledButton: {
        justifyContent: 'center',
        alignItems:'center',
        width: scale(311),
        height: verticalScale(54),
        backgroundColor: COLOR_CONST.disabledButtonColor,
        borderRadius: scale(8)
    },

    lightContainer: {
        justifyContent: 'center',
        alignItems:'center',
        width: scale(311),
        height: verticalScale(54),
        backgroundColor: COLOR_CONST.white,
        borderWidth: scale(2),
        borderColor: COLOR_CONST.buttonColor,
        borderRadius: scale(8)
    },

    buttonTitle: {
        color: COLOR_CONST.white,
        fontSize: scale(14),
        fontFamily: FONTS.MetropolisBold,
    },

    lightButtonTitle: {
        color: COLOR_CONST.buttonColor,
        fontSize: scale(14),
        fontFamily: FONTS.MetropolisBold,
    },
    
});
