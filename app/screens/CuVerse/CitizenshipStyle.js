import { StyleSheet } from 'react-native'
import scale, { verticalScale } from '../../utils/Scale'
import COLOR_CONST from '../../theme/ColorConstants'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_CONST.themeBlue
    },

    textInputContaier: {
        marginTop: verticalScale(50)
    },

    headingText: {
        fontSize: scale(24),
        // alignSelf: 'center',
        // textAlign: 'center',
        color: COLOR_CONST.themeOrange,
    },

    docContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems :'center',
        paddingHorizontal: scale(40),
        marginTop: verticalScale(30)
    },

    docIcon: {
        height: scale(40),
        width: scale(30)
    },

    docText: {
        fontSize: scale(14),
        color: COLOR_CONST.white,
        width: scale(120),
        height: scale(65),
        marginTop: verticalScale(10),
        lineHeight: scale(20),
    },

    readMoreView: {
        height: scale(20),
        width: scale(90),
        borderRadius: scale(5),
        backgroundColor: COLOR_CONST.themeOrange,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(5),
        marginTop: verticalScale(15)
    },

    readMoreIcon: {
        height: scale(14),
        width: scale(14)
    },

    readMoreText: {
        fontSize: scale(12),
        color: COLOR_CONST.white
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
        height: scale(600),
        backgroundColor: '#fff',
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(20),
        paddingBottom: verticalScale(5)
    },

    crossIconPdf: {
        height: scale(20),
        width: scale(20),
        marginRight: scale(10),
        marginTop: verticalScale(5),
        alignSelf: 'flex-end'
    },
})