import { useParams } from 'react-router-dom';
import './CategoryProductPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncProductsByCategory, getAllProductsByCategory, getAllProductsByCategoryStatus } from '../../store/categorySlice';
import { useEffect } from 'react';
import { STATUS } from '../../utils/status';
import Loader from '../../components/Loader/Loader';
import Product from '../../components/Product/Product';

const CategoryProductPage = ({homeCategory}) => {
  const dispatch = useDispatch();
  const {category} = useParams();
  const fetchCategory = category ? category : homeCategory;
  const categoryProducts = useSelector(getAllProductsByCategory);
  const categoryProductsStatus = useSelector(getAllProductsByCategoryStatus);
  const categoryTitle = category.split('-')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ');

  console.log(categoryProducts);
  console.log(categoryProductsStatus);

  useEffect(() => {
     dispatch(fetchAsyncProductsByCategory(category));
  },[category]);

  document.title = `Zmall - Online Shopping | ${categoryTitle}`

  return (
    <main>
        <div className='container'>
            <div className='category-products-content'>
                <h2 className='main-title text-capitalize'><span className='text-capitalize'>{category.replace('-',' ')}</span></h2>

                {categoryProductsStatus == STATUS.LOADING ? <Loader/>: <Product products={categoryProducts}/>}
            </div>
        </div>        
    </main>
  )
}

export default CategoryProductPage
