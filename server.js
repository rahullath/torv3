import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 50;
import express from 'express';
import path from 'path';
import { createHelia } from 'helia';
import { unixfs } from '@helia/unixfs';
import { fileURLToPath } from 'url';
import { MemoryBlockstore } from 'blockstore-core';
import OrbitDB from 'orbit-db';
import initIPFS from './ipfsSetup.js';
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;

async function startServer() {
    try {
        // Initialize IPFS and OrbitDB
        const { ipfs, orbitdb, profileDb } = await initIPFS();

        // Initialize Helia
        const blockstore = new MemoryBlockstore();
        const helia = await createHelia({ blockstore });
        const fs = unixfs(helia);

        // Serve static files from the React app
        app.use(express.static(path.join(__dirname, 'build')));
        app.use(express.json());

        // The "catchall" handler for any other request
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'build', 'index.html'));
        });

        // Add data to Helia
        app.get('/api/add', async (req, res) => {
            try {
                const encoder = new TextEncoder();
                const cid = await fs.addBytes(encoder.encode('Hello from server'));
                res.json({ cid: cid.toString() });
            } catch (error) {
                console.error('Error adding data to Helia:', error);
                res.status(500).send('Error adding data');
            }
        });

        // Retrieve data from Helia
        app.get('/api/cat/:cid', async (req, res) => {
            try {
                const cid = req.params.cid;
                const decoder = new TextDecoder();
                let text = '';

                for await (const chunk of fs.cat(cid)) {
                    text += decoder.decode(chunk, { stream: true });
                }

                res.send(text);
            } catch (error) {
                console.error('Error retrieving data from Helia:', error);
                res.status(500).send('Error retrieving data');
            }
        });

        // Store profile data
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

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Error starting the server:', error);
    }
}

startServer().catch(console.error);
