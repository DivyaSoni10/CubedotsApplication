import * as IMG_CONST from '../theme/ImageConstants';
import { useLinkBuilder } from '@react-navigation/native';
import Scale from '../utils/Scale';

//*> USER CONSTANTS
export default Users = [
    {
        id: 1, 
        email: 'user1@email.com',
        username: 'user1', 
        password: 'password', 
        userToken: 'token123'
    },
    {
        id: 2, 
        email: 'user2@email.com',
        username: 'user2', 
        password: 'pass1234', 
        userToken: 'token12345'
    },
    {
        id: 3, 
        email: 'testuser@email.com',
        username: 'testuser', 
        password: 'testpass', 
        userToken: 'testtoken'
    },
];

export const MenuItems = [
    {
        index: 0,
        active: true,
        label: 'Home',
        // label: 'Reminders',
        iconName: IMG_CONST.homeDr,
        screenName: 'DrawerNavigator'
    },
    // {
    //     index: 1,
    //     active: false,
    //     label: 'Meetings',
    //     iconName: IMG_CONST.whiteUser,
    //     // screenName: 'Home'
    // },
    // {
    //     index: 2,
    //     active: false,
    //     label: 'Payment Plans',
    //     iconName: IMG_CONST.whiteUser,
    //     // screenName: 'Privacy'
    // },
    {
        index: 3,
        active: false,
        label: 'Projects',
        iconName: IMG_CONST.projectDr,
        screenName: 'ProjectListing'
    },
    {
        index: 4,
        active: false,
        label: 'CuVerse',
        iconName: IMG_CONST.cuVersDr,
        screenName: 'CuVerse',
    },
    {
        index: 5,
        active: false,
        label: 'CuSocial',
        iconName: IMG_CONST.socilaIcon,
        screenName: 'CuSocial'
    },
    {
        index: 6,
        active: false,
        label: 'Contact Us',
        iconName: IMG_CONST.contactUsDr,
        screenName: 'ContactUs'
    },
    {
        index: 2,
        active: false,
        label: 'Privacy Policy',
        iconName: IMG_CONST.information,
        screenName: 'https://staging.cubedots.com/privacy-policy'
    },
    {
        index: 7,
        active: false,
        label: 'Help & Support',
        iconName: IMG_CONST.helpAndSupportDr,
        screenName: 'HeplSupport'
    },
    // {
    //     index: 7,
    //     active: false,
    //     label: 'Log out',
    //     iconName: 'home-outline',
    //     screenName: 'Home'
    // },
];

//Notification Data
export const NotificationList = [
    {
        id: 1,
        notificationTetx: 'Norah Cullen has posted score for 25h Aug, 20(Tue)',
        timeAgo: '2 hours ago',
        profilePicture: '',
    },
    {
        id: 2,
        notificationTetx: 'Norah Cullen has liked News',
        timeAgo: '1 day ago',
        profilePicture: '',
    },
    {
        id: 3,
        notificationTetx: 'Norah Cullen has commented on news',
        timeAgo: '13 Aug 2020',
        profilePicture: '',
    },
    {
        id: 4,
        notificationTetx: 'Norah Cullen has posted score for 25h Aug, 20(Tue)',
        timeAgo: '2 hours ago',
        profilePicture: '',
    },
    {
        id: 5,
        notificationTetx: 'Norah Cullen has liked News',
        timeAgo: '1 day ago',
        profilePicture: '',
    },
    {
        id: 6,
        notificationTetx: 'Norah Cullen has commented on news',
        timeAgo: '13 Aug 2020',
        profilePicture: '',
    },
    {
        id: 7,
        notificationTetx: 'Norah Cullen has posted score for 25h Aug, 20(Tue)',
        timeAgo: '2 hours ago',
        profilePicture: '',
    },
    {
        id: 8,
        notificationTetx: 'Norah Cullen has liked News',
        timeAgo: '1 day ago',
        profilePicture: '',
    },
    {
        id: 9,
        notificationTetx: 'Norah Cullen has commented on news',
        timeAgo: '13 Aug 2020',
        profilePicture: '',
    },
    {
        id: 10,
        notificationTetx: 'Norah Cullen has posted score for 25h Aug, 20(Tue)',
        timeAgo: '2 hours ago',
        profilePicture: '',
    },
    {
        id: 11,
        notificationTetx: 'Norah Cullen has liked News',
        timeAgo: '1 day ago',
        profilePicture: '',
    },
    {
        id: 12,
        notificationTetx: 'Norah Cullen has commented on news',
        timeAgo: '13 Aug 2020',
        profilePicture: '',
    }
];

