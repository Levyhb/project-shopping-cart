const fetchItem = async (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;
  
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
    fetchItem,
  };
}
