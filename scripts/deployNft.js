const { ethers } = require("hardhat");

async function main() {
  const NFTFactory = await ethers.getContractFactory("NFTFactory");
  const NFTFactoryContract = await NFTFactory.deploy("100000000000000");
  await NFTFactoryContract.deployed();
  console.log("NFTFactoryContract deployed to: ", NFTFactoryContract.address);
  /////
  // const EnglishAuction = await ethers.getContractFactory("EnglishAuction");
  // const EnglishAuctionContract = await EnglishAuction.deploy(
  //   NFTFactoryContract.address
  // );
  // await EnglishAuctionContract.deployed();
  // console.log(
  //   "EnglishAuctionContract deployed to: ",
  //   EnglishAuctionContract.address
  // );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
