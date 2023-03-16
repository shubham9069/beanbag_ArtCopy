import React ,{useState,useEffect, useContext} from 'react'
import './Allproduct.css';
import {bottomRight} from '../../homepage/asset/Export'
import { Link,useNavigate, useParams,useLocation } from 'react-router-dom';
import Toast from '../../Toast';
import axios from '../../axios';
import { AuthContext } from '../../AuthProvider';
import Categoryleft from './Categoryleft';
import Loader from '../Loader';
import { motion } from "framer-motion"


const AllProduct = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {All_Product_Page,Catagory,userToken,Cart,setCart} = useContext(AuthContext);
  const [SortArr,setSortArr]=useState(null)
  const [Toggle,setToggle]=useState(false)
  const [isLoading,setIsLoading]=useState(false)
  const {catid} = useParams()



  // =========sort by dropown=========
const sortby=(e)=>{
  // console.log(e.target.value);
 
  var data = [...All_Product_Page];

if(e.target.value=="name"){
 
  data?.sort((a,b)=>{ return a?.name< b?.name &&(1) })
  console.log(data )
  
}
if(e.target.value=="priceL_to_H"){
    
   data.sort((a,b)=>{ return a?.price-b?.price })
  
}
if(e.target.value=="priceH_to_L"){
    
   data.sort((a,b)=>{ return b?.price-a?.price })
  
}

setSortArr(data)

}
 



//  ----------------------------add to cart --------------------

const Add_to_cart= async(e,id) =>{
  e.preventDefault()
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


  //REMOVE CART 
  
  const remove_cart= async(e,product_id) =>{
    e.preventDefault()
    try{
      setIsLoading(true)
      const response= await axios({
        method: "post",
       url:'/remove-cart',
       data:{product_id},
       headers:{
        Authorization:`Bearer ${userToken}`
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
    {isLoading &&(<Loader />)}
  <div className="all-product section-padding">


  {/* ----------------top----------------- */}
    <div className="allproduct-top">
      
    <div id="filter-toggle" onClick={()=>{setToggle(!Toggle)}}>Filter by </div>
      <select onClick={sortby} >
      <option value="" selected >Recommended</option>
        <option value="priceL_to_H">price Low to High</option>
        <option value="priceH_to_L">price High To Low </option>
        
      
        
      </select>
    </div>
    
<div className=" d-flex" style={{gridGap:'10px'}}>
    {/* --------------left---------------- */}
    <div id="abovewidth_650"> <Categoryleft sort={SortArr} setSortArr={setSortArr} toggle={true} catid={catid}  /></div>

    <div id="belowwidth_650"><Categoryleft sort={SortArr} setSortArr={setSortArr} toggle={Toggle} catid={catid} /></div>
  
 

{/* ===================right================= */}
    <div className="allproduct-right">

    { 
    SortArr?.length ? SortArr?.map((element, index) =>{


return <div style={{position:'relative'}}>
<Link to={'/ProductDetails/' + element.product_id} key={index} className="link-a">
<motion.img src={element?.images?.length ? element?.images[0] : null} loading="lazy" decoding="async" id="product_img" 

  initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{opacity:0}}
 ></motion.img> 
<div className='container-icon'  id={`icon`+index} >
  <div className='icon-product' >
  {Cart?.cart_items?.length && (Cart?.cart_items?.find((product) =>product?.item_id == element?.product_id)!=undefined) ? 
  <>
  
  <i class="bi bi-cart-fill" onClick={(e)=>remove_cart(e,element?.product_id)}></i>
  </>
  :
  <i class="bi bi-cart" onClick={(e)=>Add_to_cart(e,element?.product_id)}></i>}


  </div>
 

  <div className='icon-product'  onClick={(e)=>{e.preventDefault();navigate('/checkout',{state:{productDetails:element}});}}>

  <i class="bi bi-bag"></i>
  </div>

</div></Link>
<div className='between-div m-3'>
<p style={{fontWeight: '600',margin:0,}}>{element?.name} <span style={{color:'grey'}}>({element?.reviews?.length})</span></p>
<span style={{color:' #fb7676'}}>&#x20B9; {element?.price}</span>
</div>
<p className='product-box-desc' dangerouslySetInnerHTML={{__html: `${element?.description}`}}></p>

</div>
    })
    : SortArr==null? All_Product_Page?.map((element, index) =>{


return <div style={{position:'relative'}}>
<Link to={'/ProductDetails/' + element.product_id} key={index} className="link-a">
<motion.img src={element?.images?.length ? element?.images[0] : null} loading="lazy" decoding="async" id="product_img" 

  initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{opacity:0}}
 ></motion.img> 
<div className='container-icon'  id={`icon`+index}>
  <div className='icon-product'>

  {Cart?.cart_items?.length && (Cart?.cart_items?.find((product) =>product?.item_id == element?.product_id)!=undefined) ? 
  <>
  
  <i class="bi bi-cart-fill" onClick={(e)=>remove_cart(e,element?.product_id)}></i>
  </>
  :
  <i class="bi bi-cart" onClick={(e)=>Add_to_cart(e,element?.product_id)}></i>}

  </div>

  
  <div className='icon-product'  onClick={(e)=>{e.preventDefault();navigate('/checkout',{state:{productDetails:element}})}}>
  <i class="bi bi-bag"></i>
  </div>
</div></Link>
<div className='between-div m-3'>
<p style={{fontWeight: '600',margin:0,}}>{element.name} <span style={{color:'grey'}}>({element?.reviews?.length})</span></p>
<span style={{color:' #fb7676'}}>&#x20B9; {element?.price}</span>
</div>
<p className='product-box-desc' dangerouslySetInnerHTML={{__html: `${element?.description}`}}></p>

</div>

})
:"no product found "

    }

  </div>

  </div>
  </div>

    </>
  )
}

export default AllProduct