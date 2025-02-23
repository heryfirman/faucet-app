// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Owned.sol";
import "./IFaucet.sol";

contract Faucet is Owned, IFaucet {
    uint public numOfFunders;

    mapping(address => bool) private funders;
    mapping(uint => address) private lutFunders;

    event Deposit(address indexed sender, uint256 amount);
    event Withdraw(address indexed receiver, uint256 amount);

    receive() external payable {

    }

    modifier limitWithdraw(uint amount) {
        require(
            amount <= 100000000000000000,
            "Cannot withdraw more than 0.1 ether."
        );
        _;
    }

    function withdraw(uint amount) override external onlyOwner limitWithdraw(amount) {
        require(address(this).balance >= amount, "Insufficient Balance");
        payable(msg.sender).transfer(amount);

        emit Withdraw(msg.sender, amount);
    }

    function withdrawAll() override external {
        uint contractBalance = address(this).balance;
        require(contractBalance > 0, "No funds avaiable");
        payable(owner).transfer(contractBalance);
    }

    function addFunds() override external payable {
        address funder = msg.sender;

        if (!funders[funder]) {
            uint index = numOfFunders++;
            funders[funder] = true;
            lutFunders[index] = funder;
        }
    }

    function getAllFunders() external view returns(address[] memory) {
        address[] memory _funders = new address[](numOfFunders);

        for (uint i = 0; i < numOfFunders; i++) {
            _funders[i] = lutFunders[i];
        }

        return _funders;
    }

    function getFunderAtIndex(uint8 index) external view returns(address) {
        return lutFunders[index];
    }
}