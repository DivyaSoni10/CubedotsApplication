import { Text, View } from 'react-native'
import React, { Component } from 'react'

export class Project3D extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isGallerySelected: true,
        }
    }

    componentDidMount = () => {
        // this.getProjectDetail()
    }

  render() {
    return (
      <View>
        <Text>Project3D</Text>
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
        getProjectDetailData: (data, successCallBack, failureCallBack) => dispatch(userActions.getProjectDetailData(data, successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project3D);