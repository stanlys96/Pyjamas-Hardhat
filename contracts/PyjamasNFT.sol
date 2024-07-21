// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PyjamasNFT is Ownable, ERC721 {
  string private baseURI;
  uint256 public maxSupply = 9998;
  uint256 private counter = 0;

  constructor(string memory _name, string memory _symbol, string memory _baseURI) ERC721(_name, _symbol) {
    setBaseURI(_baseURI);
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function mint() public payable {
    _safeMint(msg.sender, counter);
    counter++;
  }
}