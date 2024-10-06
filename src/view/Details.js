import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default function Details({route, navigation}) {
  const {data} = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: '',
      headerTintColor: '#fff',
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.scrollView}>
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`}}
        style={styles.image}
      />
      <LinearGradient
        colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
        style={styles.gradient}
      />
      <View style={styles.titleRating}>
        <Text style={styles.title}>{data.original_title}</Text>
        <Text style={styles.release}>
          {new Date(data.release_date).getFullYear()} • Superhero, Action • 2h
          1m
        </Text>
        <Text style={styles.rating}>⭐ {data.vote_average.toFixed(1)}</Text>
        <View style={styles.ButtonRow}>
          <TouchableOpacity style={styles.heartBtn}>
            <Image
              source={require('../assets/icons/heart.png')}
              style={{width: 20, height: 20, tintColor: '#fff'}}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.downloadBtn}>
            <Image
              source={require('../assets/icons/down-arrow.png')}
              style={{width: 20, height: 20, tintColor: '#fff'}}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.watchNow}>
            <Text style={styles.watchNowText}>Watch Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerStars}>
        <Text style={styles.overviewText}>{data.overview}</Text>
        <Text style={styles.titleStars}>Stars</Text>
        <View style={styles.starsContainer}>
          <View style={styles.actor}>
            <Image
              source={{
                uri: 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/algQ1VEno2W9SesoArWcZTeF617.jpg',
              }}
              style={styles.actorImage}
            />
            <Text style={styles.actorName}>Ryan Reynolds</Text>
          </View>
          <View style={styles.actor}>
            <Image
              source={{
                uri: 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/4Xujtewxqt6aU0Y81tsS9gkjizk.jpg',
              }}
              style={styles.actorImage}
            />
            <Text style={styles.actorName}>Hugh Jackman</Text>
          </View>
          <View style={styles.actor}>
            <Image
              source={{
                uri: 'https://media.themoviedb.org/t/p/w138_and_h175_face/wqGOVOsHzZaHeHymIS40elGCnY0.jpg',
              }}
              style={styles.actorImage}
            />
            <Text style={styles.actorName}>Emma Corrin</Text>
          </View>
          <View style={styles.actor}>
            <Image
              source={{
                uri: 'https://media.themoviedb.org/t/p/w138_and_h175_face/2FF3Yjxd7DYR4EIJL6s2GpKDMkJ.jpg',
              }}
              style={styles.actorImage}
            />
            <Text style={styles.actorName}>Matthew Macfadyen</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#1A1A1A',
  },
  image: {
    width: '100%',
    height: 400,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 400,
    height: 500,
  },
  titleRating: {
    position: 'absolute',
    top: 250,
    left: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  release: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 5,
  },
  rating: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 5,
  },
  ButtonRow: {
    flexDirection: 'row',
    position: 'absolute',
    top: 100,
    alignItems: 'center',
  },
  heartBtn: {
    backgroundColor: 'grey',
    borderRadius: 20,
    padding: 12,
    marginRight: 10,
  },
  downloadBtn: {
    backgroundColor: 'grey',
    borderRadius: 20,
    padding: 12,
    marginRight: 10,
  },
  watchNow: {
    backgroundColor: '#ef4444',
    borderRadius: 20,
    padding: 10,
    width: 250,
    left: 10,
  },
  watchNowText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  overviewText: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 20,
    marginTop: 10,
  },

  //stars
  containerStars: {
    padding: 16,
    backgroundColor: '#1e1e1e',
  },
  titleStars: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  actor: {
    alignItems: 'center',
    marginBottom: 16,
    width: '45%',
  },
  actorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  actorName: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 8,
  },
});
