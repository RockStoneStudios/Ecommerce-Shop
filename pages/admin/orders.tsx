import React from 'react'
import { AdminLayout } from '../../components/layouts'
import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, Grid } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import { IOrder, IUser } from '../../interfaces';


const columns: GridColDef[] = [
     {field : 'id',headerName: 'Orden ID', width:250},
     {field :  'email', headerName : 'Correo', width:200},
     {field : 'name' , headerName : 'Nombre Completo',width:200},
     {field : 'total', headerName : 'Monto Total',width: 200},
     {
      field: 'isPaid',
      headerName : 'Pagada',
      width: 200,
      renderCell: ({row}: GridRenderCellParams) =>{
        return row.isPaid
           ? (<Chip variant='outlined' label= 'Pagado' color='success' />)
           : (<Chip variant='outlined' label= 'Pendiente' color='error' />)
      }
     },
     {field : 'noProducts', headerName : 'No.Productos',align : 'center', width:200 },
     {
      field: 'check',
      headerName : 'Ver orden',
      renderCell: ({row}: GridRenderCellParams) =>{
        return (

        <a href={`/admin/orders/${row.id}`} target="_blank" rel="noreferrer">
           Ver orden
        </a>
        )
          
      }
     },
     {field : 'createdAt', headerName: 'Creada en ', width:300, }



]

const Orders = () => {

  const {data,error} = useSWR<IOrder[]>('/api/admin/orders');

  if(!data && !error) return (
  <>
  </>
  );

  const rows = data!.map(order=>({
     id: order._id,
     email : (order.user as IUser).email,
     name : (order.user as IUser).name,
     total : order.total,
     isPaid : order.isPaid,
     noProducts : order.numberOfItems,
     createdAt : order.createdAt
  }))

  return (
    <AdminLayout 
    title='Ordenes'
    subtitle='Mantenimiento de Ordenes' 
    icon={<ConfirmationNumberOutlined/>}>
      <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    initialState={{
                      pagination: { 
                        paginationModel: { pageSize: 8 } 
                      },
                    }}
                    pageSizeOptions={[8, 16, 24]}
                />

            </Grid>
      </Grid>

    </AdminLayout>
  )
}

export default Orders;