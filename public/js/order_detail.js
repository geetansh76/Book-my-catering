let items = {}
let item_count = document.getElementById('item_count')
let total_price = document.getElementById('total_price')
let products = document.getElementById("products");
var cart_item = document.getElementById('cart-items');
let totalAmount = 0;

function startingFunction() {

    const xhr = new XMLHttpRequest();
    xhr.open("GET",
        "http://localhost:3000/menu/data", true);
    xhr.onload = function () {
        if (this.status === 200) {

            obj = JSON.parse(this.responseText);
            console.log(obj)
            let breakfast = obj[0].breakfast;
            let lunch = obj[0].lunch;
            let dinner = obj[0].dinner;

            str = ""
            if (breakfast.length != 0) {
                str += `
                                        <h2>Break Fast</h2>`
                for (let i = 0; i < breakfast.length; i++) {
                    items[breakfast[i].id] = breakfast[i];

                    str += `<div class="product">
                                <div class="product-info">
                                    <div class="item" >
                                        <h3 class="product-name">${breakfast[i].title}</h3>
                                        <span class="border"></span>
                                        <h4 class="product-price">₹ ${breakfast[i].price}</h4>
                                        <button class="product-add" onClick="myFunction('add',this.id)" id="${breakfast[i].id}">
                                            <i class="fa fa-plus" aria-hidden="true"></i>
                                            <span class="add">Add</span>
                                        </button>
                                        <button class="product-remove none" onClick="myFunction('remove',this.id)" id='${breakfast[i].id}_remove'>
                                            <i class="fa fa-trash" aria-hidden="true"></i>
                                            <span class="remove">Remove</span>
                                        </button>
                            
                                    </div>
                                </div>
                            </div>`
                }

            }
            if (lunch.length != 0) {
                str += `
                                        <h2>Lunch</h2>`
                for (let i = 0; i < lunch.length; i++) {
                    items[lunch[i].id] = lunch[i];

                    str += `<div class="product">
                                <div class="product-info">
                                    <div class="item" >
                                        <h3 class="product-name">${lunch[i].title}</h3>
                                        <span class="border"></span>
                                        <h4 class="product-price">₹ ${lunch[i].price}</h4>
                                        <button class="product-add" onClick="myFunction('add',this.id)" id="${lunch[i].id}">
                                            <i class="fa fa-plus" aria-hidden="true"></i>
                                            <span class="add">Add</span>
                                        </button>
                                        <button class="product-remove none" onClick="myFunction('remove',this.id)" id='${lunch[i].id}_remove'>
                                            <i class="fa fa-trash" aria-hidden="true"></i>
                                            <span class="remove">Remove</span>
                                        </button>
                            
                                    </div>
                                </div>
                            </div>`
                }

            }
            if (dinner.length != 0) {

                str += `
                                        <h2>Dinner</h2>`
                for (let i = 0; i < dinner.length; i++) {
                    items[dinner[i].id] = dinner[i];

                    str += `<div class="product" >
                                <div class="product-info">
                                    <div class="item">
                                        <h3 class="product-name">${dinner[i].title}</h3>
                                        <span class="border"></span>
                                        <h4 class="product-price">₹ ${dinner[i].price}</h4>
                                       
                                        <button class="product-add" onClick="myFunction('add',this.id)" id="${dinner[i].id}">
                                            <i class="fa fa-plus" aria-hidden="true"></i>
                                            <span class="add">Add</span>
                                        </button>
                                        <button class="product-remove none" onClick="myFunction('remove',this.id)" id='${dinner[i].id}_remove'>
                                            <i class="fa fa-trash" aria-hidden="true"></i>
                                            <span class="remove">Remove</span>
                                        </button>
                            
                                    </div>
                                </div>
                            </div>`
                }
            }

            products.innerHTML = str;
        }
        else {
            console.log("File not found");
        }
    }
    xhr.send();
}
window.onload = (event) => {
    startingFunction();
};


var cartList = []
function myFunction(str, id) {
    console.log(id);
    if (str == 'add') {

        console.log(id + "_remove")
        totalAmount += items[id].price;
        cartList.push(items[id]);
        document.getElementById(id).classList.add('none')
        document.getElementById(`${id}_remove`).classList.remove('none')

    }
    else {

        id = id.substring(0, id.length - 7)

        cartList = cartList.filter((value) => {
            return value.id != id;
        });
        totalAmount -= items[id].price;
        document.getElementById(id).classList.remove('none')
        document.getElementById(`${id}_remove`).classList.add('none')
    }
    updateCart();
    console.log(cartList)
}
function updateCart() {
    total_price.innerHTML = totalAmount.toString()
    item_count.innerHTML = cartList.length.toString()
    let str = '';
    for (let i = 0; i < cartList.length; i++) {
        str += `
                <div class="elements">
                            <div class="element">
                                <h3 class="product-name">${cartList[i].title}</h3>
                                <h3 class="product-price">₹ ${cartList[i].price}</h3>
                                <button class="product-remove" onClick="myFunction('remove','${cartList[i].id}_remove')">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                    <span class="remove">Remove</span>
                                </button>
                            </div>
                </div>`
    }
    cart_item.innerHTML = str;

}