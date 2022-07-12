require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toEqual('function')
  })
  test('Verifica se ao chamar a função "fetchItens" com o parametro "MLB1615760527", o fetch é chamado', () => {
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledTimes(1)
  })
  test('Testa se ao chamar a função "fetchItem" com o parâmetro "MLB1615760527" a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527".', () => {
    fetchItem('MLB1615760527');
    const endpoint = "https://api.mercadolibre.com/items/MLB1615760527";
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })
  test('Testa se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto "item", já importado no arquivo .', async () => {
    expect(await fetchItem('MLB1615760527'))
      .toEqual(item)
  })
  test('Verifica se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url".', async () => {
    const received = await fetchItem()
    expect(received).toEqual('You must provide an url')
  })
});

