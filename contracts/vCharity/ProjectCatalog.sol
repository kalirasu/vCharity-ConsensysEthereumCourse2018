pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./StringUtils.sol";


/** @title ProjectCatalog. */
contract ProjectCatalog is Ownable {
    using StringUtils for string;

    mapping (bytes32 => address) public projects;

    /** @dev Add a project with name and project Address with vCharity platform's ProjectCatalog.
      * @param _name name of the project.
      * @param _projectAddress Address of the project.
      */
    function addProject(string _name, address _projectAddress) public onlyOwner {
        bytes32 nameAsBytes = _name.stringToBytes32();
        require(projects[nameAsBytes] == address(0));
        projects[nameAsBytes] = _projectAddress;
    }

    /** @dev get a project Address by providing project name - lookup table
      * @param _name name of the project.
      */
    function getProjectAddress(string _name) public view returns(address) {
        bytes32 nameAsBytes = _name.stringToBytes32();
        return projects[nameAsBytes];
    }

}
