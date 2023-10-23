export function formatPrice(price) {
    return new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

export function discountedPrice(price,discountPercent) {
      let discountedPrice = price - (price * (discountPercent/100))
    return discountedPrice;
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };