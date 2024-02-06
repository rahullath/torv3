// Import IPFS and OrbitDB using ES module syntax
// For IPFS >= 0.55.0
import * as IPFS from 'ipfs';
import OrbitDB from 'orbit-db';

async function initIPFS() {
    const ipfs = await IPFS.create();
    const orbitdb = await OrbitDB.createInstance(ipfs);
    const profileDb = await orbitdb.keyvalue('user-profiles');
    return { ipfs, orbitdb, profileDb };
}

// Export initIPFS using ES module syntax
export default initIPFS;
