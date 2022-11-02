import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import styles from './PrivacyPolicyStyle'
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import * as homeActions from '../../redux/actions/homeActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HTMLView from 'react-native-htmlview';
import scale, { verticalScale } from '../../utils/Scale';

export class PrivacyPolicy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPrivacySelected: true,
            isCookieSelected: false,
            policyData: ''
        }
    }

    componentDidMount = () => {
        this.getJSONApi()
    }

    getJSONApi = () => {
        fetch(`https://www.cubedots.com/assets/data/privacyPolicy.json`)
            .then((response) => response.json())
            .then((json) => {
                // console.log("@@@ Privacy Policy Success Callback========", json)
                this.setState({ policyData: json.content })
                return json;
            })
            .catch((error) => {
                // console.log("@@@ Privacy Policy Failure Callback========", error)
            });
    }

    renderHeadingContainer = () => {
        return (
            <View>
                <View style={styles.tabView}>
                    <TouchableOpacity onPress={() => this.setState({ isPrivacySelected: true, isCookieSelected: false })}
                        style={this.state.isPrivacySelected ? styles.selectedTabView : styles.deselectedTabView}>
                        <Text style={[styles.selectedText, { color: this.state.isPrivacySelected ? COLOR_CONST.themeOrange : "#00000060" }]}>Privacy Policy</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ isPrivacySelected: false, isCookieSelected: true })}
                        style={this.state.isCookieSelected ? styles.selectedTabView : styles.deselectedTabView}>
                        <Text style={[styles.selectedText, { color: this.state.isCookieSelected ? COLOR_CONST.themeOrange : "#00000060" }]}>Cookie Policy</Text></TouchableOpacity>
                </View>
            </View>
        );
    }

    renderPrivacyContainer = () => {
        return (
            <View style={styles.privacyContainer}>
                <HTMLView
                    value={this.state.policyData}
                    stylesheet={styles.subText}
                    fontSize={scale(12)}
                />
            </View>
        );
    }

    renderCookieContainer = () => {
        return (
            <View style={styles.cookieContainer}>
                <Text style={styles.subText}>- General Information</Text>
                <Text style={styles.subText}>- Our Purpose of Use with Cookies We Use</Text>
                <Text style={styles.subText}>- Procedure for Removing Cookies</Text>
                <Text style={styles.subText}>{'\n'}Procedure for Removing Cookies</Text>
                <Text style={styles.subText}>Cookies are placed on our system through the browsers you use. Users can delete, block or re-approve any cookies used, stored, processed on our Site by methods that vary according to the browsers they use. According to the browser you use to visit our Site, you can make the mentioned transactions from the links below.</Text>
                <Text style={styles.subText}>{'\n'}When you revoke your consent to cookies, you may not be able to use some functions of our Site or use them with efficiency.</Text>
            </View>
        );
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: verticalScale(50) }}>
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => this.props.navigation.openDrawer()}><Image style={styles.menuIcon} source={require('../../assets/dashboard/menu.png')} /></TouchableOpacity>
                    <Text style={styles.headingText}>Privacy Policy</Text>
                    <TouchableOpacity style={[styles.menuIcon, { marginRight: scale(10) }]} onPress={() => this.props.navigation.openDrawer()}></TouchableOpacity>
                </View>
                {/* {this.renderHeadingContainer()} */}
                {this.state.isPrivacySelected && this.renderPrivacyContainer()}
                {this.state.isCookieSelected && this.renderCookieContainer()}
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showErrorModal: (message, isShowError) => dispatch(commonActions.showErrorModal(message, isShowError)),
        hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
        offerBlogDetail: (data, successCallBack, failureCallBack) => dispatch(homeActions.offerBlogDetail(data, successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
// export default PrivacyPolicy