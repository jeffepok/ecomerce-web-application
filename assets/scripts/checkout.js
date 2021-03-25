$(document).ready(function(){
let totalPrice = $('#totalPrice');
let productName = $('#productName');
let orders = $('#orders');
let cartItems = $('#cartItems');
var discount;
let checkoutBtn = $('#checkout');


if(!$.isNumeric(localStorage.getItem('discount'))){
    localStorage.setItem('discount', localStorage.getItem('subTotal')); 
}
if(!$.isNumeric(localStorage.getItem('subTotal'))){
    localStorage.setItem('subTotal', 0); 
}
if(!$.isNumeric(localStorage.getItem('discount'))){
    localStorage.setItem('discount', 0); 
}
if(localStorage.getItem('discount') == 0){
    discount = localStorage.getItem('subTotal')
}else{
    discount = localStorage.getItem('discount');
}

totalPrice.text(discount);
// Get orders
if(localStorage.getItem('orderDetails')!= null){
    orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
    orders.text(orderDetails.length);
    cartItems.html(fetchOrders());
}else{
    orders.text(0);
}



checkoutBtn.click(function(){
    if(localStorage.getItem('orderDetails') == null){
        alert("No item in cart");
    }
    else if(JSON.parse((localStorage.getItem('orderDetails'))).length < 1){
        alert("No item in cart");
    }
    else{
        alert(`Items shipped to ${$('#adr').val()}`)
        localStorage.removeItem('orderDetails');
        localStorage.removeItem('discount');
        localStorage.removeItem('subTotal');
        location.reload();
    }

})

function fetchOrders(){
    let order = JSON.parse(localStorage.getItem('orderDetails'));
    let cartHtml = "";

    for(var i =0; i < order.length; i++){
        cartHtml +=
            `<p><a id="productName" class="text-bold" href="#"><span>${order[i].quantity}&times</span> ${order[i].productName}</a> <span id="price" class="price">$${order[i].price}</span></p>
            `
    }
    // add event listeners to anchor tags
    return cartHtml;
}

})

