import React from 'react';
import css from './ViewStreamPage.module.scss';
import ThreeDotsLoader from '../../ui/loaders/ThreeDotsLoader/ThreeDotsLoader';

const ViewStreamPage = () => {
    // Directly using the local IPFS gateway URL
    const videoUrl = 'http://127.0.0.1:8080/ipfs/QmPXtEZvuiiwGDEZCf5EvQBNWrjgL464xUD9wq3zUgaVPt';

    return (
        <section className={css.ContainerBlock}>
            {!videoUrl ? (
                <ThreeDotsLoader />
            ) : (
                <>
                    <div className={css.VideoTitle}>
                        <h1>Video Title</h1>
                    </div>
                    <video src={videoUrl} controls autoPlay className={css.VideoPlayer} />

                    <div className={css.VideoDescription}>
                        <p>
                            This is a description of the video. It can contain details about the video content, source, or any other relevant information.
                        </p>
                    </div>

                    <div className={css.VideoControls}>
                        <button onClick={() => console.log('Button clicked!')}>
                            Example Button
                        </button>
                    </div>
                </>
            )}
        </section>
    );
};

export default ViewStreamPage;
