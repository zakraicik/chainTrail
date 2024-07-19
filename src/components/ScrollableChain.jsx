import React, { useState, useRef, useEffect } from 'react'
import '../css/scrollableChain.css'

const ScrollableChain = ({
  blockNumbers,
  handleBlockSelection,
  selectedBlock,
  addBlock
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (blockNumbers.length > 0) {
      setCurrentIndex(blockNumbers.length - 1)
    }
  }, [blockNumbers])

  const nextSlide = () => {
    if (currentIndex < blockNumbers.length - 1) {
      setCurrentIndex(currentIndex + 1)
      scrollRef.current.scrollLeft +=
        scrollRef.current.scrollWidth / (blockNumbers.length + 2)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      scrollRef.current.scrollLeft -=
        scrollRef.current.scrollWidth / (blockNumbers.length + 2)
    } else if (currentIndex === 0) {
      addBlock()
    }
  }

  const handleBlockClick = (blockNumber, index) => {
    setCurrentIndex(index)

    if (selectedBlock && selectedBlock === blockNumber) {
      handleBlockSelection(null)
    } else {
      handleBlockSelection(blockNumber)
    }
    const blockWidth = scrollRef.current.scrollWidth / (blockNumbers.length + 2)

    scrollRef.current.scrollLeft += (index - currentIndex) * blockWidth //works but only if I push the block twice
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
  }, [blockNumbers])

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
