import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale , {verticalScale} from '../../utils/Scale';
import ColorConstants, { colours } from '../../theme/ColorConstants';
import * as CONST from '../../theme/StringConstants';

export default StyleSheet.create({

    drawerContent: {
        flex: 1,
    },

    drawerContainer: { 
        flex: 1,
        // width: scale(280),
        backgroundColor: ColorConstants.themeBlue
    },

    userInfoSection: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    avatarImage: {
        height: scale(52),
        width: scale(52),
        marginLeft: scale(20),
        marginTop: verticalScale(28.07),
        backgroundColor: 'transparent',
    },

    drawerIcon: {
        height: scale(25),
        width: scale(25),
        justifyContent: 'center',
        alignItems: 'center'
    },

    profileName: {
        marginTop: verticalScale(16.07),
        marginLeft: scale(15),
        fontSize: scale(17),
        lineHeight: scale(20),
        color: ColorConstants.white,
    },

    profileSubText: {
        marginLeft: scale(15),
        fontSize: scale(13),
        lineHeight: scale(16),
        color: ColorConstants.white,
    },

    caption: {
        fontSize: 14,
        color: '#fff',
        lineHeight: 14,
    },

    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },

    drawerLabelStyle: {
        fontSize: scale(13),
        // lineHeight: scale(16),
        // marginLeft: scale(23),
    },

    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },

    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
        color: '#fff',
    },

    drawerSection: {
        marginTop: scale(20),
        marginLeft: scale(15),
    },

    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
    
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },

    logOutText: {
        marginTop: verticalScale(340), 
        marginLeft: scale(181), 
        marginBottom: verticalScale(22),
        color: ColorConstants.white
    },
    
    logoutButton: {
        // height: scale(150),
        position: 'absolute',
        bottom: 20,
        // left: 0,
        right: 10,
        padding: 20
    },

    logout: {
        fontSize: scale(13),
        lineHeight: scale(16),
        position: 'absolute', 
        bottom: verticalScale(30), 
        right: verticalScale(25), 
        color: ColorConstants.white,
    },
    
});
