const searchDrinks = () => {
    const searchValue = document.getElementById('search-field').value;
    
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`;

    fetch(url)
    .then(response => response.json())
    .then(data => displayDrinks(data.drinks));
    document.getElementById('search-field').value = '';
}

const showDetails = (drinkId) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayModal(data.drinks[0]));
}


const displayModal = (info) => {
  
    const parentDiv = document.getElementById('display-modal');
    parentDiv.textContent = '';
    const div = document.createElement('div');
    div.classList.add("modal-dialog");
    div.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Item: ${info.strDrink}</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Instruction: ${info.strInstructions}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-success">Order Now</button>
            </div>
        </div>
    `;
    parentDiv.appendChild(div);
}

const displayDrinks = (drinks) => {
    
    const parentDiv = document.getElementById('content-div');
    parentDiv.textContent = "";

    drinks.forEach(drink => {

        const div = document.createElement('div');
        div.classList.add("col-xl-3", "col-lg-4", "col-md-6", "col-sm-12");

        div.innerHTML = `
            <div class="card p-3">
                <img src="${drink.strDrinkThumb}" class="card-img-top border" alt="...">
                <div class="pt-3">
                    <h4 class="card-title">${drink.strDrink}</h4>
                    <span class="mb-2">${drink.strCategory}</span>
                    <br>
                    <span>${drink.strAlcoholic}</span>
                    <br>
                    <div class="d-flex justify-content-between align-items-center">
                        <button onclick="showDetails(${drink.idDrink})" data-toggle="modal" data-target="#myModal" class="mt-3 btn btn-warning">Details</button>
                        <h5 class="mt-3">$${Math.round(Math.random()*(99-20)+20)}</h5>
                    </div>
                    
                </div>
            </div>
        `;
        parentDiv.appendChild(div);
    });    
}

const loadAllDrinks = () => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayDrinks(data.drinks));
}

window.onload = loadAllDrinks();





