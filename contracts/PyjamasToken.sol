// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Recompile - 10
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PyjamasToken is ERC20 {
    constructor() ERC20("PyjamasToken", "PTK") {
        _mint(msg.sender, 1000000000 * 10 ** decimals());
    }
}
