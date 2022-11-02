import scale, { verticalScale } from '../../utils/Scale';
import COLOR_CONST, { FONTS } from '../../theme/ColorConstants';

const styles = {
    container: {
        width:"100%",
        height:"100%",
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: 'transparent',
    },

    modalContainer: {
        flex: 1,
        backgroundColor: '#00000090',
        justifyContent: 'center',
        alignItems: 'center'
    },

    transparentBg: {
        flex: 1,
        // backgroundColor: '#3e3e3e',
        // opacity: 0.55,
    },

    bottomView: {
        width: scale(340),
        height: scale(380),
        backgroundColor: '#fff',
        borderRadius: scale(20),
        alignSelf: 'center'
    },

    crossIcon: {
        height: scale(25),
        width: scale(25),
        marginRight: scale(20),
        marginTop: verticalScale(10),
        alignSelf: 'flex-end' 
    },

    //Calendar style start
    monthTitleStyle: {
        fontSize: scale(18),
        fontWeight: '500',
        color: COLOR_CONST.themeBlue
    },

    yearTitleStyle: {
        fontSize: scale(18),
        fontWeight: '500',
        color: COLOR_CONST.themeBlue
    },

    previousTitleStyle: {
        fontSize: scale(14),
        fontWeight: '600',
        color: "#00000080",
        marginLeft: scale(20)
    },

    nextTitleStyle: {
        fontSize: scale(14),
        fontWeight: '600',
        color: "#00000080",
        marginRight: scale(20)
    },

    selectedDayStyle: {
        height: scale(30),
        width: scale(30),
        backgroundColor: COLOR_CONST.themeOrange
    },

    selectedDayTextStyle: {
        fontSize: scale(16),
        fontWeight: '700',
        color: COLOR_CONST.white
    },

    disabledDatesTextStyle: {
        fontSize: scale(16),
        fontWeight: '600',
        color: "#00000040"
    },

    todayTextStyle: {
        fontSize: scale(16),
        fontWeight: '600',
        color: "#000000"
    },

    textStyle: {
        fontSize: scale(14),
        fontWeight: '500',
        color: "#000000",
        opacity: 0.8
    },

    dayOfWeekStyles: {
        fontSize: scale(16),
        fontWeight: '600',
        color: "#00000050"
    },
    //Calendar style end

    submitBtn: {
        height: scale(40),
        width: scale(60),
        borderRadius: scale(10),
        backgroundColor: COLOR_CONST.themeOrange,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

    submitBtnText: { fontSize: scale(18), color: 'white' },
}
export default styles;