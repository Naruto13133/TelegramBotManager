import React from 'react'
import App from '../../App'
import { useSelector } from 'react-redux'
import ApiKeyGetter from '../ApiKeyGetterComponent/ApiKeyGetter'



const Home = () => {
    const arrayOfServices = useSelector((state) =>  state.telegram.services );
let a = false;


  arrayOfServices.forEach((obj) => {
    if (obj.serviceName === "Telegram"){
      if(a == false) a = true;
  }})


  return (
    <div className='mt-10'>
      {  true? <App/> : <ApiKeyGetter/> }
    </div>
  )
}

export default Home
