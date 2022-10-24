// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BuebioFuture is ERC1155, IERC1155Receiver {
  struct FutureProduction {
    uint availableUntil;
    address payToken;
    uint256 payAmount;
    address recipient;
  }

  address public owner;
  mapping (uint256 => bool) minted;
  mapping (uint256 => FutureProduction) productions;
  uint256 public maxId = 0;

  event Mint(uint256 indexed id, uint256 amount, FutureProduction production);
  event Buy(uint256 indexed id, address wallet, uint256 amount, address payToken, uint256 payAmount);

  constructor() ERC1155("https://api.dev.buebio.com/public/tokens/json/buebio-future/{id}.json") {
    owner = msg.sender;
  }

  function mint(
    uint256 id,
    uint256 amount,
    bytes memory data,
    uint availableUntil,
    address payToken,
    uint256 payAmount,
    address recipient
  ) external {
    require(msg.sender == owner, "Unauthorized");
    require(amount > 0, "Amount must be greater than zero");
    require(id > 0, "Id must be greater than zero");
    require(!minted[id], "Id already minted");
    require(payAmount > 0, "payAmount must be greater than 0");
    if (id > maxId) {
      maxId = id;
    }
    minted[id] = true;
    productions[id] = FutureProduction(
      availableUntil,
      payToken,
      payAmount,
      recipient
    );
    super._mint(address(this), id, amount, data);
    emit Mint(id, amount, productions[id]);
  }

  function buy(
    uint256 id,
    uint256 amount
  ) external {
    require(minted[id], "Invalid id");
    require(balanceOf(address(this), id) >= amount, "Not enough tokens");
    require(IERC20(productions[id].payToken).allowance(msg.sender, productions[id].recipient) >= amount * productions[id].payAmount, "Must approve token transference");
    IERC20(productions[id].payToken).transferFrom(msg.sender, productions[id].recipient, amount * productions[id].payAmount);
    _safeTransferFrom(address(this), msg.sender, id, amount, "0x");
    emit Buy(id, msg.sender, amount, productions[id].payToken, amount * productions[id].payAmount);
  }

  function productionById(uint256 id) external view returns (FutureProduction memory production) {
    require(minted[id], "Invalid id");
    production = productions[id];
  }

  function onERC1155Received(address operator, address from, uint256 id, uint256 value, bytes memory data) external override returns (bytes4) {
    return bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"));
  }

  function onERC1155BatchReceived(address operator, address from, uint256[] memory ids, uint256[] memory values, bytes memory data) external override returns (bytes4) {
    return bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"));
  }
}
