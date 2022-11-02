import { StyleSheet } from 'react-native'
import scale, { verticalScale } from '../../utils/Scale'
import COLOR_CONST, { FONTS } from '../../theme/ColorConstants'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    menuIcon: {
        height: scale(14.66),
        width: scale(22.06),
        marginLeft: scale(22)
    },

    headingText: {
        fontSize: scale(18),
        // fontWeight: '700',
        color: COLOR_CONST.wDHeadingText,
        fontFamily: FONTS.RobotoMedium
    },

    bellIcon: {
        height: scale(15.51),
        width: scale(13.96),
        marginRight: scale(27)
    },

    heartIcon: {
        height: scale(12.82),
        width: scale(14.65),
        // marginRight: scale(10.44)
    },
    
    wDTotalListView: {
        height: scale(163.49),
        width: scale(309),
        borderRadius: scale(10),
        backgroundColor: COLOR_CONST.white,
        // paddingHorizontal: scale(32.5),
        paddingTop: verticalScale(5),
        shadowColor: '#45BCF22E',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: { width: 5, height: 10 },
        alignSelf: 'center',
        marginTop: verticalScale(15.51)
    },

    wDTotalCellView: {
        // height: scale(50),
        // width: scale(200),
        marginLeft: scale(40),
        marginTop: verticalScale(15),
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
        // justifyContent: 'space-between',
        // paddingHorizontal: scale(10),
    },

    wDTotalCellText: {
        fontSize: scale(9),
        color: COLOR_CONST.wDLabels,
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: FONTS.RobotoMedium
    },

    wDTotalCellImage: {
        height: scale(25),
        width: scale(25),
        // marginRight: scale(5),
        alignSelf: 'center'
    },
})