/**
 * Drawer Content Screen
 */
import COLOR_CONST from '../../theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import * as STRING_CONST from '../../theme/StringConstants';
import React, { Component, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, ImageBackground, StatusBar, Linking } from 'react-native';
import {
    Avatar,
    Title,
    Drawer,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { MenuItems } from '../../theme/DataConstants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './DrawerContentStyle';
import Scale, { verticalScale } from '../../utils/Scale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import DeviceInfo from 'react-native-device-info';

class DrawerContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuItems: MenuItems,
            menuStartArray: MenuItems,
            userProfileApiData: '',
            userName: '',
            selectedIndex: 0
        }
    }

    async componentDidMount() {
        let name = await AsyncStorage.getItem('USER_NAME')
        this.setState({ userName: name })
        this.props.navigation.addListener('focus', () => {
            // this.getProfileData();
        });
    }

    getProfileData = async (res) => {
        let userToken = await AsyncStorage.getItem('USER_TOKEN');
        // console.log('@@@ Async Storage Token ===================', userToken);
        let data = {
            token: userToken,
        };
        // this.props.onProfileLanding(data, (res) => this.onProfileLandingSuccessCallBack(res), (err) => this.onProfileLandingFailureCallBack(err))
    }

    onProfileLandingSuccessCallBack = async (res) => {
        // console.log('@@@ Get Profile Data Success CallBack ===================', res);
        this.setState({ profileApiData: res, userProfileApiData: res.user })
    }

    onProfileLandingFailureCallBack = (error) => {
        // console.log('@@@ Get Profile Data Failure CallBack ===================', error);
        if (error) {
            setTimeout(() => {
                this.props.showErrorModal(error);
            }, 0);
        } else {
            setTimeout(() => {
                this.props.showErrorModal('Network Error!');
            }, 0);
        }
    }

    onPressMenuItem = async (itemMenu) => {
        this.props.navigation.closeDrawer();
        if (itemMenu.index === 10) {
            let isRemember = await AsyncStorage.getItem('IS_REMEMBER_USER');
            if (isRemember === 'true') {
                await AsyncStorage.removeItem('USER_TOKEN');
                this.props.navigation.replace('Login');
            } else {
                await AsyncStorage.removeItem('USER_TOKEN');
                await AsyncStorage.removeItem('USER_ID');
                this.props.navigation.replace('Login');
            }
        } else if (itemMenu.index === 2) {
            Linking.openURL(itemMenu.screenName)
        } else {
            var tempList = this.state.menuItems;
            if (this.state.selectedIndex == itemMenu.index) {
                // console.log("@@@ Selcted ka IF======", this.state.selectedIndex)
            } else {
                for (var i = 0; i < tempList.length; i++) {
                    if (tempList[i].index == itemMenu.index) {
                        tempList[i]["active"] = true;
                        // console.log("@@@ Selcted ka IF ELSE======", itemMenu.index)
                        this.setState({ selectedIndex: itemMenu.index })
                    } else {
                        // console.log("@@@ Selcted ka ELSE======")
                        tempList[i]["active"] = false;
                    }
                }
                this.setState({ menuItems: tempList }, () => this.props.navigation.replace(itemMenu.screenName, { screenIndex: itemMenu.index }))
            }
        }
    }

    onPressLogout = async () => {
        let isRemember = await AsyncStorage.getItem('IS_REMEMBER_USER');
        if (isRemember === 'true') {
            var tempList = this.state.menuItems;
            for (var i = 0; i < tempList.length; i++) {
                if (tempList[i].index == 0) tempList[i]["active"] = true;
                else tempList[i]["active"] = false;
            }
            this.setState({ menuItems: tempList })
            await AsyncStorage.removeItem('USER_TOKEN');
            this.props.navigation.replace('Login');
        } else {
            var tempList = this.state.menuItems;
            for (var i = 0; i < tempList.length; i++) {
                if (tempList[i].index == 0) tempList[i]["active"] = true;
                else tempList[i]["active"] = false;
            }
            this.setState({ menuItems: tempList })
            await AsyncStorage.removeItem('USER_TOKEN');
            await AsyncStorage.removeItem('USER_ID');
            await AsyncStorage.removeItem('USER_NAME');
            await AsyncStorage.removeItem('USER_EMAIL');
            await AsyncStorage.removeItem('USER_COMPANY');
            await AsyncStorage.removeItem('USER_PHONE');
            this.props.navigation.replace('Login');
        }
    }

    renderMenuItems = () => {
        return (
            <Drawer.Section style={styles.drawerSection}>
                {this.state.menuItems.map((item, index) => {
                    return (
                        <DrawerItem
                            focused={item.active}
                            activeTintColor={COLOR_CONST.themeOrange}
                            activeBackgroundColor={'rgba(0, 0, 0, 0.1)'}
                            inactiveTintColor={COLOR_CONST.white}
                            icon={({ color, size }) => (
                                <View style={styles.drawerIcon}>
                                    <Image source={item.iconName} style={{ height: Scale(20), width: Scale(20) }} />
                                </View>
                            )}
                            label={item.label}
                            labelStyle={[styles.drawerLabelStyle, { color: item.active ? COLOR_CONST.themeOrange : COLOR_CONST.white }]}
                            style={{ marginTop: verticalScale(-5) }}
                            onPress={() => this.onPressMenuItem(item)}
                        />
                    )
                })}
            </Drawer.Section>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.drawerContainer}>
                {/* <ScrollView {...this.props}> */}
                {/* <StatusBar backgroundColor={'#fff  '}/> */}
                <View style={styles.drawerContent}>
                    {/* <Drawer.Section>
                            <View style={styles.userInfoSection}>
                                <TouchableOpacity style={{ marginTop: verticalScale(28.33), alignItems: 'center' }} onPress={() => this.props.navigation.navigate('HomeScreen')}>
                                    <Image source={IMG_CONST.WHITE_CLOSE_ICON} style={{height: Scale(14.6), width: Scale(14.6)}} />
                                </TouchableOpacity>
                            </View>
                        </Drawer.Section> */}
                    {/* <TouchableOpacity style={{ flexDirection: 'row', marginTop: verticalScale(20) }} onPress={() => {
                        this.props.navigation.closeDrawer();
                        this.props.navigation.navigate('ProfileScreen')
                    }}
                    > */}
                    <Avatar.Image
                        source={require('../../assets/projects/account.png')}
                        // source={{uri: this.state.userProfileApiData.image}}
                        style={styles.avatarImage}
                        size={Scale(52)}
                    />
                    <View>
                        <Title style={styles.profileName}>{this.state.userName}</Title>
                        <Text style={styles.profileSubText}>Active</Text>
                        {/* <Title style={styles.profileName}>{this.state.userProfileApiData.name}</Title>
                                <Text style={styles.profileSubText}>{this.state.userProfileApiData.designation}</Text> */}
                    </View>
                    {/* </TouchableOpacity> */}
                    {this.renderMenuItems()}
                </View>
                {/* </ScrollView> */}
                <TouchableOpacity style={styles.logoutButton} onPress={() => this.onPressLogout()}>
                    <Text style={styles.logout}>LOGOUT</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showErrorModal: (message) => dispatch(commonActions.showErrorModal(message)),
        hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
        // onProfileLanding: (data, successCallBack, failureCallBack) => dispatch(profileActions.onProfileLanding(data, successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);