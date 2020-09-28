pragma solidity ^0.6.0;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import 'openzeppelin-solidity/contracts/access/Ownable.sol';

contract CGT is ERC20, Ownable {
    constructor (
        string memory name,
        string memory symbol,
        uint256 initialBalance
    ) public payable ERC20(name, symbol) {
        _mint(owner(), initialBalance);
    }

    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public onlyOwner {
        _burn(account, amount);
    }
}
