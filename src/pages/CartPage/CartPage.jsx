import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './CartPage.scss';
import { clearCart, getAllCarts, getCartTotal, removeFromCart, toggleCartQty } from '../../store/cartSlice';
import { Link } from 'react-router-dom';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import {FaTrashCan, FaTrash} from 'react-icons/fa6';
import { formatPrice } from '../../utils/tools';

const CartPage = () =>{
  document.title = 'Zmall - Online Shopping | Cart'

  const dispatch = useDispatch();
  const carts = useSelector(getAllCarts);
  const {itemsCount, totalAmount} = useSelector((state) => state.cart);
  const shippingFee = 10;
  const netAmount = totalAmount + shippingFee;
  console.log(carts);


  return (
    <div className='cartpage'>
      <div className='container my-4'>
          {itemsCount ==  0 ? (
            <div className='empty-cart flex justify-center align-center flex-column'>
                  <p className='empty-cart-text text-gray fs-14'>There are no items in this cart</p>
                  <Link to='/' className='empty-cart-btn text-uppercase fs-14'>Continue shopping</Link>                
            </div>
          ):(
            <div className='cart'>
                <div className='cart-products-list'>
 
                    <div className='table-head bg-white py-2 px-2 flex justify-between align-center'>

                         <h2 className='table-head-title fs-20 text-gray'>Cart Products</h2>

                         <button className='clear-cart-btn text-uppercase fs-14 flex align-center justify-center'
                          onClick={()=> dispatch(clearCart())}>
                              <i><FaTrash/></i><span>Clear Carts</span>
                         </button>

                    </div> 

                    <div className='table-body'>
                        {carts.map((item,index) => {
                           return(
                            <div className='products-item bg-white py-2 px-1 my-2' key={index}>
                                 <button className='delete-btns flex align-center justify-center text-uppercase text-gray'
                                  onClick={()=> dispatch(removeFromCart(item.id))}>
                                     <FaTrashCan/>
                                 </button>
                                   <div className='products-item-list table-row'>                              
                                        <div className='products-item-list-informations'>
                                             <div className='products-item-list-informations-img'>
                                                  <img src={item.images ? (item.images.length > 0 ? item.images[0]:""):""}/>
                                             </div>
                                             <div className='products-item-list-informations-text'>
                                                  <p className='products-title fw-6 fs-15'>{item.title}</p>
                                                  <p className='products-des fw-3 fs-13'>{item.description}</p>
                                            </div>
                                        </div>
                                        <div className='products-item-list-unitprice'>
                                             <span className='unitprice fs-18 fw-3 text-black'>{formatPrice(item.discountedPrice)}</span>
                                        </div>
                                        <div className='products-item-list-quantity-and-total-price'>
                                             <div className='quantity-list'>
                                                  <div className='quantity-change flex align-center'>
                                                       <button type='button' 
                                                        className='quantity-decrease flex align-center justify-center'
                                                        onClick={()=> dispatch(toggleCartQty(dispatch({id: item.id, type: "DECREASE"})))}>
                                                            <AiOutlineMinus/>
                                                       </button>

                                                       <div className='quantity-value flex align-center justify-center mx-3'>{item.quantity}</div>

                                                       <button type='button' 
                                                       className='quantity-increase flex align-center justify-center'
                                                       onClick={()=> dispatch(toggleCartQty(dispatch({id: item.id, type: "INCREASE"})))}>
                                                              <AiOutlinePlus/>
                                                       </button>
                                                  </div>
                                             </div>
                                       </div>
                                       <div className='total-price fs-22 fw-4 text-orange'>
                                                  {formatPrice(item.totalPrice)} 
                                            </div>
                                   </div>   
                            </div>
                           )  
                        })}
                    </div>        
                </div>
                {/*Summary*/}
                <div className='cart-summary bg-white'>
                     <p className='cart-summary-title fs-18'>Order Summary</p>

                     <div className='horizontal-line'/>

                     <div className='cart-summary-text flex align-center justify-between fs-14'>
                          <p className='text-gray'>Subtotal ({itemsCount} items)</p>
                          <p className='subtotal-amount fs-18'>{formatPrice(totalAmount)}</p>
                     </div>
                     <div className='cart-summary-text flex align-center justify-between fs-14'>
                          <p className='text-gray'>Shipping Fee</p>
                          <p className='shipping-amount fs-18'>{formatPrice(shippingFee)}</p>
                     </div>

                     <div className='cart-summary-voucher flex justify-center'>
                          <input type='text' placeholder='Enter Voucher Code' className=''></input>
                          <button className='voucher-apply-btn text-uppercase text-white'>Apply</button>
                     </div>

                     <div className='cart-summary-total flex align-center justify-between fs-14'>
                          <p className='text-black'>Total</p>
                          <p className='total-price text-orange fs-18'>{formatPrice(netAmount)}</p>
                     </div>
                     <div className='cart-summary-vat-txt flex justify-end my-3'>
                          <p className='fs-12'>VAT included, where applicable</p>
                     </div>

                     <div className='cart-summary-checkout-btn'>
                          <button className='fs-14 text-uppercase'>Proceed to Checkout({itemsCount})</button>
                     </div>
                </div>
            </div>
          )}

      </div>
    </div>
  )
}
export default CartPage

