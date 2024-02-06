import React, { useEffect, useState } from 'react';
import { fetchTVShows } from '../../../api/tmdbService';

const Television = () => {
    const [tvShows, setTvShows] = useState([]);

    useEffect(() => {
        const loadTVShows = async () => {
            try {
                const tvData = await fetchTVShows();
                setTvShows(tvData);
            } catch (error) {
                console.error('Failed to fetch TV shows:', error);
            }
        };

        loadTVShows();
    }, []);

    const placeholderImage = '/path/to/placeholder.jpg'; // Path to your placeholder image

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {tvShows.map(show => (
                <div key={show.id} style={{ width: '200px', margin: '10px' }}>
                    <img 
                        src={show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : placeholderImage} 
                        alt={show.name || 'TV Show poster'} 
                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
                        onError={(e) => e.target.src = placeholderImage}
                    />
                    <p style={{ textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {show.name}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Television;
