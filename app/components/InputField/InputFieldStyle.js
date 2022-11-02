import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale , {verticalScale} from '../../utils/Scale';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import { FONTS } from '../../../app/theme/ColorConstants';

export default StyleSheet.create({

    container: {
        flex: 1,
        height: verticalScale(54),
        backgroundColor: 'white',
        justifyContent: 'center'
    },

    viewContainer: {
        flex: 1,
        flexDirection: 'row'
    },

    paddingView: {
        width: 15
    },
    
    floatingLabel: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    
    fieldLabel: {
        fontFamily: FONTS.MetropolisSemiBold,
        height: scale(20),
        fontSize: scale(13),
        color: '#aeaeae'
    },
      
    fieldContainer: {
        flex: 1,
        justifyContent: 'center',
        position: 'relative'
    },
      
    withBorder: {
    },
      
    valueText: {
        height: (Platform.OS == 'ios' ? 30 : 60),
        fontSize: scale(13),
        lineHeight: scale(20),
        color: COLOR_CONST.darkTitle,
        fontFamily: FONTS.MetropolisMedium
    },
      
    focused: {
        color: "#B1B1B1"
    }
    
});
