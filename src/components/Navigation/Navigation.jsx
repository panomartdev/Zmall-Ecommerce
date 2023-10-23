import './Navigation.scss';
import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, fetchAsyncCategories } from '../../store/categorySlice';
import AllCategories from '../Modal/AllCategories';
import { getModalAllCategories, setAllCategoriesModalOff, setAllCategoriesModalOn } from '../../store/modalSlice';

const Navigation = ({categories}) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchAsyncCategories());
  },[dispatch])
  
  const allCateModalStatus = useSelector(getModalAllCategories);
  const randomCategories = useMemo(() => {
    return categories
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
 },[categories])

  const toggleCategoriesModal = () => {
      if (!allCateModalStatus) {
          dispatch(setAllCategoriesModalOn());
      }else{
          dispatch(setAllCategoriesModalOff());
      }
  }
  
  return (
    <nav className='bg-maincolor'>
      <div className='nav-cnt container text-white'>
        {/*All Categories*/}
        <button className='nav-all-cat fw-4 fs-16 text-white' onClick={()=> toggleCategoriesModal()}>
                Categories
                <div className={`arrow ${allCateModalStatus == true ? "open":""}`}></div>
        </button>
        {/*4 Categories Randomly*/}
        <ul className='nav-navbar'>
          {randomCategories.slice(0,4).map((category, index) => (
            <li className='nav-list' key={index}>
                <Link to={`/category/${category}`} className='nav-list-link text-capitalize text-white fs-14 fw-4'>
                    {category.replace("-", " ")}
                </Link>
            </li> 
          ))} 
      </ul>
    </div>
  </nav>
  )
}

export default Navigation;

