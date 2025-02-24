import { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null
  })

  const [account, setAccount] = useState(null)
  
  useEffect(() => {
    const loadProvider = async () => {
      let provider = null;

      if (window.ethereum) {
        provider = window.ethereum

        try {
          await provider.enable()
        } catch {
          console.error("User denied accounts access!")
        }
      } else if (window.web3) {
        provider = window.web3.currentProvider
      } else if (!process.env.production) {
        provider = new Web3.providers.HttpProvider('http://localhost:7545')
      }

      setWeb3Api({
        web3: new Web3(provider),
        provider
      })
    }

    loadProvider()
  }, [])

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts()
      setAccount(accounts[0])
    }

    web3Api.web3 && getAccount()
  }, [web3Api.web3])

  return (
    <div className="faucet-wrapper">
      <div className='faucet'>
        <div className='info-account'>
          <span><strong>Account: </strong></span>
          <h1>{account ? account : "Not connected"}</h1>
        </div>
        <div className='info-balance'>
          Current Balance: <strong>10</strong> ETH
        </div>
        <div className='btn-wrapper'>
          <button className='btn'>Donate</button>
          <button className='btn'>Withdraw</button>
        </div>
      </div>
    </div>
  );
}

export default App;
