import React from 'react'
import './AllCategories.scss';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setAllCategoriesModalOff } from '../../store/modalSlice';

const AllCategories = ({categories}) => {
  const dispatch = useDispatch()
  return (
    <div className='all-categories-modal bg-white'>
        <div className='all-categories-modal-content'>
            {categories.map((category,index) => (
                <Link to={`/category/${category}`} key={index} className='modal-links text-capitalize' onClick={()=> dispatch(setAllCategoriesModalOff())}>
                    {category.replace("-", " ")} 
                </Link>
            ))}
        </div>
    </div>
  )
}

export default AllCategories
