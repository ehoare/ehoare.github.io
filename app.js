// >>>>>>>>>>>>>>>>>>>>>> CHOOSE YOUR HERO SECTION >>>>>>>>>>>>>>>>>>>>>>>

document.addEventListener("DOMContentLoaded", function() {

  // >>>>>>>>>>>>>>>>>>>>>> open/close section on click animation >>>>>>>>>>>>>>>>>>>>>>>

  document.querySelector(".title").onclick = function(){
    document.querySelector(".title").classList.add("invisible");
    document.querySelector(".container").classList.add("open");
    setTimeout(function() {
      document.querySelector(".title").classList.add("hidden")
    },500);
  };

  window.addEventListener('click', function(e){
    if (!document.querySelector(".container").contains(e.target)){
      document.querySelector(".title").classList.remove("invisible");
      document.querySelector(".title").classList.remove("hidden");
      document.querySelector(".container").classList.remove("open");
      document.getElementById("quoteText").innerHTML = '';
    }
  });

  // >>>>>>>>>>>>>>>>>>>>>> hero cards animation >>>>>>>>>>>>>>>>>>>>>>>

  let choices = document.querySelectorAll(".hero-img");
  let heroName;

  choices.forEach(choice => {
    choice.onclick = function(){
      heroName = choice.id

      // >>>>>>>>>>>>>>>>>>>>>> hero cards animation >>>>>>>>>>>>>>>>>>>>>>>

      if (heroName !== "img1") {
        document.querySelector('.neo').classList.remove("img-animation");
        document.getElementById("quoteText").innerHTML = '';
      }

      if (heroName !== "img2") {
        document.querySelector('.trinity').classList.remove("img-animation");
        document.getElementById("quoteText").innerHTML = '';
      };

      if (heroName !== "img3") {
        document.querySelector('.morpheus').classList.remove("img-animation");
        document.getElementById("quoteText").innerHTML = '';
      }

      if (heroName !== "img4") {
        document.querySelector('.bugs').classList.remove("img-animation");
        document.getElementById("quoteText").innerHTML = '';
      };

      let i = 0;
      let speed = 10
      let txt = ""

      function autoWriter() {
        if (i < txt.length){
          document.getElementById("quoteText").innerHTML += txt.charAt(i);
          i++
          setTimeout(autoWriter, speed);
        }
      }

      switch (heroName) {
        case "img1":
          let neo = document.querySelector('.neo');
          neo.classList.add("img-animation");
          txt = 'Neo is a former bluepill rescued by Morpheus together with the crew of the Nebuchadnezzar. As a redpill, he was prophesied by The Oracle to be The One and was set out on a course to free humanity from the Matrix and to ultimately end the centuries-long Machine War.'
          autoWriter();
          heroName = '';
          break;
        case "img2":
          let trinity = document.querySelector('.trinity');
          trinity.classList.add("img-animation");
          txt = 'Like the series other principal characters, Trinity is a computer programmer and a hacker who has escaped from the Matrix, a sophisticated computer program in which most of the human race is imprisoned as virtual slaves. Though few specifics are revealed about her previous life inside the Matrix, it is revealed that Morpheus, one of a number of real-world hovercraft commanders, initially identified her and helped her escape from the program.'
          autoWriter();
          heroName = '';
          break;
        case "img3":
          let morpheus = document.querySelector('.morpheus');
          morpheus.classList.add("img-animation");
          txt = 'Morpheus (the name of his persona while a bluepill within the Matrix is unknown) is an even-mannered man with a personality that commands respect in many who encounter him. As a result of his belief in the prophecy, Morpheus devotes "all of his life" in search of The One, the destined human who will bring an end to the Machine War.'
          autoWriter();
          heroName = '';
          break;
        case "img4":
          let bugs = document.querySelector('.bugs');
          bugs.classList.add("img-animation");
          txt = 'Bugs is a "true believer" in the legend of Neo: she commands a rag-tag group of human Resistance members who never stopped believing he was still alive somewhere, even after everyone else gave up hope years ago. Other members of her crew include Lexy and Berg, and their Operator Sequoia.'
          autoWriter();
          heroName = '';
          break;
        default:
          break;
      }
    };
  });
});

// >>>>>>>>>>>>>>>>>>>>>> SWIPER SECTION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

