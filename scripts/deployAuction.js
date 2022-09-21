const { ethers } = require("hardhat");

async function main() {
  const EnglishAuction = await ethers.getContractFactory("EnglishAuction");
  const EnglishAuctionContract = await EnglishAuction.deploy(
    "0x540EeFfD0Ce58BE3975742C4fFF23Fd6ccDfaa17"
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
