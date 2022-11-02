import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, ScrollView, TextInput } from 'react-native';
import styles from './CuVerseStyle';
import COLOR_CONST from '../../theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import scale, { verticalScale } from '../../utils/Scale';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/userActions';
import * as commonActions from '../../redux/actions/commonActions';

export class CuVerse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEyeClicked: true,
            projectList: []
        }
    }

    componentDidMount = () => {
        this.getProjectData()
    }

    getProjectData = () => {
        this.props.getProjectListData((res) => this.getProjectListDataSuccessCallBack(res), (err) => this.getProjectListDataFailureCallBack(err))
    }

    getProjectListDataSuccessCallBack = async (res) => {
        // console.log('@@@ Get Projects List on Cuverse Success CallBack ===================', res.data);
        let t = [];
        res.data.projects.map((item) => {
            item['id'] = item.id
            item['isSelected'] = false
            item['name'] = item.title
            item['slug'] = item.slug
            item['completion'] = item.property_stage
            item['featured_image'] = item.featured_image
            item['media_s3_base_path'] = item.media_s3_base_path
            t.push(item)
        })
        this.setState({ projectList: t })
    }

    getProjectListDataFailureCallBack = (error) => {
        if (error) {
            // console.log('@@@ Get Projects List on Cuverse Failure CallBack ===================', error);
            alert(error);
        } else {
            alert('Network Error!');
        }
    }

    onPressProjectItem = (item) => {
        var tempList = this.state.projectList;
        let featureImage= `https://cuengine-portal.s3.eu-west-2.amazonaws.com/${item.featured_image}`
        for (var i = 0; i < tempList.length; i++) {
            if (tempList[i].id == item.id) {
                tempList[i]["isSelected"] = true;
            } else { tempList[i]["isSelected"] = false; }
        } this.setState({ projectList: tempList}
            , () => this.props.navigation.navigate('CuVerseProject', { name: item.name, id: item.id, slugName: item.slug, featureImage: featureImage })
        )
    }

    renderHeaderContainer = () => {
        return (
            <View>
                <Image source={{ uri: 'https://staging.cubedots.com/assets/images/bannerimages/cuverse.jpg' }} style={{ height: scale(100), width: scale(375) }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: verticalScale(20) }}>
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => this.props.navigation.openDrawer()}><Image style={styles.menuIcon} source={require('../../assets/dashboard/whiteMenu.png')} /></TouchableOpacity>
                    <Text style={styles.projectHeadingText}>CuVerse</Text>
                    <TouchableOpacity style={[styles.menuIcon, { marginRight: 10 }]}></TouchableOpacity>
                </View>
            </View>
        );
    }

    replaceFromDash = (str) => {
        str = str.replace(/\s+/g, '-').toLowerCase();
        return str;
    }

    renderCountryCellContainer = (item) => {
        return (
            item.project_status === 'sold' ? null : <TouchableOpacity onPress={() => this.onPressProjectItem(item)}><Text style={styles.subHead}>- {item.name}</Text></TouchableOpacity>
        );
    }

    renderProjectsContainer = () => {
        return (
            <View>
                <Image source={{ uri: 'https://staging.cubedots.com/assets/images/missionvision.png' }} style={styles.mainImage} />
                <Text style={styles.headingText}>Projects</Text>
                <FlatList
                    data={this.state.projectList}
                    renderItem={({ item }) => this.renderCountryCellContainer(item)}
                />
            </View>
        );
    }

    renderInsightsContainer = () => {
        return (
            <View style={{ marginBottom: verticalScale(40) }}>
                <Image source={{ uri: 'https://staging.cubedots.com/assets/images/insights-Banner.jpg' }} style={styles.mainImage} />
                <Text style={styles.headingText}>Insights</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={styles.sideImage} source={IMG_CONST.citizenIcon} />
                    <TouchableOpacity style={{ width: scale(320) }} 
                    onPress={() => this.props.navigation.navigate('Citizenship')}
                    >
                        <Text style={styles.subHead}>Citizenship related </Text>
                        <Text style={styles.subText}>Get a clear insight on the Citizenship By Investment Program and the Turkish Citizenship acquirement conditions.</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={styles.sideImage} source={IMG_CONST.tutorialIcon} />
                    <TouchableOpacity style={{ width: scale(320) }} 
                    onPress={() => this.props.navigation.navigate('Tutorial')}
                    >
                        <Text style={styles.subHead}>Tutorial </Text>
                        <Text style={styles.subText}>Click here, download, and share the videos provided to simplify the user-experience of Cubedots App.</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={styles.sideImage} source={IMG_CONST.abotuIcon} />
                    <TouchableOpacity style={{ width: scale(320) }} 
                    onPress={() => this.props.navigation.navigate('AboutTurkey')}
                    >
                        <Text style={styles.subHead}>About Turkey </Text>
                        <Text style={styles.subText}>Learn more about Turkey, the Turkish real estate market, and what it has to offer.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="light-content" backgroundColor={'#000'} />
                {this.renderHeaderContainer()}
                {this.renderProjectsContainer()}
                {this.renderInsightsContainer()}
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
        getProjectListData: (successCallBack, failureCallBack) => dispatch(userActions.getProjectListData(successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CuVerse);