const { expect } = require("chai");
const { Contract, BigNumber } = require("ethers");
const { ethers } = require("hardhat");
// use(solidity);

describe("NFTFactory", function () {
  let factoryOwner, addr1, addr2, NFT, nftContract;
  beforeEach(async () => {
    [factoryOwner, addr1, addr2] = await ethers.getSigners();
    NFT = await ethers.getContractFactory("NFTFactory");
    nftContract = await NFT.deploy("1000000000000000000");
    await nftContract.deployed();
  });
  it("Should return balanceOf factoryOwner equal 2", async function () {
    let tokensCount = await nftContract.totalSupply();
    console.log("t: ", tokensCount);
    await nftContract.safeMint(factoryOwner.address, tokensCount);
    tokensCount = await nftContract.totalSupply();
    await nftContract.safeMint(factoryOwner.address, tokensCount);
    tokensCount = await nftContract.totalSupply();
    console.log("t1: ", tokensCount);
    expect(await nftContract.balanceOf(factoryOwner.address)).to.equal(
      ethers.BigNumber.from("2")
    );
  });
  it("Should return all 3 factoryOwners tokensId", async () => {
    ///minting
     const contractBalanceBefore = await ethers.provider.getBalance(nftContract.address);
    console.log("contractBefore: ", ethers.utils.formatEther(contractBalanceBefore));

     const ownerBalanceBefore = await ethers.provider.getBalance(factoryOwner.address);
    console.log("ownerBalanceBefore: ", ethers.utils.formatEther(ownerBalanceBefore));

 const addr1BalanceBefore = await ethers.provider.getBalance(addr1.address);
    console.log("addr1BalanceBefore: ", ethers.utils.formatEther(addr1BalanceBefore));

    await nftContract.connect(addr1).safeMint(addr1.address, {
      value: ethers.utils.parseEther("2.0"),
    });

    
    const contractBalanceAfter = await ethers.provider.getBalance(nftContract.address);
    console.log("contractAfter: ", ethers.utils.formatEther(contractBalanceAfter));

    const addr1BalanceAfter = await ethers.provider.getBalance(addr1.address);
    console.log("addr1BalanceAfter: ", ethers.utils.formatEther(addr1BalanceAfter));

    const ownerBalanceAfter = await ethers.provider.getBalance(factoryOwner.address);
    console.log("ownerBalanceAfter: ", ethers.utils.formatEther(ownerBalanceAfter));
  
    // console.log("ownerBalance", ethers.utils.formatEther(ownerBalance));
    const balanceCount = await nftContract.balanceOf(addr1.address);
    let arr = [];
    for (let i = 0; i < balanceCount; i++) {
      const token = await nftContract.tokenOfOwnerByIndex(addr1.address, i);
      arr.push(token);
    }
    console.log("arr: ", arr);
    
  });
  it("should return tokenId 1", async () => {
    let tokensCount = await nftContract.totalSupply();
    console.log("total", tokensCount);
    await nftContract.safeMint(factoryOwner.address, tokensCount);
    tokensCount = await nftContract.totalSupply();
    await nftContract.safeMint(factoryOwner.address, tokensCount);
    console.log(await nftContract.factoryOwnerOf(2));
  });

  it.only("should mint token with url", async () => {
  const result = await nftContract.connect(addr1).safeMint(addr1.address, "http", {
      value: ethers.utils.parseEther("1.0"),
    });
    console.log("result", result);
   await expect(nftContract.tokenURI(1)).to.emit(nftContract, "NewTokenURI").withArgs(1, "http");
  });
});
