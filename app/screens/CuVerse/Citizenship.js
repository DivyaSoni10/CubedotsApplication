import { View, Text, StatusBar, TouchableOpacity, Image, Modal, ScrollView, Linking } from 'react-native';
import React, { Component } from 'react'
import styles from './CitizenshipStyle';
import scale, { verticalScale } from '../../utils/Scale';
import * as IMG_CONST from '../../theme/ImageConstants';
import COLOR_CONST from '../../theme/ColorConstants';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
// import PDFView from 'react-native-view-pdf';
import WebView from 'react-native-webview';

const resources = {
    file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
    url: 'https://staging.cubedots.com/assets/citezenship/CitizenshipbyInvestmentAdjustments.pdf',
    base64: 'JVBERi0xLjMKJcfs...',
};

export class Citizenship extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPDF1: false,
            showPDF2: false,
        }
    }

    renderPdfContainer = () => {
        const resourceType = 'url';
        const resources = {
            // file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
            url: 'https://staging.cubedots.com/assets/citezenship/CitizenshipbyInvestmentAdjustments.pdf',
            base64: 'JVBERi0xLjMKJcfs...',
        };
        const resourcess = {
            // file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
            url: 'https://staging.cubedots.com/assets/citezenship/TurkishCitizenship.pdf',
            base64: 'JVBERi0xLjMKJcfs...',
        };
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showPDF1 || this.state.showPDF2}
                onRequestClose={() => {
                    this.setState({ showPDF1: false, showPDF2: false })
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.transparentBg} />
                    <View style={styles.bottomView}>
                        <TouchableOpacity onPress={() => this.setState({ showPDF1: false, showPDF2: false })} style={{ padding: 5 }}>
                            <Image source={IMG_CONST.modalCross} style={styles.crossIconPdf} />
                        </TouchableOpacity>
                        {/* {this.state.showPDF1 ?
                            <PDFView
                                fadeInDuration={250.0}
                                style={{ flex: 1, width: 370, alignSelf: 'center' }}
                                resource={resources[resourceType]}
                                resourceType={resourceType}
                            // onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
                            // onError={(error) => console.log('Cannot render PDF', error)}
                            />
                            :
                            <PDFView
                                fadeInDuration={250.0}
                                style={{ flex: 1, width: 370, alignSelf: 'center' }}
                                resource={resourcess[resourceType]}
                                resourceType={resourceType}
                            // onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
                            // onError={(error) => console.log('Cannot render PDF', error)}
                            />
                        } */}
                        {/* <WebView source={{ uri: this.state.showPDF1 ? resources.url : resourcess.url }}
                        avaScriptEnabled={true}
                        geolocationEnabled={false}
                        builtInZoomControls={false}
                        startInLoadingState={true} /> */}
                        {/* {Linking.openURL(this.state.showPDF1 ? 'https://staging.cubedots.com/assets/citezenship/CitizenshipbyInvestmentAdjustments.pdf' : 'https://staging.cubedots.com/assets/citezenship/TurkishCitizenship.pdf')} */}
                    </View>
                </View>
            </Modal>
        );
    }

    renderDocContainer = () => {
        return (
            <View style={styles.docContainer}>
                <View>
                    <Image source={IMG_CONST.docIcon} style={styles.docIcon} />
                    <Text style={styles.docText}>Citizenship by Investment Adjustments</Text>
                    <TouchableOpacity style={styles.readMoreView} onPress={() => Linking.openURL('https://staging.cubedots.com/assets/citezenship/CitizenshipbyInvestmentAdjustments.pdf')}>
                        <Image source={IMG_CONST.whiteEye} style={styles.readMoreIcon} />
                        <Text style={styles.readMoreText}>Read More</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Image source={IMG_CONST.docIcon} style={styles.docIcon} />
                    <Text style={styles.docText}>Turkish Citizenship </Text>
                    <TouchableOpacity style={styles.readMoreView} onPress={() => Linking.openURL('https://staging.cubedots.com/assets/citezenship/TurkishCitizenship.pdf')}>
                        <Image source={IMG_CONST.whiteEye} style={styles.readMoreIcon} />
                        <Text style={styles.readMoreText}>Read More</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderHeaderContainer = () => {
        return (
            <View style={styles.textInputContaier}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                        style={{ padding: 5, marginLeft: scale(10) }}><Image source={IMG_CONST.arrowWhite} style={{ height: scale(20), width: scale(20) }} /></TouchableOpacity>
                    <Text style={styles.headingText}>Citizenship</Text>
                    <View style={{ marginRight: scale(20), height: scale(20), width: scale(20), padding: 5 }} />
                </View>
                {this.renderDocContainer()}
            </View>
        );
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor={'#f1f1f1'} />
                {this.renderHeaderContainer()}
                {this.state.showPDF1 && this.renderPdfContainer()}
                {this.state.showPDF2 && this.renderPdfContainer()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Citizenship);