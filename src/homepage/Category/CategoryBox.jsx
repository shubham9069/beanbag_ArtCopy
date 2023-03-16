import React, { useContext,useState } from 'react'
import { useNavigate,useLocation ,Link} from 'react-router-dom'
import { AuthContext } from '../../AuthProvider'
import axios from '../../axios'
import Toast from '../../Toast'
import Loader from '../../component/Loader'
import './category.css'
import { motion } from "framer-motion"


const CategoryBox = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {All_Product_Page,Cart,setCart,userToken,} = useContext(AuthContext)
  const [isLoading,setIsLoading]=useState(false)



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

    const getstar =(rating) => {
      var total = 5
      var star =[]
      for(var i=0; i<Math.floor(rating);i++){
          star.push(<div 
              style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', 
              background:"#fed001",
              height:15,
              width:15
              
              }}>
  
              </div>)
      }
      for(var i=0; i<total-rating;i++){
          star.push(<div 
              style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', 
              background:'#D9D1D1',
              height:15,
              width:15
              
              }}>
  
              </div>)
      }
      return star
  }

  return (
    <>
     {isLoading && (<Loader />)}
     
     {!All_Product_Page.length? ""
     :
     <>
      <h2 className="section-heading"  Style={'color: #333;font-weight:400 !important;margin-bottom:3rem'}> <span className="section-heading" style={{color:"#ec1312d1"}}>Category</span> Product</h2>
    <div className=" section-padding category-container" >

    {/* //left div  */}
    <div className='category-left'>
    <div style={{position:'relative',padding:'1rem 0'}}>
<Link to={'/ProductDetails/' + All_Product_Page[0].product_id}  className="link-a">
<motion.img src={All_Product_Page[0]?.images?.length ? All_Product_Page[0]?.images[0] : null} loading="lazy" decoding="async" id="product_img"
 onMouseOver={(e)=>e.currentTarget.src=All_Product_Page[0]?.images?.length ? All_Product_Page[0]?.images[1] : null}
  onMouseOut={(e)=>e.currentTarget.src=All_Product_Page[0]?.images?.length ? All_Product_Page[0]?.images[0] : null}
  initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{opacity:0}}
  ></motion.img> 
<div className='container-icon'  >
  <div className='icon-product'>

  {Cart?.cart_items?.length && (Cart?.cart_items?.find((product) =>product?.item_id == All_Product_Page[0]?.product_id)!=undefined) ? 
  <>
  
  <i class="bi bi-cart-fill" onClick={(e)=>remove_cart(e,All_Product_Page[0]?.product_id)}></i>
  </>
  :
  <i class="bi bi-cart" onClick={(e)=>Add_to_cart(e,All_Product_Page[0]?.product_id)}></i>}

  </div>

  
  <div className='icon-product'  onClick={(e)=>{navigate('/checkout',{state:{productDetails:All_Product_Page[0]}});e.stopPropagation()}}>
  <i class="bi bi-bag"></i>
  </div>
</div></Link>
<div className='between-div m-3 ' >
<p style={{fontWeight: '600',margin:0,}}>{All_Product_Page[0].name}  <span style={{color:'grey'}}>({All_Product_Page[0]?.reviews?.length})</span></p>
<span style={{color:' #fb7676'}}>&#x20B9; {All_Product_Page[0]?.price}</span>
</div>
<p className='product-box-desc' style={{height:'110px'}}  dangerouslySetInnerHTML={{__html: `${All_Product_Page[0]?.description}`}}></p>

</div>
    </div>


   {/* right div   */}
    <div className='category-right '>
    {All_Product_Page?.slice(0,6)?.map((element, index) =>{


return <div style={{position:'relative'}}>
<Link to={'/ProductDetails/' + element.product_id} key={index} className="link-a ">

<motion.img src={element?.images?.length ? element?.images[0] : null} loading="lazy" decoding="async" id="product_img" style={{height:'150px',width:'200px'}}
 onMouseOver={(e)=>e.currentTarget.src=element?.images?.length ? element?.images[1] : null}
  onMouseOut={(e)=>e.currentTarget.src=element?.images?.length ? element?.images[0] : null}
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

  
  <div className='icon-product'  onClick={(e)=>{navigate('/checkout',{state:{productDetails:element}});e.stopPropagation()}}>
  <i class="bi bi-bag"></i>
  </div>
</div></Link>

<p style={{fontWeight: '600',textAlign:'center',margin:'0.5rem',fontSize:'12px'}}>{element.name}</p>
<p style={{color:' #fb7676',textAlign:'center',marginBottom:'0.7rem',fontSize:'12px'}}>&#x20B9; {element?.price}</p>

{element?.reviews?.length ?
  <div className="d-flex" style={{gridGap:7}}>{getstar(element?.reviews?.reduce((a,b)=> a+Number(b.rating),0)/element?.reviews?.length)}{`(${element?.reviews?.length})`}</div>
:<p style={{fontWeight: '600',textAlign:'center',margin:'0.5rem',fontSize:'12px',color:'grey'}}>No Review Found </p>
}
{/* <p className='product-box-desc' dangerouslySetInnerHTML={{__html: `${element?.description}`}}></p> */}

</div>

})}

    </div>
    </div>
   </>}
    </>
  )
}

export default CategoryBox