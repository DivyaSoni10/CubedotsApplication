import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerContent from '../Drawer/DrawerContent';
import styles from './DrawerNavigatorStyle';
import { Home } from '../Home/Home';
import ContactUs from '../ContactUs/ContactUs';
import HeplSupport from '../Hepl&Support/Hepl&Support';
import PropertyEnquiry from '../Enquiry/PropertyEnquiry';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy';
import ProjectsListing from '../Projects/ProjectsListing';
import Inventory from '../Projects/Inventory';
import CuVerse from '../CuVerse/CuVerse';
import CuSocial from '../CuSocial/CuSocial';
import Scale from '../../utils/Scale';
import Dashboard from '../Dashboard/Dashboard';

const Drawer = createDrawerNavigator();

const DrawerStackScreen = (drawerProps) => {
    const showDrawer = false;
    return (
        <Drawer.Navigator
            screenOptions={{ orientation: 'portrait' }}
            // drawerStyle={{width: !showDrawer ? null : 280}}
            drawerStyle={[styles.drawer, { width: !showDrawer ? null : Scale(300) }]}
            overlayColor="transparent"
            drawerContent={props => <DrawerContent {...props} />}
        >
            <RootStack.Screen name="MainStackScreen" component={MainStackScreen} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
};

const RootStack = createStackNavigator();

const MainStackScreen = (props) => {
    return (
        <RootStack.Navigator>
            <RootStack.Screen options={{ headerShown: false }} name="Home" component={Home} />
            <RootStack.Screen options={{ headerShown: false }} name="ContactUs" component={ContactUs} />
            <RootStack.Screen options={{ headerShown: false }} name="HeplSupport" component={HeplSupport} />
            <RootStack.Screen options={{ headerShown: false }} name="Enquiry" component={PropertyEnquiry} />
            <RootStack.Screen options={{ headerShown: false }} name="Privacy" component={PrivacyPolicy} />
            <RootStack.Screen options={{ headerShown: false }} name="ProjectListing" component={ProjectsListing} />
            <RootStack.Screen options={{ headerShown: false }} name="CuVerse" component={CuVerse} />
            <RootStack.Screen options={{ headerShown: false }} name="CuSocial" component={CuSocial} />
        </RootStack.Navigator>
    );
};


export default DrawerStackScreen;