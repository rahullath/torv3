import axios from 'axios';

const API_KEY = '1c3cdb0a94c7d5cd11f5ad2bae4ed769'; // Replace with your TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching movies from TMDB:', error);
        return [];
    }
};

export const fetchTVShows = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching TV shows from TMDB:', error);
        return [];
    }
};
