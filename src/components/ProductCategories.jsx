import React from 'react'
import Categorie from './Categorie'
import { productCategories } from '../constants/productCatArray'

export default function ProductCategories() {
  return (
    <div className='productCategories-box'>
      {productCategories.map(categorie => <Categorie key={categorie.id} categorie={categorie} />)}
    </div>
  )
}
