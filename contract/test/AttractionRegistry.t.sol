// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "../src/Errors.sol";
import "../src/Events.sol";
import "../src/AttractionRegistry.sol";

import "../src/SouvenirNFT.sol";

contract AttractionRegistryTest is Test {
    AttractionRegistry registry;
    SouvenirNFT nft;
    address admin   = address(0xABCD);
    address creator = address(0xBEEF);
    address other   = address(0xCAFE);

    function setUp() public {
        nft = new SouvenirNFT("Test NFT", "TNFT");
        registry = new AttractionRegistry(admin, address(nft));
        vm.prank(admin);
        registry.addVerifiedCreator(creator);
    }

    function testOnlyAdminCanVerifyCreator() public {
        vm.startPrank(other);
        vm.expectRevert(NotAdmin.selector);
        registry.addVerifiedCreator(other);
        vm.stopPrank();
    }

    function testCreatorVerificationFlow() public {
        assertTrue(registry.isVerifiedCreator(creator));
        vm.prank(admin);
        registry.removeVerifiedCreator(creator);
        assertFalse(registry.isVerifiedCreator(creator));
    }

    function testRegisterAttractionSucceeds() public {
        vm.prank(creator);
        uint256 id = registry.registerAttraction(
            "Name",
            "Desc",
            "ipfs://metadata.json",
            bytes32("photoHash"),
            int256(100),
            int256(200),
            1 ether
        );
        (
            uint256 _id,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            uint256 _price,
            uint256[] memory _eventIds
        ) = registry.getAttraction(id);

        assertEq(_id, id);
        assertEq(_price, 1 ether);
        assertEq(_eventIds.length, 0);
    }

    function testRegisterAttractionFailsWhenNotVerifiedCreator() public {
        vm.prank(other);
        vm.expectRevert(abi.encodeWithSelector(NotVerifiedCreator.selector, other));
        registry.registerAttraction(
            "Name",
            "Desc",
            "ipfs://metadata.json",
            bytes32("photoHash"),
            int256(100),
            int256(200),
            1 ether
        );
    }

    function testUpdateAttractionPriceAndEmits() public {
        vm.prank(creator);
        uint256 id = registry.registerAttraction(
            "Name",
            "Desc",
            "ipfs://metadata.json",
            bytes32("photoHash"),
            int256(100),
            int256(200),
            1 ether
        );

        vm.prank(creator);
        vm.expectEmit(true, false, false, true);
        emit AttractionPriceUpdated(id, 2 ether);
        registry.updateAttractionPrice(id, 2 ether);

        (
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            uint256 newPrice,
            uint256[] memory eventIds
        ) = registry.getAttraction(id);
        assertEq(newPrice, 2 ether);
        assertEq(eventIds.length, 0);
    }

    function testCreateAndUpdateEventFlow() public {
        vm.prank(creator);
        uint256 aId = registry.registerAttraction(
            "Name",
            "Desc",
            "ipfs://metadata.json",
            bytes32("photoHash"),
            int256(100),
            int256(200),
            1 ether
        );

        vm.prank(creator);
        uint256 eId = registry.createEvent(
            aId,
            "Title",
            "EvDesc",
            "ipfs://eventMeta.json",
            block.timestamp + 1 days,
            0.5 ether
        );
        uint256[] memory evList = registry.getAttractionEvents(aId);
        assertEq(evList.length, 1);
        assertEq(evList[0], eId);

        vm.prank(creator);
        vm.expectEmit(true, false, false, true);
        emit EventUpdated(eId, aId, 0.75 ether, block.timestamp + 2 days);
        registry.updateEvent(eId, block.timestamp + 2 days, 0.75 ether, "NewDesc");
    }

    function testRevertWhen_CreateEventByWrongUser() public {
        vm.prank(other);
        vm.expectRevert(abi.encodeWithSelector(NotAttractionCreator.selector, 1, other));
        registry.createEvent(
            1,
            "Title",
            "EvDesc",
            "ipfs://eventMeta.json",
            block.timestamp + 1 days,
            0.5 ether
        );
    }
}
