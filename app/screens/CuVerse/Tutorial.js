import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import React, { Component } from 'react'
import styles from './TutorialStyle';
import scale, { verticalScale } from '../../utils/Scale';
import * as IMG_CONST from '../../theme/ImageConstants';
import COLOR_CONST from '../../theme/ColorConstants';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import { SvgUri } from 'react-native-svg';
import YoutubePlayer from "react-native-youtube-iframe";

export class Tutorial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInvalidOtp: false,
        }
    }

    getVideoId = (url) => {
        // console.log("@@@ Video URl=====", url)
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
        // return params.v
    }

    renderHeaderContainer = () => {
        return (
            <View style={styles.textInputContaier}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                        style={{ padding: 5, marginLeft: scale(10) }}><Image source={IMG_CONST.arrowWhite} style={{ height: scale(20), width: scale(20) }} /></TouchableOpacity>
                    <Text style={styles.headingText}>Tutorial</Text>
                    <View style={{ marginRight: scale(20), height: scale(20), width: scale(20), padding: 5 }} />
                </View>
                <YoutubePlayer
                    height={250}
                    webViewStyle={{ height: scale(250), width: scale(350), alignSelf: 'center', marginTop: verticalScale(30) }}
                    // play={true}
                    videoId={this.getVideoId('https://youtu.be/xslvxzvv_0U')}
                // onChangeState={onStateChange}
                />
                <Text style={styles.videoName}>English Tutorial</Text>
                <YoutubePlayer
                    height={250}
                    webViewStyle={{ height: scale(250), width: scale(350), alignSelf: 'center', marginTop: verticalScale(30) }}
                    // play={true}
                    videoId={this.getVideoId("https://youtu.be/37yCkxuB9bY")}
                // onChangeState={onStateChange}
                />
                <Text style={styles.videoName}>Russian Tutorial</Text>
                <YoutubePlayer
                    height={250}
                    webViewStyle={{ height: scale(250), width: scale(350), alignSelf: 'center', marginTop: verticalScale(30) }}
                    // play={true}
                    videoId={this.getVideoId("https://www.youtube.com/embed/RGGUQ2kQ-vo?autoplay=0&mute=0&controls=1&origin=https%3A%2F%2Fstaging.cubedots.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=5")}
                // onChangeState={onStateChange}
                />
                <Text style={styles.videoName}>Turkish Tutorial</Text>
            </View>
        );
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor={'#f1f1f1'} />
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
        getProjectDetailData: (data, successCallBack, failureCallBack) => dispatch(userActions.getProjectDetailData(data, successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);