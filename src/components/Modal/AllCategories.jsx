import React, { useEffect, useRef } from 'react';
import './AllCategories.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllCategoriesModalOff, setAllCategoriesModalOn, getModalAllCategories } from '../../store/modalSlice';

const AllCategories = ({ categories }) => {

  const allCateModalStatus = useSelector(getModalAllCategories);
  const dispatch = useDispatch();


  // const handleClickOutside = (event) => {
  //   if (!modalRef.current.contains(event.target)) {
  //     dispatch(setAllCategoriesModalOff());
  //   }
  // };

  // useEffect(() => {

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  return (
    <div className='all-categories-modal bg-white' >
      <div className='all-categories-modal-content'>
        {categories.map((category, index) => (
          <Link
            to={`/category/${category}`}
            key={index}
            className='modal-links text-capitalize'
            onClick={() => dispatch(setAllCategoriesModalOff())}
          >
            {category.replace("-", " ")}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;