/**
 * @UserSaga will listen for the requests of user related stuffs, call a api using apiService and return back to corresponding reducer
 */

import {
  call, put
} from 'redux-saga/effects';
import * as API_SERVICE from '../../services/apiService/AxioUtils';
import * as commonActions from '../actions/commonActions';
import DeviceInfo from 'react-native-device-info';

// Define Worker Sagas

//*> LOGIN USER SAGA
export function* onLoginUser(action) {
  let path = `/auth`;
  let contenType = 'multipart/form-data';
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data, contenType);
    console.log('@@@ Login Response =======', res);
    if (res !== undefined && res.data !== null && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    console.log('@@@ Login Error ========', error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      // let response = JSON.parse(error);
      action.payload.failureCallBack(error);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> FORGOT USER SAGA
export function* onForgotPassword(action) {
  let path = `/auth/forgetPassword`;
  let contenType = 'application/json';
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data, contenType);
    console.log('@@@ Forgot Response =======', res);
    if (res !== undefined && res.data !== null && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    console.log('@@@ Forgot Error ========', error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      // let response = JSON.parse(error);
      action.payload.failureCallBack(error);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

// *> GET PROJECTS LSIT SAGA
export function* getProjectListData(action) {
  let deviceId= DeviceInfo.getDeviceId();
  let path = `/projects/list?device_id=${deviceId}`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performGetRequest, path);
    console.log('@@@ Get Project List Response =======', res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    console.log('@@@ Get Project List Error ========', error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error);
      action.payload.failureCallBack(response);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

// *> GET PROJECTS DETAIL SAGA
export function* getProjectDetailData(action) {
  let path = `/projects/show/${action.payload.data.slungName}`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performGetRequest, path);
    console.log('@@@ Get Projects Detail Response =======', res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    console.log('@@@ Get Projects Detail Error ========', error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error);
      action.payload.failureCallBack(response);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> CHANGE PASSWORD SAGA
export function* changePassword(action) {
  let path = `/auth/updatePassword`;
  let contenType = 'application/json';
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data, contenType);
    console.log('@@@ Update Password Response =======', res);
    if (res !== undefined && res.data !== null && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    console.log('@@@ Update Password Error ========', error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      // let response = JSON.parse(error);
      action.payload.failureCallBack(error);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> PROJECT INVENTORY SAGA
export function* projectInventory(action) {
  let path = `/projects/units/${action.payload.data.slug}?device_id=${action.payload.data.device_id}`;
  let contenType = 'application/json';
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performGetRequest, path, contenType);
    console.log('@@@ Get Inventory List Response =======', res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    console.log('@@@ Get Inventory List Error ========', error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error);
      action.payload.failureCallBack(response);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> GET FIND USER PROFILE SAGA
// export function* getUserProfileData(action) {
//   let path = `/user/findUserByemailId?emailId=${action.payload.data.emailId}`;
//   try {
//     yield put(commonActions.startSpinner());
//     const res = yield call(API_SERVICE.performGetRequest, path);
//     console.log('@@@ Get User Profile Response =======', res);
//     if (res !== undefined && res.status === 200) {
//       yield put(commonActions.stopSpinner());
//       action.payload.successCallBack(res.data);
//     } else {
//       yield put(commonActions.stopSpinner());
//       action.payload.failureCallBack(null);
//     }
//   } catch (error) {
//     console.log('@@@ Get User Profile Error ========', error);
//     yield put(commonActions.stopSpinner());
//     if (error.request._response && error.request.status !== 0) {
//       let response = JSON.parse(error);
//       action.payload.failureCallBack(response);
//     } else {
//       action.payload.failureCallBack(null);
//     }
//   }
// }