import { FaStar, FaStarHalf } from 'react-icons/fa';
import './Star.scss';

const Star = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key={i}><FaStar/></i>);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<i key={i}><FaStarHalf/></i>);
    } else {
      break;
    }
  }

  return (
    <div className='stars flex fs-12'>
      {stars}
    </div>
  );
};

export default Star;