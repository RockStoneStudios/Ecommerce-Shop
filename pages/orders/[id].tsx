import NextLink from 'next/link';

import { Link, Box, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { GetServerSideProps, NextPage } from 'next'
import { dbOrders } from '../../database';
import { redirect } from 'next/dist/server/api-utils';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import { IOrder } from '../../interfaces';
import { getServerSession } from 'next-auth/next';
import  authOptions  from '../api/auth/[...nextauth]';
import { User } from '../../models';


interface Props {
    order: IOrder
}

const OrderPage: NextPage<Props> = ({order}) => {
    console.log({order});
    const {shippingAddress} = order;
  return (
    <ShopLayout title='Resumen de la orden ' pageDescription={'Resumen de la orden'}>
        <Typography variant='h1' component='h1'>Orden: {order._id}</Typography>

          {
             order.isPaid ? (
                <Chip 
                sx={{ my: 2 }}
                label="Orden ya fue pagada"
                variant='outlined'
                color="success"
                icon={ <CreditScoreOutlined /> }
            />
             ) : (
                <Chip 
                sx={{ my: 2 }}
                label="Pendiente de pago"
                variant='outlined'
                color="error"
                icon={ <CreditCardOffOutlined /> }
            /> 
             )
          }
       
       

        <Grid container className='fadeIn'>
            <Grid item xs={ 12} sm={ 7 } gap={2}>
                <CartList  products = {order.orderItems}/>
            </Grid>
            <Grid gap={2} item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen {order.numberOfItems} ({order.numberOfItems < 2 ? 'producto' : 'productos' } )</Typography>
                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='space-between'>
                        <Typography variant='subtitle1'>{shippingAddress?.firstName} {shippingAddress?.lastName}</Typography>
                           
                        </Box>

                        
                       
                        <Typography >{order.shippingAddress?.address}</Typography>
                        <Typography>{shippingAddress?.municipality}</Typography>
                        <Typography>{shippingAddress?.neighborhood}</Typography>
                        <Typography>{shippingAddress?.phone}</Typography>

                        <Divider sx={{ my:1 }} />

                       

                        <OrderSummary
                            orderValues={{
                                numberOfItems: order.numberOfItems,
                                subTotal: order.subTotal,
                                total: order.total,
                                tax: order.tax,
                            }} 
                        
                        />

                        <Box sx={{ mt: 3 }} display={'flex'} flexDirection={'column'}>
                            {/* TODO */}
                            {
                                order.isPaid ? (
                                    <Chip 
                                    sx={{ my: 2 }}
                                    label="Orden ya fue pagada"
                                    variant='outlined'
                                    color="success"
                                    icon={ <CreditScoreOutlined /> }
                                   />
                                ):
                                (
                                    <h1>Pagar</h1>

                                )
                            }

                         
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    </ShopLayout>
  )
}



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({req,res,query}) => {
   const {id = ''} = query;
   
   const session:any = await getServerSession(req,res,authOptions);
 
  
    if(!session){
        return {
            redirect : {
                destination : `/auth/login?p=/orders/${id}`,
                permanent: false

            }
        }
    }
   
    const order = await dbOrders.getOrderById(id.toString());

    if(!order){
        return{
            redirect : {
                destination : '/orders/history',
                permanent : false
            }
        }
    }
    const userId = await User.findOne({email : session.user.email});
     
    if(order.user !== userId?._id.toString()){
        return{
            redirect : {
                destination : '/orders/history',
                permanent : false
            }
        }
    }
    return {
        props: {
            order
        }
    }
}

export default OrderPage;