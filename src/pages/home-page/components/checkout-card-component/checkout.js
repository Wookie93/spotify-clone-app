export const ProccedToCheckout = () => {
  const submitButton = document.querySelector('#checkout-button');
  const cancelButton = document.querySelector('#cancel-button');

  submitButton.addEventListener('click', () => {
    submitButton.setAttribute('data-loading', '1');
    submitButton.setAttribute('disabled', 'disabled');
    cancelButton.setAttribute('disabled', 'disabled');
    getBasketInfo();
  });
};

const getBasketInfo = () => {
  const products = [...document.querySelectorAll('[data-product-id]')].map(
    (item) => {
      const id = item.getAttribute('data-product-id');
      const name = item.querySelector('.product-name').textContent;
      const details = item.querySelector('.product-details').textContent;
      const productPrice = +item
        .querySelector('[data-product-price]')
        .getAttribute('data-product-price');

      return {
        id: id,
        name: name,
        details: details,
        productPrice: productPrice,
      };
    }
  );

  const totalPrice = calculateTotalPrice(products);

  console.log({
    products: products,
    totalBasketPrice: totalPrice,
  });

  return {
    products: products,
    totalBasketPrice: totalPrice,
  };
};

const calculateTotalPrice = (products) => {
  return products.reduce((total, item) => total + item.productPrice, 0);
};
