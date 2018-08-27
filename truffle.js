require('babel-register')
var HDWalletProvider = require('truffle-hdwallet-provider');
var mnemonic = 'pave animal mystery shop step dinosaur crystal recycle brain drive law expect';

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
		development: {
			host: 'localhost',
			port: 8545,
			network_id: '*' // Match any network id
		},
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/naI816IMFByliQy0Naqw")
      },
      network_id: 4,
      gas: 4700000
    }
	}
};
