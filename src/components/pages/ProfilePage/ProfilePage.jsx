import React, { useEffect, useState } from 'react';
import ThreeDotsLoader from '../../ui/loaders/ThreeDotsLoader/ThreeDotsLoader';
import css from './ProfilePage.module.scss';
import MetaMaskLogo from '../../../assets/webp/metamask-2728406-2261817.webp';
import { ReactComponent as STNIcon } from '../../../assets/svg/STNLogo.svg';
import { Button } from '@mui/material';

const ProfilePage = () => {
    const [userBalance, setUserBalance] = useState(null);
    const [isAddressVisible, setIsAddressVisible] = useState(false);
    const walletAddress = localStorage.getItem('address');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Modify the API endpoint as needed to pass the wallet address
                const response = await fetch(`http://localhost:3001/api/get-profile/${walletAddress}`);
                const data = await response.json();
                setUserBalance(data.balance);
                // Set other user data as needed
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                setError(error);
            }
        };
    
        if (walletAddress) {
            fetchData();
        }
    }, [walletAddress]); // Dependency on walletAddress

    const handleAddressVisible = () => {
        setIsAddressVisible(!isAddressVisible);
    };

    if (error) {
        return <h1>Error: {error.message}</h1>;
    }

    if (userBalance === null) {
        return <ThreeDotsLoader />;
    }

    return (
        <section className={css.ContainerBlock}>
            <img src={MetaMaskLogo} alt='METAMASK LOGO' />
            <h3>
                Your Balance: {userBalance} STN <STNIcon />
            </h3>   
            <h3>
                Wallet Address: {isAddressVisible ? walletAddress : ''}
                <Button variant='outlined' onClick={handleAddressVisible}>
                    {isAddressVisible ? 'Hide' : 'Show'} the address
                </Button>
            </h3>
        </section>
    );
};

export default ProfilePage;
