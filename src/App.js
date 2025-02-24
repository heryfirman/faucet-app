import { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider'

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null
  })

  const [account, setAccount] = useState(null)
  
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider() 

      if (provider) {
        setWeb3Api({
          web3: new Web3(provider),
          provider
        })

        // Only request accounts if hot already processing
        try {
          const accounts = await provider.request({method: "eth_accounts"})
          if (accounts.length === 0) {
            await provider.request({method: "eth_requestAccounts"})
          }
        } catch (error) {
          console.error("Error requesting accounts", error)
        }
      } else {
        console.error('Please install MetaMask!')
      }
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
