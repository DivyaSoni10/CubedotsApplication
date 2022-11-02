
import { StyleSheet } from 'react-native'
import scale, { verticalScale } from '../../utils/Scale'
import COLOR_CONST, { FONTS } from '../../theme/ColorConstants'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF'
    },

    cardView: {
        height: scale(241),
        width: scale(302),
        marginHorizontal: scale(15),
        borderRadius: scale(10),
        backgroundColor: '#fff',
        // justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: scale(27),
        paddingVertical: scale(29)
    },

    cardHeadingText: {
        fontSize: scale(16),
        color: '#002532',
        fontFamily: FONTS.RobotoBold,
        // marginTop: verticalScale(17),
        alignSelf: 'flex-start',
        textTransform: 'uppercase'
    },

    cardSubHeading: {
        fontSize: scale(12),
        fontFamily: FONTS.RobotoRegular,
        // width: scale(220),
        color: '#74747494',
        // fontWeight: 'bold',
        lineHeight: scale(19),
        marginTop: verticalScale(10),
        alignSelf: 'flex-start'
    },

    exploreBtn: {
        // height: scale(37),
        // width: scale(153),
        // justifyContent: 'center',
        // alignItems: 'center',
        // borderRadius: scale(4),
        // backgroundColor: '#F8400C',
        // overflow: 'hidden',
        // shadowColor: '#B42801ED',
        // shadowOffset: { width: 4, height: 3 },
        // shadowOpacity: 1,
        // shadowRadius: 5,
        marginTop: verticalScale(30),
        alignSelf: 'flex-start',
        height: scale(37),
        width: scale(153),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(4),
        backgroundColor: '#F8400C', 
        marginLeft: scale(0),
    },

    exploreText: {
        fontSize: scale(14),
        color: '#ffffff',
        // lineHeight: scale(18),
        fontFamily: FONTS.RobotoBold,
        // fontFamily: FONTS.RobotoRegular,
        textAlign: 'center'
    },

    extendedCardView: {
        // height: scale(241),
        width: scale(302),
        marginHorizontal: scale(15),
        backgroundColor: '#002532',
        shadowColor: COLOR_CONST.black,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        justifyContent: 'center',
        alignItems:'center',
        alignSelf: 'center',
        // paddingHorizontal: scale(27),
        // paddingVertical: scale(29)
    },

    headView: {
        height: scale(50.5),
        width: scale(302),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },

    headText: {
        fontSize: scale(12),
        color: '#ffffff',
        lineHeight: scale(18),
        // fontFamily: FONTS.RobotoBold,
        fontFamily: FONTS.RobotoRegular,
        textAlign: 'center'
    },

    headBackIcon: {
        height: scale(10.18),
        width: scale(5.82),
        marginLeft: scale(17)
    },

    headThreeDot: {
        height: scale(12.25),
        width: scale(2.23),
        marginRight: scale(27)    
    },

    headCross: {
        height: scale(8.11),
        width: scale(8.11),
        marginRight: scale(27)    
    },

    headDivider: {
        height: scale(0.5),
        width: scale(302),
        backgroundColor: '#F1F1F1',
        alignSelf: 'center'
    },

    pagination: {
        // marginTop: verticalScale(20),
        // position: 'absolute',
        // bottom: 0,
        height: scale(305),
        borderBottomLeftRadius: scale(10),
        borderBottomRightRadius: scale(10),
        overflow: 'hidden'
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
        height: scale(305),
        width: scale(302),
        alignSelf: 'center',
        borderBottomLeftRadius: scale(10), borderBottomRightRadius: scale(10)
    },
    
    swiperSubHead: {
        fontSize: scale(14),
        width: scale(231),
        color: '#002532',
        fontFamily: FONTS.RobotoRegular,        
        marginTop: verticalScale(27),
        alignSelf: 'flex-start',
    },

    radioCellStyle: {
        height: scale(44),
        width: scale(302),
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    radioCellText: {
        fontSize: scale(16),
        // width: scale(95),
        marginTop: verticalScale(12),
        alignSelf: 'center',
    },

    radioCellBtn: {
        paddingLeft: scale(57), 
        justifyContent: 'center', 
        alignSelf: 'center' 
    }
})