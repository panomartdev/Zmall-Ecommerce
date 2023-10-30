import { Link } from 'react-router-dom';
import {FaMagnifyingGlass} from 'react-icons/fa6';
import { GiShoppingBag } from 'react-icons/gi';
import { HiOutlineShoppingCart } from 'react-icons/hi2'
import './Header.scss';
import Navigation from '../Navigation/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories} from '../../store/categorySlice';
import { getAllCarts, getCartItemCount, getCartTotal } from '../../store/cartSlice';
import { useEffect, useState } from 'react';
import AllCategories from '../Modal/AllCategories';
import { getModalAllCategories } from '../../store/modalSlice';

const Header = () => {
  const itemsCount = useSelector(getCartItemCount);
  const dispatch = useDispatch()
  const allCateModalStatus = useSelector(getModalAllCategories);
  const carts = useSelector(getAllCarts);
  const [searchTerm,setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getCartTotal());
  }, [carts])
    
  const categories = useSelector(getAllCategories);

  const handleSearchTerm = (e) => {
      e.preventDefault();
      setSearchTerm(e.target.value);
  }
  const handleKeyPress = (e) => {
      if(e.key == "Enter" && searchTerm.length > 0) {
        e.preventDefault();   
        location.href = `/search/${searchTerm}`;
      }
  }

  return (
    <header className='header'>
        {/*Top Header*/}
        <div className='header-top bg-whitesmoke'>
              <div className='container'>
                    <ul className='top-header-list'>
                        <li className='text-uppercase text-black'>save more on app</li>
                        <li className='text-uppercase text-black'>sell on zmall</li>
                        <li className='text-uppercase text-gray'>customer care</li>
                        <li className='text-uppercase text-gray'>track my order</li>
                        <li className='text-uppercase text-gray'>login</li>
                        <li className='text-uppercase text-gray'>signup</li>
                    </ul>
              </div>
        </div>
        {/*Main Header*/} 
        <div className='header-main bg-white'>
            <div className='header-main-content container'>
                {/*Title*/} 
                <Link to='/' className='brand-title text-maincolor fw-9'>
                      <div className='brand-title-txt'>
                           Z
                           <span className='fw-4'>mall.</span>
                      </div>
                      <span className='brand-title-icn'><GiShoppingBag/></span>
                </Link>
                {/*Search Bar*/}  
                
                    <div className='search-bar w-100'>
                        <input type='text'
                             className='search-form'
                             placeholder='Search in Zmall'
                             value={searchTerm}
                             onChange={(e) => handleSearchTerm(e)}
                             onKeyDown={(e) => handleKeyPress(e)}
                        >
                        </input>

                        <Link to={`/search/${searchTerm}`} className='search-button flex align-center justify-center'>
                            <FaMagnifyingGlass/>
                        </Link>
                    </div>  
                

                <div className='cart'>
                      <Link to='/cart' className='cart-btn'>
                            <i className='cart-icon text-maincolor'>
                                 <HiOutlineShoppingCart/>
                                 <div className='cart-value fw-5'>{itemsCount}</div>
                            </i>
                      </Link>
                </div>
            </div>
        </div>
        {/*Category Navigation*/}
        <Navigation categories={categories}/>
        <div className='all-categories container'>
              {allCateModalStatus && <AllCategories categories={categories}/>}
        </div>
    </header>
  )
}
export default Header;
