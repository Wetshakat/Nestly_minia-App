// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

event CreatorVerified(address indexed creator);
event CreatorUnverified(address indexed creator);
event AttractionRegistered(uint256 indexed attractionId, address indexed creator);
event AttractionPriceUpdated(uint256 indexed attractionId, uint256 newPrice);
event EventCreated(uint256 indexed eventId, uint256 indexed attractionId, address indexed creator);
event EventUpdated(uint256 indexed eventId, uint256 indexed attractionId, uint256 newPrice, uint256 newEventDate);
event SouvenirMinted(address indexed to, uint256 indexed tokenId, uint256 indexed attractionId);
