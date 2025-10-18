// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

error NotAdmin();
error NotVerifiedCreator(address creator);
error NotAttractionCreator(uint256 attractionId, address caller);
error InvalidLatitude(int256 latitude);
error InvalidLongitude(int256 longitude);
error InvalidPrice(uint256 price);

