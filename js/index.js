const bannerElement = document.querySelector(".section--hero");

if (bannerElement) {
  const swiperEl = bannerElement.querySelector(".swiper");
  const swiper = new Swiper(swiperEl, {
    // slidesPerView: 1,
    // slidesPerGroup: 1,
    speed: 400,
    spaceBetween: 100,
    effect: "fade",
    loop: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: "true",
    },
    autoplay: {
      // delay: 1000,
      pauseOnMouseEnter: true,
    },
    on: {
      beforeInit: () => {
        console.log("Slider created");
      },
      afterInit: () => {
        console.log("Slide changed");
      },
    },
  });
}

/*модалка на корзину*/
const cartModal = () => {
  const close = document.querySelector(".cart__modal");
  const cartModalElement = document.querySelector(".cart__modal");
  const cartModalButton = document.querySelector(".cart");

  const burgerModalButtonCart = document.querySelectorAll(".Burger-modal");
  const cartPurchaseButton = document.querySelector(".cart-btn");
  const cartModalSuccessful = document.querySelector(".cart__modal_success");

  if (burgerModalButtonCart.length) {
    burgerModalButtonCart.forEach((item) => {
      item.addEventListener("click", () => {
        cartModalElement.classList.toggle("active");
      });
    });
  }

  cartModalButton.addEventListener("click", () => {
    cartModalButton.classList.toggle("active");
    cartModalElement.classList.toggle("active");

    close.addEventListener("click", (event) => {
      if (event.target === close) {
        cartModalElement.classList.remove("active");
      }
    });
  });
  const close1 = document.querySelector(".cart__modal_success");
  const close2 = document.querySelector(".cart-btn-successful-close");
  cartPurchaseButton.addEventListener("click", () => {
    cartPurchaseButton.classList.toggle("active");
    cartModalSuccessful.classList.toggle("active");
    cartModalElement.classList.remove("active");

    close1.addEventListener("click", (event) => {
      if (event.target === close1) {
        cartModalSuccessful.classList.remove("active");
      }
    });
    close2.addEventListener("click", (event) => {
      if (event.target === close2) {
        cartModalSuccessful.classList.remove("active");
      }
    });
  });
};
document.addEventListener("DOMContentLoaded", cartModal);

/*моделка на совершение заказа*/
const wishlist = () => {
  const oldIcon = document.querySelector(".wishlist");
  const newIcon = document.querySelector(".wishlist-active");
};
document.addEventListener("DOMContentLoaded", wishlist);

/*burger down below*/
const burger = () => {
  const headerElement = document.querySelector("header");
  const burgerMenuElement = document.querySelector(".burger-menu");
  const burgerButton = document.querySelector(".burger");

  burgerButton.addEventListener("click", () => {
    burgerButton.classList.toggle("active");
    burgerMenuElement.classList.toggle("active");

    const offsetHeaderHeight = headerElement.offsetHeight;

    burgerMenuElement.style.top = `${offsetHeaderHeight}px`;
  });
};
document.addEventListener("DOMContentLoaded", burger);

const init = () => {
  const items = document.querySelectorAll(".item");

  const formatMoney = (value) => {
    return Intl.NumberFormat("ru-RU").format(value) + " руб.";
  };

  const getLocalStorage = (name) => {
    if (localStorage.getItem(name) === null) {
      return [];
    }

    return JSON.parse(localStorage.getItem(name));
  };

  const updateCartTotalPrice = () => {
    const items = getLocalStorage("cart");

    const totalPriceElement = document.querySelector(".total-price");
    const totalTaxElement = document.querySelector(".total-tax");

    const totalPrice = items.reduce(
      (prev, current) => (prev += current.price),
      0
    );

    const totalTax = Math.floor(totalPrice * (1 - 0.95));

    totalPriceElement.textContent = formatMoney(totalPrice);
    totalTaxElement.textContent = formatMoney(totalTax);
  };

  const renderCart = () => {
    const items = getLocalStorage("cart");

    const parent = document.querySelector(".cart-items");

    if (!parent) return false;

    parent.innerHTML = "";

    items.forEach((item) => {
      parent.insertAdjacentHTML(
        "beforeend",
        `
        <div class="cart-item">
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-text">
                <p>${item.title}</p>
                <span>${formatMoney(item.price)}</span>
            </div>
            <div class="cart-delete">
                <img src="images/cart-delete.svg" alt="delete">
            </div>
        </div>
      `
      );
    });

    updateCartTotalPrice();
  };

  if (items.length > 0) {
    items.forEach((item) => {
      const buyButtonElement = item.querySelector(".buy-button");

      const itemTitleElement = item.querySelector("h2");
      const itemPriceElement = item.querySelector(".price");
      const itemImageElement = item.querySelector(".item__img img");

      buyButtonElement.addEventListener("click", () => {
        const products = getLocalStorage("cart");

        const product = {
          id: Date.now(),
          title: itemTitleElement.textContent,
          price: Number(itemPriceElement.getAttribute("data-price")),
          image: itemImageElement.src,
        };

        localStorage.setItem("cart", JSON.stringify([...products, product]));

        renderCart();
      });
    });
  }

  renderCart();
};

document.addEventListener("DOMContentLoaded", init);
