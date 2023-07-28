var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var addBtn = document.getElementById("addBtn");
var inputs = document.getElementsByClassName("form-control");
var currentIndex = 0;
var products = [];
if (JSON.parse(localStorage.getItem("product")) != null) {
  products = JSON.parse(localStorage.getItem("product"));
  displayProduct();
}

addBtn.onclick = function () {
  if (addBtn == "Add Product") {
    addProduct();
  } else {
    updateProduct();
  }

  displayProduct();
  resetForm();
};
function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescInput.value,
  };
  products.push(product);
  localStorage.setItem("product", JSON.stringify(products));
  displayProduct();
}
function displayProduct() {
  var cartona = "";

  for (var i = 0; i < products.length; i++) {
    cartona += `
         
         <tr>
           <td>${products[i].name}</td> 
           <td>${products[i].price}</td>
           <td>${products[i].category}</td>
           <td>${products[i].desc}</td> 
           <td><button onClick="getProductInfo(${i})" class="btn btn-outline-warning text-white">Update</button></td>
           <td><button onClick='deleteProduct(${i})' class="btn btn-outline-danger text-white">Delete</button></td>
            </tr>
         
         `;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}
function deleteProduct(index) {
  products.splice(index, 1);
  displayProduct();
  localStorage.setItem("product", JSON.stringify(products));
}
function getProductInfo(index) {
  currentIndex = index;
  var currentProduct = products[index];
  productNameInput.value = currentProduct.name;
  productPriceInput.value = currentProduct.price;
  productCategoryInput.value = currentProduct.category;
  productDescInput.value = currentProduct.desc;
  addBtn.innerHTML = "Update Product";
}
function updateProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescInput.value,
  };
  products[currentIndex] = product;
  localStorage.setItem("product", JSON.stringify(products));
}
function search(searchTxt) {
  var cartona = "";

  for (var i = 0; i < products.length; i++) {
    if (products[i].name.toLowerCase().includes(searchTxt.toLowerCase())) {
      cartona += `
         
            <tr>
              <td>${products[i].name}</td> 
              <td>${products[i].price}</td>
              <td>${products[i].category}</td>
              <td>${products[i].desc}</td> 
              <td><button class="btn btn-outline-warning text-white">Update</button></td>
              <td><button onClick='deleteProduct(${i})' class="btn btn-outline-danger text-white">Delete</button></td>
               </tr>
            
            `;
    }
  }
  document.getElementById("tableBody").innerHTML = cartona;
}
function resetForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}
var nameAlert=document.getElementById('nameAlert');
productNameInput.onkeyup=function(){
  var nameRejex=/^[A-Z][a-z]{2,8}$/
  if(nameRejex.test(productNameInput.value)){
    addBtn.removeAttribute('disabled');
    productNameInput.classList.add('is-valid');
    productNameInput.classList.remove('is-invalid');
    nameAlert.classList.add('d-none')
  }else{
    addBtn.disabled=true;
    productNameInput.classList.add('is-invalid');
    productNameInput.classList.remove('is-valid');
    nameAlert.classList.remove('d-none')
  }
}

var priceAlert=document.getElementById('priceAlert');
productPriceInput.onkeyup=function(){
  var nameRejex=/^[0-9]{3,9}$/
  if(nameRejex.test(productPriceInput.value)){
    addBtn.removeAttribute('disabled');
    productPriceInput.classList.add('is-valid');
    productPriceInput.classList.remove('is-invalid');
    priceAlert.classList.add('d-none')
  }else{
    addBtn.disabled=true;
    productPriceInput.classList.add('is-invalid');
    productPriceInput.classList.remove('is-valid');
    priceAlert.classList.remove('d-none')
  }
}