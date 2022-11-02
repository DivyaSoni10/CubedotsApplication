import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, ScrollView, TextInput } from 'react-native';
import styles from './ProjectsListingStyle';
import COLOR_CONST from '../../theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import scale, { verticalScale } from '../../utils/Scale';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SliderBox } from "react-native-image-slider-box";
import * as Progress from 'react-native-progress';

class PropertyEnquiry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEyeClicked: true,
            isInvalidOtp: false,
            isRemebered: false,
            countryItems: [],
        };
    }

    componentDidMount = () => {
        this.getProjectData()
    }

    getProjectData = () => {
        this.props.getProjectListData((res) => this.getProjectListDataSuccessCallBack(res), (err) => this.getProjectListDataFailureCallBack(err))
    }

    getProjectListDataSuccessCallBack = async (res) => {
        // console.log('@@@ Get Projects List Success CallBack ===================', res.data);
        let t = [];
        res.data.projects.map((item) => {
            item['id'] = item.id
            item['isSelected'] = false
            item['name'] = item.title
            item['smallDes'] = item.small_description
            item['detail'] = item.medium_description
            item['longDes'] = item.long_description
            item['add'] = item.address + " " + item.city + " " + item.country
            item['completion'] = item.property_stage
            let sliderImages = [];
            item.banners.map((item1) => {
                sliderImages.push(`https://cuengine-portal.s3.eu-west-2.amazonaws.com/${item1.local_path}`)
            })
            item['image'] = sliderImages
            item['property_area'] = item.property_area
            item['property_type'] = item.property_type
            item['unit_type'] = item.unit_type
            item['currency'] = item.currency_symbol
            item['minPrice'] = item.min_price
            item['maxPrice'] = item.max_price
            t.push(item)
        })
        this.setState({ countryItems: t })
    }

    getProjectListDataFailureCallBack = (error) => {
        if (error) {
            // console.log('@@@ Get Projects List Failure CallBack ===================', error);
            alert(error);
        } else {
            alert('Network Error!');
        }
    }

    onPressCountryItem = (item) => {
        var tempList = this.state.countryItems;
        for (var i = 0; i < tempList.length; i++) {
            if (tempList[i].id == item.id) {
                tempList[i]["isSelected"] = true;
            } else { tempList[i]["isSelected"] = false; }
        } this.setState({ countryItems: tempList, isCountryFocused: false }
            , () => this.props.navigation.navigate('ProjectDescription', { slungName: item.slug, is_3d_enabled: item.is_3d_enabled, item: item })
        )
    }

    convertPercent = (num) => {
        let progress = num / 100;
        return progress;
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    renderCountryCellContainer = (item) => {
        return (
            <View style={styles.projectCell}>
                <SliderBox
                    images={item.image}
                    // sliderBoxHeight={150}
                    style={styles.imageList}
                    dotStyle={{ height: 8, width: 8, marginHorizontal: -3, marginBottom: 10 }}
                    resizeMode={'contain'}
                    dotColor={COLOR_CONST.themeBlue}
                    autoplay
                    circleLoop
                    onCurrentImagePressed={index => item.project_status === 'sold' ? null : this.onPressCountryItem(item)}
                />
                <TouchableOpacity disabled={item.project_status === 'sold'} onPress={() => item.project_status === 'sold' ? null : this.props.navigation.navigate('ProjectDescription', { slungName: item.slug, is_3d_enabled: item.is_3d_enabled, item: item })}><Text style={styles.projectName}>{item.name}</Text></TouchableOpacity>
                <Text style={styles.projectPrice}>{item.currency}{this.numberWithCommas(item.minPrice)} - {this.numberWithCommas(item.maxPrice)}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(10) }} >
                    <Image source={IMG_CONST.orangeMapIcon} style={{ height: 15, width: 15, marginLeft: scale(10) }} resizeMode='contain' />
                    <Text style={[styles.projectAdd, { width: scale(300), }]}>{item.add}</Text>
                </View>
                <Text style={[styles.projectAdd, { marginTop: verticalScale(10), width: scale(320), }]}>{item.detail}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(5), justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Progress.Bar progress={this.convertPercent(item.completion)} width={45} height={8} style={{ marginLeft: scale(10) }}
                            borderRadius={15} color={COLOR_CONST.themeOrange} unfilledColor={'#00000020'} animationType={'timing'} />
                        <Text style={styles.projectAdd}>{item.completion}%</Text>
                    </View>
                    <TouchableOpacity disabled={item.project_status === 'sold'}
                        onPress={() => this.props.navigation.navigate('Enquiry', { slug: item.slug })}
                        style={{ paddingHorizontal: 15 }}>
                        <View style={{ height: scale(25), width: scale(70), justifyContent: 'center', alignItems: 'center', borderWidth: scale(0.6), borderRadius: scale(5), borderColor: '#00000090', marginRight: scale(10) }}>
                            <Text style={[styles.projectAdd, { marginLeft: scale(0), fontSize: scale(14), color: item.project_status === 'sold' ? '#00000040' : COLOR_CONST.themeBlue }]}>Contact</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderListContainer = () => {
        return (
            <View style={styles.textInputContaier}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => this.props.navigation.openDrawer()}><Image style={styles.menuIcon} source={require('../../assets/dashboard/whiteMenu.png')} /></TouchableOpacity>
                    <Text style={styles.headingText}>Projects</Text>
                    <TouchableOpacity style={[styles.menuIcon, { marginRight: 10 }]}></TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.countryItems}
                    renderItem={({ item }) => this.renderCountryCellContainer(item)}
                />
            </View>
        );
    }

    render() {
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="light-content" backgroundColor={'#000'} />
                {this.renderListContainer()}
            </ScrollView>
        );
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
        getProjectListData: (successCallBack, failureCallBack) => dispatch(userActions.getProjectListData(successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyEnquiry);
