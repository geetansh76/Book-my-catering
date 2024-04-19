async function caterer_details() {
    let id = localStorage.getItem('currentCaterId')
    console.log(id)
    let baseUrl = 'http://localhost:3000/detail/'
    console.log(baseUrl + id.toString())

    url = baseUrl + id.toString();
    console.log(url)
    const res = await fetch(url)
    const data = await res.json()
    return data
}

let a = caterer_details()
x = document.querySelector('#name')

function menuForm(){
    window.location.href = '/services'
}

a.then((data) => {
    console.log(data)
    console.log(data.name)
    let detail_box = document.querySelector("#detail_box")
    let review_box = document.querySelector('#review_box')
    str = `
    <div id="box" class="box1"><img src="../image/cater_logo.jpg" alt=""></div>    
    <div id="box" class="box2">
                <h1 id="name">${data.name}</h1>
                <div class="item-rate">
                    <p>&#9733;&#9733;&#9733;&#9733;</p>
                </div>
                <div class="item">
                    <img src="../image/phone-call.png" alt="">
                    <p>+(91)-${data.mobile_no}</p>
                </div>
                <div class="item">
                    <img src="../image/location.png" alt="">
                    <p>${data.address} ${data.city} ${data.state} ${data.zip_code}</p>
                </div>
                <div class="item">
                    <img src="../image/bookmark.png" alt="">
                    <p>Restaurant, Tiffin Home Delivery Services, Caterers </p>
                </div>
                <div class="item">
                    <img src="../image/time-twenty-four.png" alt="">
                    <p>Open 24 hour</p>
                </div>
                <button onclick="menuForm()">Book Now</button>
            </div>
        </div>
    `
    str2 = `
            <h1>Review & Rating</h1>
            <div class="review">
                <img src="../image/rating-user.png" alt="">
                <div class="user-rating">
                    <div class="name-cmnt">
                        <h3>Mohan Pyare</h3>
                        <p> Excellent</p>
                    </div>
                    <div class="rate">
                        <p>&#9733;&#9733;&#9733;&#9733;</p>
                    </div>
                </div>
                <div class="date">
                    <p>05/04/2022</p>
                </div>
            </div>
            <div class="review">
                <img src="../image/rating-user.png" alt="">
                <div class="user-rating">
                    <div class="name-cmnt">
                        <h3>Mohan Pyaray</h3>
                        <p> Excellent</p>
                    </div>
                    <div class="rate">
                        <p>&#9733;&#9733;&#9733;&#9733;</p>
                    </div>
                </div>
                <div class="date">
                    <p>05/04/2022</p>
                </div>
            </div>
        </div>
    </div>
    `
    detail_box.innerHTML  = str
    review_box.innerHTML = str2 

})