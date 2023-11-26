const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close");

/* menu show*/
/* validate if contants exists */
if (navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add("show-menu");
    });
}
/*menu hidden */
/* validate if contants exists */
if (navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu")
    })
}
/*change bakcground header */
function scrollHeader() {
    const header = document.getElementById("header");
    //when the scroll is greater than viewport height,add the scroll-header class to the header tag
    if (this.scrollY >= 80) header.classList.add("scroll-header");
    else header.classList.remove("scroll-header")
}
window.addEventListener("scroll", scrollHeader);
/* testimonial-swiper */
let testimonialSwiper = new Swiper(".testimonial-swiper", {
    spaceBetween: 30,
    loop: "true",
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

})

/* new swiper */
let newSwiper = new Swiper(".new-swiper", {
    spaceBetween: 24,
    loop: "true",
    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,

        },
        1024: {
            slidesPerView: 4,

        },
    }
});

/*scroll section active link*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id');


        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add("active-link");
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove("active-link")
        }
    })
}
window.addEventListener("scroll", scrollActive);

/* show scroll */
function scrollUp() {
    const scrollUp = document.getElementById("scroll-up");
    //when the scroll is higher than viewport height,add the show-scroll class to the a tag with the
    if (this.scrollY >= 400) {
        scrollUp.classList.add("show-scroll");
    } else {
        scrollUp.classList.remove("show-scroll");
    }
}
window.addEventListener("scroll", scrollUp);

/* menu hidden */
const cart = document.getElementById("cart"),
    cartShop = document.getElementById("cart-shop"),
    cartClose = document.getElementById("cart-close");

/* cart show*/
/* validate if contants exists */
if (cartShop) {
    cartShop.addEventListener("click", () => {
        cart.classList.add("show-cart");
    });
}
/*cart hidden */
/* validate if contants exists */
if (cartClose) {
    cartClose.addEventListener("click", () => {
        cart.classList.remove("show-cart")
    })
}


/*dark ligh theme */
const themeButton = document.getElementById("theme-button");
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

/*previously selected topic (if user selected)*/
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

//we obtain the current theme that the interface has validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => document.body.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

