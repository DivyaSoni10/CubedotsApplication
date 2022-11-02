import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, ScrollView, StyleSheet } from 'react-native';
import React, { Component } from 'react'
import styles from './OffersStyle';
import scale, { verticalScale } from '../../utils/Scale';
import * as IMG_CONST from '../../theme/ImageConstants';
import COLOR_CONST from '../../theme/ColorConstants';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import * as homeActions from '../../redux/actions/homeActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import HTMLView from 'react-native-htmlview';
import Share from 'react-native-share';
import DeviceInfo from 'react-native-device-info';

const epochs = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
];

export class OfferDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInvalidOtp: false,
            offerItems: [1, 2, 3, 4, 5],
            detailData: ''
        }
    }

    getDuration = (timeAgoInSeconds) => {
        for (let [name, seconds] of epochs) {
            const interval = Math.floor(timeAgoInSeconds / seconds);
            if (interval >= 1) {
                return {
                    interval: interval,
                    epoch: name
                };
            }
        }
    };

    timeAgo = (date) => {
        let timeAgoInSeconds = Math.floor((new Date() - new Date(date)) / 1000);
        let { interval, epoch } = this.getDuration(timeAgoInSeconds);
        let suffix = interval === 1 ? '' : 's';
        return `${interval} ${epoch}${suffix} ago`;
    };

    componentDidMount = () => {
        this.getOfferBlogDetail()
    }

    getOfferBlogDetail = () => {
        let deviceId= DeviceInfo.getDeviceId();
        let data = [];
        data['naam']= this.props.route.params.slug
        data['device_id']= deviceId
        this.props.offerBlogDetail(data, (res) => this.offerBlogDetailSuccessCallBack(res), (err) => this.offerBlogDetailFailureCallBack(err))
    }

    offerBlogDetailSuccessCallBack = async (res) => {
        // console.log(`@@@ Get ${this.props.route.params.type} Detail Success CallBack ===================`, res.data);
        this.setState({ detailData: res.data })
    }

    offerBlogDetailFailureCallBack = (error) => {
        if (error) {
            // console.log(`@@@ Get ${this.props.route.params.type} Detail Failure CallBack ===================`, error);
            alert(error);
        } else {
            alert('Network Error!');
        }
    }

    onClickShare = () => {
        let type = this.props.route.params.type
        options = {
            title: `${type} link`,
            message: this.state.detailData.title,
            url: `https://cuengine-portal.s3.eu-west-2.amazonaws.com/${this.state.detailData.featured_image}`
        }
        Share.open(options)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            });
    }

    renderOfferCellContainer = (item) => {
        let type = this.props.route.params.type
        const projectAddS = StyleSheet.create({
            color: 'white'
        })
        return (
            <View style={[styles.oferCellContainer, { borderWidth: scale(0) }]}>
                <Image source={{ uri: `https://cuengine-portal.s3.eu-west-2.amazonaws.com/${this.state.detailData.featured_image}` }} style={type === 'OFFERS' ? styles.detailImageStyle : styles.blogImageStyle} />
                {/* <Text style={styles.offerTitle}>Alya 4 Mevsim Citizenhip Package</Text> */}
                {/* <Text style={styles.detailText}>{this.state.detailData.small_description}</Text> */}
                <HTMLView
                    value={this.state.detailData.long_description}
                    stylesheet={styles.projectAdd}
                    style={styles.projectAdd}
                    fontSize={scale(12)}
                    textComponentProps={{ style: projectAddS }}
                />
            </View>
        );
    }

    renderTextInputsContainer = () => {
        let type = this.props.route.params.type
        return (
            <View style={styles.textInputContaier}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                        style={{ padding: 5, marginLeft: scale(10) }}><Image source={IMG_CONST.arrowWhite} style={{ height: scale(20), width: scale(20) }} /></TouchableOpacity>
                    {/* <Text style={styles.headingText}>Offers</Text>
                    <View style={{ marginRight: scale(20), height: scale(20), width: scale(20), padding: 5 }} /> */}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.detailHeading}>{this.state.detailData.title}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(10) }}>
                            <Text style={[styles.detailName, { marginLeft: scale(10) }]}>{type}</Text>
                            <View style={styles.verticalDiv} />
                            <Text style={styles.detailName}>{moment(new Date(this.state.detailData.created_at)).fromNow()}</Text>
                            {/* <Text style={styles.detailName}>{moment.utc(this.state.detailData.updated_at).local().startOf('seconds').fromNow()}</Text> */}
                            {/* <Text style={styles.detailName}>{this.timeAgo(`${this.state.detailData.updated_at}`)}</Text> */}
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this.onClickShare()}
                        style={{ padding: 5, marginLeft: scale(10) }}><Image source={IMG_CONST.whiteShare} style={{ height: scale(20), width: scale(20), marginRight: scale(20), marginTop: verticalScale(20) }} /></TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor={'#f1f1f1'} />
                {this.renderTextInputsContainer()}
                {this.renderOfferCellContainer()}
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

export default connect(mapStateToProps, mapDispatchToProps)(OfferDetail);