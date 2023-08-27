import { BrowserRouter } from 'react-router-dom';
import {
    createReactClient,
    LivepeerConfig,
    studioProvider,
} from '@livepeer/react';
import Header from './components/elements/Header/Header';
import Sidebar from './components/elements/Sidebar/Sidebar';
import AppRouter from './AppRouter';

const livePeerClient = createReactClient({
    provider: studioProvider({
        apiKey: '62d6b4e4-03d3-4b33-b20a-377e64a4a2ae',
    }),
});

function App() {
    console.log(localStorage.getItem('address'));
    return (
        <BrowserRouter>
            <LivepeerConfig client={livePeerClient}>
            <Header />
            <main>
                <Sidebar />
                <AppRouter />
            </main>
            </LivepeerConfig>
        </BrowserRouter>
    );
}

export default App;
