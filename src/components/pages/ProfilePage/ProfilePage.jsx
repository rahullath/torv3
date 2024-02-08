import React, { useEffect, useState } from 'react';
import ThreeDotsLoader from '../../ui/loaders/ThreeDotsLoader/ThreeDotsLoader';
import css from './ProfilePage.module.scss';
import MetaMaskLogo from '../../../assets/webp/metamask-2728406-2261817.webp';
import { ReactComponent as STNIcon } from '../../../assets/svg/STNLogo.svg';
import { Button } from '@mui/material';

const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [isAddressVisible, setIsAddressVisible] = useState(false);
    const walletAddress = localStorage.getItem('address');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/get-profile/${walletAddress}`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                setUserProfile(data); // Assuming the response contains more than just the balance
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                setError(error.toString());
            }
        };

        if (walletAddress) {
            fetchData();
        }
    }, [walletAddress]);

    const handleAddressVisible = () => {
        setIsAddressVisible(!isAddressVisible);
    };

    if (error) {
        return <h1>Error: {error}</h1>;
    }

    if (!userProfile) {
        return <ThreeDotsLoader />;
    }

    return (
        <section className={css.ContainerBlock}>
            <img src={MetaMaskLogo} alt='METAMASK LOGO' />
            <h3>
                Your Balance: {userProfile.balance} STN <STNIcon />
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