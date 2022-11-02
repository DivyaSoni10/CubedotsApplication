import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, Dimensions, Modal, FlatList, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import styles from './AgentsOnHomeStyle';
import scale, { verticalScale } from '../../utils/Scale';
import * as IMG_CONST from '../../theme/ImageConstants';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import ProgressBar from "react-native-animated-progress";
import { FONTS } from '../../theme/ColorConstants';

export class AgentsOnHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            exploreMore: false,
            images: [
                IMG_CONST.sliderImageForLP,
                IMG_CONST.sliderImageForLP,
            ],
            threeDotArray: [{ id: 1, isSelected: true }, { id: 2, isSelected: false }, { id: 3, isSelected: false }, { id: 4, isSelected: false }, { id: 5, isSelected: false }],
            progress: 0,
            indexIs: 0,
            indexed: 0,
            showViewModal: false,
        }
    }

    componentDidMount = () => {
        setInterval(() => {
            this.setState({ progress: this.state.progress + .1 });
        }, 1000);
    }

    onPressRadioListItem = (item) => {
        var tempList = this.state.threeDotArray;
        for (var i = 0; i < tempList.length; i++) {
            if (tempList[i].id == item.id) {
                tempList[i]["isSelected"] = true;
                this.setState({ countryValue: item.country_name })
            } else { tempList[i]["isSelected"] = false; }
        } this.setState({ threeDotArray: tempList })
    }

    renderSwiperListContainer = () => {
        return (
            <View style={styles.pagination}>
                <SwiperFlatList
                    autoplay
                    autoplayDelay={3}
                    autoplayLoop
                    index={this.state.indexed}
                    showPagination={true}
                    paginationStyleItem={{ left: -75, bottom: 45 }}
                    paginationStyleItemActive={styles.activeDot}
                    paginationStyleItemInactive={styles.inActiveDot}
                    data={this.state.images}
                    onChangeIndex={n => this.setState({ indexIs: this.state.indexIs == (this.state.images.length - 1) ? 0 : (this.state.indexIs < n.index ? (this.state.indexIs + 1) : n.index), progress: 0 }, console.log(')()())()))', n.index))}
                    renderItem={({ item }) => (
                        <>
                            <ImageBackground resizeMode="cover"
                                source={IMG_CONST.bgImg}
                                style={styles.wt1}
                            >
                                <View style={{ backgroundColor: '#00000099', position: 'absolute', bottom: 0, left: 0, right: 0, width: scale(302), height: scale(305), paddingLeft: scale(27), borderBottomLeftRadius: scale(10), borderBottomRightRadius: scale(10), overflow: 'hidden' }}>
                                    <Text style={[styles.cardHeadingText, { color: '#fff', marginTop: verticalScale(37) }]}>LOREM IPSUM</Text>
                                    <Text style={[styles.swiperSubHead, { color: '#fff', marginTop: verticalScale(25) }]}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, Lorem ipsum</Text>
                                    {/* <TouchableOpacity style={styles.exploreBtn}><Text style={styles.exploreText}>Read the story</Text></TouchableOpacity> */}
                                    <TouchableOpacity onPress={() => this.setState({ exploreMore: true })}><ImageBackground resizeMode='contain' source={IMG_CONST.btnBg} style={styles.exploreBtn}>
                                        <Text style={styles.exploreText}>Read the story</Text></ImageBackground></TouchableOpacity>
                                    {/* <View style={{ backgroundColor: '#00000060', position: 'absolute', bottom: 0, left: 0, right: 0, width: scale(475), height: scale(80), alignSelf: 'flex-start', justifyContent: 'flex-start' }}/> */}
                                    {/* </View> */}
                                </View>
                            </ImageBackground>
                        </>
                    )}
                />
                {/* <FlatList
                    style={{ width: scale(302), height: scale(5), position: 'absolute', bottom: scale(53) }}
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
                                <TouchableOpacity style={styles.inActiveDot}
                                // onPress={() => this.setState({ indexIs: index, indexed: index, progress: 0 }, console.log("{}{}{}}{}{}{}{", index))} 
                                />
                        )
                    }}
                /> */}
            </View>
        );
    }

    renderAgentsCard = () => {
        return (
            <View style={[styles.cardView, { marginTop: verticalScale(60) }]}>
                <Text style={styles.cardHeadingText}>agents</Text>
                <Text style={styles.cardSubHeading}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</Text>
                {/* <TouchableOpacity style={[styles.exploreBtn]} onPress={() => this.setState({ exploreMore: true })}><Text style={[styles.exploreText]}>Explore More</Text></TouchableOpacity> */}
                <TouchableOpacity style={{ alignSelf: 'flex-start' }} onPress={() => this.setState({ exploreMore: true })}><ImageBackground resizeMode='contain' source={IMG_CONST.btnBg} style={styles.exploreBtn}>
                    <Text style={styles.exploreText}>Explore More</Text></ImageBackground></TouchableOpacity>
            </View>
        );
    }

    renderMoreContainer = () => {
        return (
            <Animatable.View animation="bounceInDown" style={{ borderBottomLeftRadius: scale(10), borderBottomRightRadius: scale(10) }}>
                <View style={!this.state.showViewModal ? [styles.extendedCardView, { marginTop: verticalScale(60), borderRadius: scale(10), borderBottomLeftRadius: scale(10), borderBottomRightRadius: scale(10) }] : [styles.extendedCardView, { marginTop: verticalScale(60), borderTopLeftRadius: scale(10), borderTopRightRadius: scale(10) }]}>
                    <View style={styles.headView}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => this.setState({ exploreMore: false, showViewModal: false })}>
                            <Image style={[styles.headBackIcon, { marginLeft: scale(17) }]} source={IMG_CONST.backIconInCard} />
                            <Text style={[styles.headText, { marginLeft: scale(8.57), fontSize: scale(14), fontFamily: FONTS.RobotoBold }]}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }} onPress={() => this.setState({ showViewModal: !this.state.showViewModal })}>
                            <Image style={!this.state.showViewModal ? styles.headThreeDot : styles.headCross} source={!this.state.showViewModal ? IMG_CONST.white3Dots : IMG_CONST.whiteCross} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headDivider} />
                    {!this.state.showViewModal ?
                        <>
                            <View style={{ paddingHorizontal: scale(27), paddingVertical: scale(29) }}>
                                <Text style={[styles.cardHeadingText, { color: '#fff' }]}>agents</Text>
                                <Text style={[styles.cardSubHeading, { color: '#fff' }]}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.{'\n'}{'\n'}Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</Text>
                                <Text style={[styles.cardSubHeading, { color: '#fff', fontFamily: FONTS.RobotoBold, fontSize: scale(14) }]}>Lorem ipsum</Text>
                                <Text style={[styles.cardSubHeading, { color: '#fff', fontSize: scale(14) }]}>Chief Analyst, XYZ</Text>
                                {/* <TouchableOpacity style={[styles.exploreBtn]}><Text style={[styles.exploreText]}>Learn More</Text></TouchableOpacity> */}
                                <TouchableOpacity onPress={() => this.setState({ exploreMore: true })}><ImageBackground resizeMode='contain' source={IMG_CONST.btnBg} style={styles.exploreBtn}>
                                    <Text style={styles.exploreText}>Learn More</Text></ImageBackground></TouchableOpacity>
                            </View>
                            {/* <View style={[styles.headDivider, {marginTop: verticalScale(41)}]} /> */}
                            {this.state.exploreMore && this.renderSwiperListContainer()}
                        </>
                        :
                        this.renderRadioListCOntainer()
                    }
                </View>
            </Animatable.View>
        );
    }

    renderRadioCellContainer = (item) => {
        return (
            <Animatable.Text animation="wobble" style={[styles.radioCellStyle, { backgroundColor: item.isSelected ? '#fff' : 'transparent' }]}>
                <TouchableOpacity style={styles.radioCellBtn} onPress={() => this.onPressRadioListItem(item)}>
                    <Text style={[styles.radioCellText, { color: !item.isSelected ? '#fff' : '#002532', fontFamily: item.isSelected ? FONTS.RobotoBold : FONTS.RobotoRegular }]}>Lorem Ipsum</Text>
                </TouchableOpacity>
            </Animatable.Text>
        );
    }

    renderRadioListCOntainer = () => {
        return (
            <View style={{ height: scale(386), marginTop: verticalScale(18.5) }}>
                <FlatList
                    data={this.state.threeDotArray}
                    renderItem={({ item }) => this.renderRadioCellContainer(item)}
                />
            </View>
        );
    }

    render() {
        return (
            <View style={{ borderBottomLeftRadius: scale(10), borderBottomRightRadius: scale(10) }}>
                {!this.state.exploreMore && this.renderAgentsCard()}
                <View style={{ borderRadius: scale(10), borderBottomLeftRadius: scale(10), borderBottomRightRadius: scale(10) }}>
                    {this.state.exploreMore && this.renderMoreContainer()}
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(AgentsOnHome);