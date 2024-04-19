
function buttonclickhandler() {

    // Instantiate an new XHR Object
    const xhr = new XMLHttpRequest();

    // Open an obejct (GET/POST, PATH,
    // ASYN-TRUE/FALSE)
    xhr.open("POST",
        "http://localhost:3000/users", true);




    // When response is ready
    xhr.onload = function () {
        if (this.status === 200) {

            // Changing string data into JSON Object
            obj = JSON.parse(this.responseText);
            console.log(obj)

            let cards = document.getElementById('cards')
            str = ''
            for (i = 0; i < obj.length; i++) {
                str += `<div class="card">
                <div class="box"><img src="./image/cater_logo.jpg" alt=""> </div>
                <div class="box">
                    <h1>${obj[i].name}</h1>
                    <div class="item">
                        <img src="./image/phone-call.png" alt="">
                        <p>+(91)-9876543210</p>
                    </div>
                    <div class="item">
                        <img src="./image/location.png" alt="">
                        <p>${obj[i].address} ${obj[i].state}</p>
                    </div>
                    <div class="item">
                        <img src="./image/bookmark.png" alt="">
                        <p>Tiffin, Catering, Resturant, ... | more</p>
                    </div>
                    <div class="item">
                        <img src="./image/time-twenty-four.png" alt="">
                        <p>Open 24 hour</p>
                    </div>
                </div>
                <div class="box">
                    <div class="price">
                        <p>
                        <h1>&#8377; 300 /</h1>
                        <h2> Per head</h2>
                        </p>
                    </div>
                </div>
                <div class="box">
                    <div class="button">
                        <a href="./components/login.html">Book Now</a>
                    </div>
                </div>
            </div>`
            }
            cards.innerHTML = str
        }
        else {
            console.log("File not found");
        }
    }
    xhr.send();
}
buttonclickhandler();

