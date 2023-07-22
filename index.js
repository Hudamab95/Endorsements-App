import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://playground-7a8a5-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const inputFieldEl = document.getElementById("inputfield-el")
const btn = document.getElementById("btn")
const endorsementsEl = document.getElementById("endorsements-el")

btn.addEventListener("click", function(){
    let inputField = inputFieldEl.value
    
    push(endorsementsInDB, inputField)
    
    clearinputField()
})


onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
    
    let itemsArray = Object.entries(snapshot.val())
    
   clearEndorsementsEl()
    
    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        
       appendItemToEndorsementsEl(currentItem)
    }
    } else {
        endorsementsEl.innerHTML = "No items here... yet"
    }
    
})


// to clear the field after button cliked
function clearinputField(){
    inputFieldEl.value = ""
}

function clearEndorsementsEl() {
    endorsementsEl.innerHTML = ""
}



function appendItemToEndorsementsEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `endorsements/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    endorsementsEl.append(newEl)
}