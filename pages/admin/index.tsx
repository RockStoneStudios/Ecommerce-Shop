import React, { useEffect, useState } from 'react'
import { AdminLayout } from '../../components/layouts'
import { AccessTimeOutlined, AttachMoney, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { SummaryTile } from '../../components/admin'
import useSWR from 'swr'
import { DashboardSummaryResponse } from '../../interfaces'

const DashboardPage = () => {

  const {data,error} = useSWR<DashboardSummaryResponse>('/api/admin/dashboard',{
    refreshInterval : 30*1000
  });

  const [refreshIn,setRefreshIn] = useState(30);

   useEffect(()=>{
        const interval = setInterval(()=>{
           setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30)
        },1000);
        return () => clearInterval(interval);
   },[])

  if(!error && !data){
     return <></>
  }

  if(error){
    console.log(error);
    return <Typography>Error al cargar la informacion</Typography>
  }



  const {
     numberOfOrders, 
     paidOrders,
     numberOfClients,
     numberOfProducts,
     productsWithNoInventary,
     lowInventory,
     noPaidOrder
  } = data!;

  return (
    <AdminLayout title='Dasboard' subtitle='Estadisticas Generales' icon={<DashboardOutlined/>}>
     <Grid container spacing={2}>
         <SummaryTile 
          title={numberOfOrders}
          subTitle='Ordenes Totales'
          icon = {<CreditCardOutlined  color='secondary' sx={{fontSize : 40}}/>}
         />
         <SummaryTile 
          title={paidOrders}
          subTitle='Ordenes Pagadas'
          icon = {<AttachMoney  color='success' sx={{fontSize : 40}}/>}
         />
         <SummaryTile 
          title={noPaidOrder}
          subTitle='Ordenes Pendientes'
          icon = {<CreditCardOffOutlined  color='error' sx={{fontSize : 40}}/>}
         />
         <SummaryTile 
          title={numberOfClients}
          subTitle='Clientes'
          icon = {<GroupOutlined  color='primary' sx={{fontSize : 40}}/>}
         />

        <SummaryTile 
          title={numberOfProducts}
          subTitle='Productos'
          icon = {<CategoryOutlined  color='warning' sx={{fontSize : 40}}/>}
         />

        <SummaryTile 
          title={productsWithNoInventary}
          subTitle='Sin Existencias'
          icon = {<CancelPresentationOutlined  color='error' sx={{fontSize : 40}}/>}
         />

         <SummaryTile 
          title={lowInventory}
          subTitle='Bajo Inventario'
          icon = {<ProductionQuantityLimitsOutlined  color='warning' sx={{fontSize : 40}}/>}
         />
        <SummaryTile 
          title={refreshIn}
          subTitle='Actualizado en :'
          icon = {<AccessTimeOutlined color='secondary' sx={{fontSize : 40}}/>}
         />


     </Grid>
    </AdminLayout>
  )
}

export default DashboardPage