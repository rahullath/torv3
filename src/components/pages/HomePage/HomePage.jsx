import React, { useEffect, useState } from 'react';
import 'C:/Users/rahul/torv3/src/styles/index.css'; // Importing general styles
import { fetchMovies } from '../../../api/tmdbService'; // Adjusted import path

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const videoUrl = 'http://127.0.0.1:8080/ipfs/QmPXtEZvuiiwGDEZCf5EvQBNWrjgL464xUD9wq3zUgaVPt';

    useEffect(() => {
        const loadMovies = async () => {
            const movieData = await fetchMovies();
            setMovies(movieData);
        };

        loadMovies();
    }, []);

    return (
        <section>
            <h1>Featured Video</h1>
            <video src={videoUrl} controls autoPlay style={{ width: '100%', height: 'auto' }} />

            <p>Mononoke Season 2 Trailer (2024) This is a demo of the p2p streaming platform.</p>

            <div>
                <h2>Movie Posters</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {movies.map(movie => (
                        <img key={movie.id} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ width: '200px', margin: '10px' }} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomePage;
