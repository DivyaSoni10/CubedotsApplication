import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, ScrollView, ImageBackground } from 'react-native';
import styles from './CuSocialStyle';
import COLOR_CONST from '../../theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import scale, { verticalScale } from '../../utils/Scale';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';

export class CuSocial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEyeClicked: true,
        }
    }

    renderHeaderContainer = () => {
        return (
            <View>
                <Image source={{ uri: 'https://staging.cubedots.com/assets/images/bannerimages/cusocialbanner.jpg' }} style={{ height: scale(100), width: scale(375) }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: verticalScale(20)}}>
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => this.props.navigation.openDrawer()}><Image style={styles.menuIcon} source={require('../../assets/dashboard/whiteMenu.png')} /></TouchableOpacity>
                    <Text style={styles.projectHeadingText}>CuSocial</Text>                    
                    <TouchableOpacity style={[styles.menuIcon, { marginRight: 10 }]}></TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.bgImageContainer} 
                onPress={() => this.props.navigation.navigate('Offers')}
                >
                    <ImageBackground source={{ uri: 'https://staging.cubedots.com/assets/images/cusocial/offers-thumbnail.jpg' }} style={styles.bgImage} resizeMode="cover">
                        <View style={styles.btmView}>
                            <Text style={styles.heading}>Offers</Text>
                            <Text style={styles.subHead}>Check Out the Latest Offers and Exclusive Deals</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bgImageContainer} 
                onPress={() => this.props.navigation.navigate('Blog')}
                >
                    <ImageBackground source={{ uri: 'https://staging.cubedots.com/assets/images/cusocial/Blog-thumbnail.jpg' }} style={styles.bgImage} resizeMode="cover">
                        <View style={styles.btmView}>
                            <Text style={styles.heading}>Blog</Text>
                            <Text style={styles.subHead}>Read More About Real Estate</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="light-content" backgroundColor={'#000'} />
                {this.renderHeaderContainer()}
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
        // onLoginUser: (data, successCallBack, failureCallBack) => dispatch(userActions.onLoginUser(data, successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CuSocial);