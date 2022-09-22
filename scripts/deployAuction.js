const { ethers } = require("hardhat");

async function main() {
  const EnglishAuction = await ethers.getContractFactory("EnglishAuction");
  const EnglishAuctionContract = await EnglishAuction.deploy(
    "0x39737D7CC17a9BCD8b75CC0E8d10A008e12120dE"
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
