const cartItems = document.querySelector('.cart__items');
const cartElement = document.querySelector('.cart');
const containerElement = document.querySelector('.container-items');
const priceElement = document.querySelector('.total-price');
const priceCartElement = document.querySelector('.price_cart');
const myCartElement = document.querySelector('.container-cartTitle');
const count = document.querySelector('.count');
const iconCart = document.querySelector('.cart-icon');
const divSearch = document.querySelector('.div-search');
const productSearch = document.querySelector('.product-search');
const btnSearch = document.querySelector('.btn-search');

let btnRemove;

const applyCart = () => {
  iconCart.addEventListener('click', () => {
  if (cartElement.style.display === 'none') {
    divSearch.style.display = 'none';
    containerElement.style.flexDirection = 'row';
    cartElement.style.display = 'flex';
    priceCartElement.style.display = 'flex';
    myCartElement.style.display = 'flex';
    count.style.display = 'none';
  } else {
    containerElement.style.flexDirection = 'column';
    divSearch.style.display = 'block';
    cartElement.style.display = 'none';
    priceCartElement.style.display = 'none';
    myCartElement.style.display = 'none';
    count.style.display = 'flex';
  }
  });
};
applyCart();

const numberOfItens = () => {
  if (cartItems.childNodes === '') count.innerHTML = 0;
  else {
    count.innerHTML = cartItems.childNodes.length;
  }
};

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

const totalPrices = () => {
  const itemsPrice = cartItems.childNodes;
  if (itemsPrice.length === 0) priceElement.innerHTML = 0;
  const values = [];
  itemsPrice.forEach((element) => {
    const price = element.innerHTML.split('$');
    values.push(parseFloat(price[1]));
  });
  return values;
};
const sumPrices = async () => {
  const sum = totalPrices().reduce((acc, cur) => acc + cur);
  priceElement.innerHTML = `R$ ${(sum.toFixed(2))}`;
  localStorage.setItem('cartPrice', priceElement.innerHTML);
  numberOfItens();
};

const createProductItemElement = ({ sku, name, image, price }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${price} `));
  section.appendChild(createCustomElement('button', 'item__add', '🛒 Adicionar ao carrinho!'));
  return section; 
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = async (event) => {
  event.target.parentElement.parentElement.remove();
  saveCartItems(cartItems.innerHTML);
  sumPrices();
  numberOfItens();
};

const createCartItemElement = ({ name, salePrice, thumb }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  const div = document.createElement('div');
  div.className = 'div-cart-item';
  const title = createCustomElement('span', 'title-item-cart', name);
  const price = createCustomElement('span', 'price-item-cart', `R$ ${salePrice}`);
  const img = createProductImageElement(thumb);
  btnRemove = createCustomElement('span', 'btn-remove', 'x');
  li.appendChild(div);
  div.appendChild(img);
  div.appendChild(title);
  div.appendChild(btnRemove);
  li.appendChild(price);

  btnRemove.addEventListener('click', cartItemClickListener);
  return li;
};

const addToCart = async (event) => {
  const itemsFetch = await fetchItem(getSkuFromProductItem(event.target.parentNode));

  const resultCart = createCartItemElement({
    sku: itemsFetch.id,
    name: itemsFetch.title,
    salePrice: itemsFetch.price,
    thumb: itemsFetch.thumbnail,
  });
  cartItems.appendChild(resultCart);
  
  saveCartItems(cartItems.innerHTML);
  sumPrices();
  numberOfItens();
};

const addedItems = () => {
    const itemAdd = document.querySelectorAll('.item__add');
    itemAdd.forEach((item) => item.addEventListener('click', addToCart));
};
  
const listProducts = async (param) => {
  const sectItens = document.querySelector('.items');
  const products = await fetchProducts(param);

  products.results.forEach((pc) => {
    const itemList = createProductItemElement({
      sku: pc.id,
      name: pc.title,
      image: pc.thumbnail,
      price: pc.price,
    });
    sectItens.appendChild(itemList);
  });
  addedItems();
};

const removeAllItens = () => {
  const cleanBtn = document.querySelector('.empty-cart');
  cleanBtn.addEventListener('click', () => {
    cartItems.innerHTML = '';
    if (cartItems.innerHTML === '') {
      count.innerHTML = 0;
      priceElement.innerHTML = 0;
    } 
    saveCartItems(cartItems.innerHTML);
  });
};
removeAllItens();

const getLocalStorage = () => {
  const storage = getSavedCartItems();
  cartItems.innerHTML = storage;
  sumPrices();
  numberOfItens();
};

const getAllItems = () => {
  const btnRemoveItems = document.querySelectorAll('.btn-remove');
  btnRemoveItems.forEach((event) => {
    event.addEventListener('click', cartItemClickListener);
  });
};

divSearch.style.display = 'none';
cartElement.style.display = 'none';
myCartElement.style.display = 'none';
containerElement.style.display = 'block';

const loading = (param) => {
  const loadingMessage = document.querySelector('.loading');
  loadingMessage.style.display = 'block';
  divSearch.style.display = 'none';

  setTimeout(async () => {
    containerElement.style.display = 'flex';
    loadingMessage.style.display = 'none';
    divSearch.style.display = 'block';
    listProducts(param);
    getLocalStorage();
    getAllItems();
  }, 1500);
};

let searchItems = 'computador';
  const newProducts = () => {
  const itemsSection = document.querySelector('.items');
  btnSearch.addEventListener('click', () => {
    while (itemsSection.firstChild) {
      itemsSection.firstChild.remove();
    }
    if (productSearch.value === '') searchItems = 'computador';
    else {
      searchItems = productSearch.value;
    }
    loading(searchItems);
  });
  };
  newProducts();

window.onload = async () => {
  loading(searchItems); 
};
