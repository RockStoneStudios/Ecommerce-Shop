import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { AppBar, Toolbar, Link, Typography, Box, Button, IconButton ,Badge, Input, InputAdornment } from '@mui/material';
import NextLink from 'next/link';
import  { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { CartContext, UiContext } from '../../context';

export const Navbar = () => {
    const {asPath} = useRouter();
    const router = useRouter();
    const {toggleSideMenu} = useContext(UiContext);
    const [searchTerm,setSearchTerm] = useState('');
    const [isSearchVisible,setIsSearchVisible] = useState(false);
    const {numberOfItems} = useContext(CartContext);

    const onSearchTerm = () => {
       if(searchTerm.trim().length === 0) return;
       router.push(`/search/${searchTerm}`);
  
    }
    
  return (
    <AppBar>
        <Toolbar>
            <NextLink legacyBehavior href= '/' passHref>
                <Link display='flex' alignItems='center'>
                 <Typography variant='h6'>Roppa |</Typography>
                 <Typography sx={{ml:0.5}}>Shop</Typography>
                </Link>
            </NextLink>
            <Box flex={1} />

             <Box sx={{display: isSearchVisible ? 'none' : {xs: 'none', sm:'block'}}} className= 'fadeIn'>
                
                <NextLink legacyBehavior href='/category/men' passHref>
                    <Link>
                        <Button color={asPath == '/category/men' ? 'secondary' : 'info'}>Hombres</Button>
                    </Link>
                </NextLink>
                <NextLink legacyBehavior href='/category/women' passHref>
                    <Link>
                        <Button color={asPath == '/category/women' ? 'secondary' : 'info'}>Mujeres</Button>
                        
                    </Link>
                </NextLink>
                <NextLink legacyBehavior href='/category/kid' passHref>
                    <Link>
                        <Button color={asPath === '/category/kid' ? 'secondary' : 'info'}>Niños</Button>
                    </Link>
                </NextLink>
             </Box>
            <Box flex={1} />
            {/*Pantallas grandes */}
          
            {
                isSearchVisible ? (
                    <Input
                    sx={{display:  {xs: 'none', sm:'flex'}}}
                        className='fadeIn'
                        autoFocus
                        value={searchTerm}
                        onChange={(e)=> setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={()=> setIsSearchVisible(false)}
                            >
                            <ClearOutlined />
                            </IconButton>
                        </InputAdornment>
                        }
                   />
                ):
                (
                    <IconButton 
                    sx={{display : {xs:'none', sm: 'flex'}}}
                      onClick={()=> setIsSearchVisible(true)}
                      className='fadeIn'
                    >
                      <SearchOutlined/>
                    </IconButton>
                )
            }
            


            {/*Pantallas pequeñas */}
            <IconButton 
             onClick={toggleSideMenu}
            sx={{display : {xs:'flex', sm: 'none'}}}>
                <SearchOutlined/>
            </IconButton>
            <NextLink legacyBehavior passHref href="/cart">
                 <Link>
                   <IconButton>
                      <Badge badgeContent= {numberOfItems > 9?'+9' : numberOfItems} color="secondary">
                        <ShoppingCartOutlined/>
                      </Badge>
                   </IconButton>
                 </Link>
            </NextLink>
            <Button onClick={toggleSideMenu}>
                Menu
            </Button>
        </Toolbar>
    </AppBar>
  )
}
