import Web3 from 'web3'
import { address, ABI } from './constants/votingContract'

const getContract = new Promise((resolve, reject) => {
  const web3 = new Web3(window.web3.currentProvider)
  const votingContract = web3.eth.contract(ABI)
  const votingContractInstance = votingContract.at(address)
  resolve(votingContractInstance)
})

export default getContract
