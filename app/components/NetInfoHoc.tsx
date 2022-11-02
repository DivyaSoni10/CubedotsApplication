import React, { Component } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import ColorConstants from '../theme/ColorConstants';
import scale from '../utils/Scale';

// This function takes a component...
function networkHOC() {
  return (WrappedComponent: any) =>
    // ...and returns another component...
    class extends React.Component {
      _unsubscribe: any;

      constructor(props: any) {
        super(props);
        this.state = {
          isConnected: false,
        };
      }

      componentDidMount() {
        this._unsubscribe = NetInfo.addEventListener((state) => {
          this.handleConnectivityChange(state.isConnected);
          // console.log('Connection type', state.type);
          // console.log('Is connected?', state.isConnected);
        });
      }

      componentWillUnmount() {
        this._unsubscribe();
      }

      handleConnectivityChange = (isConnected: any) => {
        // console.log('handle change >>>', isConnected);
        if (isConnected == true) {
          this.setState({ isConnected: true });
        } else {
          this.setState({ isConnected: false });
        }
      };

      render() {
        // ... and renders the wrapped component with the fresh data!
        // Notice that we pass through any additional props
        return (
          //@ts-ignore
          <>
            {!this.state.isConnected ? (
              <>
                <View style={{ height: 30 }} />
                <View style={styles.offlineContainer}>
                  <Text style={styles.offlineText}>No Internet Connection</Text>
                </View>
              </>
            ) : null}
            <WrappedComponent
              isConnected={this.state.isConnected}
              {...this.props}
            />
          </>
        );
      }
    };
}
const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: ColorConstants.themeOrange,
    height: 30,
    width: scale(375),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    zIndex: 1000,
    flex: 1,
  },

  offlineText: { color: '#fff' },
});
export default networkHOC;
