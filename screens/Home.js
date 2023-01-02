import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Button,
} from 'react-native';
import {
  getFamilyMovies,
  getFantacyMovies,
  getPopularMovies,
  getPopularTV,
  getUpcomingMovies,
} from '../services/service';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';
import Detail from './Detail';
import {useNavigation} from '@react-navigation/native';

const dimentions = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [moviesImages, setMoviesImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [fantacyMovies, setFantasyMovies] = useState();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTV(),
      getFamilyMovies(),
      getFantacyMovies(),
    ]);
  };
  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          fantacyMoviesData,
        ]) => {
          const moviesImagesArray = [];
          upcomingMoviesData.forEach(movie => {
            moviesImagesArray.push(
              'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            );
          });

          setMoviesImages(moviesImagesArray);
          setPopularMovies(popularMoviesData),
            setPopularTv(popularTvData),
            setFamilyMovies(familyMoviesData),
            setFantasyMovies(fantacyMoviesData);
        },
      )
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <React.Fragment>
      {loaded && !error && (
        <ScrollView>
          {moviesImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={moviesImages}
                sliderBoxHeight={dimentions.height / 1.5}
                autoplay={true}
                circleLoop={true}
                dotStyle={styles.sliderStyle}
              />
            </View>
          )}

          {popularMovies && (
            <View style={styles.carusel}>
              <List
                navigation={navigation}
                title="Trending Movies"
                content={popularMovies}
              />
            </View>
          )}

          {popularTv && (
            <View style={styles.carusel}>
              <List
                navigation={navigation}
                title="Trending Tv Shows"
                content={popularTv}
              />
            </View>
          )}

          {familyMovies && (
            <View style={styles.carusel}>
              <List
                navigation={navigation}
                title="Family Movies"
                content={familyMovies}
              />
            </View>
          )}

          {fantacyMovies && (
            <View style={styles.carusel}>
              <List
                navigation={navigation}
                title="Fantacy Movies"
                content={fantacyMovies}
              />
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator color={'green'} size="large" />}
      {error && <Error />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  sliderStyle: {height: 0},
  carusel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
