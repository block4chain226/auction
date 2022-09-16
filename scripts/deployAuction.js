const { ethers } = require("hardhat");

async function main() {
  const EnglishAuction = await ethers.getContractFactory("EnglishAuction");
  const EnglishAuctionContract = await EnglishAuction.deploy(
    "0xe36bCA52B61c1912b8B80B0E7bD363AD9db00f48"
  );
  await EnglishAuctionContract.deployed();
  console.log(
    "EnglishAuctionContract deployed to: ",
    EnglishAuctionContract.address
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
