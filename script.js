const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');


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
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => {
        displayMealDetails(data.meals);

    })
}
const displayMealDetails = meals => {
    console.log(meals);
    const mealDetails = document.getElementById('meal-details');
    let html = "";
    meals.forEach(meal => {

        html += `
            <div class = "meal-details-img">
                <img src = "${meal.strMealThumb}" alt = "food">
            </div>
            <div class = "meal-details-name">
                <h3>${meal.strMeal}</h3>
                <h6>Origin area : ${meal.strArea}</h6>
                <h6>Food type : ${meal.strTags}</h6>
            </div>
            <div class = "list-of-recipes">
                <h5>Ingredients :</h5>
                <ul class="ingredients">
                    <li>${meal.strMeasure1} ${meal.strIngredient1}</li>
                    <li>${meal.strMeasure2} ${meal.strIngredient2}</li>
                    <li>${meal.strMeasure3} ${meal.strIngredient3}</li>
                    <li>${meal.strMeasure4} ${meal.strIngredient4}</li>
                    <li>${meal.strMeasure5} ${meal.strIngredient5}</li>
                    <li>${meal.strMeasure6} ${meal.strIngredient6}</li>
                </ul>
            </div>
            <hr>
    `;
        mealDetails.innerHTML = html;

        mealDetails.classList.remove('d-none');
    })
}
