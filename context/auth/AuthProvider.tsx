
import {FC,ReactNode,useEffect,useReducer}  from 'react';
import { AuthContext } from  '.';
import {useSession,signOut} from 'next-auth/react'
import { IUser } from '../../interfaces';
import { authReducer } from '.';
import { tesloApi } from '../../api';
import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';

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
  const router = useRouter();
   const {data,status} = useSession();
 
    
   useEffect(()=>{
      if(status === 'authenticated'){
        dispatch({type : '[Auth] - Login',payload : data?.user as IUser})
      }
   },[status,data])

    // useEffect(()=> {
    //    checkToken();
    // },[])
 
     const checkToken = async () => {
      if(!Cookies.get('token')) return;
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
        console.log({user});
        
        return true;
     }catch(error){
        return false;
     }
   }

   const logout = () => {
    // Cookies.remove('token');
    Cookies.remove('cart');
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('address');
    Cookies.remove('address2');
    Cookies.remove('zip');
    Cookies.remove('neighborhood');
    Cookies.remove('municipality');
    Cookies.remove('phone');
    signOut();
    
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
    <AuthContext.Provider value={{...state,loginUser,registerUser,logout}}>
        {children}
    </AuthContext.Provider>
  )
}