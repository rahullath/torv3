import React, { useEffect, useRef } from 'react';
import WebTorrent from 'webtorrent';

const TorrentVideoPlayer = ({ magnetUri }) => {
  const videoRef = useRef();

  useEffect(() => {
    const client = new WebTorrent();
    client.add(magnetUri, torrent => {
      // Torrents can contain many files. Let's use the first.
      const file = torrent.files.find(file => file.name.endsWith('.mp4'));

      // Stream the file in the browser
      file.renderTo(videoRef.current);
    });

    // Cleanup function
    return () => {
      client.destroy();
    };
  }, [magnetUri]);

  return <video ref={videoRef} controls />;
};

export default TorrentVideoPlayer;
