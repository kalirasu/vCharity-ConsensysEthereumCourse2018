var Project = artifacts.require("./Project.sol");

contract('Project', function(accounts) {

  // Tests if validator can set goal and retrieved properly
  it("...should store the validator address as 0x2d57e76f4c2e3bbe8d8c45de056d16d7964bd180 and set goal as 10000.", function() {
    return Project.deployed().then(function(instance) {
        ProjectInstance = instance;

      return ProjectInstance.setValidator(accounts[0], 10000, {from: accounts[0]});
    }).then(function() {
      return ProjectInstance.getGoal.call();
    }).then(function(storedData) {
      assert.equal(storedData.toNumber(), 10000, "The goal value 10000 was not stored.");
    });
  });

  // Tests if multiple account is incremented for each new account
  it("...should register donation and check the number of donor is keep incrementing, should store the value 3", function() {
    return Project.deployed().then(function(instance) {
        ProjectInstance = instance;

      return ProjectInstance.registerDonation(10000, {from: accounts[0]});
    }).then(function() {
      return ProjectInstance.registerDonation(10000, {from: accounts[1]});
    }).then(function() {
      return ProjectInstance.registerDonation(10000, {from: accounts[2]});
    }).then(function() {
      return ProjectInstance.getTotalDonors.call()
    }).then(function(storedData) {
      assert.equal(storedData.toNumber(), 3, "The total donation count 3 was not stored.");
    });
  });

  // Tests if multiple accounts can submit donation.
    // Checks if the total donations matches with the sum of each donation submission
  it("...should register donation and check the sum of donation, should store the value 30000", function() {
    return Project.deployed().then(function(instance) {
        ProjectInstance = instance;

      return ProjectInstance.registerDonation(10000, {from: accounts[0]});
    }).then(function() {
      return ProjectInstance.registerDonation(10000, {from: accounts[1]});
    }).then(function() {
      return ProjectInstance.registerDonation(10000, {from: accounts[2]});
    }).then(function() {
      return ProjectInstance.getTotal.call()
    }).then(function(storedData) {
      assert.equal(storedData.toNumber(), 30000, "The total donation count 30000 was not stored.");
    });
  });

  // Tests if account set goal, an another account fund greater than goal and isGoalAchieved.
  it("...should set goal, fund > than goal, validator to validate and check the goal target, should return 1", function() {
    return Project.deployed().then(function(instance) {
        ProjectInstance = instance;

      return ProjectInstance.setValidator(accounts[0], 10000, {from: accounts[0]});
    }).then(function() {
      return ProjectInstance.fund(10000, {from: accounts[0]});
    }).then(function() {
      return ProjectInstance.validateOutcome(8000, {from: accounts[0]});
    }).then(function() {
      return ProjectInstance.isValidated.call()
    }).then(function(storedData) {
      assert.equal(storedData.toNumber(), 1, "The validated 1 was not stored.");
    });
  });

  // Tests if account set goal, and another account fund greater than goal and isGoalAchieved.
  it("...should set goal, fund > than goal, validator to validate and check the remaining fund in kitty, should return 2000", function() {
    return Project.deployed().then(function(instance) {
        ProjectInstance = instance;

      return ProjectInstance.setValidator(accounts[0], 10000, {from: accounts[0]});
    }).then(function() {
      return ProjectInstance.fund(10000, {from: accounts[0]});
    }).then(function() {
      return ProjectInstance.validateOutcome(8000, {from: accounts[0]});
    }).then(function() {
      return ProjectInstance.getTotal.call()
    }).then(function(storedData) {
      assert.equal(storedData.toNumber(), 2000, "The total 2000 was not stored.");
    });
  });

  // Tests if owner can perform emergency stop, circuit breaker and fund should not be allowed after the stop
  it("...should call Emergency stop..should throw revert", function() {
    return Project.deployed().then(function(instance) {
        ProjectInstance = instance;

      return ProjectInstance.emergencyAlertToggler({from: accounts[0]});
    }).then(function() {
      return ProjectInstance.fund(10000, {from: accounts[0]});
    }).catch(function(error) {
       assert.notEqual(error, undefined, 'Exception thrown');
        assert.isAbove(error.message.search('VM Exception while processing transaction: revert'), -1, 'Error: VM Exception while processing transaction: revert');
    });
  });

  // Tests if owner can perform emergency stop, circuit breaker and donation should not be allowed after the stop
  it("...should call Emergency stop..should throw revert", function() {
    return Project.deployed().then(function(instance) {
        ProjectInstance = instance;

      return ProjectInstance.emergencyAlertToggler({from: accounts[0]});
    }).then(function() {
      return ProjectInstance.registerDonation(10000, {from: accounts[0]});
    }).catch(function(error) {
       assert.notEqual(error, undefined, 'Exception thrown');
        assert.isAbove(error.message.search('VM Exception while processing transaction: revert'), -1, 'Error: VM Exception while processing transaction: revert');
    });
  });


});
