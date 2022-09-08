//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.11;

interface IERC721{
    function transferFrom(address from, address to, uint nftId) external;
}

contract EnglishAuction{
    IERC721 public immutable nft;
    uint public nftId;
    address payable public contractOwner;
    string private tokenURI;

    struct Auction{
        uint auctionId;
        address  owner;
        uint nftId;
        uint startPrice;
        uint highestPrice;
        uint32 totalTime;
        uint startTime;
        address highestBidder;
        bool isStarted;
        bool isEnd;
        }

        Auction[] public auctions;
        mapping(address=>mapping(uint=>Auction)) public auctionsOwners;
        //bidder=>auctionId=>bidd
        mapping(address=>mapping(uint=>uint)) public bids;

        constructor( address _nft){
          contractOwner = payable(msg.sender);
          nft = IERC721(_nft);
        }
        
        function startAuction(uint _nftId, uint _startPrice, uint32 _totalTime) external{
            
            Auction memory auction =  Auction({
                auctionId: auctions.length,
                owner: msg.sender,
                nftId: _nftId,
                startPrice: _startPrice,
                highestPrice: _startPrice,
                totalTime: uint32(block.timestamp + _totalTime),
                startTime: block.timestamp,
                highestBidder: msg.sender,
                isStarted: true,
                isEnd: false
            });
            auctions.push(auction);
            nft.transferFrom(auction.owner, address(this), auction.nftId);
            auctionsOwners[auction.owner][auctions.length - 1] = auction;
        }
        function riseBid(uint auctionId) external payable{
             Auction storage auction = auctions[auctionId];
             require(auction.isStarted && !auction.isEnd, "auction has not started yet or has already ended");
             require(block.timestamp < auction.totalTime, "auction has already ended");
             require(msg.value > auction.highestPrice, "your price is not higher for the last one");
             if(auction.highestBidder != address(0)){
                auction.highestPrice = msg.value;
                auction.highestBidder = msg.sender;
                bids[auction.highestBidder][auctionId] += msg.value;
             } 
        }
        function endAuction(uint auctionId) external{
            Auction storage auction = auctions[auctionId];
            require(auction.isStarted && !auction.isEnd, "auction has not started yet or has already ended");
            require(auction.highestBidder != address(0), "no one has not raised up bids");
            require(block.timestamp >= auction.totalTime, "the auction has still not over");
            auction.isEnd = true;
             if(auction.highestBidder != address(0) && auction.highestBidder != auction.owner){
                nft.transferFrom(address(this), auction.highestBidder, auction.nftId);
                payable(auction.owner).transfer(auction.highestPrice);

                bids[auction.highestBidder][auctionId] -=auction.highestPrice;
                uint returnMoney = bids[auction.highestBidder][auctionId];
                bids[auction.highestBidder][auctionId] = 0;
                payable(msg.sender).transfer(returnMoney);
                
            }else{
                nft.transferFrom(address(this), auction.owner, auction.nftId);
            }
          
        }
    
        function withdraw(uint auctionId) external payable{
            uint moneyToReturn = bids[msg.sender][auctionId];
            bids[msg.sender][auctionId] = 0;
            payable(msg.sender).transfer(moneyToReturn);
        }

        function balanceOfContract() public view returns(uint){
            return address(this).balance;
        }
        function balanceOf(address account) public view returns(uint){
            return account.balance;
        }







}