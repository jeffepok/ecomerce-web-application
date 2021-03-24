$(document).ready(function(){
    let $cartItems = $("#cartItems");
    let $cartPrice = $('#total');
    let $apply = $("#apply");
    let $subTotal = $("#subTotal");
    let $discountCode = $("#discountCode");
    let $discount = $("#discount");
    let $cartPage = $("#cartPage");
    let $homePage = $("#homePage");
    // $cartPage.toggleClass("current");
    // $homePage.toggleClass("current");
    
    // localStorage.setItem('subTotal', parseFloat(localStorage.getItem('totalPrice')));
    $cartItems.html(fetchOrders());

    $apply.click(function(){
        if($discountCode.val().length == 5){
            updateTotalPrice();
            updateDiscount();
        }
    })

    let order = JSON.parse(localStorage.getItem('orderDetails'));
    let totalPrice = 0.0;
    for(var i =0; i < order.length; i++){
        let anchors = document.querySelectorAll(`.${order[i].productName.toLowerCase().split(" ")[0]}`)
        let inputs = document.querySelectorAll(`.${order[i].productName.toLowerCase().split(" ")[0]}inp`)
        inputs.forEach(input => {
            input.addEventListener("change", function(e){
                let totalPrice = 0.0;
                let newOrders = JSON.parse(localStorage.getItem('orderDetails'));
                let value = parseInt(e.target.value);
                // remove item from local storage
                for(var i=0; i < newOrders.length; i++){
                    totalPrice += parseInt(value) * parseFloat(order[i].price);
                    localStorage.setItem('subTotal', totalPrice);
                }
                updateTotalPrice();
                })               
        })
        anchors.forEach(anchor => {
            anchor.addEventListener("click", function(e){
                let totalPrice = 0.0;
                let newOrders = JSON.parse(localStorage.getItem('orderDetails'));
                e.currentTarget.parentNode.remove();
                let id = parseInt(e.target.id);
                // remove item from local storage
                newOrders = newOrders.filter(order => order.id != id);
                localStorage.setItem('orderDetails', JSON.stringify(newOrders));
                for(var i=0; i < newOrders.length; i++){
                    totalPrice += parseInt(order[i].quantity) * parseFloat(order[i].price);
                    localStorage.setItem('subTotal', totalPrice);
                }
                if(newOrders.length == 0){
                    localStorage.setItem('subTotal', 0);
                }
                updateTotalPrice();
                })               
        })

            // calculate total price
        totalPrice += parseInt(order[i].quantity) * parseFloat(order[i].price);
        localStorage.setItem('subTotal', totalPrice);
        updateTotalPrice();
    }



    function calcDiscount(){
        let total = parseFloat(localStorage.getItem('subTotal')); 
        let discount = total - (total/2)
        return discount;
    }

    function fetchOrders(){
        let order = JSON.parse(localStorage.getItem('orderDetails'));
        let cartHtml = "";
        for(var i =0; i < order.length; i++){
            cartHtml +=
                `
                <li  class= "${order[i].productName.toLowerCase().split(" ")[0] + 'item'}">
                <div class="text-dark-grey text-bold"><span id="cart-productName">${order[i].productName}</span></div>
                <div class="cd-price">Price: <span id="cart-price">${order[i].price}</span></div>
                <div>
                <label class="text-dark-grey">Quantity</label>
                <input id="${order[i].productName.toLowerCase().split(" ")[0]}id"  min="1" type="number" value="${order[i].quantity}"class="${order[i].productName.toLowerCase().split(" ")[0]}inp text-sm"></input>
                </div>
                <div class="cd-price">Size: <span id="cart-size">${order[i].size}</span></div>
                <div class="cd-price">Color: <span id="cart-color">${order[i].color}</span></div>
                <a href="#0" id = "${order[i].id}" class="${order[i].productName.toLowerCase().split(" ")[0]} cd-item-remove cd-img-replace">Remove</a>
                </li>
    
                `
        }
        // add event listeners to anchor tags
        let totalPrice = 0.0;
        for(var i =0; i < order.length; i++){
            let anchors = document.querySelectorAll(`.${order[i].productName.toLowerCase().split(" ")[0]}`)
            anchors.forEach(anchor => {
                anchor.addEventListener("click", function(e){
                    let totalPrice = 0.0;
                    let newOrders = JSON.parse(localStorage.getItem('orderDetails'));
                    e.currentTarget.parentNode.remove();
                    let id = parseInt(e.target.id);
                    // remove item from local storage
                    newOrders = newOrders.filter(order => order.id != id);
                    localStorage.setItem('orderDetails', JSON.stringify(newOrders));
                    for(var i=0; i < newOrders.length; i++){
                        totalPrice += parseInt(order[i].quantity) * parseFloat(order[i].price);
                        localStorage.setItem('subTotal', totalPrice);
                    }
                    if(newOrders.length == 0){
                        localStorage.setItem('subTotal', 0);
                    }
                    var initialStockValue = parseInt(localStorage.getItem('stock'));
                    var finalStockValue = initialStockValue + parseInt($('#quantityAmount').text());
                    localStorage.setItem('stock', finalStockValue);
                    updateTotalPrice();
                    })               
            })
            // calculate total price
            totalPrice += parseInt(order[i].quantity) * parseFloat(order[i].price);
            localStorage.setItem('subTotal', totalPrice);
            updateTotalPrice();
        }
        return cartHtml;
    }
    function updateTotalPrice(){
        $subTotal.text(`$${localStorage.getItem('subTotal')}`);
        $cartPrice.text(`$${localStorage.getItem('subTotal')}`)
    }
    function updateDiscount(){
        $discount.text("50%")
        $cartPrice.text(`$${calcDiscount()}`);
        localStorage.setItem('discount', calcDiscount());
    }

})