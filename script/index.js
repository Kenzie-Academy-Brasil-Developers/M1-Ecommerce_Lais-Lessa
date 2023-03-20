const productsCartList = document.querySelector("#ul_cart");
const productsClassList = document.querySelectorAll(".cart-products");
const cartList = document.querySelectorAll(".cart-list");
const cartEmpty = document.querySelector(".cart-empty");
const filter = document.querySelectorAll(".header-menu li");
const productsList = document.querySelector("#list-cards");
let fav_counts = 0;


for (let i = 0; i < data.length; i++) {
    renderProductCards(data[i].id, data[i].img, data[i].tag, data[i].nameItem, data[i].description, data[i].value);
}

// Função que vai renderizar a vitrine!!
function renderProductCards(id, image, tag, nameItem, description, value) {

    let liCards = document.createElement('li');
    let img = document.createElement('img');
    let pTag = document.createElement('p');
    let pNameItem = document.createElement('p');
    let pDescription = document.createElement('p');
    let pValue = document.createElement('p');
    let btnAddCart = document.createElement('button');

    liCards.id = id;
    img.src = image;
    pTag.textContent = tag;
    pNameItem.textContent = nameItem;
    pDescription.textContent = description;
    pValue.textContent = "R$" + value;
    btnAddCart.textContent = "Adicionar ao carrinho";


    liCards.classList.add("li_cards_css");
    img.classList.add("images");
    pNameItem.classList.add('pNameItem');
    pDescription.classList.add('pDescription');
    pValue.classList.add('pValue');
    btnAddCart.classList.add('productButton');


    liCards.appendChild(img);
    liCards.appendChild(pTag);
    liCards.appendChild(pNameItem);
    liCards.appendChild(pDescription);
    liCards.appendChild(pValue);
    liCards.appendChild(btnAddCart);
    productsList.appendChild(liCards);

    //Chamando a Função de adicionar itens no carrinho.
    addItensToCarts(btnAddCart);
};



// Função Para Adicionar Itens no carrinho!
function addItensToCarts(btnAddCart) {

    btnAddCart.addEventListener('click', function (e) {
        cartEmpty.classList.add("hide");
        let productCart = e.target.parentElement;
        let productImage = productCart.querySelector("img").src;
        let productTitle = productCart.querySelector(".pNameItem").textContent;
        let productValue = productCart.querySelector(".pValue").textContent;

        if (isProductCart(productTitle)) {
            alert("Produto já adicionado!")
            return false;
        }

        fav_counts++;
        document.querySelector('#favQuantity').innerHTML = fav_counts;

        cardCarts(productImage, productTitle, productValue);

        //Função que atualiza o total.
        totalUpdate();

    });

};


// Função que vai renderizar os produtos para o carrinho.
for (let i = 0; i < data.length; i++) {

    function cardCarts(image, nameItem, value) {
        let liCart = document.createElement('li');
        let imgCart = document.createElement('img');
        let titleCart = document.createElement('h3');
        let paragraphValue = document.createElement('p');
        let btnRemove = document.createElement('button');

        imgCart.src = image;
        titleCart.textContent = nameItem;
        paragraphValue.innerText = value;
        btnRemove.innerText = "Remover";

        productsCartList.classList.add("cart-list");
        liCart.classList.add("cart-products")
        paragraphValue.classList.add("price-products");
        btnRemove.classList.add("btn_remove");
        titleCart.classList.add("item-name");

        liCart.appendChild(imgCart);
        liCart.appendChild(titleCart);
        liCart.appendChild(paragraphValue);
        liCart.appendChild(btnRemove);
        productsCartList.appendChild(liCart);

        cartRemove(btnRemove);
    };

};

//Função do botão remover
function cartRemove(btnRemove) {
    btnRemove.addEventListener('click', function (event) {
        let listPath = event.composedPath();
        listPath[1].remove();

        fav_counts--;
        document.querySelector('#favQuantity').innerHTML = `${fav_counts}`;


        if (productsCartList.children.length == 0) {
            cartEmpty.classList.remove("hide");
        }

        totalUpdate();

    });

};

// Função para verificar se o produto já está no carrinho.
function isProductCart(productTitle) {
    let element = document.querySelectorAll(".item-name");
    for (let i = 0; i < element.length; i++) {
        if (element[i].textContent == productTitle) {
            return true;
        }
    };
    return false;
};


// Função que atualiza o valor total.
function totalUpdate() {
    let totalPrice = 0;
    let productsCarts = document.getElementsByClassName("cart-products");
    let totalPriceValue = document.getElementById("price_total");

    for (let i = 0; i < productsCarts.length; i++) {
        let productsPrice = productsCarts[i].querySelectorAll(".price-products");
        for (let j = 0; j < productsPrice.length; j++) {
            let priceNum = parseFloat(productsPrice[j].innerText.replace("R$", ""));

            totalPrice += priceNum;
        }
    }
    totalPriceValue.innerHTML = "R$" + totalPrice;
};


// função e evento de filtragem
for (let i = 0; i < filter.length; i++) {
    filter[i].addEventListener('click', function (event) {
        let getText = event.target.textContent;

        filterProducts(getText);

    });
};



// Evento e função de pesquisa
let productAll = productsList.children;
let productsFiltered = [];
let searchButton = document.querySelector(".search-button");

searchButton.addEventListener('click', eventSearch);
let input = document.querySelector(".search-input");

function eventSearch() {

    if (input.value == "") {
        alert("Digite o que você deseja pesquisar!");

    } else {
        for (let i = 0; i < productAll.length; i++) {

            let productName = productAll[i].querySelector(".pNameItem").textContent.toLocaleLowerCase()

            if (productName.includes(input.value.toLocaleLowerCase())) {
                productsFiltered.push(productAll[i]);
            }
        }

        if (productsFiltered.length == 0) {
            alert("Nenhum Produto Encontrado!");
        } else {
            for (let i = 0; i < productsFiltered.length; i++) {
                productsList.innerHTML = "";

                productsList.appendChild(productsFiltered[i]);
            };
        };
    };
};

//Função para quando o input for limpo, renderize todos os cards na tela.
input.addEventListener("change", cleaning);

function cleaning() {
    if (input.value == "") {
        productsList.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
            let productsAll = data[i];

            renderProductCards(productsAll.id, productsAll.img, productsAll.tag, productsAll.nameItem, productsAll.description, productsAll.value);
        };
    };
};


// função para filtrar os produtos para não repetir no carrinho.
function filterProducts(getText) {
    productsList.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        product = data[i];
        if (product.tag.includes(getText)) {
            renderProductCards(product.id, product.img, product.tag, product.nameItem, product.description, product.value);
        }
        if (getText == "Todos") {
            productsList.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                let productsAll = data[i];

                renderProductCards(productsAll.id, productsAll.img, productsAll.tag, productsAll.nameItem, productsAll.description, productsAll.value);
            };
        };
    };
};