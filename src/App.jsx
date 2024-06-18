import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import CartPage from './pages/CartPage/CartPage';
import { Provider } from 'react-redux';
import store from './store/store';
import CategoryProductPage from './pages/CategoryProductPage/CategoryProductPage';
import SingleProductPage from './pages/SingleProductPage/SingleProductPage';
import SearchPage from './pages/SearchPage/SearchPage';

function App() {
  
  return (
    <div className='app'>
      <Provider store = {store}>
        <BrowserRouter>
            <Header/>       
              <Routes>
                  <Route path='/' element = {<HomePage/>}/>
                  <Route path='/cart' element = {<CartPage/>}/>
                  <Route path='/category/:category' element = {<CategoryProductPage/>}/>
                  <Route path='/product/:id/:title' element = {<SingleProductPage/>}/> 
                  <Route path='search/:searchTerm' element = {<SearchPage/>}/>  
              </Routes>
            <Footer/>  
        </BrowserRouter>
      </Provider>  
    </div>
  
  )
}

export default App
