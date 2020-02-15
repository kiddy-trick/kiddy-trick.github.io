(function() {

	"use strict";

	
	
	
	// Methods/polyfills.

		// addEventsListener
			var addEventsListener=function(o,t,e){var n,i=t.split(" ");for(n in i)o.addEventListener(i[n],e)}

		// classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
			!function(){function t(t){this.el=t;for(var n=t.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])}function n(t,n,i){Object.defineProperty?Object.defineProperty(t,n,{get:i}):t.__defineGetter__(n,i)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var i=Array.prototype,e=i.push,s=i.splice,o=i.join;t.prototype={add:function(t){this.contains(t)||(e.call(this,t),this.el.className=this.toString())},contains:function(t){return-1!=this.el.className.indexOf(t)},item:function(t){return this[t]||null},remove:function(t){if(this.contains(t)){for(var n=0;n<this.length&&this[n]!=t;n++);s.call(this,n,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},window.DOMTokenList=t,n(Element.prototype,"classList",function(){return new t(this)})}}();

	// Vars.
		var	body = document.querySelector('body');
			
			

	
	// Disable animations/transitions until everything's loaded.
		// body.classList.add('is-loading');

		window.addEventListener('DOMContentLoaded', function() {
			body.classList.remove('is-loading');
			body.classList.remove('trans');
		});

	// Nav&Cart.
		var	nav = document.querySelector('#nav'),
			navToggle = document.querySelector('a[href="#nav"]'),
			navClose = document.querySelector('#nav .close'),
			cart = document.querySelector('#cart'),
			cartToggle= document.querySelector('a[href="#cart"]'),
			cartToggle2= document.querySelector('a[href="#cart2"]'),
			cartClose = document.querySelector('#cart .close');
			// cartwrapper = document.querySelector('.cart-cart'),
			// formwrapper = document.querySelector('.form-wrapper');
			
		// Hide function
			var hideNav=function(){
				nav.classList.remove('visible');
				body.classList.remove('menu-visible');
			};

			var hideCart=function(){
				cart.classList.remove('visible');
				body.classList.remove('menu-visible');
				/* cartwrapper.classList.remove('hide');
				formwrapper.classList.toggle('hide'); */
			};
			

		// Event: Prevent clicks/taps inside the nav from bubbling.
			addEventsListener(nav, 'click touchend', function(event) {
				event.stopPropagation();
			});
			addEventsListener(cart, 'click touchend', function(event) {
				event.stopPropagation();
			});

		// Event: Hide nav on body click/tap.
			addEventsListener(body, 'click touchend', function(event) {
				if (body.classList.contains('menu-visible')) {
					event.preventDefault();
					event.stopPropagation();
					hideNav();
					hideCart();
				}
				
			});

		// Toggle.

			// Event: Toggle nav on click.
				navToggle.addEventListener('click', function(event) {
					if (!body.classList.contains('menu-visible')) {
						event.preventDefault();
						event.stopPropagation();

						nav.classList.toggle('visible');
						body.classList.toggle('menu-visible');
					}

				});

			// Event: Toggle cart on click.
				cartToggle.addEventListener('click', function(event) {
					if (!body.classList.contains('menu-visible')) {
						event.preventDefault();
						event.stopPropagation();

						cart.classList.toggle('visible');
						body.classList.toggle('menu-visible');
					}
				});

				cartToggle2.addEventListener('click', function(event) {
					if (!body.classList.contains('menu-visible')) {
						event.preventDefault();
						event.stopPropagation();

						cart.classList.toggle('visible');
						body.classList.toggle('menu-visible');
					}
				});

		// Close.

			
			// Event: Hide on ESC.
				window.addEventListener('keydown', function(event) {

					if (event.keyCode == 27) {
						hideNav();
						hideCart();
					}
				});

			// Event: Hide nav on click.
				navClose.addEventListener('click', function(event) {

					event.preventDefault();
					event.stopPropagation();

					hideNav();

				});

			// Event: Hide cart on click.
				cartClose.addEventListener('click', function(event) {

					event.preventDefault();
					event.stopPropagation();

					hideCart();

				});
		
	//Close nav on 'a' click and transition body	
		$('nav').on('click', 'a', function(event) {
			var $a = $(this),
				href = $a.attr('href'),
				target = $a.attr('target');
			if (href.indexOf('#') != -1 || href.indexOf('tel') != -1 || href.indexOf('wa.me') != -1 || href.indexOf('mailto') != -1 || target == '_blank')
				return;
		// Cancel original event.
			event.preventDefault();
			event.stopPropagation();
			
			hideNav();
			body.classList.add('trans');
			window.setTimeout(function() {
				
				if (target == '_blank')
					window.open(href);
				else
					window.location.href = href;
				
			}, 250);
		});


	//Transition animation
		$('body').on('click', 'a', function(event) {
			
			var $a = $(this),
				href = $a.attr('href'),
				target = $a.attr('target');
			if (href.indexOf('#') != -1 || href.indexOf('tel') != -1 || href.indexOf('wa.me') != -1 || href.indexOf('mailto') != -1 || target == '_blank')
				return;
		// Cancel original event.
			event.preventDefault();
			event.stopPropagation();
			
			body.classList.add('trans');
			window.setTimeout(function() {
				
				if (target == '_blank')
					window.open(href);
				else
					window.location.href = href;
				
			}, 250);
		});

		//Order button - hide cart and show form
		$(document).ready(function(){
			var btn = document.getElementsByClassName('order');
			var thisBtn = btn[0];

			thisBtn.addEventListener("click", function(event){
				event.preventDefault();
				event.stopPropagation();
				if (!this.classList.contains("disabled")) {
					$('.cart-cart').hide();
					$('.form-wrapper').fadeIn("500");
				};
			});
		});

		//Return to cart from order
		$(document).ready(function(){
			var btn = document.getElementsByClassName('return-to-cart');
			var thisBtn;
			for (thisBtn of btn) {
				thisBtn.addEventListener("click", function(event){
					event.preventDefault();
					event.stopPropagation();
					$('.form-wrapper').hide();
					$('.cart-cart').fadeIn("500");
				});
			}
		});

		//Form submission
		$(document).ready(function(){
			$('.ajax-form').submit(function(event) {
				event.preventDefault();
				var form = $(this);
				$(".ajax-form").hide();
				$(".form-loading").fadeIn("200");
				var formdata = form.serialize();
				var myString = "";
				var myCart = JSON.parse(localStorage.getItem('shoppingCart'));

				for (var item in myCart) {
					myString += "&" + $.param(myCart[item]);
				}
				
				
				formdata += myString;
								
				$.ajax({
					dataType: "jsonp",
					url: "https://app.notstupid.name", // url: "https://script.google.com/macros/s/AKfycbzsBxQ_0rkFBSPUoWywnvdjUfyippHomxBDDRHV2hpTmWIrYNc/exec",
					data: formdata
						}).done(function(data) {
							$(".form-loading").hide();
							$(".form-succes").fadeIn("200");
							shoppingCart.clearCart();
							displayCart();
							/* yaCounter21957292.reachGoal('order');
							ga('send', 'event', 'form', 'order');
							fbq('track', 'Lead'); */
						}).fail(function(data) {
							$(".form-loading").hide();
							$(".form-error").fadeIn("200");
						});
			  });
		});
	
	/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
		/* var prevScrollpos = window.pageYOffset;
		window.onscroll = function() {
		var currentScrollPos = window.pageYOffset;
		if (prevScrollpos > currentScrollPos) {
			document.getElementById("navbar").style.top = "0";
		} else {
			document.getElementById("navbar").style.top = "-4em";
		}
		prevScrollpos = currentScrollPos;
		} */


})(jQuery);