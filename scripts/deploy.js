const { ethers } = require("hardhat");
// const ABI = "../artifacts/contracts/NFTFactory.sol/NFTFactory.json";

async function main() {
  const NFTFactory = await ethers.getContractFactory("NFTFactory");
  const NFTFactoryContract = await NFTFactory.deploy();
  await NFTFactoryContract.deployed();
  console.log("deployed to: ", NFTFactoryContract.address);
  //0xeBD38F211BCeBED199e56Bc07B92f0829f044F8D
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
