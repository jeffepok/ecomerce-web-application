$(document).ready(function(){
    let $productName = $('#productName');
    let $price = $('#price');
    let $stock = $('#stock');
    let $next = $('#next');
    // set currentProduct in local storage
    if(localStorage.getItem('currentproduct') == null){
        localStorage.setItem('currentProduct', 1);
    }
    let currentProduct = localStorage.getItem('currentProduct');
    showProduct();
    $next.click(function(){
        if(currentProduct >= 10){
            currentProduct = 1;
            localStorage.setItem('currentProduct', 1);
        }
        else {
            currentProduct = parseInt(currentProduct) + 1;
            localStorage.setItem('currentProduct', currentProduct);
        }
        getProduct();
        showProduct();
    })

    


    function showProduct(){
        if(localStorage.getItem('product') == null){
            getProduct();
        }
        else{
            // Get the product info from local storage
            let productInfo = JSON.parse(localStorage.getItem('product'));
            // Get the product name from local storage
            let productName = productInfo.name;
            let price = productInfo.price;
            let stock = productInfo.stock;
            // set
            $productName.text(productName);
            $price.text(price);
            $stock.text(stock);
        }

    }
    
    // Get product with ajax get request using product id
    function getProduct(){

        $.get("assets/products/products.json", function(response){
            let products = response.products;
            products.forEach(product =>{
                if(parseInt(product.id) == currentProduct){
                    localStorage.setItem('product', JSON.stringify(product));
                }
            })

            let productInfo = JSON.parse(localStorage.getItem('product'));
            // Get the product name from local storage
            let productName = productInfo.name;
            let price = productInfo.price;
            let stock = productInfo.stock;
            // set
            $productName.text(productName);
            $price.text(price);
            $stock.text(stock);
           
        })

    }
        
})
