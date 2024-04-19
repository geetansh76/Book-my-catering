// async function getOrderPreview() {
//     url = 'http://localhost:3000/services/data'

//     const res = await fetch(url)
//     const data = await res.json()
//     return data
// }

async function getOrderPreview(){
    let id = localStorage.getItem('id')
    console.log(id)
    let baseUrl = 'http://localhost:3000/order/data/'
    console.log(baseUrl + id.toString())

    url = baseUrl + id.toString();
    console.log(url)
    const res = await fetch(url)
    const data = await res.json()
    return data
}

let a = getOrderPreview()
a.then((data) => {
    console.log(data)
    let main_box = document.querySelector('#main_box')
    const per_plate = data.total_price / 6
    // console.log(data.items[0].breakfast[1].title)
    for (var i = 0 ; i < data.items[0].breakfast.length ; i++){
        console.log(i)
        console.log(data.items[0].breakfast[i].title)
    }
    
    const breakfast=data.items[0].breakfast;
    const lunch=data.items[0].lunch;
    const dinner=data.items[0].dinner;
    str = `
    <div class="heading">Order Details</div>
    <div class="main">
        <div class="left-details">
            <div class="left-block">
                <h2>Booking Details</h2>
                <div class="left-item">
                    <label for="caterers-name">Caterers Name</label>
                    <p>:</p>
                    <p>${data.name}</p>
                </div>
                <div class="left-item">
                    <label for="caterers-name">Venue Address</label>
                    <p>:</p>
                    <p>${data.address} ${data.city} ${data.state} ${data.zip_code}</p>
                </div>
                <div class="left-item">
                    <label for="caterers-name">No. of people </label>
                    <p>:</p>
                    <p>6</p>
                </div>
                <div class="left-item">
                    <label for="caterers-name">No. of Caterers</label>
                    <p>:</p>
                    <p>${data.no_of_caterer}</p>
                </div>
                <div class="left-item">
                    <label for="caterers-name">Booking Date</label>
                    <p>:</p>
                    <p>${data.order_date}</p>
                </div>
                <div class="left-item">
                    <label for="caterers-name">Event Date</label>
                    <p>:</p>
                    <p>${data.event_date}</p>
                </div>
                <div class="dashed-border"></div>
                <div class="left-item">
                    <label for="caterers-name">Total Item</label>
                    <p>:</p>
                    <p>${breakfast.length+lunch.length+dinner.length}</p>
                </div>
                <div class="left-item">
                    <label for="caterers-name">Price/Plate</label>
                    <p>:</p>
                    <p>₹ ${per_plate}</p>
                </div>
                <div class="left-item">
                    <label for="caterers-name">Total</label>
                    <p>:</p>
                    <p>₹ ${data.total_price}</p>
                </div>
            </div>
        </div>
        <div class="right-details">
            <h2>Menu Items</h2>
            <div class="right-block">`
    if(breakfast.length!=0){
        str+='<h3>Break Fast</h3>'
    }
    for(let i=0;i<breakfast.length;i++ ){
        str+=`   
        <div class="right-item">
            <label for="dish-name">${breakfast[i].title}</label>
            <p class="dotted-border">••••••••••••••••••••••••••••••••••</p>
            <p>₹ ${breakfast[i].price}</p>
        </div>`
    }
    if(lunch.length!=0){
        str+='<h3>Lunch</h3>'
    }
    for(let i=0;i<lunch.length;i++ ){
        str+=`   
        <div class="right-item">
            <label for="dish-name">${lunch[i].title}</label>
            <p class="dotted-border">••••••••••••••••••••••••••••••••••</p>
            <p>₹ ${lunch[i].price}</p>
        </div>`
    }
    if(dinner.length!=0){
        str+='<h3>Dinner</h3>'
    }
    for(let i=0;i<dinner.length;i++ ){
        str+=`   
        <div class="right-item">
            <label for="dish-name">${dinner[i].title}</label>
            <p class="dotted-border">••••••••••••••••••••••••••••••••••</p>
            <p>₹ ${dinner[i].price}</p>
        </div>`
    }    
        
        
str+=`</div>
</div>
</div>`
            
    main_box.innerHTML = str
})