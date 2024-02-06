import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../../../api/tmdbService'; // Adjust the path as needed

const Films = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const movieData = await fetchMovies();
                setMovies(movieData);
            } catch (error) {
                console.error('Failed to fetch movies:', error);
            }
        };

        loadMovies();
    }, []);

    const placeholderImage = '/path/to/placeholder.jpg'; // Path to your placeholder image

    return (
        <div>
            <h1>Films</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {movies.map(movie => (
                    <div key={movie.id} style={{ width: '200px', margin: '10px' }}>
                        <img 
                            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : placeholderImage} 
                            alt={movie.title || 'Movie poster'} 
                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
                            onError={(e) => e.target.src = placeholderImage}
                        />
                        <p style={{ textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {movie.title}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Films;
