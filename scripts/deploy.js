const { ethers } = require("hardhat");

async function main() {
  const NFTFactory = await ethers.getContractFactory("NFTFactory");
  const NFTFactoryContract = await NFTFactory.deploy("100000000000000");
  await NFTFactoryContract.deployed();
  console.log("deployed to: ", NFTFactoryContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
