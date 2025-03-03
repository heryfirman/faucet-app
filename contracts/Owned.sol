// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Owned {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(
            msg.sender == owner, 
            "Only owner can withdraw"
        );
        _;
    }
}