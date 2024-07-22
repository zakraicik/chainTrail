import React, { useState, useRef, useEffect } from 'react'
import '../css/scrollableChain.css'

const ScrollableChain = ({
  blockNumbers,
  handleBlockSelection,
  selectedBlock,
  addBlock
}) => {
  const [currentIndex, setCurrentIndex] = useState(blockNumbers.length - 1)
  const [blockWidth, setBlockWidth] = useState(null)
  const [numberBlocks, setNumberBlocks] = useState(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const numberBlocks = blockNumbers.length
    setNumberBlocks(numberBlocks)

    const blockWidth = scrollRef.current.scrollWidth / (blockNumbers.length + 2)
    setBlockWidth(blockWidth)
  }, [blockNumbers])

  const nextSlide = () => {
    const totalScrollWidth = scrollRef.current.scrollWidth
    const visibleWidth = scrollRef.current.clientWidth

    if (currentIndex < blockNumbers.length - 1) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      handleBlockSelection(blockNumbers[newIndex])

      scrollRef.current.scrollLeft =
        totalScrollWidth -
        visibleWidth -
        (numberBlocks - currentIndex - 2) * blockWidth
    }
  }

  const prevSlide = async () => {
    const totalScrollWidth = scrollRef.current.scrollWidth
    const visibleWidth = scrollRef.current.clientWidth

    if (currentIndex > 1) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      handleBlockSelection(blockNumbers[newIndex])

      scrollRef.current.scrollLeft =
        totalScrollWidth -
        visibleWidth -
        (numberBlocks - currentIndex) * blockWidth
    } else if (currentIndex === 1) {
      const newBlockNumbers = await addBlock()
      setNumberBlocks(newBlockNumbers.length)
      setCurrentIndex(currentIndex)
      handleBlockSelection(newBlockNumbers[currentIndex])
    }
  }

  const handleBlockClick = async (blockNumber, index) => {
    setCurrentIndex(index)
    const totalScrollWidth = scrollRef.current.scrollWidth
    const visibleWidth = scrollRef.current.clientWidth

    if (selectedBlock && selectedBlock === blockNumber) {
      handleBlockSelection(null)
    } else {
      handleBlockSelection(blockNumber)

      if (index > 1) {
        setCurrentIndex(index)

        const scrollDelta = (index + 1 - numberBlocks) * blockWidth

        scrollRef.current.scrollLeft =
          totalScrollWidth - visibleWidth + scrollDelta
      } else if (index <= 1) {
        const newBlockNumbers = await addBlock()

        setNumberBlocks(newBlockNumbers.length)
        setCurrentIndex(index + 1)

        const scrollDelta = (index + 2 - numberBlocks) * blockWidth

        scrollRef.current.scrollLeft =
          totalScrollWidth - visibleWidth + scrollDelta
      }
    }
  }

  useEffect(() => {
    const adjustScrollPosition = () => {
      const totalScrollWidth = scrollRef.current.scrollWidth
      const visibleWidth = scrollRef.current.clientWidth
      scrollRef.current.scrollLeft = totalScrollWidth - visibleWidth
    }

    adjustScrollPosition()
    window.addEventListener('resize', adjustScrollPosition)
    return () => {
      window.removeEventListener('resize', adjustScrollPosition)
    }
  }, [])

  return (
    <div className='scrollable-chain-wrapper'>
      <button onClick={prevSlide} className='chain-button left'>
        &#10094;
      </button>
      <div className='scrollable-chain-container'>
        <div className='scrollable-chain' ref={scrollRef}>
          <div className='chain-item invisible'></div>
          {blockNumbers.map((blockNumber, index) => (
            <div
              key={blockNumber}
              className={`chain-item ${
                selectedBlock && selectedBlock === blockNumber
                  ? 'selected'
                  : 'unselected'
              }`}
              onClick={() => handleBlockClick(blockNumber, index)}
            >
              <div className='chain-item'>
                <div className='chain-item-line-1'>Block Number</div>
                <div className='chain-item-line-2'>{blockNumber}</div>
              </div>
            </div>
          ))}
          <div className='chain-item invisible'></div>
        </div>
      </div>
      <button onClick={nextSlide} className='chain-button right'>
        &#10095;
      </button>
    </div>
  )
}

export default ScrollableChain
