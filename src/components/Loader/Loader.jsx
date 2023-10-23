import React from 'react'
import "./loader.scss";
import { loader } from '../../utils/image'

const Loader = () => {
  return (
    <div className='container'>
        <div className='loader'>
              <img src={loader} alt='loader'/>
        </div>
    </div>
  )
}

export default Loader
