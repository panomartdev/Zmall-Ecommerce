import React from 'react'
import './CartMessage.scss';
import { correct } from '../../utils/image';

const CartMessage = () => {
  return (
    <div className='cart-message flex align-center justify-center'>
         <div className='cart-message-image flex align-center justify-center'>
            <img src={correct} alt=''/>
         </div>
         <h6 className='message-txt fs-18 fw-5 text-green'>Added to cart successfully!</h6>
    </div>
  )
}

export default CartMessage
