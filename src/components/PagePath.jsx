import React, { useContext } from 'react'
import Home from '../pages/Home'

export default function PagePath({currentPage}) {

    function handleClickHomePath() {
    }

  return (
    <div className='pagePath'>
        <div className='prevPage' onClick={handleClickHomePath} >{prevPage}</div>
        {'>'} {currentPage}
    </div>
  )
}
