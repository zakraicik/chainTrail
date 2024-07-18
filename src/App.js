import { Alchemy, Network } from 'alchemy-sdk'
import { useEffect, useState, useCallback } from 'react'
import ScrollableChain from './components/ScrollableChain'
import BlockSummary from './components/BlockSummary'
import TransactionSummary from './components/TransactionSummary'
import Header from './components/Header'

import { getBlockDetails, getBlockTransactions } from './helper/alchemyHelpers'

import './App.css'

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET
}

const alchemy = new Alchemy(settings)

function App () {
  const [blockNumbers, setBlockNumbers] = useState([])
  const [selectedBlock, setSelectedBlock] = useState(null)
  const [blockDetails, setBlockDetails] = useState(null)
  const [transactionDetails, setTransactionDetails] = useState(null)

  useEffect(() => {
    async function getBlockNumbers () {
      const currentBlockNumber = await alchemy.core.getBlockNumber()
      const blockNumbersArray = []
      for (let i = 0; i < 5; i++) {
        blockNumbersArray.push({ id: i, blockNumber: currentBlockNumber - i })
      }

      setBlockNumbers(blockNumbersArray.reverse())

      handleBlockSelection(blockNumbersArray.at(-1))
    }

    getBlockNumbers()
  }, [])

  const fetchBlockDetails = useCallback(async () => {
    if (selectedBlock) {
      const blockDetails = await getBlockDetails(
        selectedBlock.blockNumber,
        alchemy
      )
      setBlockDetails(blockDetails)
    }
  }, [selectedBlock])

  const fetchBlockTransactions = useCallback(async () => {
    if (blockDetails) {
      const blockTransactions = await getBlockTransactions(
        blockDetails,
        alchemy
      )

      setTransactionDetails(blockTransactions)
    }
  }, [blockDetails])

  const handleBlockSelection = block => {
    setSelectedBlock(block)
    setBlockDetails(null)
    setTransactionDetails(null)
  }

  useEffect(() => {
    fetchBlockDetails()
  }, [fetchBlockDetails])

  useEffect(() => {
    fetchBlockTransactions()
  }, [fetchBlockTransactions])

  return (
    <div className='App'>
      <Header />
      <div className='scrollable-chain-parent-container'>
        <ScrollableChain
          blockNumbers={blockNumbers}
          handleBlockSelection={handleBlockSelection}
          selectedBlock={selectedBlock}
        />
      </div>
      <div className='row-container'>
        {selectedBlock ? (
          <>
            <BlockSummary blockDetails={blockDetails} />
            <TransactionSummary transactionDetails={transactionDetails} />
          </>
        ) : (
          <div className='empty-information-container'>
            <div className='no-selection'> test</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
