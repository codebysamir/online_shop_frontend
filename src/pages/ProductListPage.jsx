import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FilteredProductLists from '../components/FilteredProductList'
import { useParams } from 'react-router-dom'

export default function ProductListPage() {
    const { cat } = useParams()

    const [filter, setFilter] = useState({
        color: 'blue',
        size: 'S'
    })

    const [sort, setSort] = useState('desc')

    const handleFilter = (e) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        })
    }

    console.log(filter, sort)
  return (
    <>
        <Navbar />
        <div className="productsPage-box">
            <h1>{cat}</h1>
            <div className="filter-box">
                <div className="filter">
                    <span>Filter Products: </span>
                    <select 
                        name="color" 
                        id="color" 
                        value={filter.color}
                        onChange={(e) => handleFilter(e)}
                    >
                        <option value="blue">Blue</option>
                        <option value="grey">Grey</option>
                        <option value="black">Black</option>
                        <option value="orange">Orange</option>
                        <option value="brown">Brown</option>
                        <option value="darkgrey">Darkgrey</option>
                    </select>
                    <select 
                        name="size" 
                        id="size" 
                        value={filter.size}
                        onChange={(e) => handleFilter(e)}
                    >
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                    </select>
                </div>
                <div className="sort">
                    <span>Sort Products: </span>
                    <select 
                    name="Sort" 
                    id="sort" 
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="desc">Price (desc)</option>
                        <option value="asc">Price (asc)</option>
                        <option value="newest">Newest</option>
                    </select>
                </div>
            </div>
        </div>
        <FilteredProductLists cat={cat} filters={filter} sort={sort} />
        <Footer/>
    </>
  )
}
