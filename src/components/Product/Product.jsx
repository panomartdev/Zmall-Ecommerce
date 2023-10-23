import './Product.scss';
import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/tools';
import {FaStar, FaStarHalf} from 'react-icons/fa'
import Star from '../Star/Star';

const Product = ({products}) => {
  return (
    <div className='product-lists'>
        {products.map((product,index) => {
             let discountedPrice = (product.price) - (product.price * (product.discountPercentage / 100))

             return (
                <Link to={`/product/${product.id}/${product.title.toLowerCase()}`} key={index}>
                    <div className='product-item bg-white'>
                        <div className='product-item-image'>
                             <img src={product.images ? (product.images.length > 0 ? product.images[0] : ""):""} alt={product.title}/> 
                        </div>

                        <div className='product-item-information fs-14'>
                            <div className='product-item-title-and-brand my-2'>
                              <div className='product-item-title fw-5 fs-16'>{product.title}</div>
                              <div className='product-item-brand fw-5 my-1'><span className='fw-3'>Brand : </span>{product.brand}</div>
                            </div>                         
                              
                            <div className='product-item-price my-2'>

                              <div className='product-item-discounted-price fs-18 text-orange'>
                                  {formatPrice(discountedPrice)}
                              </div>
                              <div className='product-item-old-price my-1 text-gray'>
                                    <span className='price fs-12'>{formatPrice(product.price)}</span>
                                    <span className='discounted-percent mx-2'>-{product.discountPercentage}%</span>
                              </div>  
                            </div>

                            <div className='product-item-rating flex'>
                                <Star rating={product.rating}/>
                                <p className='star-rating text-gray fs-12'>({product.rating})</p>
                            </div>    
                        </div>

                       
                    </div>
                </Link>
             )
        })}
    </div>
  )
}

export default Product
