import React from 'react';
import {Pressable, Text, Image, StyleSheet} from 'react-native';

const playbutton = require('../assets/images/playbutton.png');

class PlayButton extends React.PureComponent {
  render() {
    const {handlePress} = this.props;
    return (
      <Pressable onPress={() => handlePress()} style={styles.button}>
        <Image
          source={playbutton}
          style={{tintColor: 'white', width: 50, height: 50}}
        />
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    borderRadius: 50,

    padding: 10,
    backgroundColor: '#12B3DA',
  },
});

export default PlayButton;
