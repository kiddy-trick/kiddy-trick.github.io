// ************************************************
// Shopping Cart API
// ************************************************

var cartApi = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    let cart = [];

  // Constructor
    class Item {
        constructor(id, title, price, url, count) {
            this.id = id;
            this.title = title;
            this.price = price;
            this.url = url;
            this.count = count;
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

    // Add new item to cart
    obj.addNewItemToCart = function(id, title, price, url, count) {
        for (const item of cart) {
            if (item.id === id) {
                item.count += count;
                saveCart();
            return item.count;
            }
        }
        const item = new Item(id, title, price, url, count);
        cart.push(item);
        saveCart();
        return item.count;
    }

    // Add existing item to cart
    obj.addItemToCart = function(id) {
        for (const item of cart) {
            if (item.id == id) {
                item.count ++;
                saveCart();
                return item.count;
            }
        }
    }
    // Set count for item by id
    obj.setCountForItem = function(id, count) {
        for (const item of cart) {
            if (item.id === id) {
                item.count = count;
                saveCart();
                return item.count;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(id) {
        for (const item of cart) {
            if (item.id === id) {
                item.count --;
                if (item.count === 0) {
                    cart.splice(cart.indexOf(item), 1);
                }
            saveCart();
            return item.count;
            }
        }
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function(id) {
        for (const item of cart) {
            if (item.id === id) {
                cart.splice(cart.indexOf(item), 1);
                saveCart();
                break;
            }
        }
    }

    // Clear cart
    obj.clearCart = function() {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function() {
        let totalCount = 0;
        for (const item of cart) {
            totalCount += item.count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function() {
        let totalCart = 0;
        for (const item of cart) {
            totalCart += item.price * item.count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function() {
        return cart;
    }

    obj.cartToQuerry = function() {
        let param = "";
        for (item of cart) {
            param += "&product=" + encodeURIComponent(item.title) + "&price=" + encodeURIComponent(item.price) + "&count=" + encodeURIComponent(item.count) + "&url=" + encodeURIComponent(item.url);
        }
        return param;
    }

    return obj;
})();