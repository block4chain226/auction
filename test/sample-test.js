const { expect } = require("chai");
const { Contract, BigNumber } = require("ethers");
const { ethers } = require("hardhat");
// use(solidity);

describe("NFTFactory", function () {
  let factoryOwner, addr1, addr2, addr3, NFT, nftContract, Auction, nftAuction;
  beforeEach(async () => {
    [factoryOwner, addr1, addr2, addr3] = await ethers.getSigners();
    NFT = await ethers.getContractFactory("NFTFactory");
    nftContract = await NFT.deploy("1000000000000000000");
    await nftContract.deployed();
    Auction = await ethers.getContractFactory("EnglishAuction");
    nftAuction = await Auction.deploy(nftContract.address);
    await nftAuction.deployed();
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
    const contractBalanceBefore = await ethers.provider.getBalance(
      nftContract.address
    );
    console.log(
      "contractBefore: ",
      ethers.utils.formatEther(contractBalanceBefore)
    );

    const ownerBalanceBefore = await ethers.provider.getBalance(
      factoryOwner.address
    );
    console.log(
      "ownerBalanceBefore: ",
      ethers.utils.formatEther(ownerBalanceBefore)
    );

    const addr1BalanceBefore = await ethers.provider.getBalance(addr1.address);
    console.log(
      "addr1BalanceBefore: ",
      ethers.utils.formatEther(addr1BalanceBefore)
    );

    await nftContract.connect(addr1).safeMint(addr1.address, {
      value: ethers.utils.parseEther("2.0"),
    });

    const contractBalanceAfter = await ethers.provider.getBalance(
      nftContract.address
    );
    console.log(
      "contractAfter: ",
      ethers.utils.formatEther(contractBalanceAfter)
    );

    const addr1BalanceAfter = await ethers.provider.getBalance(addr1.address);
    console.log(
      "addr1BalanceAfter: ",
      ethers.utils.formatEther(addr1BalanceAfter)
    );

    const ownerBalanceAfter = await ethers.provider.getBalance(
      factoryOwner.address
    );
    console.log(
      "ownerBalanceAfter: ",
      ethers.utils.formatEther(ownerBalanceAfter)
    );

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

  it("should mint token with url", async () => {
    const result = await nftContract
      .connect(addr1)
      .safeMint(addr1.address, "http", {
        value: ethers.utils.parseEther("1.0"),
      });
    console.log("result", result);
    await expect(nftContract.tokenURI(1))
      .to.emit(nftContract, "NewTokenURI")
      .withArgs(1, "http");
  });
  it("Should return full url", async () => {
    await nftContract.safeMint(
      addr1.address,
      "bafybeiff2q6s3gapx23zni3l6u7vyfdzjw5dbwjjbxdko5iiusca6k7kve",
      { value: ethers.utils.parseEther("1") }
    );
    expect(await nftContract.tokenURI(1)).to.eq(
      "https://ipfs.io/ipfs/bafybeiff2q6s3gapx23zni3l6u7vyfdzjw5dbwjjbxdko5iiusca6k7kve"
    );
  });
  it("Should return null", async () => {
    await nftContract
      .connect(addr1)
      .safeMint(addr1.address, "http", { value: ethers.utils.parseEther("1") });
    const tokenId = await nftContract
      .connect(addr1)
      .tokenOfOwnerByIndex(addr1.address, 0);
    const approve = await nftContract
      .connect(addr1)
      .approve(nftAuction.address, tokenId);
    const myAuction = await nftAuction.connect(addr1).startAuction(tokenId, 1);

    await nftAuction.connect(addr2).riseBid(0, { value: 10 });
    await nftAuction.connect(addr3).riseBid(0, { value: 20 });
    await network.provider.send("evm_increaseTime", [60]);
    await nftAuction.connect(addr1).endAuction(0);
    await nftAuction.connect(addr2).withdraw(0);
    await nftAuction.connect(addr3).withdraw(0);
    console.log(await nftAuction.connect(addr2).bids(addr2.address, 0));
    const c = await nftContract.balanceOf(addr3.address);
    const d = await nftContract.balanceOf(addr1.address);
    console.log("c", d);

    // expect(await nftContract.balanceOf(addr1.address)).to.eq(ethers.BigNumber.from("0"));
  });
  it("nft should return to add1 because no one not bidded", async () => {
    await nftContract.connect(addr1).safeMint(addr1.address, "http", {
      value: ethers.utils.parseEther("1"),
    });
    const tokenId = await nftContract
      .connect(addr1)
      .tokenOfOwnerByIndex(addr1.address, 0);
    const approve = await nftContract
      .connect(addr1)
      .approve(nftAuction.address, tokenId);
    const myAuction = await nftAuction
      .connect(addr1)
      .startAuction(tokenId, 1, 60);
    const tokenOwner = await nftContract.balanceOf(addr1.address);
    console.log(
      "🚀 ~ file: sample-test.js ~ line 154 ~ it.only ~ tokenOwner",
      tokenOwner
    );
    await network.provider.send("evm_increaseTime", [60]);
    await nftAuction.connect(addr1).endAuction(0);
    const tokenOwner1 = await nftContract.balanceOf(addr1.address);
    console.log(
      "🚀 ~ file: sample-test.js ~ line 154 ~ it.only ~ tokenOwner",
      tokenOwner1
    );
  });
  it("should return 3 auctions using getAccountAuctionByIndex", async () => {
    await nftContract.connect(addr1).safeMint(addr1.address, "http", {
      value: ethers.utils.parseEther("1"),
    });
    const tokenId1 = await nftContract
      .connect(addr1)
      .tokenOfOwnerByIndex(addr1.address, 0);

    const approve = await nftContract
      .connect(addr1)
      .approve(nftAuction.address, tokenId1);

    const myAuction = await nftAuction
      .connect(addr1)
      .startAuction(tokenId1, 1, 60);
    console.log(await nftContract.ownerOf(1));
    const endAuction = await nftAuction.endAuction(0);
    const ownerofReturnedNFT = await nftContract.ownerOf(1);
    console.log(
      "🚀 ~ file: sample-test.js ~ line 185 ~ it.only ~ ownerofReturnedNFT",
      ownerofReturnedNFT
    );

    /////////////////////////////////////////
    await nftContract.connect(addr2).safeMint(addr2.address, "http", {
      value: ethers.utils.parseEther("1"),
    });
    const tokenId2 = await nftContract
      .connect(addr2)
      .tokenOfOwnerByIndex(addr2.address, 0);

    const approve2 = await nftContract
      .connect(addr2)
      .approve(nftAuction.address, tokenId2);

    const myAuction2 = await nftAuction
      .connect(addr2)
      .startAuction(tokenId2, 1, 60);
    console.log(await nftContract.ownerOf(2));
    const endAuction2 = await nftAuction.endAuction(1);
    /////////////////////////////////////
    await nftContract.connect(addr1).safeMint(addr1.address, "http", {
      value: ethers.utils.parseEther("1"),
    });
    const tokenId3 = await nftContract
      .connect(addr1)
      .tokenOfOwnerByIndex(addr1.address, 1);

    const approve3 = await nftContract
      .connect(addr1)
      .approve(nftAuction.address, tokenId3);

    const myAuction3 = await nftAuction
      .connect(addr1)
      .startAuction(tokenId3, 1, 60);
    console.log(await nftContract.ownerOf(3));
    const endAuction3 = await nftAuction.endAuction(2);
    const auction = await nftAuction.getAccountAuctionByIndex(addr2.address, 0);
    console.log("🚀 ~ file: sample-test.js ~ line 229 ~ auction", auction);
  });
  ////////////////////
  it.only("after endAuction getAccountAuctionByIndex should return aauction with isEnd==true", async () => {
    await nftContract.connect(addr1).safeMint(addr1.address, "http", {
      value: ethers.utils.parseEther("1"),
    });
    const tokenId1 = await nftContract
      .connect(addr1)
      .tokenOfOwnerByIndex(addr1.address, 0);

    const approve = await nftContract
      .connect(addr1)
      .approve(nftAuction.address, tokenId1);

    const myAuction = await nftAuction
      .connect(addr1)
      .startAuction(tokenId1, 1, 60);
    console.log(await nftContract.ownerOf(1));
    const endAuction = await nftAuction.endAuction(0);
    const auction = await nftAuction.getAccountAuctionByIndex(addr1.address, 1);
    console.log(
      "🚀 ~ file: sample-test.js ~ line 248 ~ it.only ~ auction",
      auction
    );
  });
});
