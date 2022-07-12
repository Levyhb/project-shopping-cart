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

const cartItemClickListener = async (event) => {
  
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};
  
const addToCart = async (event) => {
  const cartItems = document.querySelector('.cart__items');
  const itemsFetch = await fetchItem(getSkuFromProductItem(event.target.parentNode));

  const resultCart = createCartItemElement({
    sku: itemsFetch.id,
    name: itemsFetch.title,
    salePrice: itemsFetch.price,
  });
  cartItems.appendChild(resultCart);
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

window.onload = async () => { await listProducts(); };
