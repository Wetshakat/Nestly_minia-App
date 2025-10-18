// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "../src/SouvenirNFT.sol";

contract SouvenirNFTTest is Test {
    SouvenirNFT nft;
    address owner = address(0xDEAD);
    address minter = address(0xBEEF);
    address user = address(0xCAFE);

    function setUp() public {
        nft = new SouvenirNFT("NestlySouvenir","NSTY");
        vm.prank(owner);
        nft.transferOwnership(owner);  // If Ownable's owner is msg.sender
        vm.prank(owner);
        nft.setMinterContract(minter);
    }

    function testMintByMinter() public {
        vm.prank(minter);
        uint256 tokenId = nft.mintSouvenir(user, 123, "uri://tokenmetadata");
        assertEq(nft.ownerOf(tokenId), user);
        assertEq(nft.tokenToAttractionId(tokenId), 123);
        assertEq(keccak256(bytes(nft.tokenURI(tokenId))), keccak256(bytes("uri://tokenmetadata")));
    }

    function testFailMintByNonMinter() public {
        vm.prank(user);
        vm.expectRevert("Not authorised to mint");
        nft.mintSouvenir(user, 456, "uri://tokenmetadata2");
    }
}
