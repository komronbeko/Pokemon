import data from "./data.js";

const LikesModal = document.querySelector(".likes-modal");
const Modal = document.querySelector(".modal");
const ArrowImg = document.querySelector(".arrow-img");
const PokemonsRepresent = document.querySelector(".Pokemons");
const likiesParent = document.querySelector(".liked-pokimons");
const form = document.querySelector("form");

let likedPokimons = JSON.parse(localStorage.getItem("liked-pokemon")) || [];


LikesModal.addEventListener("click", (e)=>{
    e.preventDefault();
    Modal.classList.add("modal-visible");
    document.body.classList.add("body-in-modal")
})

ArrowImg.addEventListener("click", (e)=>{
    e.preventDefault();
    Modal.classList.remove("modal-visible")
    document.body.classList.remove("body-in-modal")
})

form.addEventListener("click", (e) => {
  e.preventDefault();

  let globalValue = e.target.value;

  if (e.target.matches("#select")) {
    let filteredPokimons = data.filter(
      (pokimon) => pokimon.type == globalValue
    );
    render(filteredPokimons);
  } else if (e.target.matches("#search")) {
    e.target.addEventListener("input", (e) => {
      const searchingPokimon = e.target.value;
      const searched = data.filter((el) => el.name.includes(searchingPokimon));
      render(searched);
    });
  } else if (e.target.matches("#letter-order")) {
    const sortedData = data.sort((a, b) => {
      if (e.target.value == "sortA") {
        return a.name.toLocaleLowerCase()[0] > b.name.toLocaleLowerCase()[0]
          ? 1
          : -1;
      }
      if (e.target.value == "sortZ") {
        return a.name.toLocaleLowerCase()[0] < b.name.toLocaleLowerCase()[0]
          ? 1
          : -1;
      }
    });

    render(sortedData);
  }
});

function SaveToLocal(pokimon) {
  if (!likedPokimons.includes(pokimon)) {
    likedPokimons.push(pokimon);
    renderLikies(likedPokimons, likiesParent);
    addToLikies()
  } else {
    alert("This type has been already added!");
  }
}

function render(pokimons) {
  pokimons.forEach((pokimon) => {
    const pokemonWrapper = document.createElement("div");
    pokemonWrapper.className = "pokemon";
    pokemonWrapper.innerHTML += `
      <div class="pokemon">
          <div class="pokemon-img">
              <img class="pok-png" src="${pokimon.img}" alt="pokimon-img">
          </div>
          <div class="pokemon-body">
              <div class="pokemon-header">
                  <h3>${pokimon.name}</h3>
                  <img class="liked-img" src="./images/heart-little.svg" alt="like">
              </div>
              <div class="pokemon-name">
                  <p>${pokimon.type}</p>
              </div>
              <div class="pokemon-characters">
                  <strong>${pokimon.weight}</strong>
                  <strong>${pokimon.height}</strong>
              </div>
          </div>
      </div>
          `;

    let liked = pokemonWrapper.querySelector(".liked-img");
    liked.onclick = () => SaveToLocal(pokimon);
    PokemonsRepresent.append(pokemonWrapper);
  });
}
render(data);

function handleRemove(pokimon) {
  let filtered = likedPokimons.filter((pok) => pok.id !== pokimon.id);
  likedPokimons = filtered;
  renderLikies(likedPokimons, likiesParent);
}
function renderLikies(arr, parent) {
    parent.innerHTML = "";
    arr.forEach((el) => {
      const pokemonWrapper = document.createElement("div");
      pokemonWrapper.className = "pokemon";
      pokemonWrapper.innerHTML += `
        <div class="pokemon">
            <div class="pokemon-img">
                <img class="pok-png" src="${el.img}" alt="pokimon-img">
            </div>
            <div class="pokemon-body">
                <div class="pokemon-header">
                    <h3>${el.name}</h3>
                    <img class="delete-img" src="../images/trash.svg" alt="like">
                </div>
                <div class="pokemon-name">
                    <p>${el.type}</p>
                </div>
                <div class="pokemon-characters">
                    <strong>${el.weight}</strong>
                    <strong>${el.height}</strong>
                </div>
            </div>
        </div>
            `;
  
      let deleted = pokemonWrapper.querySelector(".delete-img");
      deleted.onclick = () => handleRemove(el);
      parent.append(pokemonWrapper);
    });
  }
  
  renderLikies(likedPokimons, likiesParent)
  
  function addToLikies() {
      localStorage.setItem("liked-pokemon", JSON.stringify(likedPokimons));
  }