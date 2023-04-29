const hre = require("hardhat");

async function main() {
  const deployNetwork = hre.network.name

  const MilkyShades = await hre.ethers.getContractFactory("MilkyShades");
  const milkyShades = await MilkyShades.deploy();

  await milkyShades.deployed();

  console.log(
    `  MilkyShades deployed to: ${milkyShades.address}`
  );

  if (!developmentChains.includes(deployNetwork) && hre.config.etherscan.apiKey[deployNetwork]) {
    console.log("waiting for 6 blocks verification ...")
    await stakingVault.deployTransaction.wait(6)

    // args represent contract constructor arguments
    const args = [nftContract.address, tokenContract.address]
    await verify(stakingVault.address, args)
  }
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
