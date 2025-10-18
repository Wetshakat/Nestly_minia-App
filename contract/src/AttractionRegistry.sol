// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./Errors.sol";
import "./Events.sol";

contract AttractionRegistry {
    address public admin;

    struct Attraction {
        uint256 id;
        address creator;
        string name;
        string description;
        string metadataURI;
        bytes32 photoHash;
        int256 latitude;
        int256 longitude;
        uint256 timestampCreated;
        bool isActive;
        uint256 price;
        uint256[] eventIds;
    }

    struct EventInfo {
        uint256 id;
        uint256 attractionId;
        string title;
        string description;
        string metadataURI;
        uint256 eventDate;
        uint256 price;
        bool isActive;
    }

    uint256 public nextAttractionId = 1;
    uint256 public nextEventId = 1;

    mapping(uint256 => Attraction) public attractions;
    mapping(address => uint256[]) public creatorToAttractions;
    mapping(uint256 => EventInfo) public eventsById;
    mapping(uint256 => uint256[]) public attractionToEvents;
    mapping(address => bool) public isVerifiedCreator;

    event AttractionMetadataUpdated(uint256 indexed attractionId, string newMetadataURI);

    modifier onlyAdmin() {
        if (msg.sender != admin) revert NotAdmin();
        _;
    }

    modifier onlyVerifiedCreator() {
        if (!isVerifiedCreator[msg.sender]) revert NotVerifiedCreator(msg.sender);
        _;
    }

    modifier onlyAttractionCreator(uint256 _attractionId) {
        Attraction storage attr = attractions[_attractionId];
        if (attr.creator != msg.sender) revert NotAttractionCreator(_attractionId, msg.sender);
        _;
    }

    constructor(address _admin) {
        if (_admin == address(0)) revert NotAdmin();
        admin = _admin;
    }

    function addVerifiedCreator(address _creator) external onlyAdmin {
        isVerifiedCreator[_creator] = true;
        emit CreatorVerified(_creator);
    }

    function removeVerifiedCreator(address _creator) external onlyAdmin {
        isVerifiedCreator[_creator] = false;
        emit CreatorUnverified(_creator);
    }

    function registerAttraction(
        string memory _name,
        string memory _description,
        string memory _metadataURI,
        bytes32 _photoHash,
        int256 _latitude,
        int256 _longitude,
        uint256 _price
    ) external onlyVerifiedCreator returns (uint256) {
        if (_price == 0) revert InvalidPrice(_price);

        uint256 attractionId = nextAttractionId++;
        Attraction storage attr = attractions[attractionId];
        attr.id = attractionId;
        attr.creator = msg.sender;
        attr.name = _name;
        attr.description = _description;
        attr.metadataURI = _metadataURI;
        attr.photoHash = _photoHash;
        attr.latitude = _latitude;
        attr.longitude = _longitude;
        attr.timestampCreated = block.timestamp;
        attr.isActive = true;
        attr.price = _price;

        creatorToAttractions[msg.sender].push(attractionId);

        emit AttractionRegistered(attractionId, msg.sender);
        return attractionId;
    }

    function updateAttractionPrice(uint256 _attractionId, uint256 _newPrice)
        external
        onlyAttractionCreator(_attractionId)
    {
        if (_newPrice == 0) revert InvalidPrice(_newPrice);
        attractions[_attractionId].price = _newPrice;
        emit AttractionPriceUpdated(_attractionId, _newPrice);
    }

    function toggleAttractionActive(uint256 _attractionId, bool _active)
        external
        onlyAttractionCreator(_attractionId)
    {
        attractions[_attractionId].isActive = _active;
    }

    function createEvent(
        uint256 _attractionId,
        string memory _title,
        string memory _description,
        string memory _metadataURI,
        uint256 _eventDate,
        uint256 _price
    ) external onlyAttractionCreator(_attractionId) returns (uint256) {
        if (_price == 0) revert InvalidPrice(_price);
        if (_eventDate <= block.timestamp) revert();

        uint256 eventId = nextEventId++;
        EventInfo storage e = eventsById[eventId];
        e.id = eventId;
        e.attractionId = _attractionId;
        e.title = _title;
        e.description = _description;
        e.metadataURI = _metadataURI;
        e.eventDate = _eventDate;
        e.price = _price;
        e.isActive = true;

        attractionToEvents[_attractionId].push(eventId);
        attractions[_attractionId].eventIds.push(eventId);

        emit EventCreated(eventId, _attractionId, msg.sender);
        return eventId;
    }

    function updateEvent(
        uint256 _eventId,
        uint256 _newEventDate,
        uint256 _newPrice,
        string memory _newDescription
    ) external {
        EventInfo storage e = eventsById[_eventId];
        uint256 attractionId = e.attractionId;
        if (attractions[attractionId].creator != msg.sender)
            revert NotAttractionCreator(attractionId, msg.sender);
        if (_newPrice == 0) revert InvalidPrice(_newPrice);
        if (_newEventDate <= block.timestamp) revert();

        e.eventDate = _newEventDate;
        e.price = _newPrice;
        e.description = _newDescription;

        emit EventUpdated(_eventId, attractionId, _newPrice, _newEventDate);
    }

    function updateAttractionMetadata(uint256 _attractionId, string memory _newMetadataURI)
        external
        onlyAttractionCreator(_attractionId)
    {
        attractions[_attractionId].metadataURI = _newMetadataURI;
        emit AttractionMetadataUpdated(_attractionId, _newMetadataURI);
    }

    function getCreatorAttractions(address _creator) external view returns (uint256[] memory) {
        return creatorToAttractions[_creator];
    }

    function getAttractionEvents(uint256 _attractionId) external view returns (uint256[] memory) {
        return attractionToEvents[_attractionId];
    }

    function getAttraction(uint256 _attractionId)
        external
        view
        returns (
            uint256 id,
            address creator,
            string memory name,
            string memory description,
            string memory metadataURI,
            bytes32 photoHash,
            int256 latitude,
            int256 longitude,
            uint256 timestampCreated,
            bool isActive,
            uint256 price,
            uint256[] memory eventIds
        )
    {
        Attraction storage attr = attractions[_attractionId];
        return (
            attr.id,
            attr.creator,
            attr.name,
            attr.description,
            attr.metadataURI,
            attr.photoHash,
            attr.latitude,
            attr.longitude,
            attr.timestampCreated,
            attr.isActive,
            attr.price,
            attr.eventIds
        );
    }
}
