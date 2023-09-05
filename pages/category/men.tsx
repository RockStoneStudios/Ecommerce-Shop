import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { Typography } from '@mui/material'
import { useProducts } from '../../hooks'
import { FullScreenLoading } from '../../components/ui'
import { ProductList } from '../../components/products'

const MenPage = () => {
    const {products,isLoading} = useProducts('/products?gender=men');
  return (
    <ShopLayout title={'Teslo-Shop - Mens'} pageDescription={'Encuentra los mejores productos para Hombres'}>
        <Typography variant='h1'>Men</Typography>
        
        
        {
           isLoading
            ?  <FullScreenLoading/>
             : <ProductList products={ products }/>
        }
    
    
     </ShopLayout>
  )
}

export default MenPage;