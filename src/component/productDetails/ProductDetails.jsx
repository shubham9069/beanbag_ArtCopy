import React,{useEffect,useState,useContext,useRef} from 'react'
import './ProductDetails.css'
import Productimg from '../assest/Rectangle 3980.png'
import {bottomRight} from '../../homepage/asset/Export'
import { Link,useNavigate,useParams ,useLocation} from 'react-router-dom';
import Toast from '../../Toast'
import axios from '../../axios';
import { AuthContext } from '../../AuthProvider';
import Loader from '../Loader';
import { Review } from '../../pages/exportfiles';
import { Slickslider } from '../../homepage/Exportfile';


const ProductDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const readmore = useRef(null);
  const {userToken,All_Product_Page,Cart,setCart,userData,homepage,setHomepage} = useContext(AuthContext)
  const {Recommended} = homepage
  const [isLoading,setIsLoading] = useState(true);
  const {id} = useParams()
  const [productDetails, setProductDetails] = useState([]);
  const [imgstate,setImageState]=useState("")
  
  


  const readMore=(e)=>{
    var span = document.getElementById("showdesc")
console.log(readmore)
    if(readmore.current.style['overflow']=="hidden"){
      readmore.current.style['overflow'] = "visible"
      readmore.current.style['height'] = "fit-content"
      span.innerText="Show Less"
      
    }   
    else{
      readmore.current.style['overflow'] = "hidden"
      readmore.current.style['height'] = "130px"
      span.innerText="Show More"
    } 
  }



  



  const get_details = async (url,type) => {
    
    try {
      const response = await axios({
        method: "get",
        url: url,
      });

      if (response.status === 200) {
        const data = response?.data;
        if(type=="product"){
          setProductDetails(data?.product)
          setImageState(data?.product?.images?.length &&(data?.product?.images[0]) )
          console.log(data?.product)
        }
        else{
          setHomepage((p)=>({...p,["Recommended"]:data?.products}))
        }
       

        //   Toast(data.message,response.status)
      }
    } catch (err) {
      const error = err?.response?.data;
      Toast(error?.message);
    }
    finally{
      setIsLoading(false);
    }
  };


  useEffect(()=>{
    get_details(`/get_product?product_id=${id}`,'product')
    !Recommended?.length? get_details('/get_recommanded_products'):setIsLoading(false)
    
  },[id])
  const Add_to_cart= async(e,id) =>{
e.preventDefault();
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
  
    const getstar =(rating) => {
      var total = 5
      var star =[]
      for(var i=0; i<Math.floor(rating);i++){
          star.push(<div 
              style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', 
              background:"#fed001",
              height:20,
              width:20
              
              }}>
  
              </div>)
      }
      for(var i=0; i<total-rating;i++){
          star.push(<div 
              style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', 
              background:'#D9D1D1',
              height:20,
              width:20
              
              }}>
  
              </div>)
      }
      return star
  }

    //REMOVE CART 
  
    const remove_cart= async(e,product_id) =>{
      e.preventDefault();
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
  <div className="product-details section-padding">

<div className="product-details-left ">
  <img src={imgstate} loading="lazy"/>
  <div  style={{}}>
  {productDetails?.images?.map((element)=>{

    return <img src={element} 
    style={{width:60,height:60,margin:'0.5rem 1rem',boxShadow:' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'}}
    onClick={()=>setImageState(element)}  loading="lazy"></img>
  })}
  
  </div>
</div>

<div className="product-details-right ">
  <h2>{productDetails?.name}</h2>

{productDetails?.reviews?.length ?
  <div className="d-flex" style={{gridGap:7}}>{getstar(productDetails?.reviews?.reduce((a,b)=> a+Number(b.rating),0)/productDetails?.reviews?.length)}{`(${productDetails?.reviews?.length})`}</div>
:<p>No Review Found </p>
}
 


  <h3>&#x20B9; {productDetails?.price}</h3>
  <p>{productDetails?.short_description}</p>
  <div>
    <p>size : {productDetails?.size}</p>
    <p>Mediam: {productDetails?.medium}</p>
    <p>Code  : {productDetails?.product_id}</p>
    <p>Orientation : {productDetails?.orientation==1?"Landscape":"Portrait"}</p>
    <p>frame: {productDetails?.style}</p>
  </div>
  <p id="description-text" style={{overflow:'hidden',height:'130px'}} ref={readmore} dangerouslySetInnerHTML={{__html: `${productDetails?.description}`}}/> <span onClick={readMore} id="showdesc" style={{color:'#fb7676',cursor:'pointer' }}>Show More </span>
  <div className="d-flex" style={{gridGap:'20px'}}>
  {Cart?.cart_items?.length && (Cart?.cart_items?.find((product) => product?.item_id == productDetails?.product_id)!=undefined) ? 
  <>
    {/* <Link to="/cart" className="white-product-btn link-a link-a">Already added Click</Link> */}
    <i class="bi bi-cart-fill" onClick={() =>navigate('/cart')} style={{color:'#fb7676'}}></i>
    </>
    :
<button  className="themeButton link-a"  onClick={(e)=>Add_to_cart(e,productDetails?.product_id)} >Add to Cart</button>}
<button  className="white-themeButton link-a"  onClick={()=>navigate('/checkout',{state:{productDetails}})}>buy Now</button>
</div>
</div>
  </div>
  <Review reviewArr={productDetails?.reviews}/>

{/* product of bottom */}
{/* <div className="section-padding" Style={'padding-top:1rem !important; max-width: 1800px, margin:0 auto' }>
<p style={{ fontSize:'1.7rem', fontWeight:600}}>ALSO<span style={{color:'#fb7676',fontWeight:600}}> LIKE</span> </p>
  <div className="allproduct-right">
  {All_Product_Page?.slice(0,6)?.map((element, index) =>{


return <div  style={{position:'relative'}}>
<Link to={'/productDetails/' + element.product_id} key={index} className="link-a">
<img src={element?.images?.length ? element?.images[0] : null} loading="lazy" id="product_img"></img> 
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
<div className='between-div m-3'>
<p style={{fontWeight: '600',margin:0,}}>{element.name}</p>
<span style={{color:'#fb7676'}}>&#x20B9; {element?.price}</span>
</div>
<p className='product-box-desc' dangerouslySetInnerHTML={{__html: `${element?.description}`}}></p>
<div className='d-flex between-div' style={{ gridGap:'20px',marginBottom:'1rem',padding:'0 1rem'}}>


</div>
</div>

})}
</div>
</div> */}

<Slickslider ImgArr={Recommended} type={1}  title={['RECOMMENDED','VIEW']}  /> 

    </>
  )
}

export default ProductDetails