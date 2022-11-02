import { StyleSheet } from 'react-native'
import scale, { verticalScale } from '../../utils/Scale'
import COLOR_CONST from '../../theme/ColorConstants'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_CONST.themeBlue
    },

    textInputContaier: {
        // alignSelf: 'center',
        marginTop: verticalScale(40),
    },

    headingText: {
        fontSize: scale(24),
        // alignSelf: 'center',
        // textAlign: 'center',
        marginLeft: scale(10),
        color: COLOR_CONST.white,
        fontWeight: '500',
    },

    projectDescription: {
        width: scale(350),
        alignSelf: 'center',
        backgroundColor: COLOR_CONST.white,
        borderRadius: scale(10),
        paddingBottom: verticalScale(10),
        marginTop: verticalScale(20),
        padding: 20
    },

    subheadText: {
        fontSize: scale(18),
        marginLeft: scale(10),
        color: COLOR_CONST.themeOrange,
        fontWeight: '400',
    },

    imageList: {
        height: scale(160),
        width: scale(350),
        borderRadius: scale(10),
        alignSelf: 'center',
    },

    projectName: {
        color: COLOR_CONST.themeOrange,
        fontSize: scale(16),
        fontWeight: '700',
        marginLeft: scale(10),
        marginTop: verticalScale(10)
    },

    projectPrice: {
        color: COLOR_CONST.white,
        fontSize: scale(12),
        fontWeight: '600',
        marginLeft: scale(10),
        marginTop: verticalScale(5)
    },

    projectSubDes: {
        color: COLOR_CONST.black,
        fontSize: scale(13),
        fontWeight: '600',
        marginLeft: scale(10),
        marginTop: verticalScale(10)
    },

    projectAdd: {
        color: COLOR_CONST.white,
        fontSize: scale(12),
        // fontWeight: '700',
        marginLeft: scale(10),
        width: scale(300),
    },

    buttonsView: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: verticalScale(15),
        marginBottom: verticalScale(20),
        paddingHorizontal: scale(50),

    },

    button2D: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR_CONST.themeOrange,
        height: scale(35),
        width: scale(110),
        borderRadius: scale(10)
    },

    D2DText: {
        color: COLOR_CONST.white,
        fontSize: scale(14),
    },

    projectDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        width: scale(300),
        paddingVertical: verticalScale(30)
    },

    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    detailIcon: {
        height: 30,
        width: 30
    },

    detailText: {
        color: COLOR_CONST.white,
        fontSize: scale(13),
        marginTop: verticalScale(8),
    },

    tabView: {
        marginLeft: scale(20),
        flexDirection: 'row',
        marginTop: verticalScale(20),
        alignItems: 'center',
        justifyContent: 'space-between',
        width: scale(150)
    },

    selectedTabView: {
        width: scale(80),
        height: scale(40),
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: scale(5),
        borderTopRightRadius: scale(5),
        borderBottomWidth: 2,
        borderBottomColor: COLOR_CONST.themeOrange,
        backgroundColor: COLOR_CONST.white,
        shadowColor: '#fff',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 1, height: 3 }
    },

    selectedText: {
        fontSize: scale(14),
        fontWeight: '400',
    },

    deselectedTabView: {
        height: scale(40),
        width: scale(80),
        borderRadius: scale(5),
        justifyContent: 'center',
        alignItems: 'center',
    },

    hedingDivider: {
        width: scale(330),
        height: 1,
        backgroundColor: COLOR_CONST.white,
        opacity: 0.7,
        marginLeft: scale(20)
    },

    listView: {
        alignSelf: 'center',
        padding: 10
    },

    cellView: {
        marginHorizontal: scale(10),
        marginVertical: verticalScale(5),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: scale(150),
        // width: scale(170),
    },

    modalListView: {
        marginLeft: scale(10),
        alignSelf: 'flex-start',
        width: scale(50),
        marginBottom: verticalScale(40)
        // alignItems: 'flex-start'
    },

    modalCellView: {
        marginVertical: verticalScale(3),
        width: scale(50),
        borderColor: COLOR_CONST.themeOrange
    },

    cellImage: {
        height: scale(50),
        width: scale(50),
    },

    showBigImage: {
        height: scale(250),
        width: scale(290),
        marginRight: scale(10),
        alignSelf: 'center'
    },

    tabSelectedText: {
        color: '#fff',
        marginTop: verticalScale(10),
        marginLeft: scale(20)
    },

    amenitiesCellView: {
        marginHorizontal: scale(10),
        marginVertical: verticalScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: scale(90),
    },

    amenitiesCellImage: {
        marginHorizontal: scale(10),
        // marginVertical: verticalScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: scale(30),
        width: scale(30),
        resizeMode: 'contain'
    },

    otherPhotosView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: scale(50),
        width: scale(70),
        position: 'absolute', bottom: 20, right: 20
    },

    amenitiesTab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: scale(100),
        height: scale(40),
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: scale(5),
        borderTopRightRadius: scale(5),
        borderWidth: 0.8,
        borderBottomColor: COLOR_CONST.themeOrange,
        borderColor: '#00000030',
        backgroundColor: COLOR_CONST.white,
        shadowColor: '#fff',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 1, height: 3 },
        marginTop: verticalScale(20),
        marginLeft: scale(20)
    },

    amenitiesDivider: {
        width: scale(300),
        height: 1,
        backgroundColor: '#000000',
        opacity: 0.2,
        marginLeft: scale(20)
    },

    amenitiesText: {
        fontSize: scale(13),
        fontWeight: '700',
    },

    amenitiesHeadText: {
        fontSize: scale(13),
        // fontWeight: '500',
        color: COLOR_CONST.black,
        marginTop: verticalScale(5),
        textAlign: 'center',
        textTransform: 'uppercase'
    },

    nearByTable: {
        width: scale(350),
        alignSelf: 'center',
        marginTop: verticalScale(20),
        borderWidth: 1,
        borderColor: '#ffffff70',
        marginBottom: verticalScale(30)
    },

    nearByTabView: {
        flexDirection: 'row',
        // marginTop: verticalScale(20),
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    nearBySelectedTabView: {
        width: scale(80),
        height: scale(40),
        justifyContent: 'center',
        alignItems: 'center',
        // borderTopLeftRadius: scale(5),
        // borderTopRightRadius: scale(5),
        borderBottomWidth: 2,
        borderBottomColor: COLOR_CONST.themeOrange,
        backgroundColor: COLOR_CONST.white,
        shadowColor: '#fff',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 1, height: 3 }
    },

    nearBySelectedText: {
        fontSize: scale(14),
        fontWeight: '400',
        textAlign: 'center'
    },

    nearByDeselectedTabView: {
        height: scale(40),
        width: scale(80),
        borderRadius: scale(5),
        justifyContent: 'center',
        alignItems: 'center',
    },

    nearByHedingDivider: {
        width: '100%',
        height: 1,
        backgroundColor: COLOR_CONST.white,
        opacity: 0.7,
    },

    nearByCell: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: scale(330),
        paddingHorizontal: scale(10),
        marginBottom: verticalScale(10)
    },

    nearByCellText: {
        fontSize: scale(14),
        color: COLOR_CONST.white,
        width: scale(160),
        marginTop: verticalScale(5),
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
        height: scale(450),
        backgroundColor: '#fff',
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(20)
    },

    crossIcon: {
        height: scale(25),
        width: scale(25),
        marginRight: scale(20),
        marginTop: verticalScale(10),
        alignSelf: 'flex-end'
    },
})