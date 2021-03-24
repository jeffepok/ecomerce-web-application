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
discount = localStorage.getItem('discount');
totalPrice.text(discount)
// Get orders
orderDetails = JSON.parse(localStorage.getItem('orderDetails'))
orders.text(orderDetails.length)
cartItems.html(fetchOrders());
console.log(fetchOrders());

checkoutBtn.click(function(){
    alert(`Items shipped to ${$('#adr').val()}`)
})

function fetchOrders(){
    let order = JSON.parse(localStorage.getItem('orderDetails'));
    let cartHtml = "";
    for(var i =0; i < order.length; i++){
        cartHtml +=
            `<p><a id="productName" class="text-bold" href="#">${order[i].productName}</a> <span id="price" class="price">$${order[i].price}</span></p>
            `
    }
    // add event listeners to anchor tags
    return cartHtml;
}

})

