import React from 'react'
import { ShopLayout } from '../components/layouts';
import { Box, Typography } from '@mui/material';

const Custom404 = () => {
  return (
    <ShopLayout title='Page not Found' pageDescription='No hay Nada que mostrar!!'>
       <Box
        sx={{flexDirection: {xs: 'column', sm : 'row'}}}
       display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)'>
            <Typography variant='h1' component='h1' fontSize={90} fontWeight={200}>404 |</Typography>
            <Typography marginLeft={2} variant='h6'>No hay Pagina aqui</Typography>
       </Box>
    </ShopLayout>
  
    );
}

export default Custom404;