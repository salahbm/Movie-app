import React from 'react';
import {Text, SafeAreaView, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
const propTypes = {
  main: PropTypes.bool,
};
const defaultProps = {
  main: false,
};
const back = require('../assets/images/white_arrow.png');
class NavBar extends React.PureComponent {
  state = {};
  render() {
    const {navigation, main} = this.props;
    return (
      <SafeAreaView>
        {main ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: 10,
              alignItems: 'center',
            }}>
            <Image
              style={{width: 50, height: 50, marginLeft: 10}}
              source={require('../assets/images/logo.png')}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search');
              }}>
              <Image
                source={require('../assets/images/search.png')}
                style={{
                  height: 30,
                  width: 30,
                  marginLeft: 5,
                  tintColor: 'white',
                }}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={back}
                style={{
                  height: 30,
                  width: 30,
                  marginLeft: 5,
                }}
              />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

NavBar.propTypes = propTypes;
NavBar.propTypes = propTypes;
export default NavBar;
