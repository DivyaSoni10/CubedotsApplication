/**
 * Main Tab Screen
 */
import React from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, BackHandler } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import * as IMG_CONST from '../../theme/ImageConstants';
import ColorConstants from '../../theme/ColorConstants';
import styles from './BottomTabNavigatorStyle';

//*> Screens
import { Home } from '../Home/Home';

//*> Bottom Tab Navigator
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const MoreStack = createStackNavigator();

const BottomTabScreen = (props) => (
  <Tab.Navigator
    initialRouteName=" "
    tabBar={props => <MyTabBar {...props} />}
    tabBarOptions={{
      style: { position: 'absolute' },
      keyboardHidesTabBar: true
    }}
  >
    <Tab.Screen
      name="Menu"
      component={Home}
    // listeners={{
    //   focus: () => BackHandler.addEventListener('hardwareBackPress', handleBackButton())
    //   , blur: () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton())
    // }}
    />
    <Tab.Screen
      name="CuVerse"
      component={Home}
    />
    <Tab.Screen
      name=" "
      component={HomeStackScreen}
    />
    <Tab.Screen
      name="Profile"
      component={Home}
    />
    <Tab.Screen
      name="Home"
      component={MoreStackScreen}
    />
  </Tab.Navigator>
);

const handleBackButton = () => {
  BackHandler.exitApp();
  return true;
}

export default BottomTabScreen;

const renderBottomTabIcons = (iconIndex, isFocused) => {
  switch (iconIndex) {
    case 0:
      return <Image source={isFocused ? IMG_CONST.blueRebate : IMG_CONST.awesomeCoins} style={styles.menuIcons} resizeMode="contain" />
    case 1:
      return <Image source={isFocused ? IMG_CONST.blueProms: IMG_CONST.promo} style={styles.bagIcon} resizeMode="contain" />
    case 2:
      return <Image source={IMG_CONST.homeIcon} style={styles.homelIcon} resizeMode="contain" />
    case 3:
      return <Image source={isFocused ? IMG_CONST.cart : IMG_CONST.shopping_Cart} style={[styles.manIcon, {opacity: isFocused ? 1 : 0.4}]} resizeMode="contain" />
    case 4:
      return <Image source={isFocused ? IMG_CONST.blueMore : IMG_CONST.more} style={styles.mreIcon} resizeMode="contain" />
    default:
      break;
  }
}

const MyTabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              })
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
            onLongPress={onLongPress()}
            style={styles.outerContainer}
          >
            <View style={styles.tabContainer}>
              {renderBottomTabIcons(index, isFocused)}
              <Text style={[styles.labelStyle, { color: '#00000060' }]}>{route.name}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
}

const HomeStackScreen = (props) => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={({ route, navigation }) => ({
        headerTitleAlign: 'center',
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        route: { route },
        navigation: { navigation },
        headerShown: false
      })
      }
    // initialParams={{ menuOpen: props.menuOpen, handleMenu: () => props.handleMenu() }}
    />
    {/* <HomeStack.Screen options={{ headerShown: false }} name="GoServices" component={GoServicesScreen} /> */}
  </HomeStack.Navigator>
);

const MoreStackScreen = (props) => (
  <MoreStack.Navigator>
    <MoreStack.Screen
      name="MoreTabScreen"
      component={Home}
      options={({ route, navigation }) => ({
        headerTitleAlign: 'center',
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        route: { route },
        navigation: { navigation },
        headerShown: false
      })
      }
    // initialParams={{ menuOpen: props.menuOpen, handleMenu: () => props.handleMenu() }}
    />
  </MoreStack.Navigator>
)
