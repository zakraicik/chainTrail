import React, { useState, useRef, useEffect } from 'react'
import '../css/scrollableChain.css'

const ScrollableChain = ({
  blockNumbers,
  handleBlockSelection,
  selectedBlock,
  addBlock
}) => {
  const [currentIndex, setCurrentIndex] = useState(blockNumbers.length - 1)
  const scrollRef = useRef(null)

  const nextSlide = () => {
    const blockWidth = scrollRef.current.scrollWidth / (blockNumbers.length + 2)
    const totalScrollWidth = scrollRef.current.scrollWidth
    const visibleWidth = scrollRef.current.clientWidth

    if (currentIndex < blockNumbers.length - 1) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      handleBlockSelection(blockNumbers[newIndex])

      scrollRef.current.scrollLeft =
        totalScrollWidth -
        visibleWidth -
        (blockNumbers.length - currentIndex - 2) * blockWidth
    }
  }

  const prevSlide = async () => {
    const blockWidth = scrollRef.current.scrollWidth / (blockNumbers.length + 2)
    const totalScrollWidth = scrollRef.current.scrollWidth
    const visibleWidth = scrollRef.current.clientWidth

    if (currentIndex > 1) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      handleBlockSelection(blockNumbers[newIndex])

      scrollRef.current.scrollLeft =
        totalScrollWidth -
        visibleWidth -
        (blockNumbers.length - currentIndex) * blockWidth
    } else if (currentIndex <= 1) {
      await addBlock()
      setCurrentIndex(currentIndex)
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
    }
    const blockWidth = scrollRef.current.scrollWidth / (blockNumbers.length + 2)

    const scrollDelta = (index + 1 - blockNumbers.length) * blockWidth

    scrollRef.current.scrollLeft = totalScrollWidth - visibleWidth + scrollDelta

    // scrollRef.current.scrollLeft += (index - currentIndex) * blockWidth

    // if (index <= 1) {
    //   await addBlock()
    //   setCurrentIndex(index + 1)
    // }
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
