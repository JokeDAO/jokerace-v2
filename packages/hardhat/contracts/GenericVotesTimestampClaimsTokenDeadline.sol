// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC20/extensions/draft-ERC20Permit.sol";
import "./token/ERC20/extensions/ERC20VotesTimestamp.sol";
import "./token/ERC20/extensions/MerkleDistributorWithDeadline.sol";

contract GenericVotesTimestampClaimsTokenDeadline is MerkleDistributorWithDeadline, ERC20Permit, ERC20VotesTimestamp {
    constructor(string memory _name, string memory _symbol, bytes32 _merkleRoot, uint256 _endTime, address _mintRecipient, uint256 _amountToMint, bool _nontransferable) 
        ERC20(_name, _symbol)
        MerkleDistributorWithDeadline(_merkleRoot, _endTime)
        ERC20Permit(_name)
        ERC20VotesTimestamp(_nontransferable)
    {
        _mint(_mintRecipient, _amountToMint);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20VotesTimestamp)
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20VotesTimestamp)
    {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20VotesTimestamp)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20VotesTimestamp)
    {
        super._burn(account, amount);
    }
}