const getSavedCartItems = () => {
  const storageLocal = localStorage.getItem('cartItems');
  return storageLocal;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
