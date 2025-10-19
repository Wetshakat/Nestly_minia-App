// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import "../src/AttractionRegistry.sol";

contract DeployAttractionRegistry is Script {
    function run() external {
        // Load private key from environment variable
        uint256 deployerKey = vm.envUint("SEPOLIA_PRIVATE_KEY");

        // Start broadcasting transactions
        vm.startBroadcast(deployerKey);

        // Admin address (you can change this if needed)
        address admin = msg.sender;

        // Deploy the contract
        AttractionRegistry registry = new AttractionRegistry(admin);

        console.log("AttractionRegistry deployed at:", address(registry));

        vm.stopBroadcast();
    }
}
