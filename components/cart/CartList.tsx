
import { CardActionArea, Grid, Link, Typography, CardMedia, Box, Button } from '@mui/material';
import NextLink from 'next/link';
import { ItemCounter } from "../ui";
import { FC, useContext } from 'react';
import { CartContext } from "../../context";
import { ICartProduct } from "../../interfaces";
import { currency } from "../../utils";




interface Props {
   editable? : boolean;
}

export const CartList:FC<Props> = ({editable}) => {
   const {cart,updateCartQuantity,removeCartProduct} =  useContext(CartContext);
   

   const onNewCartQuantityValue = (product : ICartProduct, newQuantityValue : number)=> {
       product.quantity = newQuantityValue;
       updateCartQuantity(product);
   }
  return (
     <>
        {
            cart.map(product => (
                <Grid container spacing={2} key={product.slug+product.size} sx={{mb : 1}}>
                    <Grid item xs={3}>
                        {/*TODO: llevar a la pagina del producto */}
                       <NextLink legacyBehavior href={`/product/${product.slug}`} passHref>
                         <Link>
                           <CardActionArea>
                              <CardMedia 
                                image={`/products/${product.image}`}
                                component= 'img'
                                sx={{borderRadius : '6px'}}
                              />
                           </CardActionArea>
                         </Link>
                       </NextLink>
                    </Grid>
                    <Grid item xs={7}>
                      <Box display='flex' flexDirection='column'>
                           <Typography variant="body1">{product.title}</Typography>
                           <Typography variant="body1">Talla: <strong>{product.size}</strong></Typography>
                           {
                              editable ?  ( 
                              <ItemCounter 
                              currentValue={product.quantity}
                              maxValue={10}
                              updatedQuantity={(value)=>  onNewCartQuantityValue(product,value)}
                              />
                              )
                              : (   
                              <Typography variant="h5">{product.quantity} {product.quantity>1 ? 'productos' : 'producto'}</Typography>
                              )
                           }
                       
                      </Box>
                    </Grid>
                    <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                       <Typography variant="subtitle1">{currency.format(product.price)}</Typography>
                       {/*Editable */}
                       {
                          editable && (
                           <Button
                            onClick={()=> removeCartProduct(product)}
                            variant="text" 
                            color='secondary'>
                              Remover
                           </Button>
                          )
                       }
                       
                    </Grid>
                </Grid>
            ))
        }
     </>
  )
}