//My Circle Tab Data
export const MyCircleTabPostList = [
    {
        id: 1,
        isMoreIconPressed: false,
        profilePhoto: IMG_CONST.PROFILE1_IMAGE,
        statusOfPost1: 'commented on',
        statusOfPost2: 'status.',
        personName: "Troy Youth's ",
        postText: '"Today is great day to be out and about',
        postText1: 'with the team. Beers later?"',
        postImage: null,
        commentOn: true,
        showSuggestions: false,
    },
    {
        id: 2, 
        isMoreIconPressed: false,
        profilePhoto: IMG_CONST.PROFILE1_IMAGE,
        statusOfPost1: 'liked',
        statusOfPost2: 'post.',
        personName: "Danny Bradman's ",
        postText: '"Have a look at these ground guys"',
        postImage: IMG_CONST.PAHALGAM_IMAGE,
        postImageStyle: {height: Scale(150), width: Scale(256)},
        postImage1: IMG_CONST.PAHALGAM_IMAGE,
        postImageStyle1: {height: Scale(150), width: Scale(300), borderRadius: Scale(6)},
        commentOn: null,
        showSuggestions: false,
    },
    {
        id: 3, 
        isMoreIconPressed: false,
        profilePhoto: IMG_CONST.PROFILE1_IMAGE,
        statusOfPost1: 'checked in',
        personName: "GN Golf Course",
        postImage: null,
        commentOn: null,
        showSuggestions: false,
    },
    
];
export const MyCircleTabPostList2 = [
    {
        id: 1, 
        isMoreIconPressed: false,
        profilePhoto: IMG_CONST.PROFILE1_IMAGE,
        statusOfPost1: 'liked',
        statusOfPost2: 'post.',
        personName: "Danny Bradman's ",
        postText: '"Have a look at these ground guys"',
        postImage: IMG_CONST.SPLASH_BG,
        commentOn: null,
        showSuggestions: false,
    },
    {
        id: 2, 
        isMoreIconPressed: false,
        profilePhoto: IMG_CONST.PROFILE1_IMAGE,
        statusOfPost1: 'checked in',
        personName: "GN Golf Course",
        postImage: null,
        commentOn: null,
        showSuggestions: false,
    },
    
];
export const MyCircleTabPostList1 = [
    {
        id: 1, 
        isMoreIconPressed: false,
        profilePhoto: IMG_CONST.PROFILE1_IMAGE,
        statusOfPost1: 'liked',
        statusOfPost2: 'post.',
        personName: "Danny Bradman's ",
        postText: '"Have a look at these ground guys"',
        postImage: IMG_CONST.SPLASH_BG,
        postImageStyle: {height: Scale(150), width: Scale(256)},
        commentOn: null,
    },
    
];

//Group Tab View Data
export const GroupsSuggestionList =[
    {
        id: 1, 
        name: 'Golf in Delhi NCR', 
        member: 13,
        profileImage: IMG_CONST.BROWSE_GROUP_USER1,
    },
    {
        id: 2, 
        name: 'Velas', 
        member: 41,
        profileImage: IMG_CONST.BROWSE_GROUP_USER2,
    }, 
    {
        id:3, 
        name: 'SDC CT', 
        member: 6,
        profileImage: IMG_CONST.BROWSE_GROUP_USER3,
    }, 
    {
        id: 4, 
        name: 'CNBC', 
        member: 13,
        profileImage: IMG_CONST.BROWSE_GROUP_USER3,
    }, 
    {
        id: 5, 
        name: 'QQTT Mumbai', 
        member: 13,
        profileImage: IMG_CONST.BROWSE_GROUP_USER3,
    }, 
    {
        id:6, 
        name: 'OOTT Bangalore', 
        member: 13,
        profileImage: IMG_CONST.BROWSE_GROUP_USER3,
    },
];

export const BrowseGroupList =[
    {
        id: 1,
        name: 'Name',
        location: 'Location',
        member: null,
        profileImage: IMG_CONST.BROWSE_GROUP_USER1,
    }, 
    {
        id: 2,
        name: 'Golf rules & clarification',
        location: 'New Delhi',
        member: 41,
        profileImage: IMG_CONST.BROWSE_GROUP_USER2,
    },
    {
        id:3,
        name: 'DGC GOLFERS',
        location: '',
        member: 11,
        profileImage: IMG_CONST.BROWSE_GROUP_USER3,
    }, 
    {
        id: 4, 
        name: 'SWING SAFE',
        location: 'Noida',
        member: 42,
        profileImage: IMG_CONST.BROWSE_GROUP_USER4,
    }
];

//Book Tee Time Tab View Data
export const BookTeeTimeList = [
    {
        id: 1, 
        membersOnly: true, 
        backgroundImage: IMG_CONST.GOLF_COURSE_IMAGE,
    }, 
    {
        id: 2, 
        membersOnly: false, 
        backgroundImage: IMG_CONST.HOLE18_BOKK_TEE_BG,
    }, 
    {
        id: 3, 
        membersOnly: false, 
        backgroundImage: IMG_CONST.HOLE18_BOKK_TEE_BG,
    },
];

