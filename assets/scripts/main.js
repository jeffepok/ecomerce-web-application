$(document).ready(function(){
    // Get elements
    let $productName = $('#productName');
    let $price = $('#price');
    let $size = $('#size');
    let $color = $('#color');

    let $cartItems = $("#cartItems");
    let $cartProductName = $('#cart-productName');
    let $cartPrice = $('#cart-price');
    let $cartSize = $('#cart-size');
    let $cartColor = $('#cart-color');
    let $cartQuantity = $("#cart-quantity");
    let $stock = $('#stock');
    let $addToBag = $('#addToBag');
    let $next = $('#next');
    let $increase = $("#increase");
    let $decrease = $("#decrease");
    let $quantity = $("#quantityAmount");
    // initialize
    $quantity.text("0");
    // declare function to increase quantity
    updateQuantity($increase, $decrease, $quantity);



	var $L = 1200,
    $menu_navigation = $('#main-nav'),
    $cart_trigger = $('#cd-cart-trigger'),
    $hamburger_icon = $('#cd-hamburger-menu'),
    $lateral_cart = $('#cd-cart'),
    $shadow_layer = $('#cd-shadow-layer');
    $addToBag = $('#addToBag');
//open lateral menu on mobile
$hamburger_icon.on('click', function(event){
    event.preventDefault();
    //close cart panel (if it's open)
    $lateral_cart.removeClass('speed-in');
    toggle_panel_visibility($menu_navigation, $shadow_layer, $('body'));
});

//open cart
$cart_trigger.on('click', function(event){
    event.preventDefault();
    setDetails();
    //close lateral menu (if it's open)
    $menu_navigation.removeClass('speed-in');
    toggle_panel_visibility($lateral_cart, $shadow_layer, $('body'));
});
$addToBag.on('click', function(event){
    event.preventDefault();
    setDetails();
    //close lateral menu (if it's open)
    $menu_navigation.removeClass('speed-in');
    toggle_panel_visibility($lateral_cart, $shadow_layer, $('body'));
});

function setDetails(){
    details = {
        productName: $productName.text(),
        price: $price.text(),
        quantity: $quantity.text(),
        size: $size.val(),
        color: $color.val(), 
    }
    var initialOrder;
    orderDetails = [details]
    
    if(localStorage.getItem('orderDetails') != null){
        initialOrder = JSON.parse(localStorage.getItem('orderDetails'));
        initialOrder.push(details);
        localStorage.setItem('orderDetails', JSON.stringify(initialOrder));
    }
    else {
        localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    }
    let order = JSON.parse(localStorage.getItem('orderDetails'));
    let cartHtml = "";
    for(var i =0; i < order.length; i++){
        cartHtml +=
            `
            <li>
            <div class="text-dark-grey text-bold"><span id="cart-productName">${order[i].productName}</span></div>
            <div class="cd-price">Price: <span id="cart-price">${order[i].price}</span></div>
            <div class="cd-price">Quantity: <span id="cart-quantity">${order[i].quantity}</span></div>
            <div class="cd-price">Size: <span id="cart-size">${order[i].size}</span></div>
            <div class="cd-price">Color: <span id="cart-color">${order[i].color}</span></div>
            <a href="#0" class="cd-item-remove cd-img-replace">Remove</a>
            </li>

            `
    }

    $cartItems.html(cartHtml)
    

    console.log(cartHtml);
        // cartHtml.concat(
        //     `
        //     <li>
        //     <div class="text-dark-grey text-bold"><span id="cart-productName">${o.productName}</span></div>
        //     <div class="cd-price">Price: <span id="cart-price">${o.price}</span></div>
        //     <div class="cd-price">Quantity: <span id="cart-quantity">${o.quantity}</span></div>
        //     <div class="cd-price">Size: <span id="cart-size">${o.size}</span></div>
        //     <div class="cd-price">Color: <span id="cart-color">${o.color}</span></div>
        //     <a href="#0" class="cd-item-remove cd-img-replace">Remove</a>
        //     </li>

        //     `)

    // $cartPrice.text(order.price);
    // $cartSize.text(order.size);
    // $cartColor.text(order.color);
    // $cartQuantity.text(order.quantity);
}

//close lateral cart or lateral menu
$shadow_layer.on('click', function(){
    $shadow_layer.removeClass('is-visible');
    // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
    if( $lateral_cart.hasClass('speed-in') ) {
        $lateral_cart.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            $('body').removeClass('overflow-hidden');
        });
        $menu_navigation.removeClass('speed-in');
    } else {
        $menu_navigation.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            $('body').removeClass('overflow-hidden');
        });
        $lateral_cart.removeClass('speed-in');
    }
});

//move #main-navigation inside header on laptop
//insert #main-navigation after header on mobile
move_navigation( $menu_navigation, $L);
$(window).on('resize', function(){
    move_navigation( $menu_navigation, $L);
    
    if( $(window).width() >= $L && $menu_navigation.hasClass('speed-in')) {
        $menu_navigation.removeClass('speed-in');
        $shadow_layer.removeClass('is-visible');
        $('body').removeClass('overflow-hidden');
    }

});
})



function toggle_panel_visibility ($lateral_panel, $background_layer, $body) {
	if( $lateral_panel.hasClass('speed-in') ) {
		$lateral_panel.removeClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			$body.removeClass('overflow-hidden');
		});
		$background_layer.removeClass('is-visible');

	} else {
		$lateral_panel.addClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			$body.addClass('overflow-hidden');
		});
		$background_layer.addClass('is-visible');
	}
}

function move_navigation( $navigation, $MQ) {
	if ( $(window).width() >= $MQ ) {
		$navigation.detach();
		$navigation.appendTo('header');
	} else {
		$navigation.detach();
		$navigation.insertAfter('header');
	}
}
function updateQuantity($increase, $decrease, $quantity){
    $increase.click(function(){
        // update quantity
        // parse initial value to int
        if($quantity.text()=="") $quantity.text(0);
        let initialValue = parseInt($quantity.text());
        // set the quantity
        $quantity.text(initialValue + 1);
    });
    $decrease.click(function(){
        // update quantity
        // parse initial value to int
        let initialValue = parseInt($quantity.text());
        // set the quantity
        if(initialValue > 0) $quantity.text(initialValue - 1);
    });
}

function addToCart(){

}

