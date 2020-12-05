class Product {
  constructor(id,productName,quantity, price) {
this.id = id
    this.quantity = quantity;
   this.productName = productName;

   this.price = price;
  }
}

class UI {
  addProduct(product) {
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    let quantiy1 = document.getElementById('quantity').value;
    let price1 = document.getElementById('price').value;
    let ddv = ((quantiy1 * price1)*18 / 100);
    let total = ((quantiy1 * price1)*18 / 100) + (price1 * quantiy1);

    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.productName}</td>
      <td>${product.price}
      <td>${product.quantity}</td>
      <td>${ddv.toFixed(2)}<td>
      <td>${total.toFixed(2)}<td>
  
      <td><a href="#" class="delete">X<a></td>
    `;
  
    list.appendChild(row);
  }

  showAlert(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 2000);
  }

  deleteProduct(target) {
    if(target.className === 'delete') {
      alert('Are you sure you want to delete this item');
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('id').value = '';
    document.getElementById('productName').value = '';
    document.getElementById('quantity').value = '';

    document.getElementById('price').value = '';

  }
}

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get form values
  const id = document.getElementById('id').value,
        productName = document.getElementById('productName').value,
        quantity = document.getElementById('quantity').value,
      price = document.getElementById('price').value;

  // Instantiate book
  const product = new Product(id, price, productName, quantity, );

  // Instantiate UI
  const ui = new UI();



  // Validate
  if(id === '' || productName === '' || quantity === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addProduct(product);

    // Show success
    ui.showAlert('Product  Added!', 'success');
  
    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){

  // Instantiate UI
  const ui = new UI();

  // Delete book
  ui.deleteProduct(e.target);

  // Show message
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});