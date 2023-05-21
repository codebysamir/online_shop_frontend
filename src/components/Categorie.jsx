import React from 'react'
import { Link } from 'react-router-dom'

export default function Categorie({categorie}) {
  return (
    <div className='categorie-box'>
        <img
            className='categorie-img'
            src={categorie.img}
        />
        <div className="hoverOptions">
            <h3>{categorie.title}</h3>
            <Link to={`/categories/${categorie.title}`}>
              <span>SHOW</span>
            </Link>
        </div>
    </div>
  )
}
