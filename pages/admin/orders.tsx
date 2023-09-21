import React from 'react'
import { AdminLayout } from '../../components/layouts'
import { ConfirmationNumberOutlined } from '@mui/icons-material'

const orders = () => {
  return (
    <AdminLayout 
    title='Ordenes'
    subtitle='Mantenimiento de Ordenes' 
    icon={<ConfirmationNumberOutlined/>}>

    </AdminLayout>
  )
}

export default orders