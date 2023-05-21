import React from 'react'
import { Link } from 'react-router-dom'

export default function SearchResults({searchResult, setSearchModal}) {
  return (
    <div className="searchResult overlay" onClick={() => setSearchModal(false)}>
        <div className='searchResults-box' onClick={(e) => e.stopPropagation()}>
            <div className="searchResults">
                {searchResult.length ?
                searchResult?.map(product => 
                    <div className="searchedProduct" key={product._id}>
                        <Link to={'/product/' + product._id} onClick={() => setSearchModal(false)}>
                            <div className="searchedProduct-img">
                                <img src={product.img} alt={product.title} />
                            </div>
                        </Link>
                        <div className="searchedProduct-details">
                            <span className="searchedProductTitle">{product.title}</span>
                            <span className="searchedProductPrice">{product.price} CHF</span>
                        </div>
                    </div>)
                :
                <span>No product machtes the search input.</span>    
                }
            </div>
        </div>
    </div>
  )
}
