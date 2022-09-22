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
        // mapping(address=>mapping(uint=>Auction)) public auctionsOwners;
        //how much active auctions owner has
        // mapping(address=>uint) private ownerAuctionsCount;
        //bidder=>auctionId=>bidd
        mapping(address=>mapping(uint=>uint)) public bids;
        event EndAuction(uint endTime);

        constructor( address _nft){
          contractOwner = payable(msg.sender);
          nft = IERC721(_nft);
        }
        
        function startAuction(uint _nftId, uint _startPrice, uint32 _totalTime) external{
            
            Auction memory auction =  Auction({
                //?? length+1
                auctionId: auctions.length,
                owner: msg.sender,
                nftId: _nftId,
                startPrice: _startPrice,
                highestPrice: _startPrice,
                // totalTime: uint32(block.timestamp + _totalTime),
                totalTime: uint32(_totalTime),
                startTime: block.timestamp,
                highestBidder: msg.sender,
                isStarted: true,
                isEnd: false
            });
            auctions.push(auction);
            nft.transferFrom(auction.owner, address(this), auction.nftId);
            //?
            // auctionsOwners[auction.owner][ownerAuctionsCount[auction.owner]] = auction;
            // ownerAuctionsCount[auction.owner]++;
            /////////////////////////////////////////////mistake!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // auctionsOwners[auction.owner][auctions.length] = auction;
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

        // function time() public {
        //     emit EndAuction(block.timestamp);
        // }

        function endAuction(uint auctionId) external{
            Auction storage auction = auctions[auctionId];
            
            require(auction.isStarted && !auction.isEnd, "auction has not started yet or has already ended");
            // require(auction.highestBidder != address(0), "no one has not raised up bids");
            require(block.timestamp >= auction.totalTime, "the auction has still not over");
            auction.isEnd = true;
            ///problem!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // auctionsOwners[auction.owner][ownerAuctionsCount[auction.owner]-1] = auction;
            auctions[auctionId] = auction;
            //?
            // ownerAuctionsCount[auction.owner]--;
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

    //    function getAccountAuctionByIndex(address account, uint index) public view returns(Auction memory){
    //     return auctionsOwners[account][index];
    //    }

    //    function getOwnerAuctionsCount() public view returns(uint){
    //     return ownerAuctionsCount[msg.sender];
    //    }
       function getAllAuctions() public view returns(Auction[] memory){
        return auctions;
       }

}