
import { AdminLayout } from '../../components/layouts'
import { CategoryOutlined } from '@mui/icons-material'
import { CardMedia, Chip, Grid , Link} from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import {  IProduct } from '../../interfaces';
import NextLink from 'next/link';


const columns: GridColDef[] = [
     {
      field :  'img',
      headerName : 'Foto',
      renderCell : ({row} : GridRenderCellParams) =>{
        return (
          <a href={`/product/${row.slug}`} target='_blank' rel='noreferrer'>
              <CardMedia
               component='img'
               alt={row.title}
               className='fadeIn'
               image={ `/products/${row.img}`}
              />
          </a>
        )
      }
    },
     {
      field : 'title' ,
      headerName : 'Titulo',
      width:250,
      renderCell : ({row}:GridRenderCellParams) => {
        return (
             <NextLink href={`/admin/products/${row.slug}`} passHref>
              <Link underline='always'>
                {row.title}
              </Link>
             </NextLink>
        )
      }
    },
     {field : 'gender', headerName : 'Genero'},
     {field : 'type', headerName : 'Tipo'},
     {field : 'inStock', headerName : 'Inventario'},
     {field : 'price', headerName : 'Precio'},
     {field : 'sizes', headerName : 'Tallas',width: 250},
     



]

const ProductsPage = () => {

  const {data,error} = useSWR<IProduct[]>('/api/admin/products');

  if(!data && !error) return (
  <>
  </>
  );

  const rows = data!.map(product=>({
     id: product._id,
     img: product.images[0],
     title : product.title,
     gender : product.gender,
     type : product.type,
     inStock : product.inStock,
     price : product.price,
     sizes : product.sizes.join(', '),
     slug: product.slug
  }))

  return (
    <AdminLayout 
    title={`Productos (${data?.length})`}
    subtitle='Mantenimiento de Productos' 
    icon={<CategoryOutlined/>}>
      <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10] }
                />

            </Grid>
      </Grid>

    </AdminLayout>
  )
}

export default ProductsPage;