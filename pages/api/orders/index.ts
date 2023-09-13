import type { NextApiRequest, NextApiResponse } from 'next'
import { IOrder } from '../../../interfaces';
import {getServerSession} from 'next-auth/next';
import { getSession } from 'next-auth/react';
import authOptions from '../auth/[...nextauth]';
import { connect } from '../../../database/db';
import { db } from '../../../database';
import { Order, Product } from '../../../models';


type Data = { message : string }
            | IOrder;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method){
        case 'POST':
          return  createOrder(req,res);
        default:
            return res.status(400).json({message : 'Bad Request'})  
    }

    return res.status(200).json({ message: 'Example' })
}

const  createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
     const {orderItems,total} = req.body as IOrder;

     //Verificar que tengamos un usuario
     const session:any = await getServerSession(req,res,authOptions);

     if(!session){
        return res.status(401).json({message : 'Debes de estar autenticado '});
     }

     //Crear un arreglo con los productos que las personas quiere

     const productsIds = orderItems.map(product => product._id);

     await db.connect();
     const dbProducts = await Product.find({_id : {$in : productsIds}});

    try{
      const subTotal = orderItems.reduce((prev,current)=> {
        const currentPrice = dbProducts.find(product => product.id === current._id)?.price
         if(!currentPrice){
            throw new Error('Verifique el carrito de nuevo,producto no existe');
         }
        return (current.price * current.quantity)+ prev
    },0);

   const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
   const backendTotal = subTotal * (taxRate+1);

   if(total !== backendTotal){
    throw new Error('El total no cuadra con el monto');
   }

   // Todo bien hasta este punto
   const userId = session.user._id;
   const newOrder = new Order({...req.body,isPaid: false,user :userId});
   await newOrder.save();
   return res.status(201).json(newOrder);


    }catch(error : any){
       await db.disconnect();
       console.log(error);
       res.status(400).json({message : error.message || 'Revise los logs del servidor'})
    }

     
     
      
   
    return res.status(201).json(session);
}
