import { StyleSheet } from 'react-native'
import scale, { verticalScale } from '../../utils/Scale'
import COLOR_CONST from '../../theme/ColorConstants'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_CONST.themeBlue
    },

    textInputContaier: {
        marginTop: verticalScale(30),
        marginBottom: verticalScale(20)
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

    mainImage: {
        height: scale(250),
        width: scale(355),
        alignSelf: 'center',
        marginTop: verticalScale(20)
    },

    headingText: {
        fontSize: scale(24),
        marginLeft: scale(10),
        color: COLOR_CONST.themeOrange,
        fontWeight: '600',
        marginTop: verticalScale(30),
    },

    sideImage: {
        height: scale(30),
        width: scale(30),
        marginLeft: scale(10),
    },

    subHead: {
        fontSize: scale(16),
        marginLeft: scale(10),
        color: COLOR_CONST.white,
        fontWeight: '700',
        marginTop: verticalScale(20),
        marginLeft: scale(15),
    },

    subText: {
        fontSize: scale(12),
        marginLeft: scale(10),
        color: COLOR_CONST.white,
        marginTop: verticalScale(10),
        marginLeft: scale(15),
    },

    //CUVERSE PROJECT STYLE
    headingTextPro: {
        fontSize: scale(24),
        marginLeft: scale(20),
        color: COLOR_CONST.themeOrange,
        fontWeight: '600',
        marginTop: verticalScale(10),
    },

    mainImageProject: {
        height: scale(500),
        width: scale(340),
        alignSelf: 'center',
        marginTop: verticalScale(20)
    },

    projectsFolderHeader: {
        alignItems: 'center',
        // alignSelf: 'center',
        marginTop: verticalScale(10),
        flexDirection: 'row',
        marginTop: verticalScale(30),
        marginLeft: scale(30),
    },

    headingFile: {
        fontSize: scale(20),
        color: COLOR_CONST.white,
        fontWeight: '600',
    },

    itemHoriView: {
        // justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: verticalScale(20),
        flexDirection: 'row',
        width: scale(320)
    },

    filefolder: {
        height: scale(60),
        width: scale(60),
        alignSelf: 'center',
        marginLeft: scale(15),
    },

    folderTextHead: {
        fontSize: scale(12),
        color: COLOR_CONST.white,
        // fontWeight: '700',
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginTop: verticalScale(5),
        marginLeft: scale(15),
        width: scale(210)
    },

    downloadBtn: {
        alignItems: 'center',
        marginTop: verticalScale(10),
        flexDirection: 'row',
        height: scale(30),
        width: scale(80),
        backgroundColor: '#ffffff10',
        borderRadius: scale(3),
        marginLeft: scale(15),
        paddingHorizontal: scale(5)
        // width: scale(300)
    },

    downloadImage: {
        height: scale(15),
        width: scale(15),
        alignSelf: 'center',
    },

    downloadText: {
        fontSize: scale(10),
        color: COLOR_CONST.white,
        alignSelf: 'center',
        marginLeft: scale(5),
    },
});