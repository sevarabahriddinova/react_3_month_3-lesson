
interface Product {
    id: number;
    name: string;
    price: number;
    type: string;
    unit: string;
    arrivalDate: string; 
    source: string;
}


function getProducts(): Product[] {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}


function saveProducts(products: Product[]): void {
    localStorage.setItem('products', JSON.stringify(products));
}


function addProduct(product: Product): void {
    const products = getProducts();
    products.push(product);
    saveProducts(products);
    renderProducts(products);
}


function renderProducts(products: Product[]): void {
    const tableBody = document.querySelector('#product-table tbody') as HTMLTableSectionElement;
    tableBody.innerHTML = ''; 
    products.forEach(product => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = product.price.toFixed(2);
        row.appendChild(priceCell);

        const typeCell = document.createElement('td');
        typeCell.textContent = product.type;
        row.appendChild(typeCell);

        const unitCell = document.createElement('td');
        unitCell.textContent = product.unit;
        row.appendChild(unitCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = product.arrivalDate;
        row.appendChild(dateCell);

        const sourceCell = document.createElement('td');
        sourceCell.textContent = product.source;
        row.appendChild(sourceCell);

        tableBody.appendChild(row);
    });
}


function searchProducts(query: string): void {
    const products = getProducts();
    const filtered = products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
    renderProducts(filtered);
}


const form = document.getElementById('product-form') as HTMLFormElement;
form.addEventListener('submit', (e: Event) => {
    e.preventDefault();


    const name = (document.getElementById('name') as HTMLInputElement).value.trim();
    const price = parseFloat((document.getElementById('price') as HTMLInputElement).value);
    const type = (document.getElementById('type') as HTMLInputElement).value.trim();
    const unit = (document.getElementById('unit') as HTMLInputElement).value.trim();
    const arrivalDate = (document.getElementById('arrivalDate') as HTMLInputElement).value;
    const source = (document.getElementById('source') as HTMLInputElement).value.trim();

    if (name && !isNaN(price) && type && unit && arrivalDate && source) {
        const newProduct: Product = {
            id: Date.now(),
            name,
            price,
            type,
            unit,
            arrivalDate,
            source
        };

        addProduct(newProduct);

       
        form.reset();
    } else {
        alert('Iltimos, barcha maydonlarni to\'ldiring.');
    }
});


const searchInput = document.getElementById('search') as HTMLInputElement;
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    searchProducts(query);
});


document.addEventListener('DOMContentLoaded', () => {
    const products = getProducts();
    renderProducts(products);
});
