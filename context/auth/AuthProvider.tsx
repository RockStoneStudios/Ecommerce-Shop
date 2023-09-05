
import {FC,ReactNode,useEffect,useReducer}  from 'react';
import { AuthContext } from  '.';

import { IUser } from '../../interfaces';
import { authReducer } from '.';
import { tesloApi } from '../../api';
import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';

export interface AuthState {
    isLoggedIn : boolean;
    user? : IUser;
    children? : ReactNode;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn : false,
    user : undefined
}



export const AuthProvider:FC<AuthState> = ({children})=> {
  const [state,dispatch] = useReducer(authReducer,AUTH_INITIAL_STATE);
 

    useEffect(()=> {
       checkToken();
    },[])
 
     const checkToken = async () => {
       try{
        const {data} = await tesloApi.get('/user/validate-token');
        const {token,user} = data;
        dispatch({type : '[Auth] - Login',payload : user});
       }catch(error){
          Cookies.remove('token');
       }


     }

   const loginUser = async (email:string,password: string) : Promise<boolean> => {
     try{
        const {data} = await tesloApi.post('/user/login',{email,password});
        const {token,user} = data;
        Cookies.set('token',token);
        dispatch({type : '[Auth] - Login',payload: user});
        return true;
     }catch(error){
        return false;
     }
   }

   const registerUser = async (name : string, email:string, password:string) : Promise<{hasError: boolean; message? : string}> =>{
       try{
           const {data} = await tesloApi.post('/user/register',{name,email,password});
           const {token,user} = data;
           Cookies.set('token',token);
           dispatch({type: '[Auth] - Login',payload : user});
           //TODO:return
           return {
            hasError : false
           };
       }catch(err){
          if(axios.isAxiosError(err)){
            const error = err as AxiosError
            return {
                hasError : true,
                message : error.message
            }
          }
          return {
            hasError : true,
            message : 'No se pudo crear Usuario'
          }
       }
   }


  return (
    <AuthContext.Provider value={{...state,loginUser,registerUser}}>
        {children}
    </AuthContext.Provider>
  )
}