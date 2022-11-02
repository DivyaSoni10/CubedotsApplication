import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import React, { Component } from 'react'
import styles from './OffersStyle';
import scale, { verticalScale } from '../../utils/Scale';
import * as IMG_CONST from '../../theme/ImageConstants';
import COLOR_CONST from '../../theme/ColorConstants';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as homeActions from '../../redux/actions/homeActions';
import * as userActions from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';

export class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInvalidOtp: false,
            offerItems: [1, 2, 3, 4, 5],
            naam: 'blog'
        }
    }

    componentDidMount = () => {
        this.getOfferBlogList()
    }

    getOfferBlogList = () => {
        let deviceId= DeviceInfo.getDeviceId();
        let data = [];
        data['naam']= this.state.naam
        data['device_id']= deviceId
        this.props.offerBlogList(data, (res) => this.offerBlogListSuccessCallBack(res), (err) => this.offerBlogListFailureCallBack(err))
    }

    offerBlogListSuccessCallBack = async (res) => {
        // console.log(`@@@ Get ${this.state.naam} List Success CallBack ===================`, res.data);
        let t = [];
        res.data.map((item) => {
            item['isSelected'] = false
            t.push(item)
        })
        this.setState({ offerItems: t })
    }

    offerBlogListFailureCallBack = (error) => {
        if (error) {
            // console.log(`@@@ Get ${this.state.naam} List Failure CallBack ===================`, error);
            alert(error);
        } else {
            alert('Network Error!');
        }
    }

    renderBlogCellContainer = (item) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('OfferAndBlogDetail', { type: 'BLOG', slug: item.slug })} style={styles.oferCellContainer}>
                <Image source={{ uri: `https://cuengine-portal.s3.eu-west-2.amazonaws.com/${item.featured_image}` }} style={styles.blogImageStyle} />
                <Text style={styles.offerTitle}>{item.title}</Text>
                <Text style={styles.blogSubText}>{item.medium_description}</Text>
                <Text style={styles.readMoreText}>Read More</Text>
            </TouchableOpacity>
        );
    }

    renderTextInputsContainer = () => {
        return (
            <View style={styles.textInputContaier}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                        style={{ padding: 15, marginLeft: scale(10) }}><Image source={IMG_CONST.arrowWhite} style={{ height: scale(20), width: scale(20) }} /></TouchableOpacity>
                    <Text style={styles.headingText}>Blog</Text>
                    <View style={{ marginRight: scale(20), height: scale(20), width: scale(20), padding: 5 }} />
                </View>
                <FlatList
                    style={{ height: null }}
                    data={this.state.offerItems}
                    renderItem={({ item }) => this.renderBlogCellContainer(item)}
                />
            </View>
        );
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor={'#f1f1f1'} />
                {this.renderTextInputsContainer()}
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
        offerBlogList: (data, successCallBack, failureCallBack) => dispatch(homeActions.offerBlogList(data, successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);