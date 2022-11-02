import { StyleSheet } from 'react-native'
import scale, { verticalScale } from '../../utils/Scale'
import COLOR_CONST from '../../theme/ColorConstants'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_CONST.themeBlue
    },

    textInputContaier: {
        marginTop: verticalScale(30)
    },

    headingText: {
        fontSize: scale(24),
        // alignSelf: 'center',
        // textAlign: 'center',
        color: COLOR_CONST.themeOrange,
    },

    inputContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf: 'flex-start'
    },

    offerImageStyle: {
        height: scale(600),
        width: scale(328),
        alignSelf: 'center',
        borderRadius: scale(5),
    },

    blogImageStyle: {
        height: scale(250),
        width: scale(328),
        alignSelf: 'center',
        borderRadius: scale(5),
    },

    oferCellContainer: {
        // height: scale(310),
        width: scale(330),
        borderWidth: scale(0.5),
        borderColor: '#fff',
        borderRadius: scale(5),
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: verticalScale(20),
        paddingBottom: verticalScale(10)
    },

    offerTitle: {
        fontSize: scale(14),
        marginVertical: verticalScale(10), 
        color: COLOR_CONST.themeOrange,
        marginLeft: scale(10),
        fontWeight: '700'
    },

    blogSubText: {
        fontSize: scale(13),
        color: COLOR_CONST.white,
        marginLeft: scale(10),
        width: scale(300),
    },

    readMoreText: {
        fontSize: scale(12),
        color: COLOR_CONST.white,
        textDecorationLine: 'underline',
        marginLeft: scale(10),
        marginTop: verticalScale(5)
    },

    //Detail page design
    detailHeading: {
        fontSize: scale(22),
        color: COLOR_CONST.white,
        marginLeft: scale(10),
        marginTop: verticalScale(10),
        width: scale(300),
    },

    detailName: {
        fontSize: scale(14),
        color: COLOR_CONST.white,
        marginLeft: scale(5),
    },

    verticalDiv: {
        width: scale(1),
        height: scale(12),
        backgroundColor: COLOR_CONST.white,
        marginLeft: scale(5),
    },

    detailText: {
        fontSize: scale(12),
        color: COLOR_CONST.white,
        marginTop: verticalScale(15)
    },
    
    projectAdd: {
        color: COLOR_CONST.white,
        fontSize: scale(12),
        // fontWeight: '700',
        // marginLeft: scale(10),
        width: scale(320),
        marginTop: verticalScale(15)
    },

    detailImageStyle: {
        height: scale(470),
        width: scale(280),
        alignSelf: 'center',
        borderRadius: scale(5),
    },
})