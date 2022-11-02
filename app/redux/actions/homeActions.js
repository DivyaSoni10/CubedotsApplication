import * as USER_CONST from "../../utils/Constants";

//*GET COUNTRY API 
export const getCountryList = (successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.SELCT_COUNTRY_FOR_APPOINTMENT,
        payload: {
            successCallBack,
            failureCallBack,
        }
    }
}

//*GET LOCATION API 
export const getLocationList = (successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.SELECT_LOCATION_FOR_APPOINTMENT,
        payload: {
            successCallBack,
            failureCallBack,
        }
    }
}

//*CREATE APPOINTMENT API 
export const onCreateAppointmrnt = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.CREATE_APPOINTMENT,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

//*HELP SUPPORT API 
export const helpAndSupport = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.HELP_SUPPORT,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

//*CONTACT US API 
export const contactUs = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.CONTACT_US,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

//*PROJECT ENQUIRY API 
export const projectEquiryForm = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.PROJECT_ENQUIRY,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

//*INVENTORY FLOORPLAN API 
export const inventoryFloorplan = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.INVENTORY_FLOORPLAN,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

//*OOFER BLOG LIST API 
export const offerBlogList = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.OOFER_BLOG_LIST,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

//*OOFER BLOG DETAIL API 
export const offerBlogDetail = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.OOFER_BLOG_DETAIL,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

//*CUVERSE PROJECT API 
export const cuverseProject = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.CUVERSE_PROJECT,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

//*CUVERSE PROJECT IMAGE API 
export const cuversePImage = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.CUVERSE_PROJECT_IMAGE,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}
