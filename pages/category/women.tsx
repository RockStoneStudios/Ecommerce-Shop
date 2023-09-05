import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { Typography } from '@mui/material'
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';
import { ProductList } from '../../components/products';

const WomenPage = () => {
    const {products,isLoading} = useProducts('/products?gender=women');
  return (
     <ShopLayout title={'Teslo-Shop - Women'} pageDescription={'Producto para Ellas'}>
        <Typography variant='h1'>Women</Typography>
        
        {
           isLoading
            ?  <FullScreenLoading/>
             : <ProductList products={ products }/>
        }
    
     </ShopLayout>
  )
}

export default WomenPage;