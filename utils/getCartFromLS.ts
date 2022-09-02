export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');

  const items = data ? JSON.parse(data).items : [];

  return {
    items,
  };
}