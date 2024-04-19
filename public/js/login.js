async function gettoken(){
    url = 'http://localhost:3000/login'
     params = {
         method : 'Post',
         headers : {
             "Content-Type" : "application/json",
         }
     }
    const res = await fetch(url,params)
    const data = await res.json()
    return data 
}

let z = gettoken()
z.then((data)=>{
    console.log(data)
   // localStorage.setItem('user_details',data)
})
