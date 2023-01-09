console.log('client');

const listOfEntries = document.querySelector('#list-of-entries');
const bidForm = document.querySelector('#bid-form');
// console.log('🚀 ~ bidForm', document.forms);

if (listOfEntries) {
  listOfEntries.addEventListener('click', async (event) => {
    const deleteId = event.target.dataset.delete;
    if (!deleteId) {
      return;
    }
    const response = await fetch(`/items/${deleteId}`, {
      method: 'DELETE',
    });
    const responseJson = await response.json();

    if (!responseJson.isDeleteSuccessful) {
      const errorContainer = document.querySelector('#error-container');
      errorContainer.innerText = responseJson.errorMessage || 'Что-то пошло не так...';
      errorContainer.classList.remove('hidden');
      return;
    }

    const currentLi = listOfEntries.querySelector(`#list${deleteId}`);
    currentLi.remove();
  });
}
if (bidForm) {
  bidForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const price = bidForm.querySelector('#bid-input').value;
    const { itemid } = bidForm.dataset;

    const response = await fetch(`/items/${itemid}/bid`, {
      method: 'POST',
      body: JSON.stringify({ price }),
      headers: { 'Content-type': 'application/json' },
    });

    if (response.ok) {
      const divItem = document.querySelector('.entry-item');
      const bidDiv = document.createElement('div');
      bidDiv.innerText = `Ваша ставка: ${price} рублей!`;
      divItem.append(bidDiv);
      bidForm.remove();
    }
  });
}
