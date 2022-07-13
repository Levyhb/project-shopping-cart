const cartItems = document.querySelector('.cart__items');
const cartElement = document.querySelector('.cart');
const containerElement = document.querySelector('.container');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  cartItems.removeChild(event.target);
  saveCartItems(cartItems.innerHTML);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addToCart = async (event) => {
  const itemsFetch = await fetchItem(getSkuFromProductItem(event.target.parentNode));

  const resultCart = createCartItemElement({
    sku: itemsFetch.id,
    name: itemsFetch.title,
    salePrice: itemsFetch.price,
  });
  cartItems.appendChild(resultCart);
  saveCartItems(cartItems.innerHTML);  
};

const addedItems = () => {
    const itemAdd = document.querySelectorAll('.item__add');
    itemAdd.forEach((item) => item.addEventListener('click', addToCart));
};
  
  const listProducts = async () => {
  const sectItens = document.querySelector('.items');
  const products = await fetchProducts('computador');
  
  products.results.forEach((pc) => {
    const itemList = createProductItemElement({
      sku: pc.id,
      name: pc.title,
      image: pc.thumbnail,
    });
    sectItens.appendChild(itemList);
  });
  addedItems();
};
const removeAllItens = () => {
  const cleanBtn = document.querySelector('.empty-cart');
  cleanBtn.addEventListener('click', () => {
    cartItems.innerHTML = '';
    saveCartItems(cartItems.innerHTML);
  });
};
removeAllItens();

const getLocalStorage = () => {
const storage = getSavedCartItems();
cartItems.innerHTML = storage;
};
const getAllItems = () => {
const cartItemsElement = document.querySelectorAll('.cart__item');
cartItemsElement.forEach((event) => {
  event.addEventListener('click', cartItemClickListener);
});
};

const loading = () => {
const loadingMessage = document.createElement('h2');
loadingMessage.innerText = 'Carregando...';
loadingMessage.className = 'loading';
cartElement.style.display = 'none';
containerElement.style.display = 'block';
containerElement.appendChild(loadingMessage);

setTimeout(() => {
  containerElement.style.display = 'flex';
  containerElement.removeChild(loadingMessage);
  cartElement.style.display = 'flex';
  listProducts();
  getLocalStorage();
  getAllItems();
}, 1000);
};

window.onload = async () => {
  loading();
};
