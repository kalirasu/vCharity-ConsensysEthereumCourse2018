pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

/** @title Project. */
contract Project is Ownable {
    using SafeMath for uint256; //safeMath library usage for total addition

    string public name; //Name of the project
    address public validatorAddress; //Project validator, who confirms and authorizes charity goal
    address public beneficiaryAddress; //Project Beneficiary(charity), who sets goals and receives donations
    address public CONTRACT_PROVIDER_ADDRESS; //Contract provider address
    bytes ipfsHashProject; // IPFS Hash - Other projects information(E.g., Project Detail, validator organisation detail, charity detail) stored as json in IPFS
    bool private stopped = false; //Circuit breaker in case of emergency

    /* Total amount of all of the donations */
    uint public total;

    /*goal set by the validator*/
    uint public goal;

    /*Index of the donation count*/
    uint index;

    /*flag to check validation happened or not*/
    uint8 public validated = 0;

    /*flag to check goal achieved or not*/
    uint8 public goalAchieved = 0;
    /* This generates a public event on the blockchain that will notify clients */
//    event OutcomeEvent(string id, uint value);
  //  event DonationEvent(uint value);

    constructor(string _name) public {
        name = _name;
    }


    /**  @dev Circuit Breaker emergency Alert
    */
    function emergencyAlertToggler() public onlyOwner {
        stopped = !stopped;
    }

    modifier stopInEmergency { if (!stopped) _; }
    modifier onlyInEmergency { if (stopped) _; }

    /** @dev set Project Validator address.
      * @param _validatorAddress Address of the validator
      * @param _goal goal set be the validator
      */
    function setValidator(address _validatorAddress, uint _goal) public onlyOwner {
        validatorAddress = _validatorAddress;
        goal = _goal;
    }

    /** @dev set Project Beneficiary address.
      * @param _beneficiaryAddress  Address of the validator
      */
    function setBeneficiary(address _beneficiaryAddress) public onlyOwner {
        beneficiaryAddress = _beneficiaryAddress;
    }

    /** @dev set Contract provider address.
      * @param _contractProvider Address of the contract Provider.
      */
    function setContractProvider(address _contractProvider) public onlyOwner {
        CONTRACT_PROVIDER_ADDRESS = _contractProvider;
    }

    /** @dev set project additional Information.E.g., Project Detail, validator organisation detail, charity detail) stored as json in IPFS
      * @param _ipfshHash IPFS hash of the project additional information as a json
      */
    function setProjectAdditionalInfo(bytes _ipfshHash) public onlyOwner {
        ipfsHashProject = _ipfshHash;
    }

    /** @dev to retrieve the project additional info
      * @return IPFS hash of the json file containing additional project info
      */
    function getProjectInfo() public view returns(bytes) {
        return ipfsHashProject;
    }

    /** @dev Register Donation for the project.
      * @param _amount Amount agreed to be donated
      */
    function registerDonation(uint _amount) public stopInEmergency {
        total = total.add(_amount);
        index += 1;
    }

    /** @dev to fund for the project.
      * @param _value Amount of the value agreed to fund
      */
    function fund(uint _value) public onlyOwner stopInEmergency {
        total = total.add(_value);
    }

    /** @dev validator to validate the goal set by charity.
      * @param _value targeted goal
      */
    function validateOutcome(uint _value) public {
        require(msg.sender == validatorAddress);
        require(_value <= total);

        total = total.sub(_value);
        validated = 1;

      //  emit OutcomeEvent(_name, _value);
    }

    /** @dev to retrieve the project total amount collected
      * @return total - total of the fund collected.
      */
    function getTotal() public view returns(uint) {
        return total;
    }

    /** @dev to retrieve the project goal
      * @return goal - targeted goal
      */
    function getGoal() public view returns(uint) {
        return goal;
    }

    /** @dev to retrieve the project info
      * @return _pname, _validator, _beneficiary, _contractProvider, _ipfsHash, _total, _goal, __goalAchieved, _validated, _index
      */
    function getProject() public view returns(string _pname, address _validator, address _beneficiary, address _contractProvider, bytes _ipfsHash, uint _total, uint _goal, uint8 _goalAchieved, uint8 _validated, uint _index) {
        return (name, validatorAddress, beneficiaryAddress,
	    		CONTRACT_PROVIDER_ADDRESS, ipfsHashProject, total, goal, goalAchieved, validated, index);
    }

    /** @dev to retrieve the total donation count
      * @return _index
      */
    function getTotalDonors() public view returns(uint) {
        return index;
    }

    /** @dev to know Goal is achieved or not
      * @return bool
      */
    function isGoalAchieved() public returns(uint8) {
        if (goal <= total) {
            goalAchieved = 1;
            return goalAchieved;
        }
        return goalAchieved;
    }

    /** @dev to know validation performed or not
      * @return bool
      */
    function isValidated() public view returns(uint8) {
        return validated;
    }
}
