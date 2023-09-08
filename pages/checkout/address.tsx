import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import { GetServerSideProps } from 'next';
import { isValidToken } from '../../utils/jwt';
import { jwt,municipios } from "../../utils";
import { useForm } from "react-hook-form";
import Cookie from 'js-cookie';
import { useRouter } from "next/router";
import { useContext } from "react";
import { CartContext } from "../../context";

type FormData= {
    firstName : string;
    lastName : string;
    address : string;
    address2 : string;
    zip : string;
    neighborhood : string;
    municipality : string;
    phone : string;
}

const getAddressfromCookies = ():FormData => {
  return {
    firstName :     Cookie.get('firstName') || '',
    lastName :      Cookie.get('lastName') || '',
    address :       Cookie.get('address') || '',
    address2 :      Cookie.get('address2') || '',
    zip :           Cookie.get('zip') || '',
    neighborhood :  Cookie.get('neighborhood') || '',
    municipality :  Cookie.get('municipality') || '',
    phone :         Cookie.get('phone') || ''
  }
}

const AddressPage = () => {
    const router = useRouter();
    const {updateAddress} = useContext(CartContext)
    const {register,handleSubmit,formState:{errors}} = useForm<FormData>({
        defaultValues :  getAddressfromCookies()
            
        
    });

   const onSubmitAddress = (data : FormData) =>{ 
     
       updateAddress(data);
      router.push('/checkout/summary');
   }

  return (
    <ShopLayout title="Dirección" pageDescription="Confirmar dirección del destino">
     <form onSubmit={handleSubmit(onSubmitAddress)} >
        <Typography variant="h1" component='h1'>Dirección</Typography>
            <Grid container spacing={ 2 } sx={{ mt: 2 }}>
                
                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                    {...register('firstName',{
                        required: 'Este campo es requerido'
                    })}
                    error= {!!errors.firstName}
                    helperText= {errors.firstName?.message}
                    label='Nombre' variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                    {...register('lastName',{
                        required: 'Este campo es requerido'
                    })}
                    error= {!!errors.lastName}
                    helperText= {errors.lastName?.message}
                    label='Apellido' variant="filled" fullWidth />
                </Grid>

                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                    {...register('address',{
                        required: 'Este campo es requerido'
                    })}
                    error= {!!errors.address}
                    helperText= {errors.address?.message}
                    label='Dirección' variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                    {...register('address2',{
                    
                    })}
                   
                    label='Dirección 2 (opcional)' variant="filled" fullWidth />
                </Grid>

                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                    {...register('zip',{
                        required: 'Este campo es requerido'
                    })}
                    error= {!!errors.zip}
                    helperText= {errors.zip?.message}
                    label='Código Postal' variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                    {...register('neighborhood',{
                        required: 'Este campo es requerido'
                    })}
                    error= {!!errors.neighborhood}
                    helperText= {errors.neighborhood?.message}
                    label='Nombre Barrio' variant="filled" fullWidth />
                </Grid>
                
                <Grid item xs={12} sm={ 6 }>
                    <FormControl fullWidth>
                        <TextField
                            select
                            variant="filled"
                            label="Municipio"
                            defaultValue={Cookie.get('municipality') || municipios[0].code}
                            {...register('municipality',{
                                required : 'Este Campo es requerido'
                            })}
                            
                        >
                            {
                                municipios.map(municipio => (
                                    <MenuItem
                                    key={municipio.code}
                                    value={municipio.code}
                                    >
                                    {municipio.name}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                    {...register('phone',{
                        required: 'Este campo es requerido'
                    })}
                    error= {!!errors.phone}
                    helperText= {errors.phone?.message}
                    label='Teléfono' variant="filled" fullWidth />
                </Grid>

            </Grid>


            <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                <Button 
                type="submit"
                color="secondary" className="circular-btn" size="large">
                    Revisar pedido
                </Button>
            </Box>
        </form>
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// import { GetServerSideProps } from 'next'

// export const getServerSideProps: GetServerSideProps = async ({req}) => {
   
//     const {token = ''} = req.cookies; 
//     let isValidToken = false;
   
    
//     try{
//        await jwt.isValidToken(token);
//       isValidToken = true;

//     }catch(error){
//         isValidToken = false;
//     }
   
//     if(!isValidToken){
//         return {
//             redirect:{
//                 destination : '/auth/login?p=/checkout/address',
//                 permanent : false
//             }
//         }
//     }
//     return {
//         props: {
             
//         }
//     }
// }


export default AddressPage;