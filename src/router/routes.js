import CreateStreamPage from '../components/pages/CreateStreamPage/CreateStreamPage.jsx';
import HomePage from '../components/pages/HomePage/HomePage.jsx';
import ProfilePage from '../components/pages/ProfilePage/ProfilePage.jsx';
import ViewStreamPage from '../components/pages/ViewStreamPage/ViewStreamPage.jsx';
import FilmsPage from '../components/pages/FilmsPage/Films.jsx'; 
import TelevisionPage from '../components/pages/TVPage/Television.jsx';
// import UploadPage from '../components/pages/UploadPage/p2p'; // Uncomment when p2p.jsx is created

const UnavailableMessage = () => {
    return <h1>Features coming soon.....</h1>;
};

export const privateRoutes = [
    { path: '/', component: <HomePage />, id: 1 },
    { path: '/createStream', component: <CreateStreamPage />, id: 2 },
    { path: '/viewStream/:streamID', component: <ViewStreamPage/>, id: 3 },
    { path: '/films', component: <FilmsPage />, id: 4 },
    { path: '/television', component: <TelevisionPage />, id: 5 }, 
    // { path: '/upload', component: <UploadPage />, id: 6 }, // Add UploadPage route
    { path: '/chat', component: <UnavailableMessage />, id: 7 },
    { path: '/bank', component: <UnavailableMessage />, id: 8 },
    { path: '/starred', component: <UnavailableMessage />, id: 9 },
    { path: '/settings', component: <UnavailableMessage />, id: 10 },
    { path: '/profile', component: <ProfilePage/>, id: 11 },
];

export const publicRoutes = [
    { path: '/', component: <HomePage />, id: 1 },
    { path: '/viewStream/:streamID', component: <ViewStreamPage/>, id: 2 },
    // Add any public routes for TelevisionPage and UploadPage if needed
];
