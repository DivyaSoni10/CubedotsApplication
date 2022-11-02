import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, ScrollView, TextInput, Linking } from 'react-native';
import styles from './CuVerseStyle';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/userActions';
import * as homeActions from '../../redux/actions/homeActions';
import * as commonActions from '../../redux/actions/commonActions';
import scale, { verticalScale } from '../../utils/Scale';
import * as IMG_CONST from '../../theme/ImageConstants';
import RNFS from 'react-native-fs'
import DeviceInfo from 'react-native-device-info';

export class CuVerseProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEyeClicked: true,
            projectFolderList: [],
            selectedFolderName: '',
            showDash: '',
            showItems: false,
            showFolderItems: []
        }
    }

    componentDidMount = () => {
        this.getCuverseProject()
    }

    getCuverseProject = () => {
        let data = this.props.route.params.id
        let deviceId= DeviceInfo.getDeviceId();
        // const requestOptions = {
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json' },
        // };
        // console.log("@@@ Get Cuverse Project = Callback========")
        fetch(`https://portal.cubedots.com/api/v1/cuverse/mediaFiles/${data}?device_id=${deviceId}`)
            .then((response) => response.json())
            .then(async (json) => {
                // console.log("@@@ Get Cuverse Project Callback========", json)
                if (!json.status) {
                    alert(JSON.stringify(json.errors))
                }
                else {
                    let t = [];
                    json.data.items.map((item, index) => {
                        item['id'] = index
                        item['isSelected'] = false
                        t.push(item)
                    })
                    this.setState({ projectFolderList: t })
                }
            })
            .catch((error) => {
                alert("Something went wrong, could not fetch the data.")
                // console.log("@@@ Get Cuverse Project Failure Callback========", error)
            });
    }

    onPressProjectItem = (item) => {
        var tempList = this.state.projectFolderList;
        for (var i = 0; i < tempList.length; i++) {
            if (tempList[i].id == item.id) {
                tempList[i]["isSelected"] = true;
                this.setState({ selectedFolderName: item.name, showFolderItems: item.items, showItems: true })
            } else { tempList[i]["isSelected"] = false; }
        } this.setState({ projectFolderList: tempList }
            // , () => this.props.navigation.navigate('CuVerseProject', { slungName: item.slug })
        )
    }

    renderHeaderContainer = () => {
        let image = this.props.route.params.slugName
        return (
            <View>
                <Image source={{ uri: `https://staging.cubedots.com/assets/images/cuverse/${image}.jpg` }} style={{ height: scale(100), width: scale(375) }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: verticalScale(20) }}>
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => this.props.navigation.goBack()}><Image style={styles.menuIcon} source={require('../../assets/dashboard/arrowWhite.png')} /></TouchableOpacity>
                    <Text style={styles.projectHeadingText}></Text>
                    <TouchableOpacity style={[styles.menuIcon, { marginRight: 10 }]}></TouchableOpacity>
                </View>
                <Text style={styles.headingTextPro}>{this.props.route.params.name}</Text>
            </View>
        );
    }

    replaceFromDash = (str) => {
        str = str.replace(/\s+/g, '-').toLowerCase();
        return str;
    }

    bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    downloadFile = (url) => {
        const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.pdf`;
        const options = {
            fromUrl: url,
            toFile: localFile
        };
        // onChangeIsLoadingPdf(true)
        RNFS.downloadFile(options).promise
            .then(() => {
                // console.log(" @@@ localFile Path-=-=-=-=-->", localFile)
                // FileViewer.open(localFile)
                Linking.openURL(`${url}`)
            })
            .then(async () => {
                // onChangeIsLoadingPdf(false)
                // console.log("@@@ download success====>")
            })
            .catch(error => {
                // onChangeIsLoadingPdf(false)
                // console.log("@@@ download failure", error)
            });
    }

    renderProjectFolderCellContainer = (item) => {
        return (
            !item.items.length ?
                null :
                <TouchableOpacity onPress={() => this.onPressProjectItem(item)} style={styles.itemHoriView}>
                    <Image style={styles.filefolder} source={IMG_CONST.fileFolder} />
                    <View style={{ marginHorizontal: scale(20), alignSelf: 'center' }}>
                        <Text style={styles.folderTextHead}>{item.name}</Text>
                        <Text style={styles.folderTextHead}>{item.items.length} {item.items.length > 1 ? 'items' : 'item'}</Text>
                    </View>
                </TouchableOpacity>
        );
    }

    renderProjectFolderItemCellContainer = (item) => {
        let bbb = item.path
        let fileExtension = bbb.split('.').pop();
        return (
            <View style={[styles.itemHoriView]}>
                <Image style={styles.filefolder} source={fileExtension != 'mp4' ? fileExtension == 'jpg' ? { uri: item.path } : IMG_CONST.pdfFolder : IMG_CONST.mp4Folder} />
                <View style={{ marginHorizontal: scale(20), alignSelf: 'center' }}>
                    <Text style={styles.folderTextHead}>{`${item.name}(${this.bytesToSize(item.size)})`}</Text>
                    <TouchableOpacity style={styles.downloadBtn} onPress={() => this.downloadFile(item.path)}>
                        <Image style={styles.downloadImage} source={IMG_CONST.whiteDownload} />
                        <Text style={styles.downloadText}>Download</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderProjectsContainer = () => {
        return (
            <View>
                {/* <Image source={{ uri: this.props.route.params.featureImage }} style={styles.mainImageProject} /> */}
                <TouchableOpacity style={styles.projectsFolderHeader} onPress={() => this.setState({ showItems: false })}>
                    <Text style={[styles.headingFile]}>Files</Text>
                    {this.state.showItems ? <Text style={[styles.headingFile]}> / {this.state.selectedFolderName}</Text> : null}
                </TouchableOpacity>
                {!this.state.showItems ?
                    <FlatList
                        data={this.state.projectFolderList}
                        renderItem={({ item }) => this.renderProjectFolderCellContainer(item)}
                    />
                    :
                    <FlatList
                        data={this.state.showFolderItems}
                        renderItem={({ item }) => this.renderProjectFolderItemCellContainer(item)}
                    />
                }
            </View>
        );
    }

    render() {
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="light-content" backgroundColor={'#000'} />
                {this.renderHeaderContainer()}
                {this.renderProjectsContainer()}
                {/* {this.renderInsightsContainer()} */}
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
        cuverseProject: (successCallBack, failureCallBack) => dispatch(homeActions.cuverseProject(successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CuVerseProject);