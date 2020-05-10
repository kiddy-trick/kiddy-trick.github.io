(function() {
    "use strict"

    const body = document.querySelector('body');
    const nav = document.querySelector('#nav');
    const navToggle = document.querySelector('a[href="#nav"]');
    const navClose = document.querySelector('#nav .close');
    const cart = document.querySelector('#cart');
	const cartToggles= document.querySelectorAll('a[href="#cart"]');
	const cartClose = document.querySelector('#cart .close');

    window.addEventListener('DOMContentLoaded', function() {
        body.classList.remove('is-loading');
        body.classList.remove('trans');
    });

    let hideNav = function() {
        nav.classList.remove('visible');
        body.classList.remove('menu-visible');
    }

    let toggleNav = function() {
        nav.classList.toggle('visible');
        body.classList.toggle('menu-visible');
    }

    let hideCart = function() {
        cart.classList.remove('visible');
        body.classList.remove('menu-visible');
    }

    let toggleCart = function() {
        cart.classList.toggle('visible');
        body.classList.toggle('menu-visible');
    }
    
    //Hide nav and cart on body click
    body.addEventListener('click', function(e){
        if (body.classList.contains('menu-visible')) {
            e.preventDefault();
            e.stopPropagation();
            hideNav();
            hideCart();
        }
    }, false);

    nav.addEventListener('click', function(e){
        e.stopPropagation();
    }, false);

    cart.addEventListener('click', function(e){
        e.stopPropagation();
    }, false);

    navToggle.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        toggleNav();
    }, false);
    navClose.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        hideNav();
    }, false);
    
    for (const cartToggle of cartToggles) {
        cartToggle.addEventListener('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            toggleCart();
        }, false);
    }

    cartClose.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        hideCart();
    }, false);

    let transition = function(e) {
        let href = this.getAttribute('href');
        let target = this.getAttribute('target');
        if (!href || href.indexOf('#') != -1 || href.indexOf('tel') != -1 || href.indexOf('wa.me') != -1 || href.indexOf('mailto') != -1 || target == '_blank')
            return;
        e.preventDefault();
        e.stopPropagation();
        hideNav();
        hideCart();
        body.classList.add('trans');
        window.setTimeout(function() {
            window.location.href = href;
            console.log('250');
        }, 250);
    }
    
    body.addEventListener('click', function(e) {
        for (let target = e.target; target && target != this; target = target.parentNode) {
            if (target.matches('a')) {
                transition.call(target, e);
                break;
            }
        }
    }, false);

    nav.addEventListener('click', function(e) {
        for (let target = e.target; target && target != this; target = target.parentNode) {
            if (target.matches('a')) {
                transition.call(target, e);
                break;
            }
        }
    }, false);

    // Cart related UI
    ///////
    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function createCartItem(item){
        let cart_item = document.createElement('div');
        cart_item.id = item.id;
        cart_item.classList.add('cart-item');
        let a_img = document.createElement('a');
        a_img.href = item.url;
        cart_item.appendChild(a_img);
        let img = document.createElement('img');
        img.classList.add('image');
        img.src = "/images/catalog" + item.url + "-01_400w.jpg";
        a_img.appendChild(img);
        let cart_text = document.createElement('div');
        cart_text.classList.add('cart-text');
        cart_item.appendChild(cart_text);
        let el = document.createElement('a');
        el.href = item.url;
        el.innerText = item.title;
        cart_text.appendChild(el);
        el = document.createElement('h3');
        el.innerText = numberWithSpaces(item.price) + " ₽";
        cart_text.appendChild(el);
        let some_div = document.createElement('div');
        cart_text.appendChild(some_div);
        el = document.createElement('a');
        el.classList.add('minus-item', 'button');
        el.setAttribute('data', item.id);
        el.innerText = "-";
        some_div.appendChild(el);
        el = document.createElement('span');
        el.setAttribute('data', item.id);
        el.innerText = item.count;
        some_div.appendChild(el);
        el = document.createElement('a');
        el.classList.add('plus-item', 'button');
        el.setAttribute('data', item.id);
        el.innerText = "+";
        some_div.appendChild(el);
        return cart_item;
    }

    // Update all cart UI
    function displayCart(){
        const cart = cartApi.listCart();
        const cartInnerEl = document.querySelector('.show-cart');
        cartInnerEl.innerHTML = "";
        let temp_cart = document.createDocumentFragment();
        for (const item of cart){
            let cart_item = createCartItem(item);
            temp_cart.appendChild(cart_item);
        }
        cartInnerEl.appendChild(temp_cart);
    };
    displayCart();

    function updateCounts(){
        const totalCart = cartApi.totalCart();
        const totalCount = cartApi.totalCount();
        
        const cartTotalCounts = document.querySelectorAll('.total-count');
        for (const cartTotalCount of cartTotalCounts) {
            cartTotalCount.innerText = totalCount;
        }

        const cartTotal = document.querySelector('.total-cart');
        cartTotal.innerText = numberWithSpaces(totalCart);

        const orderButton = document.querySelector('.order');
        if (totalCount > 0 && orderButton.classList.contains('disabled')){
            orderButton.classList.remove('disabled');
        } else if (totalCount == 0 && !orderButton.classList.contains('disabled')){
            orderButton.classList.add('disabled');
        }
        const cartString = document.querySelector('.cart-string');
        cartString.setAttribute('value', totalCart)
    };
    updateCounts();

    const orderButton = document.querySelector('.order');
    const returnButtonAll = document.querySelectorAll('.return-to-cart');
    const cart_cart = document.querySelector('.cart-cart');
    const form_wrapper = document.querySelector('.form-wrapper');

    orderButton.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        if (!this.classList.contains('disabled')){
            cart_cart.classList.add('hide');
            form_wrapper.classList.remove('hide');
            form_wrapper.classList.add('fade-in');
        }
    })

    for (const returnButton of returnButtonAll) {
        returnButton.addEventListener('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            form_wrapper.classList.add('hide');
            cart_cart.classList.remove('hide');
            cart_cart.classList.add('fade-in');
            const parent = this.parentNode;
            if (parent.classList.contains('form-success') || parent.classList.contains('form-error')) {
                const ajax_form = document.querySelector('.ajax-form');
                parent.classList.add('hide');
                ajax_form.classList.remove('hide');
                ajax_form.classList.add('fade-in');
            }
        })
    }

    const addToCartButton = document.querySelector('.add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            const productEl = document.getElementById('product');
            const product = JSON.parse(productEl.textContent);

            if (cartApi.totalCount() == 0){
                toggleCart();
            }
            cartApi.addNewItemToCart(product.id, product.title, product.price, product.url, 1);
            displayCart();
            updateCounts();
            this.innerHTML = 'Добавлено';
        }, false);
    }

    let cartPlusMinusButton = function(e){
        e.preventDefault();
        e.stopPropagation();
        const item_id = this.getAttribute('data');
        let count = this.parentNode.querySelector('span');
        if (this.classList.contains('plus-item')){
            count.innerText = cartApi.addItemToCart(item_id);
        } else {
            const item_count = cartApi.removeItemFromCart(item_id);
            if (item_count > 0){
                count.innerText = item_count;
            } else {
                // Remove .cart-item from cart completly
                const cart_item = this.parentNode.parentNode.parentNode;
                cart_item.parentNode.removeChild(cart_item);
            }
        }
        updateCounts();
    }

    cart.addEventListener('click', function(e) {
        for (let target = e.target; target && target != this; target = target.parentNode) {
            if (target.matches('.minus-item, .plus-item')) {
                cartPlusMinusButton.call(target, e);
                break;
            }
        }
    }, false);

    // Form submitting

    const form = document.querySelector('.ajax-form');

    function serializeForm(x) {
        let params = "?";
        for (const item of x.elements) {
            if (item.name) {
                params += encodeURIComponent(item.name) + "=" + encodeURIComponent(item.value) + "&";
            }
        }
        return params.slice(0, -1);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formdata = serializeForm(this);
        const cartdata = cartApi.cartToQuerry();
        const endpoint = "https://europe-west2-toy-project-275819.cloudfunctions.net/nocors" + formdata + cartdata;

        const form_loading = this.parentNode.querySelector('.form-loading');
        const form_success = this.parentNode.querySelector('.form-success');
        const form_error = this.parentNode.querySelector('.form-error');

        this.classList.add('hide');
        form_loading.classList.remove('hide');
        form_loading.classList.add('fade-in');

        let request = new XMLHttpRequest();
        request.open('GET', endpoint);

        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                console.log('Success');
                console.log(this.responseText);
                form_loading.classList.add('hide');
                form_success.classList.remove('hide');
                form_success.classList.add('fade-in');
                cartApi.clearCart();
                displayCart();
                updateCounts();
            } else {
                // We reached our target server, but it returned an error
                console.log('Server returned error');
                form_loading.classList.add('hide');
                form_error.classList.remove('hide');
                form_error.classList.add('fade-in');
            }
        };
        request.onerror = function() {
            console.log('Connection error');
            form_loading.classList.add('hide');
            form_error.classList.remove('hide');
            form_error.classList.add('fade-in');
        };
        request.send();

    }, false);

})();