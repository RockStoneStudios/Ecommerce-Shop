import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '../../../models'
import bcrypt from 'bcryptjs';
import { jwt, validations } from '../../../utils';

type Data = | {message : string}
            | {token : string;
              user : {
                email : string;
                name: string;
                role : string;
                
              }
            }

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method){
        case 'POST':
            return registerUser(req,res)
        default:
            res.status(400).json({
                message : 'Bad request'
            })    
    }
}

const registerUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
   const {email='',password= '',name= ''} = req.body as {email:string,password : string, name: string};
   
   if(password.length <6) return res.status(400).json({message : 'La contraseña debe ser de 6 o mas caracteres'})
   if(name.length<2) return res.status(400).json({message : 'El nombre debe ser de 2 caracteres'})
   if(!validations.isValidEmail(email)) return res.status(400).json({message : 'Email no valido'})
   await db.connect();
   const user = await User.findOne({email});
    
   if(user) return res.status(400).json({message: 'Correo en Uso'});

    const newUser = new User({
        email : email.toLocaleLowerCase(),
        password : bcrypt.hashSync(password),
        role : 'client',
        name
    });

    try{
       await newUser.save({validateBeforeSave: true})
    }catch(error){
        console.log(error);
        return res.status(500).json({message : 'Revisar logs del servidor'})
    }

   const {_id} = newUser;
   const token = jwt.signToken(_id,email);
   return res.status(200).json({token ,user :{
     email,
     role : 'client',
     name
   }})
      
}
