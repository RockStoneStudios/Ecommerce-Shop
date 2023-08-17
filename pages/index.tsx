import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {ShopLayout} from '../components/layouts'
import { Typography} from '@mui/material';
import { initialData } from '../database/products'
import { ProductList } from '../components/products'
import { IProduct } from '../interfaces'

initialData

const Home: NextPage = () => {
  return (
    <ShopLayout title={'Teslo-Shop'} pageDescription={'Encuentra los mejores productos'}>
       <Typography variant='h1' component='h1'>Tienda</Typography>
       <Typography variant='h2' sx={{mb:1}}>Todos los productos</Typography>
      
        <ProductList products={initialData.products as any}        
        />
    
    </ShopLayout>
  )
}

export default Home
