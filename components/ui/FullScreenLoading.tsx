import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

export const FullScreenLoading = () => {
  return (
    <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            flexDirection= 'column'
            height='calc(100vh - 200px)'
            
        >
            <Typography fontSize={22} variant='h2' fontWeight={300} marginBottom={2}>Cargando . . .</Typography>
            <CircularProgress thickness={4} />
        </Box>
  )
}
