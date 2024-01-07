let cartItems = [];

function addToCart(itemName, imgFormat) {
  const item = {
    name: itemName,
    imgSrc: `images/${itemName}.${imgFormat}`  // Предполагается, что изображения находятся в папке images
  };
  cartItems.push(item);
  updateCart();
}

function updateCart() {
  const cartItemsModal = document.getElementById('cart-items-modal');
  cartItemsModal.innerHTML = '';

  if (cartItems.length === 0) {
    const emptyCartMessage = document.createElement('p');
    emptyCartMessage.textContent = 'Your cart is empty.';
    cartItemsModal.appendChild(emptyCartMessage);
  } else {
    cartItems.forEach((item, index) => {
      const listItem = document.createElement('li');
      const img = document.createElement('img');
      img.src = item.imgSrc;
      img.alt = item.name;
      img.setAttribute('data-img-src', item.imgSrc);
      const itemName = document.createTextNode(item.name);

      const deleteButton = document.createElement('span');
      deleteButton.className = 'delete-item';
      deleteButton.innerHTML = '&times;';
      deleteButton.onclick = function() {
        removeFromCart(index);
      };

      listItem.appendChild(img);
      listItem.appendChild(itemName);
      listItem.appendChild(deleteButton);
      cartItemsModal.appendChild(listItem);
    });
  }
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCart();
}

function clearCart() {
  cartItems = [];
  updateCart();
}

function openCart() {
  const cartModal = document.getElementById('cartModal');
  const overlay = document.getElementById('overlay');
  document.querySelector('.cart').classList.add('active');
  overlay.style.display = 'block';
  cartModal.style.display = 'block';
  populateCartModal();
}

function closeCart() {
  const cartModal = document.getElementById('cartModal');
  const overlay = document.getElementById('overlay');
  document.querySelector('.cart').classList.remove('active');
  overlay.style.display = 'none';
  cartModal.style.display = 'none';
}

function populateCartModal() {
  // ... (your existing code for populating the cart modal)
}

function checkout() {
  // ... (your code for handling checkout)
}
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    const overlay = document.getElementById('overlay');
    const cartContainer = document.querySelector('.cart');
  
    if (cartContainer.classList.contains('active')) {
      closeCart();
    } else {
      openCart();
    }
  }
  const allProducts = document.querySelectorAll('.product');

// Функция для скрытия всех продуктов
function hideAllProducts() {
  allProducts.forEach(product => {
    product.style.display = 'none';
  });
}

// Функция для отображения найденных продуктов
function showProducts(results) {
  results.forEach(result => {
    result.style.display = 'block';
  });
}

// Функция поиска продуктов
function searchProducts() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value.toLowerCase();

  // Если строка поиска пуста, отобразить все продукты
  if (searchTerm === '') {
    allProducts.forEach(product => {
      product.style.display = 'block';
    });
    return;
  }

  // Иначе скрыть все продукты и отобразить только те, которые соответствуют поисковому запросу
  const searchResults = Array.from(allProducts).filter(product => {
    const productName = product.querySelector('h3').textContent.toLowerCase();
    return productName.includes(searchTerm);
  });

  hideAllProducts();
  showProducts(searchResults);
}
// Добавьте следующий код в ваш файл script.js

// Функция для обработки изменения выбранной категории
function filterProducts() {
  const categorySelector = document.getElementById('category');
  const selectedCategory = categorySelector.value;

  allProducts.forEach(product => {
    const productCategory = product.classList[1]; // Получаем класс категории продукта

    if (selectedCategory === 'all' || productCategory === selectedCategory) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

// Назначьте эту функцию на событие изменения значения в select
document.getElementById('category').addEventListener('change', filterProducts);
const products = [
  "Product 1",
  "Product 2",
  "Product 3",
  // Добавьте здесь названия других продуктов
];

function getProductsFromHTML() {
  const productElements = document.querySelectorAll('.product');
  const products = Array.from(productElements).map(productElement => {
    return productElement.getAttribute('data-product-name');
  });
  return products;
}

function showSuggestions() {
  const searchInput = document.getElementById('searchInput');
  const suggestionsContainer = document.getElementById('suggestions-container');
  const searchTerm = searchInput.value.toLowerCase();

  suggestionsContainer.innerHTML = '';

  if (searchTerm.length > 0) {
    const products = getProductsFromHTML();
    const filteredProducts = products.filter(product => product.toLowerCase().includes(searchTerm));

    filteredProducts.forEach(product => {
      const suggestionItem = document.createElement('div');
      suggestionItem.textContent = product;
      suggestionItem.addEventListener('mousedown', (event) => {
        event.preventDefault();
        selectProduct(product, suggestionsContainer); // Передаем suggestionsContainer в функцию
      });
      suggestionsContainer.appendChild(suggestionItem);
    });

    if (filteredProducts.length === 0) {
      const noResults = document.createElement('div');
      noResults.textContent = 'No results found';
      suggestionsContainer.appendChild(noResults);
    }
  }
}

function selectProduct(product, suggestionsContainer) {
  const searchInput = document.getElementById('searchInput');
  searchInput.value = product;
  suggestionsContainer.innerHTML = '';
  // Вызываем searchProducts после выбора продукта
  searchProducts();
}
document.getElementById('searchInput').addEventListener('focus', function() {
  document.getElementById('suggestions-container').style.display = 'block';
});

document.getElementById('searchInput').addEventListener('blur', function() {
  document.getElementById('suggestions-container').style.display = 'none';
});