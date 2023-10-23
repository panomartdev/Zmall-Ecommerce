import './Footer.scss';
import { payments,delivery,instagram} from '../../utils/image';
import {FaFacebook,FaLinkedin,FaYoutube,FaTiktok} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className='bg-white py-2'>
        <div className='container my-4'>
              <div className='footer-main-content'>
                    <div className='payment-cnt'>
                          <p className='footer-title'>Payment Methods</p>
                          <div className='flex align-center'>
                                 <div className='payment-cnt-img'>
                                      <img src={payments} alt=''/>
                                  </div>
                          </div>
                    </div>

                    <div className='delivery-cnt'>
                          <p className='footer-title'>Delivery Services</p>

                          <div className='delivery-cnt-img'>
                               {delivery.map((image,index)=>(
                                  <img src={image} key={index} alt=''/>
                               ))}
                          </div>
                    </div>

                    <div className='contact-cnt'>
                        <p className='footer-title'>Follow Us</p>

                        <div className='contact-cnt-icons'>
                             <i><FaFacebook/></i>
                             <i><FaLinkedin/></i>
                             <i><FaYoutube/></i>
                             <img src={instagram} alt=''/>
                             <i><FaXTwitter/></i>
                             <i><FaTiktok/></i>
                        </div>
                    </div>
              </div>
              <div className='footer-bottom-content flex justify-center'>
                  <p className='fs-18 fw-3'>&copy; 2023 Zmall. All Rights Reserved.</p>
              </div>
        </div>  
    </footer>
  )
}

export default Footer