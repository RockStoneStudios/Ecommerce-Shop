import React, { useEffect, useState } from 'react'
import { AdminLayout } from '../../components/layouts'
import { PeopleOutline } from '@mui/icons-material';
import {DataGrid,GridColDef,GridRenderCellParams,GridValueGetterParams} from '@mui/x-data-grid';
import { Grid, MenuItem, Select } from '@mui/material';
import useSWR from 'swr';
import { IUser } from '../../interfaces';
import { tesloApi } from '../../api';



const UserPage = () => {
 
     const {data,error} = useSWR<IUser[]>('/api/admin/users');
     const [users,setUsers] = useState<IUser[]>([]);
     if(!data && ! error) return (<></>);

      useEffect(()=>{
         if(data){
            setUsers(data);
         }
      },[data]);

     const onRoleUpdate = async (userId:string,newRole:string) =>{

        const previusUsers = users.map(user => ({...user}));
        const updatedUsers = users.map(user =>({
            ...user,
            role : userId === user._id ? newRole : user.role
        }));
        setUsers(updatedUsers);
        try{
          await tesloApi.put('/admin/users',{userId,role: newRole});
        }catch(error){
          setUsers(previusUsers);
           alert('No se pudo actualizar el role del usuario');
        }
     }

    const columns: GridColDef[] = [
        {field : 'email',headerName: 'Correo',width:250},
        {field : 'name',headerName: 'Nombre Completo',width:300},
        {
            field : 'role',
            headerName: 'Rol',
            width:250,
            renderCell : ({row} : GridRenderCellParams) => {
                 return (
                    <Select 
                     label = "Rol"
                     value={row.role}
                     sx={{width: '300px'}}
                     onChange={({target})=>onRoleUpdate(row.id,target.value)}
                    >
                     <MenuItem value='admin'>Admin</MenuItem>
                     <MenuItem value='client'>Client</MenuItem>
                     <MenuItem value='super-user'>Super-User</MenuItem>
                     <MenuItem value='SEO'>SEO</MenuItem>
                    </Select>
                 )
            }
        },

    ];

    const rows = users.map(user =>({
        id : user._id,
        email : user.email,
        name : user.name,
        role : user.role
    }));


  return (
   <AdminLayout 
    title={'Usuarios'} 
    subtitle={'Mantenimiento de Usuarios'}
    icon={<PeopleOutline/>}
   
   >

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

export default UserPage;