class Product {
  constructor(obj) {
    this.nombre = obj.nombre;
    this.imagen = obj.imagen;
    this.precio = obj.precio;
    this.disponible = obj.disponible;
    this.stock = obj.stock;
    this.id = obj.id;
  }
}

class chosenProduct {
  constructor(obj) {
    this.nombre = obj.nombre;
    this.imagen = obj.imagen;
    this.precio = obj.precio;
    this.disponible = obj.disponible;
    this.stock = obj.stock;
    this.id = obj.id;
  }
}

const productos = [];

function buildProductList(callback){
  fetch ('product_list.json')
  .then((res)=> res.json())
  .then((data) =>{
    data.forEach((element) => {
      const producto = new Product(element);
      productos.push(producto)
      callback()
    })
  })
};
buildProductList(()=>
  productos
);

document.addEventListener("DOMContentLoaded", function() {
  const slides = Array.from(document.querySelector('.swiper-wrapper').children);
  const cartContainer = document.querySelector('.cart-product-container');
  const checkoutContainer = document.querySelector('.checkout-product-container');
  const checkoutPayment = document.querySelector('.checkout-payment-container');
  let cart = [];
  let visibleCart = [];

  function renderCart(){
    visibleCart.forEach(element => {
      let productCount = cart.filter((obj) => obj.id === element.id).length
      cartContainer.insertAdjacentHTML("afterbegin",
        '<div class="row m0" id="container-'+element.id+'">'+
          '<div class="col-6 cart-item">'+
            '<img class="cart-product-img"src="'+ element.imagen +'" alt="'+ element.nombre +'" />'+
          '</div>'+
          '<div class="col-6 cart-item">'+
            '<div class="cart-product-text">'+
              '<h4>'+element.nombre+'</h4>'+
              '<p>$ '+element.precio+'</p>'+
              '<div class="horiz plusminus">'+
                '<button class="minus-btn"></button><input type="number" name="qty" value="'+productCount+'" min="0" max="'+element.stock+'" pattern="[1-9]" class="js-qty-input horiz"><button class="plus-btn"></button>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'
      );
      productCounter(element.id, productCount);
    })
    cartContainer.insertAdjacentHTML("beforeend",
      '<div class="cart-total">'+
        '<h4>Total:</h4>'+
        '<p>$ '+cartTotal()+'</p>'+
      '</div>'+
      '<button type="button" class="btn btn-dark seguir-btn" data-toggle="modal" data-target="#checkout-modal">SEGUIR AL CARRITO</button>'
    );
    let seguirBtn = document.querySelector(".seguir-btn");
    seguirBtn.onclick = function(){
      saveToLocalStorage(cart);
      $('#cart-modal').modal('hide');
    };
  }

  function renderCheckout(){
    visibleCart.forEach(element => {
      let productCount = cart.filter((obj) => obj.id === element.id).length
      checkoutContainer.insertAdjacentHTML("afterbegin",
        '<div class="row m0">'+
          '<div class="col-12">'+
            '<div class="row m0" id="checkout-cont-'+element.id+'">'+
              '<div class="col-3 checkout-item">'+
                '<img class="checkout-product-img"src="'+ element.imagen +'" alt="'+ element.nombre +'" />'+
              '</div>'+
              '<div class="col-3 checkout-item">'+
                '<h4>'+element.nombre+'</h4>'+
              '</div>'+
              '<div class="col-3 checkout-item">'+
                '<p>' +productCount+' </p>'+
              '</div>'+
              '<div class="col-3 checkout-item">'+
                '<p>$ '+element.precio+'</p>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'
      )
      productCounter(element.id, productCount);
    })
    checkoutPayment.insertAdjacentHTML("afterbegin",
      '<form id="checkout-form" action="compra_final.html" method="GET">'+
        '<div class="row m0">'+
          '<label for="firstname"></label>'+
          '<input name="First Name" placeholder="First Name" type="text" class="form-control" id="first_name" />'+
          '<label for="lastname"></label>'+
          '<input name="Last Name" placeholder="Last Name" type="text" class="form-control" id="last_name" />'+
          '<label for="email"></label>'+
          '<input name="email" placeholder="Email" type="email" class="form-control" id="email" />'+
          '<input name="Total" type="hidden" class="form-control" id="total_price" />'+
        '</div>'+
        '<div class="row m0">'+
          '<div class="col-6 p0 payment-select">'+
            '<select id="payment_select" name="payment" class="form-control">'+
              '<option name="default" selected>Choose payment method</option>'+
              '<option name="efectivo">Efectivo - 30% de descuento</option>'+
              '<option name="transferencia">Transf. Bancaria - Sin Descuento</option>'+
              '<option name="credito">Tarjeta de credito - 10% de interes</option>'+
            '</select>'+
          '</div>'+
          '<div class="col-6 p0 shipping-select">'+
            '<select disabled id="shipping_select" name="shipping" class="form-control">'+
              '<option name="default" selected>Choose shipping method</option>'+
              '<option name="correo">Correo - $150</option>'+
              '<option name="local">Retiro de local - Gratis</option>'+
              '<option name="moto">Courier en moto - $250</option>'+
            '</select>'+
          '</div>'+
        '</div>'+
        '<button id="buy_btn" class="custom-btn form-btn" disabled>Finalizar compra</button>'+
      '</form>'+
      '<div class="row m0" style="height: 140px;">'+
        '<div class="col-12 position-relative">'+
          '<div class="checkout-total">'+
            '<h4>Total:</h4>'+
            '<p>$'+cartTotal()+'</p>'+
          '</div>'+
        '</div>'+
      '</div>'
    );
    saveToLocalStorage(cart);
    calculateCheckoutTotal(cartTotal());
  }

  function calculateCheckoutTotal(cart){
    const totalPriceHtml = document.querySelector('.checkout-total').children[1];
    const payOptionList = document.getElementById('payment_select');
    const shipOptionList = document.getElementById('shipping_select');
    const totalPriceInput = document.getElementById('total_price');
    const buyBtn = document.getElementById('buy_btn');
    let cartDiscountedTotal;
    let originalCartTotal = cart;
    let cartTotal = cart;
    let checkoutTotal;

    payOptionList.addEventListener("change", () => {
      let paySelected = payOptionList.selectedOptions;
      let optionName = paySelected[0].getAttribute("name");
      switch (optionName) {
        case ("default"):
          checkoutTotal = cartTotal;
          totalPriceHtml.innerHTML = '$'+checkoutTotal;
          break;
        case ("efectivo"):
          checkoutTotal = Math.round(cartTotal * .7);
          totalPriceHtml.innerHTML = '$'+checkoutTotal;
          break;
        case ("transferencia"):
          checkoutTotal = cartTotal;
          totalPriceHtml.innerHTML = '$'+checkoutTotal;
          break;
        case ("credito"):
          checkoutTotal = Math.round(cartTotal * 1.1);
          totalPriceHtml.innerHTML = '$'+checkoutTotal;
          break;
        default:
          break;
      };
      if (paySelected.length >= 1){
        shipOptionList.removeAttribute('disabled');
      }
      if (optionName == "default"){
        shipOptionList.setAttribute('disabled', '');
      }
      cartDiscountedTotal = Number(totalPriceHtml.innerHTML.slice(1));
    });

    shipOptionList.addEventListener("change", () => {
      let shipSelected = shipOptionList.selectedOptions;
      let optionName = shipSelected[0].getAttribute("name");
      cartTotal = cartDiscountedTotal;
      switch (optionName) {
        case ("default"):
          checkoutTotal = cartTotal;
          totalPriceHtml.innerHTML = '$'+checkoutTotal;
          break;
        case ("correo"):
          checkoutTotal = cartTotal + 150;
          totalPriceHtml.innerHTML = '$'+checkoutTotal;
          break;
        case ("local"):
          checkoutTotal = cartTotal;
          totalPriceHtml.innerHTML = '$'+checkoutTotal;
          break;
        case ("moto"):
          checkoutTotal = cartTotal + 250;
          totalPriceHtml.innerHTML = '$'+checkoutTotal;
          break;
        default:
          break;
      };

      totalPriceInput.value = checkoutTotal

      if (shipSelected.length == 1 && optionName != "default"){
        payOptionList.setAttribute('disabled', '');
        buyBtn.disabled = false;
      } else {
        payOptionList.removeAttribute('disabled');
        buyBtn.disabled = true;
        cartTotal = originalCartTotal
      };
    });
  }

  function saveToLocalStorage(cart){
    const storeCart = (key, value) => {localStorage.setItem(key, value)};
    storeCart("productList", JSON.stringify(cart));
  }

  function retrieveFromLocalStorage(){
    const retrieveCart = JSON.parse(localStorage.getItem("productList"))
    localStorage.clear();
    for (const objeto of retrieveCart)
      cart.push(new Product(objeto))
  }

  function deleteProduct(productId){
    let productDelete = cart.filter((obj) => obj.id === productId);
    let deleteId = cart.lastIndexOf(productDelete);
    cart.splice(deleteId);
  }

  function addProduct(productId){
    let producto = productos.find((element) => element.id === productId);
    let cartProduct = new chosenProduct(producto);
    cart.push(cartProduct);
  }

  function cartTotal(){
    let totalPrice = parseInt(cart.reduce((acc,el) => acc + el.precio, 0));
    return totalPrice;
  }

  function increaseCartTotal(){
    const priceHtml = document.querySelector('.cart-total').children[1];
    let updatedTotalPrice = cartTotal();
    priceHtml.innerHTML = '$'+updatedTotalPrice;
  }

  function decreaseCartTotal(){
    const priceHtml = document.querySelector('.cart-total').children[1];
    let updatedTotalPrice = Math.abs(parseInt(cart.reduce((acc,el) => acc - el.precio, 0)));
    priceHtml.innerHTML = '$'+updatedTotalPrice;
  }

  function removeCartProduct(productId, productCount){
    const itemToRemove = document.getElementById('container-'+productId);
    if (productCount === 0) {
      itemToRemove.innerHTML = '';
    }
  }

  function productCounter(productId, productCount) {
    const input = document.querySelector('.js-qty-input');
    const minus = document.querySelector('.minus-btn');
    const plus = document.querySelector('.plus-btn');
    let item = productos.find((element) => element.id === productId);
    let min = parseInt(input.getAttribute('min'), 10)
    let max = parseInt(input.getAttribute('max'), 10);

    function changeQty(qty) {
      var i = parseInt(input.value, 10);
      if ((i < max && (qty > 0)) || (i > min && !(qty > 0))) {
        input.value = i + qty
      }
    };

    minus.onclick = function(){
      if (productCount > 0) {
        productCount--
        deleteProduct(productId);
        decreaseCartTotal();
      }
      changeQty(-1);
      removeCartProduct(productId, productCount);
    }
    plus.onclick = function(){
      if (productCount < item.stock) {
        productCount++
        addProduct(productId);
        increaseCartTotal();
      }
      changeQty(1);
    }
  }

  slides.forEach(slide => {
    let producto = productos.find((element) => element.id === slide.id);
    document.getElementById(slide.id).insertAdjacentHTML("afterbegin",
      '<img class="slide-img"src="'+ producto.imagen +'" alt="'+ producto.nombre +'" />'+
      '<button type="button" class="btn btn-danger agregar-btn hidden" data-toggle="modal" data-target="#cart-modal">AGREGAR A CARRITO</button>'+
      '<h4>'+producto.nombre+'</h4>'+
      '<p>'+producto.precio+'</p>'
    );

    let btnCarrito = document.getElementById(slide.id).children[1];
    slide.onmouseenter = function(){
      btnCarrito.classList.remove('hidden');
    };
    slide.onmouseleave = function(){
      btnCarrito.classList.add('hidden');
    };
    btnCarrito.onclick = function(){
      addProduct(slide.id);
      Swal.fire({
        position: 'top-start',
        icon: 'success',
        title: 'Your product has been added',
        showConfirmButton: false,
        width: 430,
        timer: 1000
      })
    }
  });

  if (localStorage.productList) {
    retrieveFromLocalStorage()
  }

  // >>>>>>>>>>>>>>>>>>>>>> CARRITO DESPLEGABLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  $('#cart-modal').on('shown.bs.modal', function (e) {
    saveToLocalStorage(cart);
    visibleCart = [];
    unique = [...new Set(cart.map(item => item.id))];
    cartContainer.innerHTML = '';
    unique.forEach(instance => {
      visibleCart.push(cart.find((i) => i.id === instance));
    })
    renderCart();
  });

  // >>>>>>>>>>>>>>>>>>>>>> CHECKOUT MODAL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  $('#checkout-modal').on('shown.bs.modal', function (e) {
    cart = [];
    retrieveFromLocalStorage()
    visibleCart = [];
    unique = [...new Set(cart.map(item => item.id))];
    checkoutContainer.innerHTML = '';
    checkoutPayment.innerHTML = '';
    unique.forEach(instance => {
      visibleCart.push(cart.find((i) => i.id === instance));
    })
    renderCheckout();
  })
});
