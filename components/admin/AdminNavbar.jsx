import { AppBar, Toolbar, Link, Typography, Box, Button, } from '@mui/material';
import NextLink from 'next/link';
import { useContext, useState } from 'react';
import { CartContext, UiContext } from '../../context';

export const AdminNavbar = () => {
   
    const {toggleSideMenu} = useContext(UiContext);
    

    
    
  return (
    <AppBar>
        <Toolbar>
            <NextLink legacyBehavior href= '/' passHref>
                <Link display='flex' alignItems='center'>
                 <Typography variant='h6'>Teslo |</Typography>
                 <Typography sx={{ml:0.5}}>Shop</Typography>
                </Link>
            </NextLink>
            <Box flex={1} />

            
           
        


            {/*Pantallas pequeñas */}
          
           
            <Button onClick={toggleSideMenu}>
                Menu
            </Button>
        </Toolbar>
    </AppBar>
  )
}
