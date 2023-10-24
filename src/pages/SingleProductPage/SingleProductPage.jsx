import './SingleProductPage.scss';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchAsyncSingleProduct, getSingleProduct, getSingleProductStatus } from '../../store/productSlice'
import { STATUS } from '../../utils/status'
import Loader from '../../components/Loader/Loader'
import Star from '../../components/Star/Star';
import {formatPrice } from '../../utils/tools';
import {FaMinus, FaPlus} from 'react-icons/fa'
import { addToCart, getCartMessageStatus, setCartMessageOff, setCartMessageOn } from '../../store/cartSlice';
import CartMessage from '../../components/Modal/CartMessage';

const SingleProductPage = () => {
  const {id,title} = useParams()
  const dispatch = useDispatch()

  const productSingle = useSelector(getSingleProduct);
  const productSingleStatus = useSelector(getSingleProductStatus);
  const cartMessageStatus = useSelector(getCartMessageStatus);
  const [imgIndex,setImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const titlePage = title.charAt(0).toUpperCase() + title.slice(1);
  
  useEffect(()=>{
      dispatch(fetchAsyncSingleProduct(id));
  },[id])

  console.log(productSingle);

  let discountedPrice = (productSingle.price) - (productSingle.price * (productSingle.discountPercentage / 100))

  const increaseQty = () => {
      setQuantity((prevQty) => {
          let tempQty = prevQty + 1;
          if(tempQty > productSingle.stock){
            tempQty = productSingle.stock;
          }
          return tempQty
      })
  }
  const decreaseQty = () => {
    setQuantity((prevQty) => {
        let tempQty = prevQty - 1;
        if(tempQty == 0){
          tempQty = 1;
        }
        return tempQty
    })
  }
  const addToCartHandler = (productSingle) => {
     let totalPrice = quantity * discountedPrice;
     dispatch(addToCart({...productSingle, quantity: quantity, totalPrice, discountedPrice}))
     
     dispatch(setCartMessageOn());
     setTimeout(()=>{
        dispatch(setCartMessageOff());
     },2000)
  }
  document.title = `Zmall - Online Shopping | ${titlePage}`

  return (
    <main className='py-5'>
        <div className='product-single'>
            <div className='container'>
                 {productSingleStatus == STATUS.LOADING ? <Loader/>:
                    <div className='product-single-content bg-white'>
                        <div className='product-single-content-left'>
                            <div className='product-img'>
                                {/*Main Image*/}
                                <div className='product-img-zoom'>
                                    {productSingle.images ? (
                                        <img src={productSingle.images[imgIndex]} alt=""/>
                                    ):null}
                                </div>

                                {/*Image Thumbs*/}
                                <div className='product-img-thumbs flex align-center my-2'>
                                           {
                                            productSingle.images ? (
                                                productSingle.images.map((item,index)=>(
                                                    <div className='thumb-item' key={index}>
                                                        <img src={item} className='thumb-item-img' onClick={()=>setImgIndex(index)}/>
                                                    </div>
                                                ))
                                            ): null
                                           }
                                </div>
                            </div>
                        </div>

                        <div className='product-single-content-right'>
                             <div className='title'>
                                  <p className='fs-22'>{productSingle.title}</p>
                             </div>

                             <div className='rating flex align-center'>
                                   <Star rating={productSingle.rating}/>
                                   <span className='rating-number fs-12'>{productSingle.rating} Ratings</span>
                             </div>

                             <div className='brand'>
                                   <p className='fs-12 text-graya'>Brand: <span>{productSingle.brand}</span></p>
                             </div>

                             <div className='horizontal-line'/>

                             <div className='price'>
                                  <p className='discounted-price'>{formatPrice(discountedPrice)}</p>
                                  <p className='original-price'><span >{formatPrice(productSingle.price)}</span>-{Math.round(productSingle.discountPercentage)}%</p>
                             </div>

                             <div className='horizontal-line'/>

                             <div className='quantity flex align-center'>
                                  <p className='quantity-text fs-14'>Quantity</p>

                                  <div className='quantity-change flex align-center'>
                                        <button type='button' 
                                               className='quantity-decrease flex align-center justify-center'
                                               onClick={()=> decreaseQty()}>
                                               <i className='minus-icon'><FaMinus/></i>
                                        </button>

                                        <div className='quantity-value flex align-center justify-center mx-3'>{quantity}</div>

                                        <button type='button' 
                                               className='quantity-increase flex align-center justify-center'
                                               onClick={()=> increaseQty()}>
                                               <i className='minus-icon'><FaPlus/></i>
                                        </button>
                                  </div>
                             </div>

                             {productSingle.stock == 0 ? (<p className='out-of-stock text-danger'>Out of Stock</p>):
                             (
                                <div className='bottom-buttons flex align-center'>
                                    <button type='button' className='buy-now-button bg-yellow text-white fs-16'>Buy Now</button>
                                    <button type='button' className='add-to-cart-button bg-orange text-white fs-16'
                                     onClick={()=> addToCartHandler(productSingle)}>
                                        Add To Cart
                                    </button>
                                </div>
                             )}
                        </div>

                        {cartMessageStatus && <CartMessage/>}
                    </div>
                 }
            </div>
        </div>
    </main>
  )
}

export default SingleProductPage
