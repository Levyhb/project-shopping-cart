require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Verifica se "fetchProducts" é uma função', () => {
    expect(typeof fetchProducts).toEqual('function')
  })
  it('Verifica se ao executar a função "fetchProducts" com o paramêtro "computador", fetch é chamado ', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1)
  })
  it('Verifica se ao executar a função "fetchProducts" com o paramêtro "computador", o endpoint retornado é "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    fetchProducts('computador')
    const endpoint = "https://api.mercadolibre.com/sites/MLB/search?q=computador"
    expect(fetch).toHaveBeenCalledWith(endpoint)
  })
  it('Verifica se ao passar "computador" como parâmetro da função fetchProducts, retorna uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect(await fetchProducts('computador')).toStrictEqual(computadorSearch)
  })
  it('Testa se ao chamar a função "fetchProducts" sem parâmetro, retorna um erro', async () => {
    const received = await fetchProducts()
    expect(received).toEqual('You must provide an url')
  })
});
