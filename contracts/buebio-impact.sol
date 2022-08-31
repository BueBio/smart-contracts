// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract BuebioImpact is ERC1155 {
    address public owner;
    mapping (uint256 => bool) minted;
    uint256 public maxId = 0;

    event Mint(uint256 indexed id, address account, uint256 amount);

    constructor() ERC1155("https://buebio.com/resources/productions/{id}.json") {
      owner = msg.sender;
    }

    function mint(
      address account,
      uint256 id,
      uint256 amount,
      bytes memory data
    ) external {
      require(msg.sender == owner, "Unauthorized");
      require(amount > 0, "Amount must be greater than zero");
      require(id > 0, "Id must be greater than zero");
      require(!minted[id], "Id already minted");
      if (id > maxId) {
        maxId = id;
      }
      minted[id] = true;
      super._mint(account, id, amount, data);
      emit Mint(id, account, amount);
    }
}
