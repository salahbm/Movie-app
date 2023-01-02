import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import Card from '../components/Card';
import {FlatList} from 'react-native-gesture-handler';
import {searchMovieTv} from '../services/service';
const Search = ({navigation}) => {
  const [text, onChangeText] = useState('');
  const [searchResults, setSearchResults] = useState('');

  const onSubmit = query => {
    Promise.all([
      searchMovieTv(query, 'movie'),
      searchMovieTv(query, 'tv'),
    ]).then(([movies, tv]) => {
      const data = [...movies, ...tv];
      setSearchResults(data);
    });
  };
  return (
    <React.Fragment>
      <SafeAreaView
        style={{
          backgroundColor: '#3E4D50',
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 45,
            padding: 10,
          }}>
          <View style={{flexBasis: 'auto', flexGrow: 1, marginRight: 8}}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholderTextColor="white"
              placeholder="Search Movie/Tv"
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              onSubmit(text);
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
        <View>
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResults}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          )}

          {/* WHen  NO Result */}
          {searchResults && searchResults.length == 0 && (
            <View>
              <Text
                style={{
                  color: 'white',
                  paddingTop: 100,
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                No Result {'\n'} Try different keywords
              </Text>
            </View>
          )}
          {/* when nothing is serched */}
          {!searchResults && (
            <View>
              <Text
                style={{
                  color: 'white',

                  fontSize: 16,

                  textAlign: 'center',
                }}>
                Type smth to start searching{' '}
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,

    borderColor: 'white',
    borderWidth: 1,
    color: 'white',
    textAlign: 'center',
    borderRadius: 15,
  },
});

export default Search;
