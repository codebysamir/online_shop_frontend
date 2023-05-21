import React, { useState } from 'react'
import Slides from './Slides'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { slidesArr } from '../constants/sliderArray'
import { useEffect } from 'react'


export default function Slider() {
  const [count, setCount] = useState(0)

  const handleLeftArrow = () => {
    setCount(prevCount => prevCount === 0 ? 4 : prevCount - 1)
  }
 
  const handleRightArrow = () => {
    setCount(prevCount => prevCount === 4 ? 0 : prevCount + 1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleRightArrow()
    }, 15000);

    return () => {
      clearInterval(interval)
    }
  }, [count])

  return (
    <div className='slider-box'>
      <FontAwesomeIcon icon={faChevronLeft} className='sliderArrowIconLeft' onClick={handleLeftArrow} />  
      <Slides slideItem={slidesArr[count]} />
      <FontAwesomeIcon icon={faChevronRight} className='sliderArrowIconRight' onClick={handleRightArrow} />  
    </div>
  )
}
