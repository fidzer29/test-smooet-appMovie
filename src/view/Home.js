import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {getDataMovie as getData} from '../api/api';
import {useNavigation} from '@react-navigation/native';

const Home = ({count, setCount, likedMovies, setLikedMovies}) => {
  const [sortBy, setSortBy] = useState('Sort by');
  const [genre, setGenre] = useState('Genre');
  const [moviesList, setMoviesList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [numColumns, setNumColumns] = useState(2);
  const [isGenreModalVisible, setIsGenreModalVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [error, setError] = useState(null);
  const [dataDetail, setDataDetail] = useState({});
  const [applyGenre, setApplyGenre] = useState(false);

  const navigation = useNavigation();

  const genres = [
    {id: 28, name: 'Action'},
    {id: 12, name: 'Adventure'},
    {id: 16, name: 'Animation'},
    {id: 35, name: 'Comedy'},
    {id: 80, name: 'Crime'},
    {id: 99, name: 'Documentary'},
    {id: 18, name: 'Drama'},
    {id: 10751, name: 'Family'},
    {id: 14, name: 'Fantasy'},
    {id: 36, name: 'History'},
    {id: 27, name: 'Horror'},
    {id: 10402, name: 'Music'},
    {id: 9648, name: 'Mystery'},
    {id: 10749, name: 'Romance'},
    {id: 878, name: 'Science Fiction'},
    {id: 10770, name: 'TV Movie'},
    {id: 53, name: 'Thriller'},
    {id: 10752, name: 'War'},
    {id: 37, name: 'Western'},
  ];

  const sortDataByReleaseDate = () => {
    const sortedData = [...moviesList].sort((a, b) => {
      return new Date(a.release_date) - new Date(b.release_date);
    });
    setMoviesList(sortedData);
    setSortBy('Release Date');
  };

  const handleClickHeart = item => {
    const isLiked = likedMovies.find(movie => movie.id === item.id);

    if (isLiked) {
      setLikedMovies(likedMovies.filter(movie => movie.id !== item.id));
    } else {
      setLikedMovies([...likedMovies, item]);
    }
    setCount(prevCount => (isLiked ? prevCount - 1 : prevCount + 1));
  };

  const handleApplyGenre = () => {
    setApplyGenre(prev => !prev);
  };

  useEffect(() => {
    getData()
      .then(response => {
        setMoviesList(response.data.results);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const cekData = item => {
    setDataDetail(item);
  };

  const renderMovieCard = ({item}) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => {
          setShowDetail(true);
          cekData(item);
        }}>
        <Image
          source={{uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`}}
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.rowContainer}>
        <Text style={styles.title}>{item.original_title}</Text>
        <TouchableOpacity
          onPress={() => {
            handleClickHeart(item);
          }}
          style={styles.heartButton}>
          <Text
            style={[
              styles.heartText,
              likedMovies.find(movie => movie.id === item.id)
                ? styles.loved
                : styles.unloved,
            ]}>
            {likedMovies.find(movie => movie.id === item.id) ? '❤️' : '🖤'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.rating}>⭐{item.vote_average.toFixed(1)}</Text>
    </View>
  );

  const resetGenreSelection = () => {
    setSelectedGenre(null);
    setGenre('Genre');
  };

  if (showDetail) {
    navigation.navigate('Details', {data: dataDetail});
    setShowDetail(false);
  }

  useEffect(() => {
    getData(selectedGenre)
      .then(response => {
        setMoviesList(response.data.results);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [applyGenre]);

  const loadMoreMovies = () => {
    setVisibleCount(prevCount => prevCount + 5);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.customButton, {marginRight: 10}]}
          onPress={sortDataByReleaseDate}>
          <Text style={styles.buttonText}>
            {sortBy} <Text style={styles.icon}>▼</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => setIsGenreModalVisible(true)}>
          <Text style={styles.buttonText}>
            {genre} <Text style={styles.icon}>▼</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={moviesList.slice(0, visibleCount)}
        renderItem={renderMovieCard}
        keyExtractor={item => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.list}
      />

      {visibleCount < moviesList.length && (
        <TouchableOpacity
          onPress={loadMoreMovies}
          style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={isGenreModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsGenreModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setIsGenreModalVisible(false)}>
                <Text style={styles.closeButton}>
                  <Image
                    source={require('../assets/icons/close.png')}
                    resizeMode="contain"
                    style={{width: 15, height: 15, tintColor: '#fff'}}
                  />
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginRight: 200,
                }}>
                Genre
              </Text>
              <TouchableOpacity onPress={resetGenreSelection}>
                <Text style={styles.resetButton}>Reset</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={genres}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.genreItem}
                  onPress={() => {
                    setSelectedGenre(item.id);
                    setGenre(item.name);
                  }}>
                  <Text
                    style={[
                      styles.genreText,
                      selectedGenre === item.id && styles.selectedGenreText,
                    ]}>
                    {item.name}
                  </Text>
                  <View style={styles.radioButton}>
                    <View
                      style={[
                        styles.radioButtonOuter,
                        selectedGenre === item.id && styles.radioButtonSelected,
                      ]}>
                      {selectedGenre === item.id && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              contentContainerStyle={{paddingBottom: 20}}
              style={{maxHeight: '80%'}}
            />

            <TouchableOpacity
              onPress={() => {
                setIsGenreModalVisible(false);
                handleApplyGenre();
              }}
              style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'left',
    paddingTop: 10,
    marginLeft: 10,
    marginBottom: 20,
  },
  customButton: {
    backgroundColor: '#1f1f1f',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  icon: {
    fontSize: 14,
    color: '#fff',
  },

  //Card
  card: {
    backgroundColor: '#121212',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    height: 330,
    width: '45%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    flex: 1,
  },
  heartButton: {
    paddingLeft: 10,
  },
  heartText: {
    fontSize: 20,
  },
  loved: {
    color: 'red',
  },
  unloved: {
    color: 'gray',
  },
  rating: {
    color: '#fff',
    fontSize: 13,
    marginTop: 5,

    textAlign: 'left',
  },
  list: {
    justifyContent: 'center',
  },

  //Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1c1c1c',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    color: '#fff',
    fontSize: 20,
  },
  modalTitle: {
    fontSize: 18,
    color: '#fff',
  },
  resetButton: {
    color: '#ff4444',
    fontSize: 16,
  },
  genreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  genreText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  selectedGenreText: {
    color: 'red',
  },
  radioButton: {
    marginRight: 10,
  },
  radioButtonOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#DC143C',
  },
  radioButtonInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#DC143C',
  },
  applyButton: {
    marginTop: 20,
    backgroundColor: '#DC143C',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
  },

  //load more
  loadMoreButton: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 275,
    width: 90,
  },
  loadMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Home;
