import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/elements/Header/Header';
import Sidebar from './components/elements/Sidebar/Sidebar';
import AppRouter from './AppRouter';

function App() {
    console.log(localStorage.getItem('address'));
    return (
        <BrowserRouter>
            <Header />
            <main>
                <Sidebar />
                <AppRouter />
            </main>
        </BrowserRouter>
    );
}

export default App;
