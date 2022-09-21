const { ethers } = require("hardhat");

async function main() {
  const EnglishAuction = await ethers.getContractFactory("EnglishAuction");
  const EnglishAuctionContract = await EnglishAuction.deploy(
    "0x7Bc3832Da0d21679B79b0a5536092375f3548F3c"
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
