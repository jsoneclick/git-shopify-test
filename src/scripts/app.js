const gridwrapper = document.querySelector(".grid");
const limit = 12;
const apiURL = `https://voodoo-sandbox.myshopify.com/products.json?limit=${limit}`;
const toggleInfo = document.querySelector(".info_container");
const closeCart = document.querySelector(".fa-solid");
const openCart = document.querySelector(".cartBtn");
const cartWrapper = document.querySelector(".shoppingCartWrapper");
const items = document.querySelector(".cartItems");

let cart = [
    {
        name: "",
        price: "",
        quantity: ""
    }
];

function hideCart(cartOpened) {
    cartOpened == 0 ? cartWrapper.style.right = "-100%" : cartWrapper.style.right = "0";
}

toggleInfo.addEventListener('click', showHideInfo);

function showHideInfo() {
    const element = document.getElementById("info-content");
    element.classList.toggle("info-shown");
}

    async function fetchProducts() {
            try {
                const response = await fetch(apiURL);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                const products = data.products || [];
                products.forEach((product) => {
                    const variants = product.variants || [];
                    const price = variants.length > 0 ? variants[0].price : 'N/A';
                    const gridTile = document.createElement("div");
                    gridTile.classList.add("flex");
                    gridTile.classList.add("justify-center");

                    gridTile.innerHTML = `
                            <div class="frame">
                                <div class="previewImg">
                                    <div>Used</div>
                                    ${product.id}
                                </div>
                                <div class="description">
                                    <h2 id="product-name">
                                        ${product.title}
                                    </h2>
                                    <h2 id="product-condition">
                                        Condition
                                    </h2>
                                    <h2 id="product-price">
                                        ${price} KR.
                                    </h2>
                                    <h2 id="product-usage">
                                        Slightly used
                                    </h2>
                                </div>
                                <div class="cartBtnAdd" onclick="addToCart()">
                                    Add to cart
                                </div>
                            </div>
                                                `;
                    gridwrapper.appendChild(gridTile);
                });
            } catch (error) {
                console.error("Error occurred while fetching products:", error);
            }
        }

        fetchProducts();

        function addToCart(){

            // cart.push = {
            //     name: this.product.title,
            //     price: this.price,
            //     quantity: 1
            // };
            
            items.innerHTML+=`<div class="cart-element">
            <div class="cartPreviewFrame"></div>
            <div class="cartProductInfo">
                <h2 id="productName">Product Name</h2>
                <h2 id="productPrice">1000 KR.</h2>
                <div class="changeQty"><div onclick="reduceElement()">-</div><div id="productQty">1</div><div onclick="addElement()">+</div></div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_2720_971)">
                <path d="M7 4V2H17V4H22V6H20V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z" fill="#FCF7E6"/>
                </g>
                <defs>
                <clipPath id="clip0_2720_971">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
                </svg>
        </div>`
        }
