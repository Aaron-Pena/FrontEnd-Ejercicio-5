//# VARIABLES GLOBALES

const imagePath = `../assets/img/catalogo_IMG/`;

const apiURL = 'https://65307d6f6c756603295eae35.mockapi.io/';

let CatalogoJuegosList = [];

//#endregion

//#region MODELO DE DATOS
class CatalogoJuegos{

constructor (id, image, title, platform, description, price, rating){
    this.id = id;
    this.image = image ;
    this.title = title;
    this.platform = platform;
    this.description = description;
    this.price = price;
    this.rating = rating;
    }
}


//#endregion


//#region VISTA HTML

function displayView(games) {

  clearTable();

  showLoadingMessage();

  if (games.length === 0) {

    showNotFoundMessage();

  } else {

    hideMessage();

    displayTable(games);
  }

}

function displayTable(games){
  const tablaBody = document.getElementById('data-table-body');

  games.forEach(game => {

    const row = document.createElement('tr');

    row.innerHTML = `
                <td> ${game.id} </td>
                <td> <img src="${imagePath + game.image}" alt="${game.title}" width="100"> </td>
                <td>${game.title}</td>
                <td>${game.platform}</td>
                <td>${game.description}</td>
                <td>${game.price}</td>
                <td>${game.rating}</td>
              `;

    tablaBody.appendChild(row);

  });
}



function clearTable() {
    const tableBody = document.getElementById('data-table-body');
  
    tableBody.innerHTML = '';
  }
  
  
  function showLoadingMessage() {
    const messageNotFound = document.getElementById('message-not-found');
  
    messageNotFound.innerHTML = 'Cargando...';
  
    messageNotFound.style.display = 'block';
  }
  
  
  function showNotFoundMessage() {
    const messageNotFound = document.getElementById('message-not-found');
  
    messageNotFound.innerHTML = 'No se encontraron juegos con el filtro proporcionado.';
  
    messageNotFound.style.display = 'block';
  }
  
  
  function hideMessage() {
    const messageNotFound = document.getElementById('message-not-found');
  
    messageNotFound.style.display = 'none';
  }

//#endregion


// #region FILTROS 


function initButtonsHandler() {

  document.getElementById('filter-form').addEventListener('submit', event => {
    event.preventDefault();
    applyFilters();
  });

  document.getElementById('reset-filters').addEventListener('click', () => {
  document.querySelectorAll('input.filter-field').forEach(input => input.value = '');
    applyFilters();
  });

}


function applyFilters() {
  const filterText = document.getElementById('text').value.toLowerCase();
  const filterRating = parseFloat(document.getElementById('rating').value);
  const filterMinPrice = parseFloat(document.getElementById('price-min').value);
  const filterMaxPrice = parseFloat(document.getElementById('price-max').value);

  const filteredGames = filterGames(CatalogoJuegosList, filterText, filterRating, filterMinPrice, filterMaxPrice);

  displayView(filteredGames);
}

function filterGames(games, text, rating, minPrice, maxPrice) {

  return games.filter( game =>
      (!rating || game.rating === rating) &&
      (!minPrice || game.price >= minPrice) &&
      (!maxPrice || game.price <= maxPrice) &&
      (!text     || game.title.toLowerCase().includes(text) || game.description.toLowerCase().includes(text))
    );
}




//#endregion

  //#region CONSUMO DE DATOS DESDE API
  function searchData() {

    const OPTIONS = {
      method: 'GET'
    };

    fetch(`${apiURL}/catalogo`, OPTIONS)
      .then(response => response.json())
      .then(data => {
        CatalogoJuegosList = data.map(item => {

          return new CatalogoJuegos(
          
            item.id,
            item.image,
            item.title,
            item.platform,
            item.description,
            item.price,
            item.rating,
            
          );
        });

        displayView(CatalogoJuegosList);

      })
      .catch(error => console.log(error));

  }

//#endregion





initButtonsHandler();

showLoadingMessage();

searchData();