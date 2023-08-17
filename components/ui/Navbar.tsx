import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { AppBar, Toolbar, Link, Typography, Box, Button, IconButton ,Badge } from '@mui/material';
import NextLink from 'next/link';

export const Navbar = () => {
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

             <Box sx={{display: {xs: 'none', sm:'block'}}}>
                
                <NextLink legacyBehavior href='/category/men' passHref>
                    <Link>
                        <Button>Hombres</Button>
                    </Link>
                </NextLink>
                <NextLink legacyBehavior href='/category/women' passHref>
                    <Link>
                        <Button>Mujeres</Button>
                    </Link>
                </NextLink>
                <NextLink legacyBehavior href='/category/kid' passHref>
                    <Link>
                        <Button>Niños</Button>
                    </Link>
                </NextLink>
             </Box>
            <Box flex={1} />
            <IconButton>
                <SearchOutlined/>
            </IconButton>
            <NextLink legacyBehavior passHref href="/cart">
                 <Link>
                   <IconButton>
                      <Badge badgeContent= {2} color="secondary">
                        <ShoppingCartOutlined/>
                      </Badge>
                   </IconButton>
                 </Link>
            </NextLink>
            <Button>
                Menu
            </Button>
        </Toolbar>
    </AppBar>
  )
}
