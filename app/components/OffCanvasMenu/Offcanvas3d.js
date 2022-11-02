import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
  BackHandler,
} from 'react-native'
import scale , {verticalScale} from '../../utils/Scale';
import COLOR_CONST, { FONTS } from '../../../app/theme/ColorConstants';
import * as IMG_CONST from '../../../app/theme/ImageConstants';

class OffCanvas3D extends Component {
  constructor(props) {
    super(props)

    this._hardwareBackHandler = this._hardwareBackHandler.bind(this)

    this.state = {
      activityLeftPos : new Animated.Value(0),
      scaleSize : new Animated.Value(1.0),
      rotate: new Animated.Value(0),
      animationDuration: 400,
      stagArr: [],
      animatedStagArr: [],
      menuItems: this.props.menuItems,
      activeMenu: 0
    }
  }

  // staggered animation configuration for menu items
  componentDidMount() {
    let stagArrNew = []
    for (let i = 0; i < this.state.menuItems.length; i++) stagArrNew.push(i)
    this.setState({ stagArr: stagArrNew })

    let animatedStagArrNew = []
    stagArrNew.forEach((value) => {
      animatedStagArrNew[value] = new Animated.Value(0)
    })
    this.setState({ animatedStagArr: animatedStagArrNew })
  }

  // any update to component will fire the animation
  componentDidUpdate() {
    this._animateStuffs()

    if(this.props.handleBackPress && this.props.active) {
      BackHandler.addEventListener('hardwareBackPress', this._hardwareBackHandler)
    }

    if(this.props.handleBackPress && !this.props.active) {
      BackHandler.removeEventListener('hardwareBackPress', this._hardwareBackHandler)
    }
  }

