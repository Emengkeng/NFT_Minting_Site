import React, { useState } from 'react';
import { ethers, BigNumber } from "ethers";
import milkyShades from './MilkyShades.json';


const milkyShadesAddress = "0x76b1Af4DFdb8A7CF27F96d21114494eB5efca898";

const MainMint = ({ accounts, setAccounts}) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                milkyShadesAddress,
                milkyShades.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount));
                console.log('response', response);

            } catch (err){
                console.log("error", err)
            }
        }
    }
    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };
    
    const handleIncrement = () => {
        if (mintAmount >= 2) return;
        setMintAmount(mintAmount + 1);
    };

    return(
        <div>
            <h1 >MilkyShades</h1>
            <p>It's 2090. The MilkyShade brothers are old and have been Given an opprtunity to <strong>Relive</strong>
            Their Childhood Memeries. Join them on their Journey as They Relive their Stories.
            </p>
            {isConnected ? (
                <div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <input type="number" value={mintAmount}></input>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <button onClick={handleMint}>Mint Now</button>

                </div>
            ) : (
                <p>You most be connected to Mint.</p>
            )}

        </div>
    );
};

export default MainMint;