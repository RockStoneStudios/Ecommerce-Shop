import { Box } from '@mui/material';
import Head from 'next/head'
import React, { FC, ReactNode } from 'react'

interface Props {
    title:string;
    children : ReactNode;
}

export const AuthLayout:FC<Props> = ({children,title}) => {
  return (
     <>
        <Head>
          <title>{title}</title>
        </Head>
        <main>
            <Box display='flex' height='calc(100vh - 200px)'  justifyContent='center' alignItems='center'>
                {children}
            </Box>
        </main>
     </>
  )
}