//Profile Data
export const FriendImagesList = [
    {
        id: 1,
        profilePicture: IMG_CONST.FRIENDS_PROFILE_IMAGE1,
    },
    {
        id: 2,
        profilePicture: IMG_CONST.FRIENDS_PROFILE_IMAGE2,
    },
    {
        id: 3,
        profilePicture: IMG_CONST.FRIENDS_PROFILE_IMAGE3,
    },
    {
        id: 4,
        profilePicture: IMG_CONST.FRIENDS_PROFILE_IMAGE4,
    },
];

export const PhotosImagesList = [
    {
        id: 1,
        profilePicture: IMG_CONST.PROFILE_PHOTOS_IMAGE1,
    },
    {
        id: 2,
        profilePicture: IMG_CONST.PROFILE_PHOTOS_IMAGE2,
    },
    {
        id: 3,
        profilePicture: IMG_CONST.PROFILE_PHOTOS_IMAGE3,
    },
    {
        id: 4,
        profilePicture: IMG_CONST.PROFILE_PHOTOS_IMAGE4,
    },
];

export const VideosImagesList = [
    {
        id: 1,
        profilePicture: IMG_CONST.PROFILE_PHOTOS_IMAGE1,
    },,
];

export const ProfileMyFriendsList = [
    {
        id: 1,
        profileImage: IMG_CONST.MY_FRIENDS_LIST_PROFILE_IMAGE1
    },
    {
        id: 2,
        profileImage: IMG_CONST.MY_FRIENDS_LIST_PROFILE_IMAGE2,
    },
    {
        id: 3,
        profileImage: IMG_CONST.MY_FRIENDS_LIST_PROFILE_IMAGE3,
    },
    {
        id: 4,
        profileImage: IMG_CONST.MY_FRIENDS_LIST_PROFILE_IMAGE4,
    },
    {
        id: 5,
        profileImage: IMG_CONST.MY_FRIENDS_LIST_PROFILE_IMAGE5,
    },
    {
        id: 6,
        profileImage: IMG_CONST.MY_FRIENDS_LIST_PROFILE_IMAGE6,
    },
];

export const ProfileRequestList = [
    {
        id: 1,
        profileImage: IMG_CONST.MY_FRIENDS_LIST_PROFILE_IMAGE1
    },
    {
        id: 2,
        profileImage: IMG_CONST.MY_FRIENDS_LIST_PROFILE_IMAGE2,
    },
    {
        id: 3,
        profileImage: IMG_CONST.MY_FRIENDS_LIST_PROFILE_IMAGE3,
    },
];

export const ProfileAddFriendsList = [
    {
        id: 1,
        profileImage: IMG_CONST.MY_FRIENDS_LIST_PROFILE_IMAGE1
    },
    {
        id: 2,
        profileImage: IMG_CONST.MY_FRIENDS_LIST_PROFILE_IMAGE2,
    },
    {
        id: 3,
        profileImage: IMG_CONST.MY_FRIENDS_LIST_PROFILE_IMAGE3,
    },
    {
        id: 4,
        profileImage: IMG_CONST.MY_FRIENDS_LIST_PROFILE_IMAGE4,
    },
    {
        id: 5,
        profileImage: IMG_CONST.MY_FRIENDS_LIST_PROFILE_IMAGE5,
    },
    {
        id: 6,
        profileImage: IMG_CONST.MY_FRIENDS_LIST_PROFILE_IMAGE6,
    },
    {
        id: 7,
        profileImage: IMG_CONST.MY_FRIENDS_LIST_PROFILE_IMAGE7,
    },
    {
        id: 8,
        profileImage: IMG_CONST.MY_FRIENDS_LIST_PROFILE_IMAGE8,
    },
    {
        id: 9,
        profileImage: IMG_CONST.MY_FRIENDS_LIST_PROFILE_IMAGE9,
    },
];

export const ProfileUploadedPhotosList = [
    {
        id: 1,
        uploadedPhoto: IMG_CONST.UPLOADED_PICTURE1,
        photoName: 'MY WALL',
        photoDate: '2020 - 08 -15',
    },
    {
        id: 2,
        uploadedPhoto: IMG_CONST.UPLOADED_PICTURE2,
        photoName: 'Golf course',
        photoDate: '2020 - 06 -11',
    },
    {
        id: 1, 
        membersOnly: true, 
        backgroundImage: IMG_CONST.GOLF_COURSE_IMAGE,
    }, 
    {
        id: 2, 
        membersOnly: false, 
        backgroundImage: IMG_CONST.HOLE18_BOKK_TEE_BG,
    }, 
    {
        id: 3, 
        membersOnly: false, 
        backgroundImage: IMG_CONST.HOLE18_BOKK_TEE_BG,
    },
    {
        id: 1, 
        membersOnly: true, 
        backgroundImage: IMG_CONST.GOLF_COURSE_IMAGE,
    }, 
    {
        id: 2, 
        membersOnly: false, 
        backgroundImage: IMG_CONST.HOLE18_BOKK_TEE_BG,
    }, 
    {
        id: 3, 
        membersOnly: false, 
        backgroundImage: IMG_CONST.HOLE18_BOKK_TEE_BG,
    },
];