
import { Connect, SimpleSigner} from 'uport-connect';

//export let uport = new Connect('TruffleBox')

export let uport = new Connect('Kaliraj\'s vCharity', {
     clientId: '2og5L9H3DhmrwC3a3fW4vFiqocdx9arqtxD',
     network: 'rinkeby',
     signer: SimpleSigner('56d66f9b4d664db5f7a1365128da50a3b7659b11c8d7328cfb76050a51d6cf84')
   });

/*   export let uport = new Connect('Vlinder', {
        clientId: '2oe2Die8cKTRGiGPmG3PX18zRfKgoKKSk1B',
        network: 'rinkeby',
        signer: SimpleSigner('8796d43f9439efeb819dcecad50f8c4bcae55c915303bb0fed553f747ce93279')
      });*/


const web3 = uport.getWeb3();

export { web3 };
