import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, ScrollView, TextInput, Modal, Dimensions, Linking } from 'react-native';
import styles from './ProjectDescriptionStyle';
import COLOR_CONST from '../../theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import scale, { verticalScale } from '../../utils/Scale';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SliderBox } from "react-native-image-slider-box";
import { SvgUri } from 'react-native-svg';
import HTMLView from 'react-native-htmlview';
import FbGrid from "react-native-fb-image-grid";
import ImageZoom from 'react-native-image-pan-zoom';
import WebView from 'react-native-webview';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import RenderHTML from 'react-native-render-html';
import DeviceInfo from 'react-native-device-info';

export class ProjectDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isGallerySelected: true,
            isFloorSelected: false,
            isViewSelected: false,
            google_map_shortlink: '',
            showList: [],
            isGalleryList: [],
            isFloorList: [],
            isViewList: [],
            amenitiesList: [],
            isAirportSelected: true,
            showImageModal: false,
            sliderImages: [],
            airData: [],
            PubTansData: [],
            mallData: [],
            hosData: [],
            showNearByLocations: [],
            streamingURL: '',
            latt: 0,
            long: 0
        }
    }

    componentDidMount = () => {
        this.getProjectDetail()
        this.getJSONApi()
    }

    getJSONApi = () => {
        let slungName = this.props.route.params.slungName
        let deviceId= DeviceInfo.getDeviceId();
        fetch(`https://www.cubedots.com/assets/data/projectsLocation/${slungName}.json?device_id=${deviceId}`)
            .then((response) => response.json())
            .then((json) => {
                let airData, PubTansData, mallData, hosData;
                json.map((item) => {
                    airData = json[0].airport
                    PubTansData = json[1].publictransport
                    mallData = json[2].mall
                    hosData = json[3].hospital
                    // console.log("@@@ Project Loc Table List Success Callback========", item.airport)
                })
                this.setState({ airData: airData, PubTansData: PubTansData, mallData: mallData, hosData: hosData, showNearByLocations: airData })
                return json;
            })
            .catch((error) => {
                // console.log("@@@ Project Loc Table List Failure Callback========", error)
            });
    }

    getProjectDetail = () => {
        let slungName = this.props.route.params.slungName
        let deviceId= DeviceInfo.getDeviceId();
        let data = {};
        data['slungName'] = slungName;
        data['device_id'] = deviceId;
        this.props.getProjectDetailData(data, (res) => this.getProjectDetailDataSuccessCallBack(res), (err) => this.getProjectDetailDataFailureCallBack(err))
    }

    getProjectDetailDataSuccessCallBack = async (res) => {
        // console.log('@@@ Get Projects Detail Success CallBack ===================', res);
        let sliderImages = [];
        res.data.banners.map((item) => {
            sliderImages.push(`https://cuengine-portal.s3.eu-west-2.amazonaws.com/${item.local_path}`)
        })
        let amenitiesL = [];
        res.data.amenities.map((item) => {
            let n = [];
            n['image'] = "https://staging.cubedots.com/assets/images/amenities/basketball.svg"
            n['name'] = item
            amenitiesL.push(n)
        })
        let galleyImages = [];
        res.data.gallery.map((item) => {
            galleyImages.push(`https://cuengine-portal.s3.eu-west-2.amazonaws.com/${item.local_path}`)
        })
        let floorImages = [];
        res.data.floorplan.map((item) => {
            floorImages.push(`https://cuengine-portal.s3.eu-west-2.amazonaws.com/${item.local_path}`)
        })
        let viewImages = [];
        res.data.view.map((item) => {
            viewImages.push(`https://cuengine-portal.s3.eu-west-2.amazonaws.com/${item.local_path}`)
        })
        // console.log('@@@ Get Projects Detail Suc===================', sliderImages);
        this.setState({
            title: res.data.title, address: res.data.address + " " + res.data.city + " " + res.data.country, google_map_shortlink: res.data.google_map_shortlink,
            small_description: res.data.small_description, long_description: res.data.long_description, medium_description: res.data.medium_description,
            property_area: res.data.property_area, property_type: res.data.property_type, unit_type: res.data.unit_type,
            sliderImages: sliderImages, currency_symbol: res.data.currency_symbol, min_price: res.data.min_price, max_price: res.data.max_price,
            isGalleryList: galleyImages, isFloorList: floorImages, isViewList: viewImages, showList: galleyImages,
            amenitiesList: amenitiesL, latt: res.data.latitude, long: res.data.longitude
        })
                console.log('@@@ Get Projects Detail Suc===================', this.state.latt,this.state.long);
        let token = await AsyncStorage.getItem('USER_TOKEN')
        let deviceId= DeviceInfo.getDeviceId();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                "test": null,
                "project_id": "avrupa-konutlari-yamanevler",
                "device_id": deviceId
            })
        };
        fetch(`https://portal.cubedots.com/api/v1/vagon/getStream`, requestOptions)
            .then((response) => response.json())
            .then(async (json) => {
                // console.log("@@@ Stream URL Success Callback========", json)
                if (!json.status) {
                    alert(JSON.stringify(json.message))
                }
                else {
                    this.setState({ streamingURL: json.data.stream.vagon_stream_url })
                }
            })
            .catch((error) => {
                alert("Something went wrong, could not send your enquiry.")
                // console.log("@@@ Stream URL Failure Callback========", error)
            });
    }

    getProjectDetailDataFailureCallBack = (error) => {
        if (error) {
            // console.log('@@@ Get Projects Detail Failure CallBack ===================', error);
            alert(error);
        } else {
            alert('Network Error!');
        }
    }

    numberWithCommas(x) {
        if (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else return '00'
    }

    renderSliderContainer = () => {
        return (
            <View>
                {/* <Text style={styles.headingText}>Projects</Text> */}
                <SliderBox
                    images={this.state.sliderImages}
                    // sliderBoxHeight={150}
                    style={styles.imageList}
                    // dotStyle={{ height: 8, width: 8, marginHorizontal: -3, marginBottom: 10 }}
                    // resizeMode={'contain'}
                    // dotColor={COLOR_CONST.themeBlue}
                    autoplay
                    circleLoop
                // onCurrentImagePressed={index => this.onPressCountryItem(item)}
                />
                <Text style={styles.projectName}>{this.state.title}</Text>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(10) }}
                    onPress={() => Linking.openURL(this.state.google_map_shortlink)}
                >
                    <Image source={IMG_CONST.whitekMapIcon} style={{ height: 15, width: 15, marginLeft: scale(10) }} />
                    <Text style={styles.projectAdd}>{this.state.address}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderButtonsContainer = () => {
        let is_3d_enabled = this.props.route.params.is_3d_enabled
        let slungName = this.props.route.params.slungName
        return (
            <View style={[styles.buttonsView, {justifyContent: is_3d_enabled ? 'space-between' : 'center'}]}>
                {/* <TouchableOpacity style={styles.button2D}><Text style={styles.D2DText}>Browse in 2D</Text></TouchableOpacity> */}
                {is_3d_enabled ?
                    <TouchableOpacity style={styles.button2D} onPress={() => Linking.openURL(this.state.streamingURL)}><Text style={styles.D2DText}>Browse in 3D</Text></TouchableOpacity>
                    : null
                }
                <TouchableOpacity style={styles.button2D}
                    onPress={() => this.props.navigation.navigate('ProjectsInventory', { item: this.state.title, slug: this.props.route.params.slungName })}
                ><Text style={styles.D2DText}>Inventory</Text></TouchableOpacity>
            </View>
        );
    }

    renderDesciptionContainer = () => {
        let item = this.props.route.params.item
        return (
            <View style={styles.projectDescription}>
                <Text style={styles.subheadText}>Project Description</Text>
                <Text style={styles.projectSubDes}>{this.state.small_description}</Text>
                <Text style={[styles.projectAdd, { marginTop: verticalScale(15), color: COLOR_CONST.themeBlue }]}>{this.state.medium_description}</Text>
                <HTMLView
                    value={this.state.long_description}
                    stylesheet={styles.projectAdd}
                    fontSize={scale(12)}
                />
            </View>
        );
    }

    renderDetailContainer = () => {
        let item = this.props.route.params.item
        return (
            <View style={styles.projectDetail}>
                <View style={[styles.iconContainer, { marginLeft: scale(30) }]}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={IMG_CONST.area} style={styles.detailIcon} />
                        <Text style={styles.detailText}>Area</Text>
                        <Text style={[styles.detailText, { width: scale(115), textAlign: 'center', color: COLOR_CONST.themeOrange }]}>{this.state.property_area}sqm.</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: verticalScale(30) }}>
                        <Image source={IMG_CONST.propertyType} style={styles.detailIcon} />
                        <Text style={styles.detailText}>Property Type</Text>
                        <Text style={[styles.detailText, { color: COLOR_CONST.themeOrange }]}>{this.state.property_type}</Text>
                    </View>
                </View>
                <View style={[styles.iconContainer, { marginRight: scale(30), marginTop: verticalScale(10) }]}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={IMG_CONST.unitType} style={styles.detailIcon} />
                        <Text style={styles.detailText}>Unit Type</Text>
                        <Text style={[styles.detailText, { width: scale(110), textAlign: 'center', color: COLOR_CONST.themeOrange }]}>{this.state.unit_type}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: verticalScale(30) }}>
                        <Image source={IMG_CONST.dollar} style={styles.detailIcon} />
                        <Text style={styles.detailText}>Price Range</Text>
                        <Text style={[styles.detailText, { width: scale(90), textAlign: 'center', color: COLOR_CONST.themeOrange }]}>{this.state.currency_symbol}{this.numberWithCommas(this.state.min_price)} - {this.numberWithCommas(this.state.max_price)}</Text>
                    </View>
                </View>
            </View>
        );
    }

    renderTabViewContainer = () => {
        let item = this.props.route.params.item
        return (
            <View>
                <View style={styles.tabView}>
                    <TouchableOpacity onPress={() => this.setState({ isGallerySelected: true, isFloorSelected: false, isViewSelected: false, showList: this.state.isGalleryList })}
                        style={this.state.isGallerySelected ? styles.selectedTabView : styles.deselectedTabView}>
                        <Text style={[styles.selectedText, { color: this.state.isGallerySelected ? COLOR_CONST.black : "#ffffff90" }]}>Gallery</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ isGallerySelected: false, isFloorSelected: true, isViewSelected: false, showList: this.state.isFloorList })}
                        style={this.state.isFloorSelected ? styles.selectedTabView : styles.deselectedTabView}>
                        <Text style={[styles.selectedText, { color: this.state.isFloorSelected ? COLOR_CONST.black : "#ffffff90" }]}>Floor Plan</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ isGallerySelected: false, isFloorSelected: false, isViewSelected: true, showList: this.state.isViewList })}
                        style={this.state.isViewSelected ? styles.selectedTabView : styles.deselectedTabView}>
                        <Text style={[styles.selectedText, { color: this.state.isViewSelected ? COLOR_CONST.black : "#ffffff90" }]}>Views</Text></TouchableOpacity>
                </View>
                <View style={styles.hedingDivider} />
            </View>
        );
    }

    renderListContainer = () => {
        let item = this.props.route.params.item
        return (
            <View>
                <Text style={styles.tabSelectedText}>{this.state.isGallerySelected ? 'Gallery' : this.state.isFloorSelected ? 'Floor Plan' : 'View'}</Text>
                {this.state.showList.length ?
                    <FbGrid
                        images={this.state.showList}
                        style={styles.cellView}
                        onPress={(item) => this.setState({ showBigImage: item, showImageModal: true })}
                    />
                    :
                    <Text style={{ color: COLOR_CONST.white, padding: 20, textAlign: 'center', alignSelf: 'center' }}>No Data Available</Text>}
                {/* {
                    this.state.showList.length > 7 ?
                    <TouchableOpacity style={styles.otherPhotosView}>
                    <Text style={{ color: COLOR_CONST.white, fontWeight: 'bold' }}>+{this.state.showList.length - 7}</Text>
                    </TouchableOpacity>
                    :
                    null
                } */}
            </View>
        );
    }

    renderAmenitiesCellContainer = (item) => {
        return (
            <View style={styles.amenitiesCellView} >
                {/* <SvgUri
                    width={scale(90)}
                    height={scale(50)}
                    style={styles.amenitiesCellImage}
                    uri={'https://staging.cubedots.com/assets/images/amenities/walking-track.svg'}
                /> */}
                <Image source={{ uri: `https://www.cubedots.com/assets/images/amenities/${item.name}.png` }} style={styles.amenitiesCellImage} resizeMode='contain' />
                <Text style={styles.amenitiesHeadText}>{item.name}</Text>
            </View>
        );
    }

    renderAmenitiesContainer = () => {
        let item = this.props.route.params.item
        return (
            <View style={[styles.projectDescription, { padding: 0 }]}>
                <View style={styles.amenitiesTab}>
                    <Text style={[styles.amenitiesText, { color: COLOR_CONST.themeOrange, fontSize: scale(15) }]}>Amenities</Text></View>
                <View style={styles.amenitiesDivider} />
                <FlatList
                    style={styles.listView}
                    data={this.state.amenitiesList}
                    numColumns={3}
                    renderItem={({ item }) => this.renderAmenitiesCellContainer(item)}
                />
            </View>
        );
    }

    renderLocationContainer = () => {
        let item = this.props.route.params.item
        return (
            <View style={[styles.projectDescription, { padding: 0, backgroundColor: 'transparent' }]}>
                <View style={[styles.amenitiesTab, { borderBottomWidth: 1, marginLeft: scale(0) }]}>
                    <Text style={[styles.amenitiesText, { fontWeight: '500' }]}>Location</Text></View>
                <View style={[styles.hedingDivider, { marginLeft: scale(0) }]} />
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    // onPress={() => Linking.openURL(this.state.google_map_shortlink)}
                    style={{ height: scale(200), width: scale(340), marginTop: verticalScale(10) }}
                    region={{
                        latitude: this.state.latt,
                        longitude: this.state.long,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: this.state.latt,
                            longitude: this.state.long,
                        }}
                    // onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
                    />
                </MapView>
            </View>
        );
    }

    renderNearBysCellContainer = (item) => {
        return (
            <View style={styles.nearByCell}>
                <Text style={[styles.nearByCellText]}>{item.name}</Text>
                <Text style={[styles.nearByCellText, { width: scale(50) }]}>{item.distance}</Text>
                <Text style={[styles.nearByCellText, { width: scale(50) }]}>{item.time}</Text>
            </View>
        );
    }

    renderNearBysContainer = () => {
        let item = this.props.route.params.item
        return (
            <View style={styles.nearByTable}>
                <View style={styles.nearByTabView}>
                    <TouchableOpacity onPress={() => this.setState({ isAirportSelected: true, isTransportSelected: false, isMallSelected: false, isHospitalSelected: false, otherList: this.state.isAirportList, showNearByLocations: this.state.airData })}
                        style={this.state.isAirportSelected ? styles.nearBySelectedTabView : styles.nearByDeselectedTabView}>
                        <Text style={[styles.nearBySelectedText, { color: this.state.isAirportSelected ? COLOR_CONST.black : "#ffffff90" }]}>Airport</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ isAirportSelected: false, isTransportSelected: true, isMallSelected: false, isHospitalSelected: false, otherList: this.state.isTransportList, showNearByLocations: this.state.PubTansData })}
                        style={this.state.isTransportSelected ? styles.nearBySelectedTabView : styles.nearByDeselectedTabView}>
                        <Text style={[styles.nearBySelectedText, { color: this.state.isTransportSelected ? COLOR_CONST.black : "#ffffff90" }]}>Public Transport</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ isAirportSelected: false, isTransportSelected: false, isMallSelected: true, isHospitalSelected: false, otherList: this.state.isMallList, showNearByLocations: this.state.mallData })}
                        style={this.state.isMallSelected ? styles.nearBySelectedTabView : styles.nearByDeselectedTabView}>
                        <Text style={[styles.nearBySelectedText, { color: this.state.isMallSelected ? COLOR_CONST.black : "#ffffff90" }]}>Mall</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ isAirportSelected: false, isTransportSelected: false, isMallSelected: false, isHospitalSelected: true, otherList: this.state.isHospitalList, showNearByLocations: this.state.hosData })}
                        style={this.state.isHospitalSelected ? styles.nearBySelectedTabView : styles.nearByDeselectedTabView}>
                        <Text style={[styles.nearBySelectedText, { color: this.state.isHospitalSelected ? COLOR_CONST.black : "#ffffff90" }]}>Hospital</Text></TouchableOpacity>
                </View>
                <View style={styles.nearByHedingDivider} />
                <FlatList
                    style={styles.listView}
                    data={this.state.showNearByLocations}
                    renderItem={({ item }) => this.renderNearBysCellContainer(item)}
                />
            </View>
        );
    }

    renderCellContainer = (item) => {
        return (
            <TouchableOpacity style={styles.modalCellView} onPress={() => this.setState({ showBigImage: item })}>
                <Image source={{ uri: item }} style={styles.cellImage} />
            </TouchableOpacity>
        );
    }

    renderImageModalContainer = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showImageModal}
                onRequestClose={() => {
                    this.setState({ showImageModal: false })
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.transparentBg} />
                    <View style={styles.bottomView}>
                        <TouchableOpacity onPress={() => this.setState({ showImageModal: false })}>
                            <Image
                                source={IMG_CONST.modalCross}
                                style={styles.crossIcon}
                            />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: scale(375) }}>
                            <FlatList
                                style={styles.modalListView}
                                data={this.state.showList}
                                renderItem={({ item }) => this.renderCellContainer(item)}
                            />
                            <ImageZoom
                                cropWidth={290}
                                cropHeight={450}
                                imageWidth={200}
                                imageHeight={300}
                                style={styles.showBigImage}>
                                <Image style={styles.showBigImage} source={{ uri: this.state.showBigImage }} resizeMode="contain" />
                            </ImageZoom>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    render() {
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="light-content" backgroundColor={'#000'} />
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                    style={{ padding: 5, marginLeft: scale(10), marginTop: verticalScale(40) }}><Image source={IMG_CONST.arrowWhite} style={{ height: 20, width: 20 }} /></TouchableOpacity>
                {this.renderSliderContainer()}
                {this.renderButtonsContainer()}
                {this.renderDesciptionContainer()}
                {this.renderDetailContainer()}
                {this.renderTabViewContainer()}
                {this.renderListContainer()}
                {this.renderAmenitiesContainer()}
                {this.renderLocationContainer()}
                {this.renderNearBysContainer()}
                {this.state.showImageModal && this.renderImageModalContainer()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDescription);