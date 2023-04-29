// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MilkyShades is ERC721A, Ownable {
    uint256 public MAX_MINTS;
    uint256 public MAX_SUPPLY;
    uint256 public mintRate;
    //address payable(msg.sender) public withdrawWallet;
    bool public isPublicMintEnabled;

    string internal baseURI;
    mapping(address => uint256) public walletMints;

    constructor() ERC721A("MilkyShades", "MS") {
        MAX_MINTS = 2;
        MAX_SUPPLY = 10000;
        mintRate = 0.08 ether;
        //withdrawWallet = ;

    }

    function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner{
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    function setBaseUri(string calldata baseURI_) external onlyOwner {
        baseURI = baseURI_;
    }

    function tokenURI(uint256 tokenId_) public view virtual override returns (string memory) {
        require(_exists(tokenId_), 'Token does not exist');
        return string(abi.encodePacked(baseURI, Strings.toString(tokenId_), ".json"));
 /*        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        string memory baseURI = _baseURI();
        return bytes(baseURI).length != 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) : ''; */
    }  

    function mint(uint256 quantity) external payable {
        // _safeMint's second argument now takes in a quantity, not a tokenId.
        require(isPublicMintEnabled, 'minting not enabled');
        require(quantity + _numberMinted(msg.sender) <= MAX_MINTS, "Exceeded the limit");
        require(totalSupply() + quantity <= MAX_SUPPLY, "Sold Out");
        require(walletMints[msg.sender] + quantity <= MAX_MINTS, 'exceed maximum');
        require(msg.value >= (mintRate * quantity), "Not enough ether sent");
        _safeMint(msg.sender, quantity);
    }

    function withdraw() external payable onlyOwner {
/*         (bool success, ) = withdrawWallet.call{value: address(this).balance }('');
        require(success, 'withdraw failed'); */
        payable(owner()).transfer(address(this).balance);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setMintRate(uint256 _mintRate) public onlyOwner {
        mintRate = _mintRate;
    }

    function setMaxmint(uint256 _maxmint) public onlyOwner {
        MAX_MINTS = _maxmint;
    }

    function setMaxSupply(uint256 _maxsupply) public onlyOwner {
        MAX_SUPPLY = _maxsupply;
    }
}