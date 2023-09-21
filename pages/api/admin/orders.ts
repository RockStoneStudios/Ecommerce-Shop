import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Order } from '../../../models';
import { IOrder } from '../../../interfaces/Order';

type Data = |{message: string} | IOrder[];

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch(req.method){
        case 'GET':
            return getOrders(req,res);
        default:
            return res.status(400).json({message : 'Bad Request'});  
    }
    res.status(200).json({ message: 'Example' })
}

const  getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect();
    const orders = await Order.find().sort({createdAt : 'desc'})
                             .lean().populate('user','name email');
     
    await db.disconnect();
    return res.status(200).json(orders)
}
