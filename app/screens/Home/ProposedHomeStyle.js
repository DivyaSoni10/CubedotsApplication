import { StyleSheet } from 'react-native'
import scale, { verticalScale } from '../../utils/Scale'
import COLOR_CONST, { FONTS } from '../../theme/ColorConstants'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF'
    },

    headingView: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0 
    },

    menuIcon: {
        height: scale(12.2),
        width: scale(15.07),
        marginLeft: scale(20),
        marginTop: verticalScale(14)
    },

    headingText: {
        // fontSize: scale(24),
        // fontWeight: '700',
        // color: COLOR_CONST.themeBlue,
        marginTop: verticalScale(12),
        height: scale(10.39),
        width: scale(87.95)
    },

    userIcon: {
        height: scale(14.2),
        width: scale(14.2),
        marginRight: scale(20),
        marginTop: verticalScale(14)
    },

    imageList: {
        height: scale(414),
        width: scale(375),
        // borderRadius: scale(20),
        // marginLeft: scale(10),
        // marginTop: verticalScale(5)
    },

    pagination: {
        // position: 'absolute',
        // bottom: verticalScale(-50),
        // left: 0,
        // right: 0,
        // flexDirection: 'row',
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'transparent',
    },

    firstactiveDot: {
        backgroundColor: '#fff',
        borderWidth: scale(1),
        borderColor: '#000',
        width: scale(9),
        height: scale(9),
        borderRadius: scale(5),
        marginHorizontal: scale(5),
    },

    firstinActiveDot: {
        backgroundColor: '#000',
        width: scale(9),
        height: scale(9),
        borderRadius: scale(5),
        marginHorizontal: scale(5),
        // opacity: 0.3,
    },

    activeDot: {
        backgroundColor: '#ffffff',
        width: scale(42),
        height: scale(5),
        borderRadius: scale(5),
        marginHorizontal: scale(5),
    },

    inActiveDot: {
        backgroundColor: '#DEDEDE41',
        width: scale(42),
        height: scale(5),
        borderRadius: scale(5),
        marginHorizontal: scale(5),
        // opacity: 0.3,
    },

    wt1: {
        height: scale(466),
        width: scale(375),
        alignSelf: 'center',
        // backgroundColor: 'white'
    },

    gradientImage: {
        position: 'absolute',
        bottom: -30,
        left: 0,
        right: 0,
        width: scale(375),
        height: scale(426)
    },

    lacationRow: { 
        position: 'absolute', 
        bottom: scale(226), 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        alignSelf: 'flex-start', 
        marginLeft: scale(36) 
    },

    lacationconW: {
        height: scale(13),
        width: scale(9),
    },

    heading: {
        fontSize: scale(16),
        color: '#FFFFFF',
        fontWeight: '600',
        textAlign: 'center',
        marginLeft: scale(6.52)
    },

    subHeading: {
        fontSize: scale(28),
        color: '#FFFFFF',
        fontWeight: 'bold',
        position: 'absolute',
        bottom: scale(183),
        marginLeft: scale(36),
        width: scale(375),
        height: scale(42),
        marginTop: verticalScale(4)
    },

    price: {
        fontSize: scale(16),
        color: '#FFFFFF',
        fontWeight: '600',
        position: 'absolute',
        bottom: scale(156),
        marginTop: verticalScale(4),
        marginLeft: scale(36)
    },

    nextBtn: {
        height: scale(50),
        width: scale(300),
        // marginVertical: verticalScale(30),
        bottom: 30,
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(10),
        backgroundColor: COLOR_CONST.btnBgColor,
        borderColor: COLOR_CONST.loginBtnOuterColor
    },

    nextBtnText: {
        fontSize: scale(14),
        color: COLOR_CONST.white,
        fontWeight: 'bold'
    },

    dummyText: {
        fontSize: scale(16),
        lineHeight: scale(15),
        fontWeight: '500',
        color: '#002532',
        alignSelf: 'center',
        marginTop: verticalScale(29.5),
        fontWeight: 'bold',
    },

    viewProjBtn: {
        height: scale(37),
        width: scale(165),
        // marginVertical: verticalScale(30),
        // bottom: scale(0),
        // position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(4),
        backgroundColor: '#F8400C',
        marginLeft: scale(36),
        // overflow: 'hidden',
        // shadowColor: '#B42801ED',
        // shadowOffset: { width: 4, height: 3 },
        // shadowOpacity: 1,
        // shadowRadius: 5,
    },

    viewProjText: {
        fontSize: scale(14),
        color: '#ffffff',
        lineHeight: scale(18),
        fontWeight: 'bold',
        // fontFamily: FONTS.RobotoRegular,
        textAlign: 'center'
    },

    swiperProgressList: {
        width: scale(310), 
        height: scale(5), 
        position: 'absolute', 
        bottom: scale(23), 
        playArrow: false, 
        alignSelf: 'center', 
        marginHorizontal: scale(15) 
    }

})