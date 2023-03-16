import React,{useState,useContext,useEffect} from 'react'

import Carousel from 'react-bootstrap/Carousel'
import './Banner.css'
import { AuthContext } from '../../AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../../axios'
import Toast from '../../Toast'

import { motion } from 'framer-motion'




const Banner = () => {
  const navigate = useNavigate();
  const {homepage,setHomepage,setCart,userToken} = useContext(AuthContext)
  const {Banner} = homepage
  const location =useLocation()
  const [isLoading,setIsLoading] =useState(false)
    const [crrItem, setCrrItem] = useState(0)

   

    const get_all= async(url,type) =>{

      try{
        setIsLoading(true)
        const response= await axios({
          method: "get",
         url:url,
         })
         
         if(response.status===200){
          const data = response.data;
          
            setHomepage((p)=>({...p,["Banner"]:data?.banners}))
           
  
          }
          
        //   Toast(data.message,response.status)
         
       }
       catch(err){
        const error = err.response.data
        Toast(error.message);
        
  
  
       }
       finally{
        setIsLoading(false)
       }
      }
  
      useEffect(()=>{
       !Banner.length? get_all('/get_all_banners','banner'):setIsLoading(false)
        
       
      },[])
      const Add_to_cart= async(id) =>{

        if(!userToken) return navigate('/Login',{state:{from :location} })
        const Form = new FormData()
        Form.append("product_id",id)
        Form.append("qty",1)
        try{
          setIsLoading(true)
          const response= await axios({
            method: "post",
           url:'/add-to-cart',
           data:Form,
           headers:{
            Authorization:`Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
            
           }
           })
           
           if(response.status===200){
            const data = response.data;
            setCart(data)
            Toast(data.message,response.status)
           }
         }
         catch(err){
          const error = err.response.data
          Toast(error.message);
          
      
      
         }
         finally{
          setIsLoading(false)
         }
        } 
   
  return (
<>
<motion.div
initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        default: {
          duration: 0.3,
          ease: [0, 0.71, 0.2, 1.01]
        },
        scale: {
          type: "spring",
          damping: 5,
          stiffness: 100,
          restDelta: 0.001
        }
      }}>

<Carousel variant="dark" prevIcon={<i class="bi bi-arrow-left-circle" Style={'font-size:3vw !important; color:white'}></i>}  nextIcon={<i class="bi bi-arrow-right-circle" Style={'font-size:3vw !important; color:white'}></i>} interval={2000} >
 
{/* <div >
    <h2 style={{}}>{Banner[0]?.title} </h2>
    <p style={{}}>{Banner[0].description}</p>
    <div className='d-flex' style={{ gridGap:'20px'}}>
    <button className="white-btn-design" onClick ={()=>navigate('/ProductDetails/' + Banner[0].product_id)}>Buy Now </button>
    <button className="white-btn-design" >Wishlist Here </button>
    </div>
</div>  */}

     
      
      {Banner?.map((element)=>{
         return <Carousel.Item  className="text-banner">
        <img
        onClick={()=>navigate('/ProductDetails/' + element?.product_id)}
          className="d-block w-100"
          loading="lazy"
          src={element?.image}
          alt="Third slide"
          style={{maxWidth:'3000px',maxHeight:'60vh',objectFit: 'cover'}}
        />
        
        {/* <div className="bannerbg2">
           <div >
    <h2 style={{}}>{element?.title} </h2>
    <p style={{}}>{element.description}</p>
    <div className='d-flex' style={{ gridGap:'20px'}}>
    <button className="white-btn-design" onClick={()=>Add_to_cart(element?.product_id)} >Add to cart </button>
    <button className="white-btn-design" onClick={()=>navigate('/ProductDetails/'+element?.product_id)}> view</button>
    </div>
</div>  
        </div> */}
        
       
      </Carousel.Item>
      })}
      
    </Carousel>

</motion.div>



</>

  )
}

export default Banner