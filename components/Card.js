import React from 'react';
import {TouchableOpacity, StyleSheet, Image, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import Detail from '../screens/Detail';
import {it} from 'node:test';

const noImage = require('../assets/images/no-video.png');
const propTypes = {
  item: PropTypes.object,
};

class Card extends React.PureComponent {
  render() {
    const {navigation, item} = this.props;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('Detail', {movieId: item.id})}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={
            item.poster_path
              ? {uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}
              : noImage
          }
        />
        {!item.poster_path && (
          <Text style={styles.movieName}>{item.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 1,
    position: 'relative',

    alignItems: 'center',

    height: 200,
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
    resizeMode: 'cover',
    marginEnd: 3,
  },
  movieName: {
    position: 'absolute',
    width: 100,
    top: 10,
    textAlign: 'center',
  },
});

Card.prototype = propTypes;
export default Card;
