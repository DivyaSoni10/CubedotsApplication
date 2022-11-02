import { Dimensions, Platform } from "react-native";
import deviceInfoModule from "react-native-device-info";

//Screen Constatnts
let type = deviceInfoModule.isTablet();
let changeDimension = Dimensions.addEventListener('change', (dimensions) => {
  // you get:
  //  dimensions.window.width
  //  dimensions.window.height
  //  dimensions.screen.width
  //  dimensions.screen.height
});
const SCREEN_HEIGHT = type ? Dimensions.get('window').height: Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height <= 550 ? 667 : Dimensions.get('window').height;
const SCREEN_WIDTH = 375;
// const SCREEN_WIDTH = type ? Dimensions.get('window').width : 375;

const { height, width } = Dimensions.get("window");
console.log('@@@ height ===============', type, width);
/**
 * Function to scale a value based on the size of the screen size and the original
 * size used on the design.
 */
export default function(units = 1) {
  return (width / SCREEN_WIDTH) * units;
}

const verticalScale = (size) => (height / SCREEN_HEIGHT) * size;

export { verticalScale };