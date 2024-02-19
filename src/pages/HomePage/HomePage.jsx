import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS } from "../../utils/status";
import Hero from '../../components/Hero/Hero';
import './HomePage.scss';
import { fetchAsyncAllProducts, getAllProducts, getAllCategoriesStatus, 
         fetchAsyncExtendProducts, getExtendProductsStatus} from '../../store/productSlice';
import { getAllCategories} from '../../store/categorySlice';
import Loader from '../../components/Loader/Loader';
import Product from '../../components/Product/Product';
import CategoryProductPage from '../CategoryProductPage/CategoryProductPage';
import { setAllCategoriesModalOff } from '../../store/modalSlice';

const HomePage = () => {
  
  document.title = 'Zmall - Online Shopping | Homepage'
  
  const dispatch = useDispatch();
  useEffect(()=>{
     dispatch(fetchAsyncAllProducts(18))
  },[dispatch])
  
  
  const allProducts = useSelector(getAllProducts);
  const categories = useSelector(getAllCategories);
  const allProductsStatus = useSelector(getAllCategoriesStatus);
  const extendProductsStatus = useSelector(getExtendProductsStatus);
  console.log("All Product")
  console.log(allProducts);  
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
     setProducts(allProducts);
  },[allProducts])
  

  const handleLoadMore = () => {
     if (extendProductsStatus !== STATUS.LOADING) {
       dispatch(fetchAsyncExtendProducts(products.length)); // Step 2: Fetch the extendProducts with 'skip' value set as the length of products
     }
   };
   useEffect(() => {
     if (extendProductsStatus === STATUS.LOADING) {
       const updatedProducts = [...products];
       setProducts(updatedProducts)
     }
   }, [extendProductsStatus, products]);

   let catProductsOne = products.filter(product => product.category == categories[1]);
   let catProductsTwo = products.filter(product => product.category == categories[2]);
  
  return (
    <main>
        <div className='slider-wrapper'>
             <Hero/>
        </div>
        <div className='container main-content'>
             <div className='all-products'>
                  <h2 className='main-title text-capitalize'>All Products</h2>
                  {allProductsStatus == STATUS.LOADING ? <Loader/>:<Product products={products}/>}
     
                         {allProducts.length < 100 && allProductsStatus == STATUS.SUCCEEDED ? 
                              <div className='bottom-content flex justify-center flex-column'>
                                   {extendProductsStatus == STATUS.LOADING ? <Loader/>:
                                       <button className='load-more-btn text-uppercase' 
                                       onClick={()=> handleLoadMore()}>
                                       load more
                                       </button>
                                   }
                                   
                              </div>
                         : null}
                 
             </div>

             <div className='all-products'>
                  <h2 className='main-title text-capitalize'>{categories[1]}</h2>
                  {allProductsStatus == STATUS.LOADING ? <Loader/>:<Product products={catProductsOne}/>}
             </div>
             
             <div className='all-products'>
                  <h2 className='main-title text-capitalize'>{categories[2]}</h2>
                  {allProductsStatus == STATUS.LOADING ? <Loader/>:<Product products={catProductsTwo}/>}
             </div>
        </div>     
    </main>
  )
}
export default HomePage