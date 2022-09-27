const { ethers } = require("hardhat");

async function main() {
  const EnglishAuction = await ethers.getContractFactory("EnglishAuction");
  const EnglishAuctionContract = await EnglishAuction.deploy(
    "0xFd09BA755E4382e99Be30dbE4DDB88D1Eb819780"
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
