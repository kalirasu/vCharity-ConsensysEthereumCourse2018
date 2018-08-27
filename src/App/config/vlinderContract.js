
const vlinderArtifacts = require('../../../build/contracts/Project.json');

const abi = vlinderArtifacts.abi;

function configurevlinderContract(web3) {
  const SharesABI = web3.eth.contract(abi);
  const SharesContractObj = SharesABI.at('0xb01E63e200187e1c388bf4b795a388961b5e25C9');
  return SharesContractObj;
}

export default configurevlinderContract;
