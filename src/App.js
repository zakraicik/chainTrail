import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Alchemy, Network } from 'alchemy-sdk'
import ScrollableChain from './components/ScrollableChain'
import BlockSummary from './components/BlockSummary'
import TransactionSummary from './components/TransactionSummary'
import Header from './components/Header'
import { RiseLoader } from 'react-spinners'
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
  const [loading, setLoading] = useState(true) // Add loading state
  const scrollableChainRef = useRef(null)

  const search = useCallback(
    blockNumber => {
      try {
        const blockNum = parseInt(blockNumber)
        const index = blockNumbers.indexOf(blockNum)
        if (index !== -1) {
          handleBlockSelection(blockNum)
          scrollableChainRef.current.scrollToBlock(index)
        }
      } catch (error) {
        console.error('Error fetching block numbers', error)
      }
    },
    [blockNumbers]
  )

  useEffect(() => {
    async function getBlockNumbers () {
      try {
        const currentBlockNumber = await alchemy.core.getBlockNumber()
        const blockNumbersArray = []
        for (let i = 0; i < 5; i++) {
          blockNumbersArray.push(currentBlockNumber - i)
        }

        setBlockNumbers(blockNumbersArray.reverse())
        handleBlockSelection(blockNumbersArray.at(-1))
      } catch (error) {
        console.error('Error fetching block numbers', error)
      } finally {
        setLoading(false)
      }
    }

    getBlockNumbers()
  }, [])

  const addBlock = () => {
    return new Promise((resolve, reject) => {
      try {
        const oldestBlockNumber = blockNumbers[0]
        const newBlockNumber = oldestBlockNumber - 1

        setBlockNumbers(prevBlocks => {
          const newBlockNumbers = [newBlockNumber, ...prevBlocks]
          resolve(newBlockNumbers)
          return newBlockNumbers
        })
      } catch (error) {
        console.error('Error loading more blocks', error)
        reject(error)
      }
    })
  }

  const fetchBlockDetails = useCallback(async () => {
    if (selectedBlock) {
      try {
        const blockDetails = await getBlockDetails(selectedBlock, alchemy)
        setBlockDetails(blockDetails)
      } catch (error) {
        console.error('Error fetching block details', error)
      }
    }
  }, [selectedBlock])

  const fetchBlockTransactions = useCallback(async () => {
    if (blockDetails) {
      try {
        const blockTransactions = await getBlockTransactions(
          blockDetails,
          alchemy
        )
        setTransactionDetails(blockTransactions)
      } catch (error) {
        console.error('Error fetching block transactions', error)
      }
    }
  }, [blockDetails])

  const handleBlockSelection = blockNumber => {
    setSelectedBlock(blockNumber)
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
      {loading ? ( // Conditionally render loading screen
        <div className='loading-screen'>
          <RiseLoader color='#72f491' size='30px' />
          <p className='block-number'>App Loading</p>
        </div>
      ) : (
        <>
          <Header search={search} />
          <div className='scrollable-chain-parent-container'>
            <ScrollableChain
              ref={scrollableChainRef}
              blockNumbers={blockNumbers}
              handleBlockSelection={handleBlockSelection}
              selectedBlock={selectedBlock}
              addBlock={addBlock}
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
                <div className='no-selection'>No block selected</div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default App
