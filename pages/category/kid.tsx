import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { Typography } from '@mui/material'
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';
import { ProductList } from '../../components/products';

const KidPage = () => {
    const {products,isLoading} = useProducts('/products?gender=kid');
  return (
    <ShopLayout title={'Teslo-Shop - Kids'} pageDescription={'Encuentra los mejores productos para niños'}>
     <Typography variant='h1' component='h1'>Niños</Typography>
     <Typography variant='h2' component='h2' sx={{mb:1}}>Todos los productos para niños</Typography>
        
     {
           isLoading
            ?  <FullScreenLoading/>
             : <ProductList products={ products }/>
     }

   </ShopLayout>
  )
}

export default KidPage;