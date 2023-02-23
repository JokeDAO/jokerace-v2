// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity =0.8.17;

import {ERC20} from "../ERC20.sol";
import {MerkleDistributor} from "./MerkleDistributor.sol";
import {Ownable} from "../../../access/Ownable.sol";

error EndTimeInPast();
error ClaimWindowFinished();
error NoWithdrawDuringClaim();

abstract contract MerkleDistributorWithDeadline is MerkleDistributor, Ownable {

    uint256 public immutable endTime;

    constructor(bytes32 merkleRoot_, uint256 endTime_) MerkleDistributor(merkleRoot_) {
        if (endTime_ <= block.timestamp) revert EndTimeInPast();
        endTime = endTime_;
    }

    function claim(uint256 index, address account, uint256 amount, bytes32[] calldata merkleProof) public override {
        if (block.timestamp > endTime) revert ClaimWindowFinished();
        super.claim(index, account, amount, merkleProof);
    }
}
