$(document).ready(function(){
    // Get elements
    let $productName = $('#productName');
    let $price = $('#price');
    let $size = $('#size');
    let $color = $('#color');
    let $stock = $('#stock');
    let $cartItems = $("#cartItems");
    let $cartPrice = $('#total');
    let $addToBag = $('#addToBag');
    let $increase = $("#increase");
    let $decrease = $("#decrease");
    let $quantity = $("#quantityAmount");
    let $homePage = $("#homePage");
    let $cartPage = $("#cartPage");

    // initialize
    $quantity.text($stock.text());
    var numberOfItems;
    var stockValue
    console.log(!$.isNumeric(localStorage.getItem('stock')))
    if(!$.isNumeric(localStorage.getItem('stock'))){
        console.log($stock.text());
        stockValue = parseInt($stock.text());
        localStorage.setItem('stock', stockValue);
    }
    else{
        stockValue = parseInt(localStorage.getItem('stock'));
    }
    if(localStorage.getItem('numberOfItems') == null){
        numberOfItems = 0;
    }
    else{
        numberOfItems = localStorage.getItem('numberOfItems');
    }
    // declare function to increase quantity
    updateQuantity($increase, $decrease, $quantity, $stock);



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
$quantity.on("keypress keyup",function(){
    if($(this).text() == '0'){
      $(this).text('');  
    }
});
//open cart
$cart_trigger.on('click', function(event){
    event.preventDefault();

    //close lateral menu (if it's open)
    $menu_navigation.removeClass('speed-in');
    toggle_panel_visibility($lateral_cart, $shadow_layer, $('body'));
    $cartItems.html(fetchOrders());
    let order = JSON.parse(localStorage.getItem('orderDetails'));
    let subTotal = 0.0;
    for(var i =0; i < order.length; i++){
        let anchors = document.querySelectorAll(`.${order[i].productName.toLowerCase().split(" ")[0]}`)
        anchors.forEach(anchor => {
            anchor.addEventListener("click", function(e){
                let subTotal = 0.0;
                let newOrders = JSON.parse(localStorage.getItem('orderDetails'));
                e.currentTarget.parentNode.remove();
                let id = parseInt(e.target.id);
                // remove item from local storage
                newOrders = newOrders.filter(order => order.id != id);
                localStorage.setItem('orderDetails', JSON.stringify(newOrders));
                for(var i=0; i < newOrders.length; i++){
                    subTotal += parseInt(order[i].quantity) * parseFloat(order[i].price);
                    localStorage.setItem('subTotal', subTotal);
                }
                if(newOrders.length == 0){
                    localStorage.setItem('subTotal', 0);
                }
                updatesubTotal();
                })               
        })

            // calculate total price
        subTotal += parseInt(order[i].quantity) * parseFloat(order[i].price);
        localStorage.setItem('subTotal', subTotal);
        updatesubTotal();
    }

});
$addToBag.on('click', function(event){
    console.log(parseInt($('#quantityAmount').text()));
    if($.isNumeric($('#quantityAmount').text())){
        if(parseInt($('#quantityAmount').text()) <= parseInt(localStorage.getItem('stock'))){
            event.preventDefault();
            $menu_navigation.removeClass('speed-in');
            toggle_panel_visibility($lateral_cart, $shadow_layer, $('body'));
            // if it is a number
            setDetails();
            fetchOrders();
            var initialStockValue = parseInt(localStorage.getItem('stock'));
            var finalStockValue = initialStockValue - parseInt($('#quantityAmount').text());
            localStorage.setItem('stock', finalStockValue);
        }else{
            alert("Stock less than requested quantity");
        }

    }
    else{
        alert("Please type in quantity")
    }
    
});

function setDetails(){
    numberOfItems +=1;
    details = {
        productName: $productName.text(),
        price: $price.text(),
        quantity: $quantity.text(),
        size: $size.val(),
        color: $color.val(),
        id: numberOfItems,
        stock: $stock.text()
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


    $cartItems.html(fetchOrders());
}
function fetchOrders(){
    let order = JSON.parse(localStorage.getItem('orderDetails'));
    let cartHtml = "";
    for(var i =0; i < order.length; i++){
        cartHtml +=
            `
            <li id="${order[i].productName.toLowerCase().split(" ")[0]}id" class= "${order[i].productName.toLowerCase().split(" ")[0] + 'item'}">
            <div class="text-dark-grey text-bold"><span id="cart-productName">${order[i].productName}</span></div>
            <div class="cd-price">Price: <span id="cart-price">${order[i].price}</span></div>
            <div class="cd-price">Quantity: <span id="cart-quantity">${order[i].quantity}</span></div>
            <div class="cd-price">Size: <span id="cart-size">${order[i].size}</span></div>
            <div class="cd-price">Color: <span id="cart-color">${order[i].color}</span></div>
            <a href="#0" id = "${order[i].id}" class="${order[i].productName.toLowerCase().split(" ")[0]} cd-item-remove cd-img-replace">Remove</a>
            </li>

            `
    }
    // add event listeners to anchor tags
    let subTotal = 0;
    for(var i =0; i < order.length; i++){
        let anchors = document.querySelectorAll(`.${order[i].productName.toLowerCase().split(" ")[0]}`)
        anchors.forEach(anchor => {
            anchor.addEventListener("click", function(e){
                let subTotal = 0;
                let newOrders = JSON.parse(localStorage.getItem('orderDetails'));
                e.currentTarget.parentNode.remove();
                let id = parseInt(e.target.id);
                // remove item from local storage
                newOrders = newOrders.filter(order => order.id != id);
                localStorage.setItem('orderDetails', JSON.stringify(newOrders));
                for(var i=0; i < newOrders.length; i++){
                    subTotal += parseInt(order[i].quantity) * parseFloat(order[i].price);
                    localStorage.setItem('subTotal', subTotal);
                }
                if(newOrders.length == 0){
                    localStorage.setItem('subTotal', 0);
                }
                var initialStockValue = parseInt(localStorage.getItem('stock'));
                console.log(order[i])
                var finalStockValue = parseInt(order[i].quantity) + initialStockValue;
                console.log(finalStockValue)
                localStorage.setItem('stock', finalStockValue);
                updatesubTotal();
                })               
        })
        // calculate total price
        subTotal += parseInt(order[i].quantity) * parseFloat(order[i].price);
        localStorage.setItem('subTotal', subTotal);
        updatesubTotal();
    }
    return cartHtml;
}
function updatesubTotal(){
    $cartPrice.text(`$${localStorage.getItem('subTotal')}`);
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
function updateQuantity($increase, $decrease, $quantity, $stock){
    $increase.click(function(){
        // update quantity
        // parse initial value to int
        if($quantity.text()=="") $quantity.text(0);
        let initialValue = parseInt($quantity.text());
        // set the quantity
        if((initialValue + 1) <= parseInt($stock.text())){
            $quantity.text(initialValue + 1);
        }
    });
    $decrease.click(function(){
        // update quantity
        // parse initial value to int
        let initialValue = parseInt($quantity.text());
        // set the quantity
        if(initialValue > 1) $quantity.text(initialValue - 1);
    });
}

