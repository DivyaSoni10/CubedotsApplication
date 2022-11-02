/**
 * Root Stack Screen
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../Splash/Splash';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Home from '../Home/Home';
import BottomTabScreen from '../RootStackNavigator/BottomTabNavigator';
import CreateAppointment from '../CreateAppointment/CreateAppointment';
import DrawerNavigator from './DrawerNavigator';
import ProjectDescription from '../Projects/ProjectDescription';
import Inventory from '../Projects/Inventory';
import CuSocial from '../CuSocial/CuSocial';
import Offers from '../CuSocial/Offers';
import Blogs from '../CuSocial/Blogs';
import Citizenship from '../CuVerse/Citizenship';
import Tutorial from '../CuVerse/Tutorial';
import AboutTurkey from '../CuVerse/AboutTurkey';
import OfferDetail from '../CuSocial/OfferDetail';
import InventoryFloorPlan from '../Projects/InventoryFloorPlan';
import CuVerseProject from '../CuVerse/CuVerseProject';
import Dashboard from '../Dashboard/Dashboard';

const RootStack = createStackNavigator();

const RootStackScreen = (props) => {
    return (
        <RootStack.Navigator>
            <RootStack.Screen options={{ gestureEnabled: false, headerShown: false }} name="Splash" component={Splash} />
            <RootStack.Screen options={{ headerShown: false }} name="Login" component={Login} />
            <RootStack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
            <RootStack.Screen options={{ headerShown: false }} name="CreateAppointment" component={CreateAppointment} />
            <RootStack.Screen name="MainStackScreen" component={MainStackScreen} options={{ gestureEnabled: false, headerShown: false }} />
        </RootStack.Navigator>
    );
};

const MainStackScreen = (props) => {
    return (
        <RootStack.Navigator>
            <RootStack.Screen options={{ headerShown: false }} name="DrawerNavigator" component={DrawerNavigator} />
            {/* <RootStack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} /> */}
            <RootStack.Screen options={{ headerShown: false }} name="Home" component={Home} />
            <RootStack.Screen options={{ headerShown: false }} name="ProjectDescription" component={ProjectDescription} />
            <RootStack.Screen options={{ headerShown: false }} name="ProjectsInventory" component={Inventory} />
            <RootStack.Screen options={{ headerShown: false }} name="Offers" component={Offers} />
            <RootStack.Screen options={{ headerShown: false }} name="Blog" component={Blogs} />
            <RootStack.Screen options={{ headerShown: false }} name="Citizenship" component={Citizenship} />
            <RootStack.Screen options={{ headerShown: false }} name="Tutorial" component={Tutorial} />
            <RootStack.Screen options={{ headerShown: false }} name="AboutTurkey" component={AboutTurkey} />
            <RootStack.Screen options={{ headerShown: false }} name="OfferAndBlogDetail" component={OfferDetail} />
            <RootStack.Screen options={{ headerShown: false }} name="InventoryFloorPlan" component={InventoryFloorPlan} />
            <RootStack.Screen options={{ headerShown: false }} name="CuVerseProject" component={CuVerseProject} />
        </RootStack.Navigator>
    );
}
export default RootStackScreen;