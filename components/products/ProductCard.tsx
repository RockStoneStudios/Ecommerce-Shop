import { Box, Card, CardActionArea, CardMedia, Chip, Grid, Link, Typography } from '@mui/material';
import React, { FC, useMemo, useState } from 'react'
import { IProduct } from '../../interfaces';
import NextLink from 'next/link';


interface Props {
    product : IProduct;
}

export const ProductCard:FC<Props> = ({product}) => {

  const [isImageLoaded,setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const productImage = useMemo(()=> {
    return isHovered 
      ?  product.images[1]
      :  product.images[0]
  },[isHovered,product.images])

  return (
    <Grid 
     onMouseEnter= {()=> setIsHovered(true)}
     onMouseLeave= {()=> setIsHovered(false)}
     item xs={6} sm={4}>
        <Card>
          <NextLink legacyBehavior href={`/product/${product.slug}`} passHref prefetch={false}>
            <Link>
             
           
              <CardActionArea>
                {
                  (product.inStock === 0) && (
                    <Chip
                    color='primary'
                    label= 'No hay Disponibles'
                    sx={{position: 'absolute' ,zIndex:99, top:'10px',left :'10px'}}
                   />
                  )
                }
             
                  <CardMedia
                    className='fadeIn' 
                    onLoad={()=> setIsImageLoaded(true)}
                    component= 'img'
                    image={productImage}
                    alt={product.title}
                  >
                  
                  </CardMedia>
              </CardActionArea>
             </Link>
          </NextLink>      
        </Card>

        <Box sx={{mt:1, display: isImageLoaded ? 'block': 'none'}} className= 'fadeIn'>
            <Typography fontWeight={700}>{product.title}</Typography>
            <Typography fontWeight={500}>${product.price}</Typography>
        </Box>
        
    </Grid>
  )
}
