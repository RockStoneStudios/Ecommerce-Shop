import jwt from 'jsonwebtoken';


export const signToken = (_id:string,email:string) => {
    if(!process.env.TOKEN_SECRET) {
        throw new Error('No hay token secret')
    }
   return  jwt.sign(
       //payload 
        {_id,email},
        process.env.TOKEN_SECRET,
        //Options
        {
            expiresIn : '30d'
        }
    )
}



export const isValidToken = (token : string) :Promise<string> => {
  if(!process.env.TOKEN_SECRET){
    throw new Error('No hay Token Secret');
  }
   if(token.length <=10){
    return Promise.reject('JWT no es valido');
   }
  return new Promise((resolve,reject)=> {
    try{
       jwt.verify(token,process.env.TOKEN_SECRET || '',(err,payload)=>{
           if(err) return reject('JWT no es valido');
           const {_id} = payload as {_id:string};
           resolve(_id);
       })
    }catch(error){
      reject('JWT no es valido');
    }
  })
}