  render() {
    const rotateVal = this.state.rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-10deg']
    })
    console.log('@@@ size ============', this.state.activityLeftPos)
    const staggeredAnimatedMenus = this.state.stagArr.map((index) => {
      return (
        <TouchableWithoutFeedback key={index} onPress={this._handlePress.bind(this, index)} style={{backgroundColor: 'red'}}>
          <Animated.View style={{ transform: [{ translateX: this.state.animatedStagArr[index] }] }}>
            <View style={styles.menuItemContainer}>
              {this.state.menuItems[index].icon}
              <Text style={[styles.menuItem, { ...this.props.menuTextStyles }]}>
                {this.state.menuItems[index].title}
              </Text>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )
    })

    return (
      <View style={[styles.offCanvasContainer, { flex: 1, backgroundColor: this.props.backgroundColor }]}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
          <View style={styles.profileContainer}>
            <Image source={IMG_CONST.DEMO_PROFILE} style={styles.profileImage} />
            <View style={styles.profileData}>
              <Text style={styles.profileText}>SteakHouse</Text>
              <Text style={styles.viewProfile}>View Profile</Text>
            </View>
          </View>
          <Animated.View style={styles.menuItemsContainer}>
              {staggeredAnimatedMenus}
          </Animated.View>
        </ScrollView>
        <Animated.View
          onStartShouldSetResponder={() => true}
          onResponderTerminationRequest={() => true}
          onResponderRelease={(evt) => this._gestureControl(evt)}
          style={[styles.activityContainer, {
            flex: 1,
            marginTop: this.props.active ? verticalScale(50) : 0,
            zIndex: 1000,
            borderLeftWidth: this.props.active ? scale(10) : 0,
            borderColor: COLOR_CONST.buttonColor,
            borderTopLeftRadius: scale(9),
            borderBottomLeftRadius: scale(9),
            backgroundColor: this.props.backgroundColor,
            transform: [
              { translateX: this.state.activityLeftPos },
              { scale: this.state.scaleSize },
              { rotateY: rotateVal }
            ]
          }]}>
          {this.state.menuItems[this.state.activeMenu].renderScene}
        </Animated.View>
        <Text onPress={() => {}} style={styles.termConditionText}>{`Terms & Conditions`}</Text>
        <TouchableOpacity onPress={() => {}} style={styles.instaButton}>
          <Image source={IMG_CONST.INSTAGRAM_ICON} style={styles.instagramIcon} />
        </TouchableOpacity>
      </View>
    )
  }

  //*> press on any menu item, render the respective scene
  _handlePress(index) {
    if(index === 3) {
      this.props.navigation.navigate('SignInScreen');
      return;
    }
    this.setState({ activeMenu: index })
    this.props.onMenuPress()
  }

  _hardwareBackHandler() {
    this.props.onMenuPress()
    return true
  }

  //*> control swipe left or right reveal for menu
  _gestureControl(evt) {
    const {locationX, pageX} = evt.nativeEvent
    if (!this.props.active) {
      if (locationX < 40 && pageX > 100) this.props.onMenuPress()
    } else {
      if (pageX) this.props.onMenuPress()
    }
  }

  // animate stuffs with hard coded values for fine tuning
  _animateStuffs() {
    const activityLeftPos = this.props.active ? scale(185) : 0
    const scaleSize = this.props.active ? .8 : 1
    const rotate = this.props.active ? 1 : 0
    const menuTranslateX = this.props.active? 0 : -150

    Animated.parallel([
      Animated.timing(this.state.activityLeftPos, { toValue: activityLeftPos, duration: this.state.animationDuration }),
      Animated.timing(this.state.scaleSize, { toValue: scaleSize, duration: this.state.animationDuration }),
      Animated.timing(this.state.rotate, { toValue: rotate, duration: this.state.animationDuration }),
      Animated.stagger(50, this.state.stagArr.map((item) => {
        if (this.props.active) {
          return Animated.timing(
            this.state.animatedStagArr[item],
            {
              toValue: menuTranslateX,
              duration: this.state.animationDuration,
              delay: 250,
              useNativeDriver: true,
            }
          )
        } else {
          return Animated.timing(
            this.state.animatedStagArr[item],
            {
              toValue: menuTranslateX,
              duration: this.state.animationDuration,
              delay: 400,
              useNativeDriver: true,
            }
          )
        }
      }))
      ])
      .start()
    }
  }

  // validate props
  OffCanvas3D.propTypes = {
    active: PropTypes.bool.isRequired,
    onMenuPress: PropTypes.func.isRequired,
    menuItems: PropTypes.array.isRequired,
    backgroundColor: PropTypes.string,
    menuTextStyles: PropTypes.object,
    handleBackPress: PropTypes.bool
  }

  //*> set default props
  OffCanvas3D.defaultProps = {
    backgroundColor: '#222222',
    menuTextStyles: { color: 'white' },
    handleBackPress: true
  }

  export default OffCanvas3D


  // structure stylesheet
  const styles = StyleSheet.create({
    
    offCanvasContainer: {

    },

    scrollContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    
    menuItemsContainer: {
      paddingTop: verticalScale(103),
    },
    
    menuItemContainer: {
      paddingLeft: scale(31),
      flexDirection: 'row',
      alignItems: 'center'
    },
    
    menuItem: {
      fontWeight: 'bold',
      paddingLeft: 12,
      paddingTop: 15,
      paddingBottom: 15
    },
    
    activityContainer: {

    },

    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: verticalScale(64),
      marginLeft: scale(31),
    },

    profileImage: {
      width: scale(52),
      height: scale(52),
    },

    profileData: {
      marginLeft: scale(16),
    },

    profileText: {
      fontSize: scale(18),
      lineHeight: scale(26),
      fontFamily: FONTS.MetropolisSemiBold,
      color: COLOR_CONST.white,
    },

    viewProfile: {
      fontSize: scale(13),
      lineHeight: scale(26),
      fontFamily: FONTS.MetropolisSemiBold,
      color: COLOR_CONST.white,
    },

    termConditionText: {
      fontSize: scale(13),
      lineHeight: scale(26),
      fontFamily: FONTS.MetropolisSemiBold,
      color: COLOR_CONST.white,
      position: 'absolute',
      left: scale(31),
      bottom: verticalScale(24),
    },

    instaButton: { 
      position: 'absolute',
      right: scale(22),
      bottom: verticalScale(24),
    },

    instagramIcon: {
      width: scale(34),
      height: scale(34),
    }

})
