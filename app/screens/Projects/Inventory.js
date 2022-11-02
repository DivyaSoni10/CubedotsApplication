import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, ScrollView, Modal, Platform } from 'react-native';
import styles from './InventoryStyle';
import COLOR_CONST from '../../theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import scale, { verticalScale } from '../../utils/Scale';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { SvgUri } from 'react-native-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBlockFocused: false,
            blockValue: '',
            showModalList: [],
            blockItems: [],
            isShowModal: false,
            isFloorFocused: false,
            floorValue: '',
            floorItems: [],
            isUnitTypeFocused: false,
            unitTypeValue: '',
            unitTypeItems: [],
            isAreaFocused: false,
            areaValue: '',
            areaItems: [],
            areaMin: 0,
            areaMax: 0,
            priceMin: 0,
            priceMax: 0,
            isPriceFocused: false,
            priceValue: '',
            priceItems: [],
            totalItems: [],
        }
    }

    componentDidMount = () => {
        this.getProjectInvData()
    }

    getUnique(arr, index) {
        const unique = arr
            .map(e => e[index])
            // store the keys of the unique objects
            .map((e, i, label) => label.indexOf(e) === i && i)
            // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);
        return unique;
    }

    makeGroupArea(min, max) {
        let minarea = min;
        let maxarea = max + 1;
        let tempArea = (maxarea - minarea) / 4 + 1;
        let tempAreaSum = minarea;
        let buildupArea = [];
        for (let i = 1; i <= 4; i++) {
            let mina = tempAreaSum;
            let maxa = i === 4 ? maxarea : tempAreaSum + tempArea;
            let keyValue = [];
            keyValue['isSelected'] = false
            keyValue['id'] = i
            keyValue['label'] = parseInt(mina) + " - " + parseInt(maxa)
            buildupArea.push(keyValue);
            tempAreaSum = parseInt(tempAreaSum + tempArea);
        }
        // console.log("@@@ buildupArea"      , buildupArea);
        return buildupArea;
    }

    makeGroupPrice(min, max) {
        let minPrice = min;
        let maxPrice = max + 1;
        let tempPrice = (maxPrice - minPrice) / 4 + 1;
        let tempPriceSum = minPrice;
        let unitPrice = [];
        for (let i = 1; i <= 4; i++) {
            let mina = tempPriceSum;
            let maxa = i === 4 ? maxPrice : tempPriceSum + tempPrice;
            let keyValue = [];
            keyValue['isSelected'] = false
            keyValue['id'] = i
            keyValue['label'] = parseInt(mina) + " - " + parseInt(maxa)
            unitPrice.push(keyValue);
            tempPriceSum = parseInt(tempPriceSum + tempPrice);
        }
        // console.log("@@@ unitPrice", unitPrice);
        return unitPrice;
    }

    onPressSearchButton = () => {
        let block = this.state.blockValue;
        let floor = this.state.floorValue;
        let unitType = this.state.unitTypeValue;
        let areaArray = this.state.areaValue ? this.state.areaValue.split(' - ') : [this.state.areaMin, this.state.areaMax];
        let priceArray = this.state.priceValue ? this.state.priceValue.split(' - ') : [this.state.priceMin, this.state.priceMax];
        // console.log("@@@VVVVVV", areaArray)
        let filterUnits = this.state.totalItems.filter((item) => {
            return block ? (item.block === block) : true
        })
            .filter((item) => {
                return floor ? (item.floor === floor) : true
            })
            .filter((item) => {
                return unitType ? (item.unit_type === unitType) : true
            })
            .filter((item) => {
                //console.log("item.area ",item.built_up_area);
                return areaArray.length > 0 ? (item.built_up_area >= areaArray[0] && item.built_up_area <= areaArray[1]) : true
            })
            .filter((item) => {
                //console.log("item.price ",item.price);
                return priceArray.length > 0 ? (item.price >= priceArray[0] && item.price <= priceArray[1]) : true
            })
        // console.log("@@@@@@filterUnits", this.state.totalItems.length, filterUnits.length);
        this.setState({ totalItems: filterUnits })
    }

    getProjectInvData = () => {
        let slug = this.props.route.params.slug
        let deviceId= DeviceInfo.getDeviceId();
        let data = [];
        data['slug']= slug
        data['device_id']= deviceId
        this.props.projectInventory(data, (res) => this.projectInventoryDataSuccessCallBack(res), (err) => this.projectInventoryDataFailureCallBack(err))
    }

    projectInventoryDataSuccessCallBack = async (res) => {
        // console.log('@@@ Get Inventory List Success CallBack ===================', res.data);
        let t = [];
        let blocks = [];
        let floors = [];
        let units = [];
        let areas = [];
        let prices = [];
        res.data.data.map((item) => {
            item['isSelected'] = false
            t.push(item)
        })
        res.data.data.map((item) => {
            let q = []
            q['isSelected'] = false
            q['id'] = item.id
            q['label'] = item.block
            blocks.push(q)
        })
        res.data.data.map((item) => {
            let q = []
            q['isSelected'] = false
            q['id'] = item.id
            q['label'] = item.floor
            floors.push(q)
        })
        res.data.data.map((item) => {
            let q = []
            q['isSelected'] = false
            q['id'] = item.id
            q['label'] = item.unit_type
            units.push(q)
        })
        res.data.data.map((item) => {
            // let q= []
            // q['isSelected'] = false
            // q['id'] = item.id
            // q['label'] = item.built_up_area
            areas.push(item.built_up_area)
            prices.push(item.price)
        })
        // console.log("@@@@@#####", areas)
        var myArray = areas;
        var min = Math.min(...myArray);
        var max = Math.max(...myArray);
        // console.log("@@@@@#####", min)
        var myArrayP = prices;
        var minP = Math.min(...myArrayP);
        var maxP = Math.max(...myArrayP);
        this.setState({
            mainResponseList: t, totalItems: t, currency_symbol: res.project.currency_symbol, blockItems: this.getUnique(blocks, 'label'), floorItems: this.getUnique(floors, 'label'), unitTypeItems: this.getUnique(units, 'label'),
            areaItems: this.makeGroupArea(min, max), priceItems: this.makeGroupPrice(minP, maxP),
            areaMin: min, areaMax: max, priceMin: minP, priceMax: maxP,
        })
    }

    projectInventoryDataFailureCallBack = (error) => {
        if (error) {
            // console.log('@@@ Get Inventory List Failure CallBack ===================', error);
            alert(error);
        } else {
            alert('Network Error!');
        }
    }

    onPressCountryItem = (item) => {
        var tempList = this.state.isBlockFocused ? this.state.blockItems :
            this.state.isFloorFocused ? this.state.floorItems : this.state.isUnitTypeFocused ? this.state.unitTypeItems :
                this.state.isAreaFocused ? this.state.areaItems : this.state.priceItems;
        for (var i = 0; i < tempList.length; i++) {
            this.state.isBlockFocused ? this.setState({ floorValue: '', unitTypeValue: '', areaValue: '', priceValue: '' }) : null
            if (tempList[i].id == item.id) {
                tempList[i]["isSelected"] = true;
                this.setState({
                    blockValue: this.state.isBlockFocused ? item.label : this.state.blockValue,
                    floorValue: this.state.isFloorFocused ? item.label : this.state.floorValue,
                    unitTypeValue: this.state.isUnitTypeFocused ? item.label : this.state.unitTypeValue,
                    areaValue: this.state.isAreaFocused ? item.label : this.state.areaValue,
                    priceValue: this.state.isPriceFocused ? item.label : this.state.priceValue,
                })
            } else {
                tempList[i]["isSelected"] = false;
            }
        } this.setState({
            blockItems: this.state.isBlockFocused ? tempList : this.state.blockItems,
            floorItems: this.state.isFloorFocused ? tempList : this.state.floorItems,
            unitTypeItems: this.state.isUnitTypeFocused ? tempList : this.state.unitTypeItems,
            areaItems: this.state.isAreaFocused ? tempList : this.state.areaItems,
            priceItems: this.state.isPriceFocused ? tempList : this.state.priceItems,
            isShowModal: false, isBlockFocused: false, isFloorFocused: false, isUnitTypeFocused: false, isAreaFocused: false, isPriceFocused: false
        })
    }

    renderBlockCellContainer = (item) => {
        return (<TouchableOpacity onPress={() => this.onPressCountryItem(item)}><Text style={{ marginVertical: verticalScale(5), color: item.isSelected ? '#000' : '#00000090' }}>{item.label}{this.state.isAreaFocused ? 'sq.m.' : ''}</Text></TouchableOpacity>);
    }

    renderListModalContainer = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.isShowModal}
                onRequestClose={() => {
                    this.setState({ isShowModal: false })
                }}
            >
                <View style={styles.modalContainer}>
                    {/* <View style={styles.transparentBg} /> */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <View style={styles.bottomView}>
                            <TouchableOpacity onPress={() => this.setState({ isShowModal: false, isBlockFocused: false, isFloorFocused: false, isUnitTypeFocused: false, isAreaFocused: false, isPriceFocused: false })}>
                                <Image source={IMG_CONST.modalCross} style={styles.crossIcon} />
                            </TouchableOpacity>
                            <View style={styles.openedDropDown}>
                                <FlatList
                                    data={this.state.showModalList.sort((a, b) => a.label - b.label)}
                                    renderItem={({ item }) => this.renderBlockCellContainer(item)}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    renderHeaderContainer = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(50) }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                    style={{ padding: 5, marginLeft: scale(10) }}><Image source={IMG_CONST.arrowWhite} style={{ height: 20, width: 20 }} /></TouchableOpacity>
                <Text style={styles.headingText}>Inventory</Text>
            </View>
        );
    }

    renderProjectsContainer = () => {
        let item = this.props.route.params.item
        return (
            <View>
                <Text style={styles.projectName}>{item}</Text>
                <View style={styles.allDD}>
                    <TouchableOpacity onPress={() => this.setState({ totalItems: this.state.mainResponseList, blockValue: '', floorValue: '', unitTypeValue: '', areaValue: '', priceValue: '' })}
                        style={{ alignSelf: 'flex-end', marginRight: scale(30), padding: scale(10) }}><Text>Clear</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.basicConatiner}
                        onPress={() => this.setState({ totalItems: this.state.mainResponseList, showModalList: this.state.blockItems, isShowModal: true, isBlockFocused: true, isFloorFocused: false, isUnitTypeFocused: false, isAreaFocused: false, isPriceFocused: false })}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={IMG_CONST.invBlock} style={{ height: scale(20), width: scale(20), marginLeft: 10 }} />
                            <Text style={[styles.textInput]}>{this.state.blockValue ? this.state.blockValue : 'Block'}</Text>
                        </View>
                        <Image style={styles.dropdown} source={this.state.isBlockFocused ? IMG_CONST.whiteUp : IMG_CONST.whiteDown} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.basicConatiner}
                        onPress={() => this.setState({ showModalList: this.state.floorItems, isShowModal: true, isBlockFocused: false, isFloorFocused: true, isUnitTypeFocused: false, isAreaFocused: false, isPriceFocused: false })}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={IMG_CONST.invFloor} style={{ height: scale(20), width: scale(20), marginLeft: 10 }} />
                            <Text style={[styles.textInput]}>{this.state.floorValue ? this.state.floorValue : 'Floor'}</Text>
                        </View>
                        <Image style={styles.dropdown} source={this.state.isFloorFocused ? IMG_CONST.whiteUp : IMG_CONST.whiteDown} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.basicConatiner}
                        onPress={() => this.setState({ showModalList: this.state.unitTypeItems, isShowModal: true, isBlockFocused: false, isFloorFocused: false, isUnitTypeFocused: true, isAreaFocused: false, isPriceFocused: false })}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={IMG_CONST.invUnit} style={{ height: scale(20), width: scale(20), marginLeft: 10 }} />
                            <Text style={[styles.textInput]}>{this.state.unitTypeValue ? this.state.unitTypeValue : 'Unit Type'}</Text>
                        </View>
                        <Image style={styles.dropdown} source={this.state.isUnitTypeFocused ? IMG_CONST.whiteUp : IMG_CONST.whiteDown} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.basicConatiner}
                        onPress={() => this.setState({ showModalList: this.state.areaItems, isShowModal: true, isBlockFocused: false, isFloorFocused: false, isUnitTypeFocused: false, isAreaFocused: true, isPriceFocused: false })}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={IMG_CONST.invArea} style={{ height: scale(20), width: scale(20), marginLeft: 10 }} />
                            <Text style={[styles.textInput]}>{this.state.areaValue ? this.state.areaValue : 'Area'}</Text>
                        </View>
                        <Image style={styles.dropdown} source={this.state.isAreaFocused ? IMG_CONST.whiteUp : IMG_CONST.whiteDown} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.basicConatiner}
                        onPress={() => this.setState({ showModalList: this.state.priceItems, isShowModal: true, isBlockFocused: false, isFloorFocused: false, isUnitTypeFocused: false, isAreaFocused: false, isPriceFocused: true })}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={IMG_CONST.invPrice} style={{ height: scale(20), width: scale(20), marginLeft: 10 }} />
                            <Text style={[styles.textInput]}>{this.state.priceValue ? this.state.priceValue : 'Price'}</Text>
                        </View>
                        <Image style={styles.dropdown} source={this.state.isPriceFocused ? IMG_CONST.whiteUp : IMG_CONST.whiteDown} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonConatiner}
                        onPress={() => this.onPressSearchButton()}>
                        <Text style={[styles.buttonText]}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderSalesCell = (item) => {
        let data = this.props.route.params.slug
        return (
            <View>
                <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: verticalScale(5) }}>
                    <Text style={[styles.salesHeadingTable, {}]}>{item.unit_id}</Text>
                    <Text style={styles.salesHeadingTable}>{item.block}</Text>
                    <Text style={[styles.salesHeadingTable, { width: scale(35) }]}>{item.floor}</Text>
                    <Text style={styles.salesHeadingTable}>{item.bedroom}</Text>
                    <Text style={styles.salesHeadingTable}>{item.unit_type}</Text>
                    <Text style={styles.salesHeadingTable}>{item.built_up_area}</Text>
                    <Text style={styles.salesHeadingTable}>{item.net_area}</Text>
                    <Text style={styles.salesHeadingTable}>{item.direction}</Text>
                    <Text style={styles.salesHeadingTable}>{item.price} {this.state.currency_symbol}</Text>
                    <View style={styles.salesHeadingTable}><View style={[styles.trView, { backgroundColor: 'green' }]}><Text style={[styles.salesHeadingTable, { fontSize: scale(10), width: scale(50), fontWeight: '700' }]}>{item.status}</Text></View></View>

                    <View style={[styles.salesHeadingTable, { flexDirection: 'row', justifyContent: 'space-between', width: scale(80), marginLeft: scale(15) }]}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('InventoryFloorPlan', { slug: data, cubedots_id: item.cubedots_id })} style={[styles.trView, { backgroundColor: COLOR_CONST.themeOrange }]}>
                            <Image source={IMG_CONST.whiteEye} style={{ height: scale(15), width: scale(15), alignSelf: 'center' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Enquiry', { slug: data })} style={[styles.trView, { backgroundColor: COLOR_CONST.themeOrange }]}><Text style={[styles.salesHeadingTable, { fontSize: scale(11), width: scale(50) }]}>Enquire Now</Text></TouchableOpacity></View>
                </View>
                <View style={[styles.hedongDivider, { opacity: 0.2 }]} />
            </View>
        );
    }

    renderSaleTableContainer = () => {
        return (
            <View style={styles.saleTable}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: verticalScale(10) }}>
                    <Text style={styles.headTableText}>Total Units: {this.state.totalItems.length}</Text>
                </View>
                <KeyboardAwareScrollView horizontal={true}
                    style={{ paddingBottom: verticalScale(20) }}
                // showsHorizontalScrollIndicator={false}
                >
                    <View>
                        <View style={styles.salesHeaderTable}>
                            <Text style={[styles.salesHeadingTable, {}]}>  ID</Text>
                            <Text style={[styles.salesHeadingTable]}>Block</Text>
                            <Text style={[styles.salesHeadingTable, { width: scale(35) }]}>Floor</Text>
                            <Text style={styles.salesHeadingTable}>Bedroom</Text>
                            <Text style={styles.salesHeadingTable}>Unit Type</Text>
                            <Text style={styles.salesHeadingTable}>Built Up Area</Text>
                            <Text style={styles.salesHeadingTable}>Net Area</Text>
                            <Text style={styles.salesHeadingTable}>Direction</Text>
                            <Text style={styles.salesHeadingTable}>Price</Text>
                            <Text style={styles.salesHeadingTable}>Status</Text>
                            <Text style={[styles.salesHeadingTable, { width: scale(80), marginLeft: scale(15) }]}>Action</Text>
                        </View>
                        <View style={styles.hedongDivider} />
                        {this.state.totalItems.length ?
                            <FlatList
                                style={{ paddingBottom: verticalScale(40), height: Platform.OS === 'android' ? null : scale(500) }}
                                data={this.state.totalItems}
                                scrollEnabled={true}
                                renderItem={({ item }) => this.renderSalesCell(item)}
                            />
                            :
                            <Text style={styles.noDataText}>No data available.</Text>
                        }
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }

    render() {
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="light-content" backgroundColor={'#000'} />
                {this.renderHeaderContainer()}
                {this.renderProjectsContainer()}
                {this.renderSaleTableContainer()}
                {this.state.isShowModal && this.renderListModalContainer()}
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
        projectInventory: (data, successCallBack, failureCallBack) => dispatch(userActions.projectInventory(data, successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);