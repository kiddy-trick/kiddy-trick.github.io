// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];
    
  // Constructor
  class Item {
    constructor(product, price, count, url) {
      this.product = product;
      this.price = price;
      this.count = count;
      this.url = url;
    }
  }
    
    // Save cart
    function saveCart() {
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
      // Load cart
    function loadCart() {
      cart = JSON.parse(localStorage.getItem('shoppingCart'));
    }
    
    if (localStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
    
    
    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};
    
    // Add to cart
    obj.addItemToCart = function(url, price, count, product) {
      for(var item in cart) {
        if(cart[item].url === url) {
          cart[item].count ++;
          saveCart();
          return;
        }
      }
      var item = new Item(product, price, count, url);
      cart.push(item);
      saveCart();
    }
    // Set count from item
    obj.setCountForItem = function(url, count) {
      for(var i in cart) {
        if (cart[i].url === url) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(url) {
        for(var item in cart) {
          if(cart[item].url === url) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(url) {
      for(var item in cart) {
        if(cart[item].url === url) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Clear cart
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }
  
    // List cart
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
  
    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
  })();
  
  
  // *****************************************
  // Triggers / Events
  // ***************************************** 

    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

  // Add item
  $('.add-to-cart').click(function(event) {
    event.preventDefault();
    event.stopPropagation();
    var product = $(this).data('name');
    var price = Number($(this).data('price'));
    var url = $(this).data('url');
    if (shoppingCart.totalCount()==0) {
      $('#cart').toggleClass('visible')
      $('body').toggleClass('menu-visible')
    }
    $(this).html('Добавлено')
    shoppingCart.addItemToCart(url, price, 1, product);
    displayCart();
  });
  
  // Clear items
  $('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
  });
  
  
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var cartString = shoppingCart.totalCart();
    var output = "";
    
    for(var i in cartArray) {
        output+='<div class="cart-item">'
        + '<a href="' + cartArray[i].url +'">'
        + '<img class="image" src="/images/catalog' + cartArray[i].url + '-01_400w.jpg">'
        + '</a>'
        + '<div class="cart-text">'
        + '<a href="' + cartArray[i].url +'">' + cartArray[i].product + '</a>'
        + '<h3>' + numberWithSpaces(cartArray[i].price) + ' &#8381;</h3>'
        + '<div><a class="minus-item button" data-url=' + cartArray[i].url + '>-</a><span>'+ cartArray[i].count + '</span><a class="plus-item button" data-url=' + cartArray[i].url + '>+</a></div>'
        // + '<a href="#" class="delete-item" data-url=' + cartArray[i].url + '>Удалить</a>'
        + '</div></div>';
        //cartString+=cartArray[i].url + ',' + cartArray[i].price + ',' + cartArray[i].count + ';';
    }
    
    $('.show-cart').fadeOut(200);
    window.setTimeout(function() {
      $('.show-cart').html(output);
    }, 200);
    $('.cart-string').attr('value', cartString);
    $('.show-cart').fadeIn(200);
    $('.total-cart').html(numberWithSpaces(shoppingCart.totalCart()));
    $('.total-count').html(shoppingCart.totalCount());
    if (shoppingCart.totalCount()>0 && $('.order').hasClass('disabled')) {
      $('.order').removeClass('disabled');
    } else if (shoppingCart.totalCount()==0 && !$('.order').hasClass('disabled')) {
      $('.order').addClass('disabled');
    }
  }
  
  // Delete item button
  
  $('.show-cart').on("click", ".delete-item", function(event) {
    event.preventDefault();
    event.stopPropagation();
    var url = $(this).data('url')
    shoppingCart.removeItemFromCartAll(url);
    displayCart();
  })
  
  
  // -1
  $('.show-cart').on("click", ".minus-item", function(event) {
    event.preventDefault();
    event.stopPropagation();
    var url = $(this).data('url')
    shoppingCart.removeItemFromCart(url);
    displayCart();
  })
  // +1
  $('.show-cart').on("click", ".plus-item", function(event) {
    event.preventDefault();
    event.stopPropagation();
    var url = $(this).data('url')
    shoppingCart.addItemToCart(url);
    displayCart();
  })
  
  // Item count input
  $('.show-cart').on("change", ".item-count", function(event) {
     var url = $(this).data('url');
     var count = Number($(this).val());
    shoppingCart.setCountForItem(url, count);
    displayCart();
  });
  
  displayCart();
  