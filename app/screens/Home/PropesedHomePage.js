import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, Dimensions, Modal, FlatList, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import styles from './ProposedHomeStyle';
import Swiper from 'react-native-swiper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import scale, { verticalScale } from '../../utils/Scale';
import * as IMG_CONST from '../../theme/ImageConstants';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import YoutubePlayer from "react-native-youtube-iframe";
import VideoPlayer from 'react-native-video-player';
import * as Progress from 'react-native-progress';
import ProgressBar from "react-native-animated-progress";
import AgentsOnHome from './AgentsOnHome';
import DevelopersOnHome from './DevelopersOnHome';

export class PropesedHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            images: [
                {
                    projectNimage: 'https://cuengine-portal.s3.eu-west-2.amazonaws.com/project_media/10/banner/Project%20img-01.png'
                },
                IMG_CONST.sliderImageForLP,
                IMG_CONST.sliderImageForLP,
                'https://cuengine-portal.s3.eu-west-2.amazonaws.com/project_media/10/banner/Project%20img-01.png',
                IMG_CONST.sliderImageForLP,
                IMG_CONST.sliderImageForLP,
            ],
            countryItems: [],
            isVideo: false,
            indexIs: 0,
            indexed: 0,
            progress: 0,
        }
    }

    getVideoId = (url) => {
        // console.log("@@@ Video URl=====", url)
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
        // return params.v
    }

    indexChanged = async (index) => {
        // console.log('@@@ Index ===========', index);
        if (index === 3) {
            await this.setState({ isShowDots: false });
        } else {
            await this.setState({ isShowDots: true });
        }
    }

    onPressForward = () => {
        let localIndex = this.state.swiperIndex;
        this.indexChanged(localIndex);
        localIndex++;
        this.setState({ swiperIndex: localIndex });
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    componentDidMount = () => {
        setInterval(() => {
            this.setState({ progress: this.state.progress + .1 });
        }, 1000);
        this.getProjectData();
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
            item['add'] = item.city + " " + item.country
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

    showProgress = () => {
        return (
            <ProgressBar backgroundColor="#000" progress={100} height={scale(5)} style={styles.activeDot} trackColor='#fff' />
        );
    }

    renderSwiperListContainer = () => {
        return (
            <View style={styles.pagination}>
                <SwiperFlatList
                    autoplay
                    autoplayDelay={10}
                    autoplayLoop
                    index={this.state.indexed}
                    showPagination={false}
                    paginationStyleItem={() => this.showProgress()}
                    paginationStyleItemActive={styles.activeDot}
                    paginationStyleItemInactive={styles.inActiveDot}
                    data={this.state.countryItems}
                    onChangeIndex={n => this.setState({ indexIs: this.state.indexIs == (this.state.countryItems.length - 1) ? 0 : (this.state.indexIs < n.index ? (this.state.indexIs + 1) : n.index), progress: 0 }
                    // , console.log(')()())()))', n.index)
                    )}
                    renderItem={({ item }) => (
                        this.state.isVideo ? <ImageBackground resizeMode="cover"
                            source={IMG_CONST.sliderImageForLP}
                            style={styles.wt1}
                        >
                            <ImageBackground resizeMode="cover"
                                source={IMG_CONST.gradient}
                                style={styles.gradientImage}
                                >
                                {/* <View style={{ backgroundColor: '#00000030', position: 'absolute', bottom: 0, left: 0, right: 0, width: scale(475), height: scale(250), alignSelf: 'flex-start', justifyContent: 'flex-start' }}> */}
                                <View style={styles.lacationRow}>
                                    <Image source={IMG_CONST.locationIconW} style={styles.lacationconW} resizeMode="contain" />
                                    <Text style={[styles.heading]}>{item.add}</Text>
                                </View>
                                <Text style={[styles.subHeading]}>{item.name}</Text>
                                <Text style={[styles.price]}>{item.currency}{this.numberWithCommas(item.minPrice)} - {this.numberWithCommas(item.maxPrice)}</Text>
                                <TouchableOpacity style={{position: 'absolute', bottom: scale(88)}}><ImageBackground resizeMode='contain' source={IMG_CONST.btnBg} style={styles.viewProjBtn}>
                                    <Text style={styles.viewProjText}>Explore More</Text></ImageBackground></TouchableOpacity>
                                {/* <View style={{ backgroundColor: '#00000060', position: 'absolute', bottom: 0, left: 0, right: 0, width: scale(475), height: scale(80), alignSelf: 'flex-start', justifyContent: 'flex-start' }}/> */}
                                {/* </View> */}
                            </ImageBackground>
                        </ImageBackground>
                            :
                            //     <YoutubePlayer
                            //     // height={466}
                            //     webViewStyle={styles.wt1}
                            //     play={true}
                            //     videoId={this.getVideoId("https://www.youtube.com/watch?v=EngW7tLk6R8")}
                            // // onChangeState={onStateChange}
                            // />
                            <><VideoPlayer
                                video={require('../../assets/dashboard/dummy.mp4')}
                                style={styles.wt1}
                                resizeMode='cover'
                                customStyles={{ playIcon: false, autoplay: true }}
                                autoplay={true}
                                loop={true}
                                volume={0}
                                showDuration={false}
                                disableSeek={false}
                                controlsTimeout={0}
                                thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
                                fullScreenOnLongPress={false}
                            />
                                <ImageBackground resizeMode="cover"
                                    source={IMG_CONST.gradient}
                                    style={styles.gradientImage}
                                >
                                    <View style={styles.lacationRow}>
                                        <Image source={IMG_CONST.locationIconW} style={styles.lacationconW} resizeMode="contain" />
                                        <Text style={[styles.heading]}>{item.add}</Text>
                                    </View>
                                    <Text style={[styles.subHeading]}>{item.name}</Text>
                                    <Text style={[styles.price]}>{item.currency}{this.numberWithCommas(item.minPrice)} - {this.numberWithCommas(item.maxPrice)}</Text>
                                    <TouchableOpacity style={{position: 'absolute', bottom: scale(88)}}><ImageBackground resizeMode='contain' source={IMG_CONST.btnBg} style={styles.viewProjBtn}>
                                    <Text style={styles.viewProjText}>Explore More</Text></ImageBackground></TouchableOpacity>
                                    {/* <View style={{ backgroundColor: '#00000060', position: 'absolute', bottom: 0, left: 0, right: 0, width: scale(475), height: scale(80), alignSelf: 'flex-start', justifyContent: 'flex-start' }} /> */}
                                </ImageBackground>
                            </>
                    )}
                />
                <FlatList
                    style={styles.swiperProgressList}
                    data={this.state.countryItems}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    // numColumns={2}
                    renderItem={({ item, index }) => {
                        return (
                            // <ProgressBar backgroundColor="#F8400C" progress={100} height={scale(5)} style={styles.activeDot} trackColor='#fff'/>
                            this.state.indexIs === index ?
                                <Progress.Bar style={styles.activeDot} progress={this.state.progress}
                                    indeterminateAnimationDuration={100} animated={true} borderWidth={0}
                                    color={'#F8400C'} unfilledColor={'#fff'} indeterminate={false}
                                />
                                :
                                <View style={styles.inActiveDot}
                                // onPress={() => this.setState({ indexIs: index, indexed: index, progress: 0 }, console.log("{}{}{}}{}{}{}{", index))} 
                                />
                        )
                    }}
                />
            </View>
        );
    }

    renderHeadingContainer = () => {
        return (
            <View style={styles.headingView}>
                <TouchableOpacity style={{ padding: 10 }} 
                // onPress={() => this.setState({ isAppointmentSelected: false, isProfileSelected: false }, () => this.props.navigation.openDrawer())}
                ><Image style={styles.menuIcon} source={require('../../assets/dashboard/menuIicon.png')} /></TouchableOpacity>
                <Image style={styles.headingText} source={IMG_CONST.nameWithoutLogo} />
                <TouchableOpacity style={{ padding: 10 }}><Image style={styles.userIcon} source={IMG_CONST.userCircleIcon} /></TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container} >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} style={{ flex: 1 }} keyboardShouldPersistTaps={'always'} scrollEnabled={true}>
                        <StatusBar barStyle="dark-content" backgroundColor={'#f1f1f1'} hidden={true} />
                        <View class="swiper-pagination"></View>
                        {this.renderSwiperListContainer()}
                        {this.renderHeadingContainer()}
                        <AgentsOnHome/>
                        <DevelopersOnHome/>
                    </KeyboardAwareScrollView>
                </ScrollView>
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
        getProjectListData: (successCallBack, failureCallBack) => dispatch(userActions.getProjectListData(successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PropesedHomePage);