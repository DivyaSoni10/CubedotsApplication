import {
    takeEvery,
    takeLatest
  } from 'redux-saga/effects';

import * as CONST from '../../utils/Constants'
import { contactUs, cuversePImage, cuverseProject, getCountryList, getLocationList, helpAndSupport, inventoryFloorplan, offerBlogDetail, offerBlogList, onCreateAppointmrnt, projectEquiryForm } from './homeSaga';
import { changePassword, getProjectDetailData, getProjectListData, onForgotPassword, onLoginUser, projectInventory} from './userSaga';
  
  const watchLogin = function* watchLogin() {
    //* USER_CALLS *//
    yield takeEvery(CONST.LOGIN_USER, onLoginUser);
    yield takeEvery(CONST.FORGOT_PASSWORD, onForgotPassword);
    yield takeEvery(CONST.CREATE_APPOINTMENT, onCreateAppointmrnt);
    yield takeEvery(CONST.SELCT_COUNTRY_FOR_APPOINTMENT, getCountryList);
    yield takeEvery(CONST.SELECT_LOCATION_FOR_APPOINTMENT, getLocationList);
    yield takeEvery(CONST.GET_PROJECT_LIST_DATA, getProjectListData);
    yield takeEvery(CONST.GET_PROJECT_DETAIL_DATA, getProjectDetailData);
    yield takeEvery(CONST.CHANGE_PASSOWRD, changePassword);
    yield takeEvery(CONST.PROJECT_INVENTORY_LIST, projectInventory);
    yield takeEvery(CONST.HELP_SUPPORT, helpAndSupport);
    yield takeEvery(CONST.CONTACT_US, contactUs);
    yield takeEvery(CONST.PROJECT_ENQUIRY, projectEquiryForm);
    yield takeEvery(CONST.INVENTORY_FLOORPLAN, inventoryFloorplan);
    yield takeEvery(CONST.OOFER_BLOG_LIST, offerBlogList);
    yield takeEvery(CONST.OOFER_BLOG_DETAIL, offerBlogDetail);
    yield takeEvery(CONST.CUVERSE_PROJECT, cuverseProject);
    yield takeEvery(CONST.CUVERSE_PROJECT_IMAGE, cuversePImage);
    // yield takeEvery(CONST.GET_USER_PROFILE_DATA, getUserProfileData);
  };
  
  /*
    Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
    Allows concurrent fetches of user.
  */
  const Sagas = function* mySagas() {
    yield watchLogin();
  };
  /*
    Alternatively you may use takeLatest.
  
    Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
    dispatched while a fetch is already pending, that pending fetch is cancelled
    and only the latest one will be run.
  */
  // function* mySaga() {
  //   yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
  // }
  
  export default Sagas;