//we validate if the user previously chose a topic
if (selectedTheme) {
    //If the validation is fulfilled,we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}
//active / deactive the theme manuall with the button
themeButton.addEventListener("click", () => {
    //add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    //we save the theme and the current icon the user chose
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
})


/*cart price calculate */
const productGrid = document.getElementById("products");
const cartGrid = document.getElementById("cartContainer");
const btnAdd = document.getElementById('btnAdd');
const btnDelete = document.getElementById('btnDelete');
const resultTotal = document.getElementById("price-total");


const fetchProducts = async () => {
    const products = await fetch('js/product.json').then((response) => response.json());
    products.forEach((product) => {
        productGrid.innerHTML +=
            `
        <article class="featured__card">
                    <span class="featured__tag">Sale</span>
                    <img src="${product.image}" alt="" class="featured__img">
                    <div class="featured__data">
                        <h3 class="featured__title">${product.name}</h3>
                        <span class="featured__price">$${product.price}</span>
                    </div>
                    <button class="button featured__button" onclick="addToCart(${product.id})">
                        ADD TO CART
                    </button>
                </article>
        `
    });
}
fetchProducts();
let carts = [];

function addToCart(id) {
    //check if product already exist in cart
    if (carts.some((item) => item.id === id)) {
        changeNumberOfUnits("plus", id)
    } else {
        const item = products.find((product) => product.id === id);
        carts.push({
            ...item,
            numberOfUnits:1
        })
        console.log(carts);
    }
    updateCart();
}

function updateCart() {
    renderCartItems();
    removeItemCart();
}

function renderCartItems() {
    cartGrid.innerHTML = "";
    carts.forEach((item) => {
        cartGrid.innerHTML +=
            `
        <article class="cart__card">
                <div class="cart__box">
                    <img src="${item.image}" alt="" class="cart__img">
                </div>
                <div class="cart__details">
                    <h3 class="cart__title">${item.name}</h3>
                    <span class="cart__price">$${item.price}</span>
                    <div class="cart__amount">
                        <div class="cart__amount-content">
                            <span class="cart__amount-box" onclick="changeNumberOfUnits('minus',${item.id})">
                                <i class='bx bx-minus'></i>
                            </span>
                            <span class="cart__amount-number">${item.numberOfUnits}</span>
                            <span class="cart__amount-box" onclick="changeNumberOfUnits('plus',${item.id})">
                                <i class='bx bx-plus'></i>
                            </span>
                        </div>
                        <i class='bx bx-trash-alt cart__amount-trash' onclick="removeItemCart(${item.id})"></i>
                    </div>
                </div>
            </article>
        `
    });
}

function changeNumberOfUnits(action, id) {
    carts = carts.map((item) => {
        let numberOfUnits = item.numberOfUnits;

        if (item.id === id) {
            if (action === "minus" && numberOfUnits > 1) {
                numberOfUnits--;
            } else if (action === "plus" && numberOfUnits < item.instock) {
                numberOfUnits++;
            }
        }
        return {
            ...item,
            numberOfUnits,
        }
    })
    updateCart();
}
//     products.forEach((product) => {
//         const productElm = document.createElement("article");
//         productElm.classList.add("featured__card");
//         productElm.innerHTML =
//             `
//         <span class="featured__tag">Sale</span>
//         <img src="img/featured1.png" alt="" class="featured__img">
//         <div class="featured__data">
//             <h3 class="featured__title">${product.name}</h3>
//             <span class="featured__price">$${product.price.toString()}</span>
//         </div>
//         <button class="button featured__button" id="btnAdd" onclick="addToCart(${product.id},'${product.image}','${product.name}','${product.price}')">
//             ADD TO CART
//         </button>

//         `;
//         productGrid.append(productElm)
//     });

// };
// fetchProducts();

// let carts = [];
// const getTotal = (array) => {
//     let total = 0;
//     array.forEach((c) => {
//         total += Number(c.price);
//     });
//     resultTotal.innerHTML = `$ ${total}`;
// }
// function updateCart(){

// }
// const addToCart = (id, image, name, price) => {
//     const existProducts = carts.find((c) => c.id === id);
//     if (!existProducts) {
//         carts.push({
//             id,
//             image,
//             name,
//             price,
//             numberOfUnits:1,

//         });
//         getTotal(carts);
//         const cartElm = document.createElement("article");
//         cartElm.id = `product-${id}`;
//         carts.forEach((item)=>{
//             cartElm.innerHTML = `
//             <article class="cart__card">
//             <div class="cart__box">
//                 <img src="${item.image}" alt="" class="cart__img">
//             </div>
//             <div class="cart__details">
//                 <h3 class="cart__title">${item.name}</h3>
//                 <span class="cart__price">$ ${item.price}</span>
//                 <div class="cart__amount">
//                     <div class="cart__amount-content">
//                         <span class="cart__amount-box">
//                             <i class='bx bx-minus' onlick="changeNumberOfUnits('minus',${item.id})"></i>
//                         </span>
//                         <span class="cart__amount-number">1</span>
//                         <span class="cart__amount-box"  onlick="changeNumberOfUnits('plus',${item.id})">
//                             <i class='bx bx-plus'></i>
//                         </span>
//                     </div>
//                     <i class='bx bx-trash-alt cart__amount-trash' onclick="removeFromCart(${item.id})"></i>
//                 </div>
//             </div>
//         </article>
//             `;
//         })
//         cartGrid.append(cartElm);
//     }

// }
// function changeNumberOfUnits(action,id){
//     carts.carts.map((item)=>{
//         let numberOfUnits=item.numberOfUnits;

//         if(item.id===id){
//             if(action==="minus"){
//                 numberOfUnits--;
//             }else if(action=== "plus"){
//                 numberOfUnits++;
//             }

//         }
//         return{
//             ...item,
//             numberOfUnits,
//         }
//     });
//     updateCart();
// }
// const removeFromCart = (id) => {
//     const findProduct = carts.find((c) => c.id === id);
//     if (carts.indexOf(findProduct) > -1) {
//         Swal.fire({
//             title: 'Are u sure?',
//             showDenyButton: true,
//             showCancelButton: true,
//             confirmButtonText: `Delete`,
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 Swal.fire('Deleted!', '', 'success');
//                 carts.splice(carts.indexOf(findProduct), 1);
//                 document.getElementById(`product-${id}`).remove();
//                 getTotal(carts);
//             } else if (result.isDenied) {
//                 Swal.fire('Product not deleted', '', 'info');
//             }
//         });
//     }
// };