// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";

struct Publication {
  address owner;
  address tokenAddress;
  uint256 tokenId;
  address payToken;
  uint256 payAmount;
}

contract BuebioMarketplace is IERC1155Receiver {
  using SafeERC20 for IERC20;

  address public owner;
  // Total amount of active publications
  uint256 public publicationsQuantity = 0;

  // Length of publications mapping (included removed publications)
  uint256 public publicationsLength = 0;
  // Information of each publication by ID
  mapping(uint256 => Publication) public publications;
  // Publication IDs by wallet address. Each wallet have a mapping with incremental ID (like an array)
  mapping(address => mapping(uint256 => uint256)) public publicationsByWallet;
  // Index of each publication in publicationsByWallet mapping
  mapping(uint256 => uint256) private _publicationsByWalletIndex;
  // Amount of active publications of each wallet address
  mapping(address => uint256) public publicationsQuantityByWallet;

  // Event emitted when a publication is registered
  event Publish(uint256 indexed id, address owner, Publication publication);
  // Event emitted when a publication is removed
  event Unpublish(uint256 indexed id, address owner);
  // Event emitted when a publication is buyed
  event Buy(uint256 indexed id, address sender, address toWallet);

  constructor() {
    owner = msg.sender;
  }

  // Register a new publication
  function publish(
    address tokenAddress,
    uint256 tokenId,
    address payToken,
    uint256 payAmount
  ) external {
    // validate tokenAddress is an ERC1155, tokenId exists and sender is the owner
    require(IERC1155(tokenAddress).balanceOf(msg.sender, tokenId) >= 0, 'Sender must be token owner');

    // validate token is approved
    require(IERC1155(tokenAddress).isApprovedForAll(msg.sender, address(this)), 'Must approve token');
    
    // token pull
    IERC1155(tokenAddress).safeTransferFrom(msg.sender, address(this), tokenId, 1, '0x');

    // update internal structures
    uint256 id = _addPublication(
      tokenAddress,
      tokenId,
      payToken,
      payAmount
    );

    // emit event
    emit Publish(id, msg.sender, publications[id]);
  }

  // Remove an active publication
  function unpublish(
    uint256 id
  ) external {
    // validate publication by id
    require(publications[id].payAmount > 0, 'Publication must exists');

    // validate ownership of the publication
    require(publications[id].owner == msg.sender, 'Must be publication owner');

    // send back token to owner
    IERC1155(publications[id].tokenAddress).safeTransferFrom(address(this), msg.sender, publications[id].tokenId, 1, '0x');
    
    // update internal structures
    _removePublication(id);

    // emit event
    emit Unpublish(id, msg.sender);
  }

  // buy publication
  function buy(
    uint256 id,
    address toWallet
  ) external {
    // validate publication by id
    require(publications[id].payAmount > 0, 'Publication must exists');

    // payToken pull (payment)
    IERC20(publications[id].payToken).safeTransferFrom(msg.sender, address(this), publications[id].payAmount);

    // send token to new owner
    IERC1155(publications[id].tokenAddress).safeTransferFrom(address(this), toWallet, publications[id].tokenId, 1, '0x');

    // update internal structures
    _removePublication(id);

    // emit event
    emit Buy(id, msg.sender, toWallet);
  }

  function onERC1155Received(address operator, address from, uint256 id, uint256 value, bytes memory data) external pure override returns (bytes4) {
    return bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"));
  }

  function onERC1155BatchReceived(address operator, address from, uint256[] memory ids, uint256[] memory values, bytes memory data) external pure override returns (bytes4) {
    return bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"));
  }

  function supportsInterface(bytes4 interfaceId) public pure virtual override returns (bool) {
    return interfaceId == type(IERC1155Receiver).interfaceId;
  }


  function _addPublication(
    address tokenAddress,
    uint256 tokenId,
    address payToken,
    uint256 payAmount
  ) private returns (uint256) {
    publicationsLength += 1;
    publications[publicationsLength] = Publication(
      msg.sender,
      tokenAddress,
      tokenId,
      payToken,
      payAmount
    );
    publicationsQuantityByWallet[msg.sender] += 1;
    publicationsByWallet[msg.sender][publicationsQuantityByWallet[msg.sender]] = publicationsLength;
    publicationsQuantity += 1;
    return publicationsLength;
  }

  function _removePublication(
    uint256 id
  ) private {
    address owner = publications[id].owner;
    uint256 ownedIdx = _publicationsByWalletIndex[id];
    uint256 lastOwnedIdx = publicationsQuantityByWallet[owner];

    if (ownedIdx != lastOwnedIdx) {
      uint256 lastOwnedId = publicationsByWallet[owner][lastOwnedIdx];
      publicationsByWallet[owner][ownedIdx] = lastOwnedId;
      _publicationsByWalletIndex[lastOwnedId] = ownedIdx;
    }
    delete publicationsByWallet[owner][lastOwnedIdx];
    delete _publicationsByWalletIndex[id];
    publicationsQuantityByWallet[owner] -= 1;

    delete publications[id];
    publicationsQuantity -= 1;
  }
}
