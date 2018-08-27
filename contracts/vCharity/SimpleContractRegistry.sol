pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


/** @title SimpleContractRegistry. */
contract SimpleContractRegistry is Ownable {

    mapping (bytes32 => address) public contracts;

    /** @dev Register a contract with name and contract Address with vCharity platform.
      * @param _name name of the contract.
      * @param _contractAddress Address of the contract.
      */
    function registerContract(bytes32 _name, address _contractAddress) public onlyOwner {
        contracts[_name] = _contractAddress;
    }
}
