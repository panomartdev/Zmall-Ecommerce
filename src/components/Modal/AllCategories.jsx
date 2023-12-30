import React, { useEffect, useRef } from 'react';
import './AllCategories.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAllCategoriesModalOff } from '../../store/modalSlice';

const AllCategories = ({ categories }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (!modalRef.current.contains(event.target)) {
      dispatch(setAllCategoriesModalOff());
    }
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className='all-categories-modal bg-white' ref={modalRef}>
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