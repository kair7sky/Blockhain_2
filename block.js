const { Web3 } = require("web3");

const ETHEREUM_NETWORK = "goerli";
const infuraApiKey = '67d9ec71f3cf4f62a46313302ee22d66';
const infuraProvider = `https://${ETHEREUM_NETWORK}.infura.io/v3/${infuraApiKey}`;

const privateKey = '8b0c046656b00a5075c0fdb964bdfe8dd2ec9052eb632d9114b5554365d279e0';
const senderAddress = '0xfA9c32B2C5c95A7FD628Fd5772e85168235e48A9';

const web3 = new Web3(infuraProvider);

const contractABI = require("./ContactABI.json");
const contractAddress = "0xc33c1807ef97d98ae6502d9cbe7279ab35241dca";

const myContract = new web3.eth.Contract(contractABI, contractAddress);

const txParams = {
  from: senderAddress,
  to: contractAddress,
  data: myContract.methods.getTransactionSenderAddress().encodeABI(),
  gas: 200000, // Adjust the gas limit accordingly
  gasPrice: '100000000'
};

const main = async () => {
  try {
    // Call getTransactionReceiver() function
    const result = await myContract.methods.getTransactionSenderAddress().call();

    // Log the result
    console.log("Transaction Sender:", result);

    // Now you can proceed with the transaction
    const signedTx = await web3.eth.accounts.signTransaction(txParams, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(receipt);
    console.log("Transaction successful!");
  } catch (error) {
    console.error("Transaction failed:", error);
  }
};

main();