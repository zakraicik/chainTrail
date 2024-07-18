export async function getBlockDetails (blockNumber, alchemy) {
  try {
    const blockDetails = await alchemy.core.getBlock(blockNumber)
    return blockDetails
  } catch (error) {
    console.error('Error fetching block details:', error)
    return null
  }
}

export async function getBlockTransactions (blockDetails, alchemy) {
  try {
    const transactionHashes = blockDetails.transactions.slice(0, 30)

    const transactionPromises = transactionHashes.map(hash =>
      alchemy.core.getTransaction(hash)
    )

    const transactionDetails = await Promise.all(transactionPromises)

    return transactionDetails
  } catch (error) {
    console.error('Error fetching transaction details:', error)
    return null
  }
}
