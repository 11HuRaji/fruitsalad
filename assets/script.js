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
