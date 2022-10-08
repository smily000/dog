let timer
let deleteFirstPhotoDelay

///Daniel Reyes, Dogs, JavaScript & An API 🐶 Fetch, Promises & Async Await and your Danielreyes@lewisu.edu
//Brad Schiff who created the application/

async function start(){
    try{
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
        const data = await response.json()
        createList(data.message)
    } catch(e){
        console.log("there was a problem fetching the breed list.")
    }
    
}


start() 

function createList(breedsList){
    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
            <option>Choose a dog breed</option>
            ${Object.keys(breedsList).map(function (breeds) {
                return`<option>${breeds}</option>`
            }).join('')}
            </select>
    `


}

async function loadByBreed(breeds){
    if (breeds != "Choose a dog breed"){
        const response = await fetch(`https://dog.ceo/api/breed/${breeds}/images`)
        const data = await response.json()
        creatSlideShow(data.message)
    }
}


  
function creatSlideShow(images){
    let currentPostion = 0 
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)

    if (images.lenght > 1){
        document.getElementById("slideshow").innerHTML =  `
        <div class="slide" style="background-image: url('${images[0]}');"></div>
        <div class="slide" style="background-image: url('${images[1]}');"></div>
        `
    currentPostion += 2
    if (images.lenght == 2) currentPostion = 0
    timer = setInterval(nextSlide,3000)



    }else {
        document.getElementById("slideshow").innerHTML =  `
    <div class="slide" style="background-image: url('${images[0]}');"></div>
    <div class="slide"></div>
    `
    }
    

    
    function nextSlide(){
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPostion]}');"></div>` )
        deleteFirstPhotoDelay = setTimeout(function(){
            document.querySelector(".slide").remove()
        },1000)
        if (currentPostion +1 >= images.lenght){
            currentPostion =0

        }else{
            currentPostion++

        }
    }  

    
}