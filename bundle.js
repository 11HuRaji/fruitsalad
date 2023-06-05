(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const fruitForm = document.querySelector("#inputSection form")
const fruitNutrition = document.querySelector("#nutritionSection p");
let cal = 0;

const fruitList = document.querySelector("#fruitSection ul")

const addFruit = (fruit) => {
    const li = document.createElement('li')
    li.textContent = `${fruit.name} of Genus ${fruit.genus}`
    li.addEventListener("click", (e) => {
        e.target.remove()
        cal -= fruit.nutritions.calories;
        fruitNutrition.textContent = cal;
    },{once:true})
    fruitList.appendChild(li)

    cal += fruit.nutritions.calories;
    fruitNutrition.textContent = cal;
}

// const fetchFruitData = (fruit) => {
//     fetch(`https://fruity-api.onrender.com/api/fruits/${fruit}`)
//         .then((res) => res.json())
//         .then(data => addFruit(data))
//         .catch((e) => console.log(e))
// }
const fetchFruitData = async (fruit) => {
    try {
        const res = await fetch(`https://fruity-api.onrender.com/api/fruits/${fruit}`);
        if (res.ok) {
            const data = await res.json();
            console.log(res)
            addFruit(data);
        } else {
            throw "Error: http status code = " + res.status;
        }
    } catch (error) {
        console.log(error);
    }
};

const extractFruit = (e) => {
    e.preventDefault()
    fetchFruitData(e.target.fruitInput.value)
    e.target.fruitInput.value = ""
}
fruitForm.addEventListener("submit", extractFruit)

},{}]},{},[1]);
