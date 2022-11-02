import { StyleSheet } from 'react-native'
import scale, { verticalScale } from '../../utils/Scale'
import COLOR_CONST from '../../theme/ColorConstants'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
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

    tabView: {
        marginLeft: scale(20),
        flexDirection: 'row',
        marginTop: verticalScale(20),
        alignItems: 'center',
        justifyContent: 'space-between',
        width: scale(250),
        alignSelf: 'center'
    },

    selectedTabView: {
        borderRadius: scale(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(3),
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 1, height: 3 }
    },

    selectedText: {
        fontSize: scale(14),
        fontWeight: '500',
    },

    privacyContainer: {
        padding: 10,
    },

    cookieContainer: {
        padding: 10,
    },

    subText: {
        fontSize: scale(16),
        color: COLOR_CONST.themeBlue,
        marginTop: verticalScale(5),
        // marginLeft: scale(20)
    },
})