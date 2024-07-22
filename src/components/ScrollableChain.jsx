import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef
} from 'react'
import '../css/scrollableChain.css'

const ScrollableChain = forwardRef(
  (
    { blockNumbers, handleBlockSelection, selectedBlock, addEarlierBlock },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(blockNumbers.length - 1)
    const [blockWidth, setBlockWidth] = useState(null)
    const scrollRef = useRef(null)

    useEffect(() => {
      setBlockWidth(scrollRef.current.scrollWidth / (blockNumbers.length + 2))
    }, [blockNumbers])

    function handleScroll (index) {
      const totalScrollWidth = scrollRef.current.scrollWidth
      const visibleWidth = scrollRef.current.clientWidth
      scrollRef.current.scrollLeft =
        totalScrollWidth -
        visibleWidth -
        (blockNumbers.length - index - 1) * blockWidth
    }

    useImperativeHandle(ref, () => ({
      scrollToBlock (index) {
        setCurrentIndex(index)
        handleScroll(index)
      }
    }))

    const nextSlide = () => {
      if (currentIndex < blockNumbers.length - 1) {
        const newIndex = currentIndex + 1
        setCurrentIndex(newIndex)
        handleBlockSelection(blockNumbers[newIndex])
        handleScroll(newIndex)
      }
    }

    const prevSlide = async () => {
      if (currentIndex > 1) {
        const newIndex = currentIndex - 1
        setCurrentIndex(newIndex)
        handleBlockSelection(blockNumbers[newIndex])
        handleScroll(newIndex)
      } else if (currentIndex === 1) {
        const newBlockNumbers = await addEarlierBlock()
        setCurrentIndex(currentIndex)
        handleBlockSelection(newBlockNumbers[currentIndex])
      }
    }

    const handleBlockClick = async (blockNumber, index) => {
      if (selectedBlock && selectedBlock === blockNumber) {
        handleBlockSelection(null)
      } else {
        handleBlockSelection(blockNumber)
        if (index <= 1) {
          await addEarlierBlock()
        }
        setCurrentIndex(index)
        handleScroll(index)
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
                  selectedBlock === blockNumber ? 'selected' : 'unselected'
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
)

export default ScrollableChain
