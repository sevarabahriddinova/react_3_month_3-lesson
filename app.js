function getProducts() {
    var products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}
function addProduct(product) {
    var products = getProducts();
    products.push(product);
    saveProducts(products);
    renderProducts(products);
}
function renderProducts(products) {
    var tableBody = document.querySelector('#product-table tbody');
    tableBody.innerHTML = '';
    products.forEach(function (product) {
        var row = document.createElement('tr');
        var nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        row.appendChild(nameCell);
        var priceCell = document.createElement('td');
        priceCell.textContent = product.price.toFixed(2);
        row.appendChild(priceCell);
        var typeCell = document.createElement('td');
        typeCell.textContent = product.type;
        row.appendChild(typeCell);
        var unitCell = document.createElement('td');
        unitCell.textContent = product.unit;
        row.appendChild(unitCell);
        var dateCell = document.createElement('td');
        dateCell.textContent = product.arrivalDate;
        row.appendChild(dateCell);
        var sourceCell = document.createElement('td');
        sourceCell.textContent = product.source;
        row.appendChild(sourceCell);
        tableBody.appendChild(row);
    });
}
function searchProducts(query) {
    var products = getProducts();
    var filtered = products.filter(function (product) { return product.name.toLowerCase().includes(query.toLowerCase()); });
    renderProducts(filtered);
}
var form = document.getElementById('product-form');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('name').value.trim();
    var price = parseFloat(document.getElementById('price').value);
    var type = document.getElementById('type').value.trim();
    var unit = document.getElementById('unit').value.trim();
    var arrivalDate = document.getElementById('arrivalDate').value;
    var source = document.getElementById('source').value.trim();
    if (name && !isNaN(price) && type && unit && arrivalDate && source) {
        var newProduct = {
            id: Date.now(),
            name: name,
            price: price,
            type: type,
            unit: unit,
            arrivalDate: arrivalDate,
            source: source
        };
        addProduct(newProduct);
        form.reset();
    }
    else {
        alert('Iltimos, barcha maydonlarni to\'ldiring.');
    }
});
var searchInput = document.getElementById('search');
searchInput.addEventListener('input', function () {
    var query = searchInput.value.trim();
    searchProducts(query);
});
document.addEventListener('DOMContentLoaded', function () {
    var products = getProducts();
    renderProducts(products);
});
