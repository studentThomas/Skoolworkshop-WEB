export async function updateQuantity(productId: string, newQuantity: number) {
  await fetch(`https://skoolworkshop.up.railway.app/api/stock/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      quantity: newQuantity
    }),
  });
}
