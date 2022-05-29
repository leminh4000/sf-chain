const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class ChainUtil{
    static genKeyPair(){
        return ec.genKeyPair();
    }

    static id(publicKey){
        return ec.keyFromPublic(publicKey, 'hex').getPublic().encode('hex');
    }
}

module.exports = ChainUtil;