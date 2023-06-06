import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Slides({ slideItem }) {
  const videoRef = useRef()

  useEffect(() => {
    if (slideItem.video) videoRef.current?.load()
  }, [slideItem.video])

  return (
    <div className='slides-box'>
        {/* <img 
            className='slides-img'
            src='https://c.pxhere.com/photos/ed/b2/afro_bag_beautiful_beauty_beauty_model_curly_hair_dress_fashion-1503069.jpg!d' 
        /> */}
        <video ref={videoRef} autoPlay loop muted width={'100%'} className='sliderVideo'>
          <source src={slideItem.video} type='video/mp4' />
        </video>
        <div className='slides-description'>
            <h2>{slideItem.title}</h2>
            <span>{slideItem.desc}</span>
            <Link to={'/categories/' + slideItem.title}>
              <button>Show me more</button>
            </Link>
        </div>
    </div>
  )
}
