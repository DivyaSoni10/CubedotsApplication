/**
 * @UserSaga will listen for the requests of user related stuffs, call a api using apiService and return back to corresponding reducer
 */

import {
  call, put
} from 'redux-saga/effects';
import * as API_SERVICE from '../../services/apiService/AxioUtils';
import * as commonActions from '../actions/commonActions';
import * as homeActions from '../actions/homeActions';

// Define Worker Sagas
//*DASHBOARD API STARTED
//*> GET COUNTRY LIST SAGA
export function* getCountryList(action) {
  let path = `/food/findAllRestaurant`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performGetRequest, path);
    console.log('@@@ Get All Country List Response =======', res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    console.log('@@@ Get All Country List Error ========', error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error);
      action.payload.failureCallBack(response);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> GET LOCATION LIST SAGA
export function* getLocationList(action) {
  let path = `/food/findAllRestaurant`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performGetRequest, path);
    console.log('@@@ Get All Location List Response =======', res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    console.log('@@@ Get All Location List Error ========', error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error);
      action.payload.failureCallBack(response);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> CREATE APPOINTMENT SAGA
export function* onCreateAppointmrnt(action) {
  let path = `/orgzit/create_appointment`;
  let contenType = 'application/json';
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data, contenType);
    console.log('@@@ Create Appointment Response =======', res);
    if (res !== undefined && res.data !== null && res.status === 200 && res.data.status) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    console.log('@@@ Create Appointment Error ========', error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      // let response = JSON.parse(error);
      action.payload.failureCallBack(error);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> HELP SUPPORT SAGA
export function* helpAndSupport(action) {
  let path = `/orgzit/help_support_email`;
  let contenType = 'application/json';
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data, contenType);
    console.log('@@@ Help & Support Response =======', res);
    if (res !== undefined && res.data !== null && res.status === 200 && res.data.status) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    console.log('@@@ Help & Support Error ========', error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      // let response = JSON.parse(error);
      action.payload.failureCallBack(error);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> CONTACT US SAGA
export function* contactUs(action) {
  let path = `/orgzit/requestEnrollment`;
  let contenType = 'application/json';
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data, contenType);
    console.log('@@@ Contact Us Response =======', res);
    if (res !== undefined && res.data !== null && res.status === 200 && res.data.status) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    console.log('@@@ Contact Us Error ========', error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      // let response = JSON.parse(error);
      action.payload.failureCallBack(error);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> PROJECT ENQUIRY SAGA
export function* projectEquiryForm(action) {
  let path = `/orgzit/projectEnquireRequest`;
  let contenType = 'application/json';
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data, contenType);
    console.log('@@@ Project Enquiry Response =======', res);
    if (res !== undefined && res.data !== null && res.status === 200 && res.data.status) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    console.log('@@@ Project Enquiry Error ========', error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      // let response = JSON.parse(error);
      action.payload.failureCallBack(error);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> INVENTORY FLOORPLAN SAGA
export function* inventoryFloorplan(action) {
  let path = `/projects/interiorInventory/${action.payload.data.slug}?device_id=${action.payload.data.device_id}`;
  let contenType = 'application/json';
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performGetRequest, path, contenType);
    console.log('@@@ Get Inventory Floorplan Response =======', res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    console.log('@@@ Get Inventory Floorplan Error ========', error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error);
      action.payload.failureCallBack(response);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> OOFER BLOG LIST SAGA
export function* offerBlogList(action) {
  let path = `/cusocial/latestByCategory/${action.payload.data.naam}?device_id=${action.payload.data.device_id}`;
  let contenType = 'application/json';
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performGetRequest, path, contenType);
    console.log(`@@@ ${action.payload.data} List Response =======`, res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    console.log(`@@@ ${action.payload.data} List Error ========`, error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error);
      action.payload.failureCallBack(response);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> OOFER BLOG DETAIL SAGA
export function* offerBlogDetail(action) {
  let path = `/cusocial/show/${action.payload.data.naam}?device_id=${action.payload.data.device_id}`;
  let contenType = 'application/json';
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performGetRequest, path, contenType);
    console.log(`@@@ ${action.payload.data} Detail Response =======`, res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    console.log(`@@@ ${action.payload.data} Detail Error ========`, error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error);
      action.payload.failureCallBack(response);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> CUVERSE PROJECT SAGA
export function* cuverseProject(action) {
  let path = `https://portal.cubedots.com/api/v1/cuverse/mediaFiles/${action.payload.data}`;
  let contenType = 'application/json';
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performGetRequest, path, contenType);
    console.log(`@@@ Cuverse Project Response =======`, res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    console.log(`@@@ Cuverse Project Detail Error ========`, error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error);
      action.payload.failureCallBack(response);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> CUVERSE PROJECT IMAGE SAGA
export function* cuversePImage(action) {
  let path = `https://staging.cubedots.com/assets/images/cuverse/${action.payload.data}.jpg`;
  let contenType = 'application/json';
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performGetRequest, path, contenType);
    console.log(`@@@ Cuverse Project Image Response =======`, res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    console.log(`@@@ Cuverse Project Image Error ========`, error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error);
      action.payload.failureCallBack(response);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}