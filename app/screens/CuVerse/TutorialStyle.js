import { StyleSheet } from 'react-native'
import scale, { verticalScale } from '../../utils/Scale'
import COLOR_CONST from '../../theme/ColorConstants'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_CONST.themeBlue
    },

    textInputContaier: {
        marginTop: verticalScale(50),
    },

    headingText: {
        fontSize: scale(24),
        // alignSelf: 'center',
        // textAlign: 'center',
        color: COLOR_CONST.themeOrange,
    },

    pdfImage: {
        width: scale(90),
        height: scale(50),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },

    videoName: {
        fontSize: scale(18),
        alignSelf: 'center',
        color: COLOR_CONST.themeOrange,
    },
})