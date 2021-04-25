let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Offermakaren',
        tag: 'Offermakaren',
        price: 45,
        inCart: 0
    },
    {
        name: 'Andra Mysterier',
        tag: 'Andra Mysterier',
        price: 30,
        inCart: 0
    },
    {
        name: 'The Flame',
        tag: 'The Flame',
        price: 25,
        inCart: 0
    },
    {
        name: 'ÖdesMark',
        tag: 'Ödesmark',
        price: 70,
        inCart: 0
    },
    {
        name: 'CreepyPasta',
        tag: 'CreepyPasta',
        price: 30,
        inCart: 0
    },
    {
        name: 'Krokodilväktaren',
        tag: 'Krokodilväktaren',
        price: 55,
        inCart: 0
    },
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            };
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        };
    }
    localStorage.setItem("productsInCart", JSON.stringify
        (cartItems));
}

function totalCost(product) {
    //console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
        (".products");

    let cartCost = localStorage.getItem('totalCost');
    let y = displayShipping(cartCost);

    console.log(cartItems);
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="products">
                <ion-icon name="close-circle"></ion-icon>
                <img src="./images/${ item.tag }.jpeg">
                <span>${ item.name }</span>
            </div>
            <div class="price">${ item.price }</div> 
            <div class="quantity">
                <ion-icon class="decrease "
                name="caret-back-circle"></ion-icon>
                <span>${ item.inCart }</span>
                <ion-icon class="increase "
                name="caret-forward-circle"></ion-icon>
            </div>
            <div class="total">
                $${ item.inCart * item.price },00
            </div>    
            `;
        });

        productContainer.innerHTML += `
            <div class="booksTotalContainer">
                <h4 class="booksTotalTitle"> Books Total Purchase </h4>
                <h4 class="bookTotal">$${ cartCost },00</h4>
                <h4 class="free shipping">${ y }</h4>
            </div>
        `;
    }
}

function displayShipping(amount) {
    let display = "";
    let x;

    if (amount > 200) {
        return "You have a free shipping";
    }
    else {
        x = 200 - amount;
        return "You need " + x + " to have a free shipping !";
    }

}


onLoadCartNumbers();
displayCart();
