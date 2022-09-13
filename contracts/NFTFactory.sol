//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/interfaces/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract NFTFactory is ERC721, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    uint fee;
    address payable  factoryOwner ;
    // string private name;
    // string private symbol;
    mapping(uint256 => string) private _tokenURIs;
    event NewTokenURI(address _owner, uint tokenId, string _newtokenUri);
    // event Transfer(address indexed from, address indexed to, uint tokenId);

    constructor(uint _fee)ERC721("Auction","AUC"){
        // name = _name;
        // symbol = _symbol;
        fee = _fee;
        factoryOwner = payable(msg.sender);
    }

    function safeMint(address to, string memory url) public payable {
        // tokenId = tokenId+1;
        require(msg.value>=fee, "not enough ether sent");
        _tokenIdCounter.increment();
        _safeMint(to, _tokenIdCounter.current());
        setTokenURI(_tokenIdCounter.current(), url);
        (bool success,) = factoryOwner.call{value:fee}("");
        require(success, "fee has not sent");
        if(address(this).balance != 0 && msg.value - fee > 0){
            (bool success1,) = payable(msg.sender).call{value:address(this).balance}("");
            require(success1, "fee has not sent");
        }
    }
   
    function _safeMint(address to, uint tokenId) internal override{
        super._safeMint(to, tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override {
        super._burn(tokenId);
    }
        //QmZRLfGyqbNEAySBM7FSs3oWLzD3WPwYvR2LEvWrT6bgZX
     function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
        emit NewTokenURI(msg.sender, tokenId, _tokenURI);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        _setTokenURI(tokenId, _tokenURI);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return super.tokenURI(tokenId);
    }


    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }
    
}

