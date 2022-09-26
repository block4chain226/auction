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
        //address=>auctionId=>moneyAmount
        mapping(address=>mapping(uint=>uint)) public bids;
        //address=>index=>auctionId
        mapping(address=>mapping(uint=>uint)) private auctionsParticipationId;
        //auctions participation count(starts from 1)
        mapping(address=>uint) private auctionsParticipationCount;
        //auctionId=>bidded address=>true/false
        mapping(uint=>mapping(address=>bool)) isBiddedOnAuction;

        event EndAuction(uint endTime);

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
                // totalTime: uint32(_totalTime),
                startTime: block.timestamp,
                highestBidder: msg.sender,
                isStarted: true,
                isEnd: false
            });
            auctions.push(auction);
            nft.transferFrom(auction.owner, address(this), auction.nftId);
        }
        function riseBid(uint auctionId) external payable {
             Auction storage auction = auctions[auctionId];
             require(auction.isStarted && !auction.isEnd, "auction has not started yet or has already ended");
             require(block.timestamp < auction.totalTime, "auction has already ended");
             require(msg.value > auction.highestPrice, "your price is not higher for the last one");
             if(auction.highestBidder != address(0)){
                auction.highestPrice = msg.value;
                auction.highestBidder = msg.sender;
                bids[auction.highestBidder][auctionId] += msg.value;
                //?
             if(!isBiddedOnAuction[auctionId][msg.sender]){
                auctionsParticipationId[msg.sender][getAccountAuctionsParticipationCount(msg.sender)] = auctionId;
                auctionsParticipationCount[msg.sender]++; 
                }        
                isBiddedOnAuction[auctionId][msg.sender] = true;
             } 
        
        }

        function endAuction(uint auctionId) external{
            Auction storage auction = auctions[auctionId];      
            require(auction.isStarted && !auction.isEnd, "auction has not started yet or has already ended");
            // require(auction.highestBidder != address(0), "no one has not raised up bids");
            require(block.timestamp >= auction.totalTime, "the auction has still not over");
            auction.isEnd = true;
            auctions[auctionId] = auction;
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

        function deleteAuctionParticipationId(address account, uint index, uint totalIndex) internal {
            for(uint i = index; i < totalIndex - 1; i++){
                auctionsParticipationId[account][i] = auctionsParticipationId[account][i + 1];
            }
        }

       function getAllAuctions() public view returns(Auction[] memory){
        return auctions;
       }

       function getAuction(uint auctionId)public view returns(Auction memory){
        return auctions[auctionId];
       }

       function getAccountAuctionsParticipationCount(address account) public view returns(uint){
        return auctionsParticipationCount[account];
       }

       function getAuctionParticipationId(address account, uint index) public  view returns(uint){
        return auctionsParticipationId[account][index];
       }

       function isAccountBiddedonAuction(uint auctionId, address account) public view returns(bool){
        return isBiddedOnAuction[auctionId][account];
       }
      



} 