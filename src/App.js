import { useEffect } from 'react';
import './App.css';

function App() {
  
  useEffect(() => {
    const loadProvider = async () => {
      console.log(window.web3);
      console.log(window.ethereum);
    }

    loadProvider()
  }, [])

  return (
    <div className="faucet-wrapper">
      <div className='faucet'>
        <div className='info-balance'>
          Current Balance: <strong>10</strong> ETH
        </div>
        <div className='btn-wrapper'>
          <button
            className='btn'
            onClick={async () => {
              const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
              console.log(accounts);
            }}
          >
            Enable Ethereum
          </button>
          <button className='btn'>Donate</button>
          <button className='btn'>Withdraw</button>
        </div>
      </div>
    </div>
  );
}

export default App;
