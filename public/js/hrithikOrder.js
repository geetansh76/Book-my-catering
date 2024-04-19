// async function getOrderPreview() {
//     url = 'http://localhost:3000/services/data'

//     const res = await fetch(url)
//     const data = await res.json()
//     return data
// }

async function getOrderPreview(){
    let id = localStorage.getItem('id')
    console.log(id)
    let baseUrl = 'http://localhost:3000/services/data/'
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
                    <p>${data.address}</p>
                </div>
                <div class="left-item">
                    <label for="caterers-name">No. of people </label>
                    <p>:</p>
                    <p>${data.noOfPeople}</p>
                </div>
                <div class="left-item">
                    <label for="caterers-name">No. of Caterers</label>
                    <p>:</p>
                    <p>${data.caters}</p>
                </div>
                <div class="left-item">
                    <label for="caterers-name">Booking Date</label>
                    <p>:</p>
                    <p>${data.bookingDate}</p>
                </div>
                <div class="left-item">
                    <label for="caterers-name">Event Date</label>
                    <p>:</p>
                    <p>${data.date}</p>
                </div>
                <div class="dashed-border"></div>
                <div class="left-item">
                    <label for="caterers-name">Total Item</label>
                    <p>:</p>
                    <p>${data.totalItem}</p>
                </div>
                <div class="left-item">
                    <label for="caterers-name">Price/Plate</label>
                    <p>:</p>
                    <p>₹ ${data.price}</p>
                </div>
                <div class="left-item">
                    <label for="caterers-name">Total</label>
                    <p>:</p>
                    <p>₹ ${data.totalPrice}</p>
                </div>
            </div>
        </div>
        <div class="right-details">
            <h2>Menu Items</h2>
            <div class="right-block">
                <h3>Break Fast</h3>
                <div class="right-item">
                    <label for="dish-name">Paneer</label>
                    <p class="dotted-border">••••••••••••••••••••••••••••••••••</p>
                    <p>₹ 150</p>
                </div>
                <div class="right-item">
                    <label for="dish-name">Paneer</label>
                    <p class="dotted-border">••••••••••••••••••••••••••••••••••</p>
                    <p>₹ 150</p>
                </div>
                <div class="right-item">
                    <label for="dish-name">Paneer</label>
                    <p class="dotted-border">••••••••••••••••••••••••••••••••••</p>
                    <p>₹ 150</p>
                </div>
                <div class="right-item">
                    <label for="dish-name">Paneer</label>
                    <p class="dotted-border">••••••••••••••••••••••••••••••••••</p>
                    <p>₹ 150</p>
                </div>
                <div class="right-item">
                    <label for="dish-name">Paneer</label>
                    <p class="dotted-border">••••••••••••••••••••••••••••••••••</p>
                    <p>₹ 150</p>
                </div>
                <div class="right-item">
                    <label for="dish-name">Paneer</label>
                    <p class="dotted-border">••••••••••••••••••••••••••••••••••</p>
                    <p>₹ 150</p>
                </div>
                <h3>Break Fast</h3>
                <div class="right-item">
                    <label for="dish-name">Paneer</label>
                    <p class="dotted-border">••••••••••••••••••••••••••••••••••</p>
                    <p>₹ 150</p>
                </div>
                <div class="right-item">
                    <label for="dish-name">Paneer</label>
                    <p class="dotted-border">••••••••••••••••••••••••••••••••••</p>
                    <p>₹ 150</p>
                </div>
                <div class="right-item">
                    <label for="dish-name">Paneer</label>
                    <p class="dotted-border">••••••••••••••••••••••••••••••••••</p>
                    <p>₹ 150</p>
                </div>
                <div class="right-item">
                    <label for="dish-name">Paneer</label>
                    <p class="dotted-border">••••••••••••••••••••••••••••••••••</p>
                    <p>₹ 150</p>
                </div>
                <div class="right-item">
                    <label for="dish-name">Paneer</label>
                    <p class="dotted-border">••••••••••••••••••••••••••••••••••</p>
                    <p>₹ 150</p>
                </div>
                <h3>Break Fast</h3>
                <div class="right-item">
                    <label for="dish-name">Paneer</label>
                    <p class="dotted-border">••••••••••••••••••••••••••••••••••</p>
                    <p>₹ 150</p>
                </div>
                <div class="right-item">
                    <label for="dish-name">Paneer</label>
                    <p class="dotted-border">••••••••••••••••••••••••••••••••••</p>
                    <p>₹ 150</p>
                </div>
                <div class="right-item">
                    <label for="dish-name">Paneer</label>
                    <p class="dotted-border">••••••••••••••••••••••••••••••••••</p>
                    <p>₹ 150</p>
                </div>
                <div class="right-item">
                    <label for="dish-name">Paneer</label>
                    <p class="dotted-border">••••••••••••••••••••••••••••••••••</p>
                    <p>₹ 150</p>
                </div>
                <div class="right-item">
                    <label for="dish-name">Paneer</label>
                    <p class="dotted-border">••••••••••••••••••••••••••••••••••</p>
                    <p>₹ 150</p>
                </div>
                <div class="right-item">
                    <label for="dish-name">Paneer</label>
                    <p class="dotted-border">••••••••••••••••••••••••••••••••••</p>
                    <p>₹ 150</p>
                </div>
                <div class="right-item">
                    <label for="dish-name">Paneer</label>
                    <p class="dotted-border">••••••••••••••••••••••••••••••••••</p>
                    <p>₹ 150</p>
                </div>
                <div class="right-item">
                    <label for="dish-name">Paneer</label>
                    <p class="dotted-border">••••••••••••••••••••••••••••••••••</p>
                    <p>₹ 150</p>
                </div>
            </div>
        </div>
    </div>
    `
    main_box.innerHTML = str
})