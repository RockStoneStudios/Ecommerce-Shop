import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Order, Product, User } from '../../../models';

type Data = {
    numberOfOrders : number;
    paidOrders : number;
    numberOfClients : number;
    noPaidOrder : number;
    numberOfProducts : number;
    productsWithNoInventary : number;
    lowInventory : number;
}

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {
   
    await db.connect();
     

    const [numberOfOrders,paidOrders,numberOfClients,numberOfProducts,productsWithNoInventary,lowInventory] =  await Promise.all([
         Order.count(),
         Order.find({isPaid : true}).count(),
         User.find({role : 'client'}).count(),
         Product.count(),
         Product.find({inStock : 0}).count(),
         Product.find({inStock : {$lte: 9}}).count()
     ])
   
   
     await db.disconnect();


  res.status(200).json({
    numberOfOrders,
    numberOfClients,
    paidOrders,
    noPaidOrder : numberOfOrders -paidOrders,
    numberOfProducts,
    productsWithNoInventary,
    lowInventory
  })


}