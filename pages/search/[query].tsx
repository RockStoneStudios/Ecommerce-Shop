import { GetServerSideProps,NextPage } from 'next'
import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';

import { IProduct } from '../../interfaces/products';

import { db, dbProduct } from '../../database';

interface Props {
   products: IProduct[];
   foundProducts : boolean;
   query :string;
}


const SearchPage: NextPage<Props> = ({products,foundProducts,query}) => {


  return (
    <ShopLayout title={'Teslo-Shop - Search'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
        <Typography variant='h1' component='h1'>Buscar Producto</Typography>
        {
           foundProducts
            ?   (<Typography variant='h2' sx={{ mb: 1 }} textTransform='capitalize'>Termino : {query}</Typography>)
            :  ( 
              <>
                 <Box display='flex'>
                   <Typography variant='h2' sx={{ mb: 1 }}>No encontramos ningun Producto</Typography>
                   <Typography variant='h2'  sx={{ ml: 1}} textTransform='capitalize' color= 'secondary'>{query}</Typography>
                 </Box>
              </>
            
            )
 
        }
      
             <ProductList products ={ products  }/>
      
    

    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const {query= ''} = params as {query: string};
  
  if(query.length === 0){
    return  {
      redirect : {
        destination : '/',
        permanent : true
      }
    }
  }
 let products = await dbProduct.getProductByTerm(query);
 const foundProducts = products.length>0;
 if(!foundProducts){
    products = await dbProduct.getAllProduct();
 }
 //TODO: retornar otros productos
 
  return {
    props: {
       products,
       foundProducts,
       query
    }
  }
}


export default  SearchPage;
