import { GetStaticProps } from 'next'
import { GetStaticPaths } from 'next'
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { initialData } from '../../database/seed-data';
import { ItemCounter } from '../../components/ui/ItemCounter';
import { ICartProduct, IProduct, ISize } from '../../interfaces';
import { FC, useContext, useState } from 'react';
import { NextPage } from 'next';

interface Props {
  product : IProduct
}





const ProductPage:NextPage<Props> = ({product}) => {
  const router = useRouter();
  const {addProductToCart} = useContext(CartContext);
  // const {products:product, isLoading} = useProducts(`/products/${router.query.slug}`);
  const [tempCartProduct,settempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image : product.images[0],
    price : product.price,
    size : undefined,
    slug : product.slug,
    title : product.title,
    gender: product.gender,
    quantity :1
  });

  const selectedSize = (size: ISize) =>{
    settempCartProduct(currentProduct=> ({
      ...currentProduct,
      size
    }));
 }

 const onUpdateQuantity = (quantity: number) =>{
  settempCartProduct(currentProduct=> ({
    ...currentProduct,
    quantity
  }));
}


 const onAddProduct = ()=> {
   console.log('entre');
    if(!tempCartProduct.size){return;}
    addProductToCart(tempCartProduct);
   
    router.push('/cart');
 }

  return (
    <ShopLayout title={ product.title } pageDescription={ product.description }>
    
      <Grid container spacing={3}>

        <Grid item xs={12} sm={ 7 }>
          <ProductSlideshow 
            images={ product.images }
          />
        </Grid>

        <Grid item xs={ 12 } sm={ 5 }>
          <Box display='flex' flexDirection='column'>

            {/* titulos */}
            <Typography variant='h1' component='h1'>{ product.title }</Typography>
            <Typography variant='subtitle1' component='h2'>{ `$${product.price}` }</Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
               
              <ItemCounter
               currentValue = {tempCartProduct.quantity}
               updatedQuantity={onUpdateQuantity }
               maxValue={ product.inStock > 10 ? 10 : product.inStock}
              
              />
              <SizeSelector 
                // selectedSize={ product.sizes[2] } 
                sizes={ product.sizes }
                selectedSize={tempCartProduct.size}
                onSelectedSize = { selectedSize}
            
              />
            </Box>

              {
                (product.inStock > 0) 
                 ? ( 
                    <Button 
                     onClick={ onAddProduct}
                    color="secondary" className='circular-btn'>
                      {
                        tempCartProduct.size ? 'Agregar al Carrito' 
                                             : 'Selecciona Talla'
                      }
                    
                    </Button>
                 ):
                 (

                    <Chip label="No hay disponibles" color="error" variant='outlined' /> 
                 )
              }
            {/* Agregar al carrito */}
           


            {/* Descripción */}
            <Box sx={{ mt:3 }}>
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'>{ product.description }</Typography>
            </Box>

          </Box>
        </Grid>


      </Grid>

    </ShopLayout>
  )
}


import { GetServerSideProps } from 'next'
import { dbProduct } from '../../database';
import { useRouter } from 'next/router';
import { CartContext } from '../../context';

// export const getServerSideProps: GetServerSideProps = async ({params}) => {
//   const {slug= ''} = params as {slug:string};
//   const product = await dbProduct.getProductBySlug(slug);
//    if(!product){
//     return {
//       redirect : {
//         destination :'/',
//         permanent : false
//       }
//     }
//    }
//   return {
//     props: {
//       product
//     }
//   }
// }

//getStaticPath
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProduct.getAllProductSlugs();

  return {
    paths:  productSlugs.map(({slug}) =>({
      params:{
         slug
      }
    })),
   
    fallback: "blocking"
  }
}

//GetStaticProps

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({params}) => {
  const { slug = ''} = params as {slug:string} // yo;ur fetch function here 
   const product = await dbProduct.getProductBySlug(slug);
   if(!product){
     return {
      redirect : {
        destination : '/',
        permanent : false
      }
     }
   }
  return {
    props: {
      product
    },
    revalidate: 60*60*24
  }
}

export default ProductPage