import NextLink from 'next/link';
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts'
import { useForm } from 'react-hook-form';
import { isEmail } from '../../utils/validation';
import { validations } from '../../utils';

import { ErrorOutline } from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth';
import { useRouter } from 'next/router';
import {getSession, signIn, useSession,getProviders} from 'next-auth/react';

type FormData = {
    email:    string;
    password: string;  
}

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm<FormData>();
    const [showError,setShowError] = useState(false);
    const router = useRouter();

    const [providers,setProviders] = useState<any>({});


     useEffect(()=> {
          getProviders().then(prov => {
             
             setProviders(prov);
          })
     },[])

      const onLoginUser = async({email,password} : FormData) =>{
        setShowError(false);
      
        await signIn('credentials',{email,password});
        
      }

  return (
    <AuthLayout title={'Ingresar'} >
        <form onSubmit={handleSubmit(onLoginUser)} noValidate>
            <Box sx={{ width: 350, padding:'10px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component="h1">Iniciar Sesión</Typography>
                        <Chip
                         label= "No reconocemos ese usuario"
                         color= "error"
                         icon={<ErrorOutline/>}
                         className='fadeIn'
                         sx={{display : showError ? 'flex' : 'none'}}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField 
                        {...register('email',{
                            required : 'Este campo es requerido',
                            validate :  validations.isEmail
                        })}
                        label="Correo" variant="filled" fullWidth
                         error = {!!errors.email}
                         helperText = {errors.email?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                         {...register('password',{
                            required : 'Este campo es requerido',
                            minLength : {value : 6, message : 'Minimo 6 caracteres'}
                         })}
                         error = {!!errors.password}
                         helperText = {errors.password?.message}
                        label="Contraseña" type='password' variant="filled" fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <Button 
                        type='submit'
                        color="secondary" className='circular-btn' size='large' fullWidth>
                            Ingresar
                        </Button>
                    </Grid>

                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink
                         legacyBehavior
                         href={ router.query.p ? `/auth/register?p=${router.query.p}` : "/auth/register"}  passHref>
                            <Link underline='always'>
                                ¿No tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                    <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
                       <Divider sx={{width : '100%', mb:2}} />
                           {
                              Object.values(providers).map((provider:any)=>{

                                if(provider.id ==='credentials') return (<div key='credentials'></div>)
                                return(
                                  <Button 
                                    onClick={()=> signIn(provider.id)}
                                    sx={{mb : 2}}
                                    fullWidth 
                                    color = 'primary'
                                    variant='outlined' 
                                    key={provider.id}>
                                        {provider.name}
                                 </Button>
                                )
                              })
                           }
                       
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({req,query}) => {
      const session = await getSession({req});
      const {p= '/'} = query;

       if(session){
        return {
            redirect :{
                destination : p.toString(),
                permanent: false
            }
        }
       }
    return {
        props: {
            
        }
    }
}


export default LoginPage