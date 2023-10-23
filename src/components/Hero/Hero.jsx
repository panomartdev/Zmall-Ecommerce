import './Hero.scss';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { sliderImgs } from '../../utils/image';
import {BsShieldFillCheck} from 'react-icons/bs';
import {IoPricetags} from 'react-icons/io5';
import {ImLoop2} from 'react-icons/im';

const Hero = () => {
  let settings = {
      infinite: true,
      speed: 1000,
      fade: true,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true
  }
  return (
    <div className='hero-slider'>
         {/*Image Slider*/}
         <div className='slider-content'>
              <Slider {...settings}>
                       {sliderImgs.map((image,index)=>(
                          <div className='slider-items' key={index}>
                               <img src={image} alt='image01' className='slider-img'/>
                          </div>
                       ))}
              </Slider> 
         </div>
         {/*Bottom Statement*/}
         <div className='hero-bottom py-2'>
               <div className='hero-bottom-content container'>
                         <ul className='statement text-white flex fs-15 justify-end'>
                              <li className='statement-list flex align-center'>
                                   <BsShieldFillCheck/>
                                   <p>100% Authentic</p>   
                              </li>

                              <li className='statement-list flex align-center'>
                                   <IoPricetags/>
                                   <p>Best Price</p>
                              </li>

                              <li className='statement-list flex align-center'>
                                   <ImLoop2/>
                                   <p>Free Return</p>
                              </li>
                         </ul>
                    
               </div> 
         </div>
    </div>
  )
}

export default Hero
