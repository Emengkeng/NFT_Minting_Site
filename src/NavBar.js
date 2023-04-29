import React from "react";
//import {AnimatePresence, motion} from 'framer-motion/dist/framer-motion'
import { Box, Button, Flex, Image, Link, Spacer} from '@chakra-ui/react';
import Twitter from "./assets/social-media-icons/facebook_32x32.pngs/";
import Discord from "./assets/social-media-icons/discord_32x32.ico/";
import Opensea from "./assets/social-media-icons/opensea_32x32.ico/";


const NavBar = ({ accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);


    async function connectAccount(){
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }
    return (
        <Flex justify="space-between" align="center" padding="30px">
            {/** Left side - Socail Media Icons */}
            <Flex justify="space-around" width="40%" padding="0 75px">
                <Link href="https://yourTwitterLink.com">
                    <image src={Twitter} boxSize="42px" margin="0 15px" />
                </Link>
                <Link href="https://yourDiscordLink.com">
                    <image src={Discord} boxSize="42px" margin="0 15px" />
                </Link>
                <Link href="https://yourOpenseaLink.com">
                    <image src={Opensea} boxSize="42px" margin="0 15px" />
                </Link>
            </Flex>

            {/** Right Side - Sectins and Connect */}
            <div>About</div>
            <div>Mint</div>
            <div>Team</div>

            {/** Connect */}
            {isConnected ? (
                <p>Connected</p>
            ) : (
                <button onClick={connectAccount}>Connect</button>
            )}

        </Flex>
    )
};

export default NavBar;