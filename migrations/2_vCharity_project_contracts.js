var Project = artifacts.require("Project");
var ProjectCatalog = artifacts.require("ProjectCatalog");
var SimpleContractRegistry = artifacts.require("SimpleContractRegistry");
var Input = require('./config/input.json');
//var ipfs = require('./config/ipfssetup');

var IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

module.exports = async function(deployer, network, accounts) {
   var validatorAccount = '0x2d57e76f4C2E3bBe8D8C45de056d16d7964bD180';
   var beneficiaryAccount = '0x2d57e76f4C2E3bBe8D8C45de056d16d7964bD180';

//Deploy SimpleContractRegistry
  await deployer.deploy(SimpleContractRegistry);
  console.log('SimpleContractRegistry deployed at :', SimpleContractRegistry.address);

  //Deploy Project
  //let SimpleContractRegistry.address = await deployer.deploy()
  await deployer.deploy(Project, "Kerala Flood");
  console.log('Project deployed at :', Project.address);
  let project = await Project.deployed();

	//Configure project
  	await project.setValidator(validatorAccount, 10000000);
  	await project.setBeneficiary(beneficiaryAccount);
  	await project.setContractProvider(SimpleContractRegistry.address);

    //IPFS addition and set into contract for additional project information
    var ipfsJSON = JSON.stringify(Input);
      ipfs.add(ipfsJSON, (ipfsDirError, ipfsDirHash) => {
        if(ipfsDirHash) {
          console.log('IPFS Hash retrieved :', ipfsDirHash);
          project.setProjectAdditionalInfo(ipfsDirHash, (err, res) => {
            if(res) {
              console.log('IPFS hash is set to project contract');
            }
            if (err) {
              console.log('IPFS hash is not set, error :', err);
            }
          })
        }
      })

	//Register project in catalog
	await deployer.deploy(ProjectCatalog);
  console.log('ProjectCAtalog deployed at :', ProjectCatalog.address);
//	let projectCatalog = await ProjectCatalog.deployed();
//	await projectCatalog.addProject("project", Project.address);
};
