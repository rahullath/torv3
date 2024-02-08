import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 50;
import express from 'express';
import path from 'path';
import cors from 'cors';
import { createHelia } from 'helia';
import { unixfs } from '@helia/unixfs';
import { fileURLToPath } from 'url';
import { MemoryBlockstore } from 'blockstore-core';
import OrbitDB from 'orbit-db';
import initIPFS from './ipfsSetup.js'; // Ensure this module correctly initializes IPFS and OrbitDB

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); // for parsing application/json

let profileDb; // This will hold our OrbitDB instance

async function startServer() {
    try {
        const { ipfs, orbitdb } = await initIPFS();
        profileDb = await orbitdb.keyvalue('profileDb', {
            accessController: {
                write: ['*']
            }
        });
        await profileDb.load();

        // Initialize Helia
        const blockstore = new MemoryBlockstore();
        const helia = await createHelia({ blockstore });
        const fs = unixfs(helia);

        // Example initialization logging
        console.log("IPFS Instance:", ipfs);
        console.log("OrbitDB Instance:", orbitdb);

        // Serve static files from the React app
        app.use(express.static(path.join(__dirname, 'build')));

        // The "catchall" handler for any other request
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'build', 'index.html'));
        });

        // Define API endpoints below...

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Error starting the server:', error);
    }
}

// Implement the API endpoints for storing and retrieving profile data
app.post('/api/store-profile', async (req, res) => {
    try {
        const { walletAddress, userData } = req.body;
        await profileDb.put(walletAddress, userData);
        res.status(200).send('Profile data stored successfully');
    } catch (error) {
        console.error('Error storing profile data:', error);
        res.status(500).send('Error storing data');
    }
});

app.get('/api/get-profile/:walletAddress', async (req, res) => {
    try {
        const walletAddress = req.params.walletAddress;
        const userData = profileDb.get(walletAddress);
        if (userData) {
            res.json(userData);
        } else {
            res.status(404).send('Profile not found');
        }
    } catch (error) {
        console.error('Error retrieving profile data:', error);
        res.status(500).send('Error retrieving data');
    }
});

startServer().catch(console.error);
