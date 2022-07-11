const fetchProducts = async (item) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
  try {
    const requisicao = await fetch(url);
    const response = await requisicao.json();
    return response;
  } catch (error) {
    return 'You must provide an url';
  } 
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
