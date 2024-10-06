import axios from 'axios';

const API_BASE_URL = 'https://api.themoviedb.org';

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDlmMGQ5NDY0NDdmNWU5MzVjY2M4ZjllNjI3OGZlNiIsIm5iZiI6MTcyODAzODg5MS42ODk1NDUsInN1YiI6IjY2ZmQ0ZTY4YzZmYmIyZjBjZGYyNDZlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w3v4o-gVg4S0tIWDVmBcGtwpPW193TsNFwS7p66kIko';

const getDataMovie = (genreId = null) => {
  const url = genreId
    ? `${API_BASE_URL}/3/discover/movie?with_genres=${genreId}`
    : `${API_BASE_URL}/3/discover/movie`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {getDataMovie};
