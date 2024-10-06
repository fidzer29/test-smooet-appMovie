import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

const Favorites = ({likedMovies, setLikedMovies}) => {
  const [numColumns, setNumColumns] = useState(2);

  const toggleLove = movieId => {
    setLikedMovies(prevState =>
      prevState.filter(movie => movie.id !== movieId),
    );
  };

  const renderFavoriteCard = ({item}) => (
    <View style={styles.card}>
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
        style={styles.image}
      />
      <View style={styles.rowContainer}>
        <Text style={styles.title}>{item.original_title}</Text>
        <TouchableOpacity
          onPress={() => toggleLove(item.id)}
          style={styles.heartButton}>
          <Text style={styles.heartText}>{'❤️'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.rating}>⭐ {item.vote_average.toFixed(1)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {likedMovies.length > 0 ? (
        <FlatList
          data={likedMovies}
          renderItem={renderFavoriteCard}
          keyExtractor={item => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
            paddingTop: 300,
          }}>
          Tidak Ada Film Favorit
        </Text>
      )}
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
    marginLeft: 15,
    marginBottom: 20,
  },
  customButton: {
    backgroundColor: '#1f1f1f',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
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
});

export default Favorites;
