import React from 'react'
import { useContext,useEffect } from 'react'
import { useState } from 'react'
import { AuthContext } from '../AuthProvider'
import { Banner,Slickslider,SaleBanner,ShopbyCategory, Service, CategoryBox } from './Exportfile'
import axios from '../axios'
import Toast from '../Toast'
import { AllProduct } from '../component/Exportfiles'
import Loader from '../component/Loader'
import { motion } from 'framer-motion'



const HomePage = () => {
  const {All_Product_Page,homepage,setHomepage,userToken,Catagory} = useContext(AuthContext)
  const {Recommended} = homepage

  
const [isLoading,setIsLoading] = useState(true)

  
  return (
    <>
    
    <Banner  />

    <ShopbyCategory  />
    <Slickslider ImgArr={All_Product_Page} type={2} title={['TODAYS','DEALS']}  /> 
   
   <Service />
    
<CategoryBox/>
    {/* <Slickslider ImgArr={All_Product_Page} type={1}  title={['PORTRAIT','ART']} /> */}
    
  <SaleBanner/>
  <Slickslider ImgArr={All_Product_Page} type={1}  title={userToken? ['RECENT','VIEW']:['BEST','ART']}  /> 
  </>

  )
}

export default HomePage