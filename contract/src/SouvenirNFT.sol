// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Events.sol";

contract SouvenirNFT is ERC721, Ownable {
    uint256 public nextTokenId = 1;

    // Mapping from tokenId to metadata if needed
    mapping(uint256 => string) private _tokenURIs;

    // Optional: mapping from tokenId to attractionId (if you track it)
    mapping(uint256 => uint256) public tokenToAttractionId;

    // Address or contract that is allowed to trigger minting (e.g., your registry contract)
    address public minterContract;

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {
        // initial setup if needed
    }

    modifier onlyMinter() {
        require(msg.sender == minterContract, "Not authorised to mint");
        _;
    }

    function setMinterContract(address _minter) external onlyOwner {
        minterContract = _minter;
    }

    function mintSouvenir(address _to, uint256 _attractionId, string memory _tokenURI) external onlyMinter returns (uint256) {
        uint256 tokenId = nextTokenId++;
        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        tokenToAttractionId[tokenId] = _attractionId;
        emit SouvenirMinted(_to, tokenId, _attractionId);
        return tokenId;
    }

    function _setTokenURI(uint256 tokenId, string memory _uri) internal {
        _tokenURIs[tokenId] = _uri;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }
}
