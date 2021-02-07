const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetails = document.getElementById('meal-details');

// event listeners
searchBtn.addEventListener('click', getMealList);

// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    .then(res => res.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div onclick ="mealDetailsView(${meal.idMeal})" class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "No result found!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}
function mealDetailsView(id){
    console.log(id);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);

        mealDetails.classList.remove('d-none');

        const htmlTemplate = `
        <div>
        <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <h2>${meal.strMeal}</h2>
        `
        mealDetails.innerHTML = htmlTemplate;
    })
}

