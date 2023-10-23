import React, { useEffect } from 'react'
import './SearchPage.scss';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchAsyncSearchProducts, getSearchProducts, getSearchProductsStatus } from '../../store/searchSlice';
import { STATUS } from '../../utils/status';
import Loader from '../../components/Loader/Loader';
import Product from '../../components/Product/Product';

const SearchPage = () => {
    const dispatch = useDispatch();
    const {searchTerm} = useParams();
    const searchProducts = useSelector(getSearchProducts);
    const searchProductsStatus = useSelector(getSearchProductsStatus);

    useEffect(()=>{
        dispatch(fetchAsyncSearchProducts(searchTerm));
    },[searchTerm])

  return (
    <main className='search-page'>
        {searchProducts.length == 0 ? (
            <div className='container'>
                <h3 className='fw-5 text-danger py-5 text-center'>No Products Found</h3>
            </div>
        ):(
            <div className='search-content'>
                <div className='container'>
                    <div className='py-1'>
                          <h2 className='main-title'>Search Result : </h2>
                          <br/>
                          {searchProductsStatus == STATUS.LOADING ? (<Loader/>):(<Product products = {searchProducts}/>)}
                    </div>
                </div>
            </div>
        )}
    </main>
  )
}

export default SearchPage
