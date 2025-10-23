// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import "../src/AttractionRegistry.sol";
import "../src/SouvenirNFT.sol";

contract DeployAttractionRegistry is Script {
    function run() external {
        // Load deployer's private key from environment variable
        uint256 deployerKey = vm.envUint("SEPOLIA_PRIVATE_KEY");

        // Start broadcasting transactions using the deployer's key
        vm.startBroadcast(deployerKey);

        // The deployer will be the admin
        address admin = vm.addr(deployerKey);

        // Deploy the SouvenirNFT contract
        SouvenirNFT souvenirNFT = new SouvenirNFT("Nestly Souvenir", "NSTLY");
        console2.log("✅ SouvenirNFT deployed at:", address(souvenirNFT));

        // Deploy the AttractionRegistry contract
        AttractionRegistry registry = new AttractionRegistry(admin, address(souvenirNFT));
        console2.log("✅ AttractionRegistry deployed at:", address(registry));

        // Set the minter contract on the SouvenirNFT
        souvenirNFT.setMinterContract(address(registry));
        console2.log("✅ Minter contract set on SouvenirNFT.");

        // Stop broadcasting
        vm.stopBroadcast();
    }
}
