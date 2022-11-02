import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, Dimensions } from 'react-native';
import styles from './InventoryStyle';
import COLOR_CONST from '../../theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import scale, { verticalScale } from '../../utils/Scale';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as homeActions from '../../redux/actions/homeActions';
import ImageZoom from 'react-native-image-pan-zoom';
import DeviceInfo from 'react-native-device-info';

export class InventoryFloorPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            floopPlan: '',
            floorImage: '',
            project: '',
        }
    }

    componentDidMount = () => {
        this.getProjectInvData()
    }

    getProjectInvData = () => {
        let slug = `${this.props.route.params.slug}/${this.props.route.params.cubedots_id}`
        let deviceId= DeviceInfo.getDeviceId();
        let data = [];
        data['slug']= slug
        data['device_id']= deviceId
        this.props.inventoryFloorplan(data, (res) => this.inventoryFloorplanSuccessCallBack(res), (err) => this.inventoryFloorplanFailureCallBack(err))
    }

    inventoryFloorplanSuccessCallBack = async (res) => {
        // console.log('@@@ Get Inventory Floorplan Success CallBack ===================', res.floorplans);
        let floorImage = `https://cuengine-portal.s3.eu-west-2.amazonaws.com/${res.floorplans.local_path}`
        this.setState({ floopPlan: res.floorplans, floorImage: floorImage, project: res.project })
    }

    inventoryFloorplanFailureCallBack = (error) => {
        if (error) {
            // console.log('@@@ Get Inventory Floorplan Failure CallBack ===================', error);
            alert(error);
        } else {
            alert('Network Error!');
        }
    }

    renderHeaderContainer = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(50) }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                    style={{ padding: 5, marginLeft: scale(10) }}><Image source={IMG_CONST.arrowWhite} style={{ height: 20, width: 20 }} /></TouchableOpacity>
                <Text style={styles.headingText}>Floor Plan</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderHeaderContainer()}
                <Text style={styles.projectName}>{this.state.project.title}</Text>
                <StatusBar barStyle="light-content" backgroundColor={'#000'} />
                <ImageZoom cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height}
                    imageWidth={300}
                    imageHeight={400}>
                    <Image style={{ width: scale(300), height: scale(400) }} resizeMode='contain'
                        source={{ uri: this.state.floorImage }} />
                </ImageZoom>
                <Image source={{ uri: this.state.floorImage }} style={styles.floorImage} resizeMode='contain' />
            </View>
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
        inventoryFloorplan: (data, successCallBack, failureCallBack) => dispatch(homeActions.inventoryFloorplan(data, successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryFloorPlan);