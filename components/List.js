import React from 'react';
import {Text, View, StyleSheet, Dimensions, FlatList} from 'react-native';
import Card from './Card';
import PropTypes from 'prop-types';

const propTypes = {
  item: PropTypes.object,
};

class List extends React.PureComponent {
  render() {
    const {title, content} = this.props;
    return (
      <View>
        <View style={styles.list}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            horizontal={true}
            renderItem={({item}) => <Card item={item} />}></FlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',

    paddingBottom: 20,
  },
  list: {
    marginTop: 40,
  },
});

List.prototype = PropTypes;
export default List;
