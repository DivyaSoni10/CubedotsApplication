import * as USER_CONST from "../../utils/Constants";

export const onLoginUser = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.LOGIN_USER,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

export const onForgotPassword = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.FORGOT_PASSWORD,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

export const getProjectListData = (successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_PROJECT_LIST_DATA,
        payload: {
            successCallBack, 
            failureCallBack
        }
    }
}

export const getProjectDetailData = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_PROJECT_DETAIL_DATA,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

export const changePassword = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.CHANGE_PASSOWRD,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

export const projectInventory = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.PROJECT_INVENTORY_LIST,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

// export const getUserProfileData = (data, successCallBack, failureCallBack) => {
//     return {
//         type: USER_CONST.GET_USER_PROFILE_DATA,
//         payload: {
//             data,
//             successCallBack, 
//             failureCallBack
//         }
//     }
// }