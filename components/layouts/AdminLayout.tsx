import Head from 'next/head'
import React,{FC} from 'react'
import { SideMenu } from '../ui';
import { AdminNavbar } from '../admin';
import { Box, Typography } from '@mui/material';

interface Props {
    title: string;
    subtitle : string;
    icon? : JSX.Element
    children?: React.ReactNode;
}

export const  AdminLayout:FC<Props> = ({children,title, subtitle,icon}:Props) => {
  return (
    <>
     <Head>
        <title>{title}</title>
        <meta name='description' content={'Dasboard Admin'}/>
        <meta name='og:description' content={'Dasboard'} />
       
     </Head>
    
     <nav>
       <AdminNavbar/>
     </nav>
     <SideMenu/>
     <main style={{margin : '80px auto', maxWidth: '1440px',padding: '0px 30px'}}>
       <Box display="flex" flexDirection="column">
         <Typography variant='h1' component="h1">
            {icon} {' '}
            {title}
         </Typography>
         <Typography variant='h2' sx={{mb:2,mt:2}}>
            {subtitle}
         </Typography>
       </Box>
       <Box className= 'fadeIn'>
        {children}
       </Box>
     </main>
    
      
    </>
  );
}
