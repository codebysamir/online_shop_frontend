import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FilteredProductLists from '../components/FilteredProductList'
import { useParams } from 'react-router-dom'

export default function ProductListPage() {
    const { cat } = useParams()

    const [filter, setFilter] = useState()

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
                        value={filter?.color ?? ''}
                        onChange={(e) => handleFilter(e)}
                    >
                        <option value={''}>-- select option --</option>
                        <option value="blue">Blue</option>
                        <option value="grey">Grey</option>
                        <option value="black">Black</option>
                        <option value="orange">Orange</option>
                        <option value="brown">Brown</option>
                        <option value="darkgrey">Darkgrey</option>
                        <option value="white">White</option>
                    </select>
                    <select 
                        name="size" 
                        id="size" 
                        value={filter?.size ?? ''}
                        onChange={(e) => handleFilter(e)}
                    >
                            {cat === 'hats' ?
                            (<option value="onesize">One Size</option>)
                            : (cat === 'shoes' ?
                            (<>
                            <option value={''}>-- select option --</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            </>)
                            :
                            (<>
                            <option value={''}>-- select option --</option>
                            <option value="xs">XS</option>
                            <option value="x">S</option>
                            <option value="m">M</option>
                            <option value="l">L</option>
                            <option value="xl">XL</option>
                            <option value="xxl">XXL</option>
                            </>))
                            }
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
