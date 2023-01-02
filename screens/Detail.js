import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  ActivityIndicator,
  Modal,
  Pressable,
} from 'react-native';
import {getMovie} from '../services/service';

import PlayButton from '../components/PlayButton';
import Video from '../components/Video';

const height = Dimensions.get('screen').height;
const Detail = ({route, navigation}) => {
  const noImage = require('../assets/images/no-video.png');
  const star = require('../assets/images/star.png');
  const movieId = route.params.movieId;
  const [modalVisible, setModalVisible] = useState(false);
  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView>
            {loaded && (
              <Image
                resizeMode="cover"
                style={styles.image}
                source={
                  movieDetail.poster_path
                    ? {
                        uri:
                          'https://image.tmdb.org/t/p/w500' +
                          movieDetail.poster_path,
                      }
                    : noImage
                }
              />
            )}
            <View style={styles.container}>
              <View style={styles.playbutton}>
                <PlayButton handlePress={videoShown}></PlayButton>
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genre => {
                    return (
                      <Text style={styles.genre} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <View style={styles.genresContainer}>
                <Image source={star} style={styles.star}></Image>
                <Text style={styles.vote}>{movieDetail.vote_average}</Text>
              </View>
              <Text style={styles.overview}> {movieDetail.overview}</Text>
              <Text style={styles.date}>
                {'Release date: ' + movieDetail.release_date}
              </Text>
            </View>
          </ScrollView>
          <Modal
            supportedOrientations={['landscape', 'portrait']}
            animationType="slide"
            visible={modalVisible}>
            <View style={styles.videoModal}>
              <Video onClose={videoShown} />
            </View>
          </Modal>
        </View>
      )}
      {!loaded && (
        <ActivityIndicator
          style={{alignItems: 'center'}}
          color={'green'}
          size="large"
        />
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  image: {
    height: height / 2,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  genresContainer: {flexDirection: 'row', alignContent: 'center'},
  genre: {marginRight: 10, fontWeight: 'bold', marginTop: 20},
  vote: {marginRight: 10, fontWeight: 'bold', marginTop: 20},
  star: {height: 20, width: 20, marginTop: 18},
  overview: {marginTop: 10, fontSize: 15, textAlign: 'center'},
  date: {marginTop: 10, paddingBottom: 10, fontWeight: 'bold'},
  playbutton: {position: 'absolute', top: -35, right: 20},
  videoModal: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default Detail;
