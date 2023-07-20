const searchbar = document.querySelector("input")
const searchBtn = document.querySelector(".search-btn")
const pokemonWeight = document.querySelector(".weight-of-pokemon")
const pokemonType = document.querySelector(".type-of-pokemon")

const pokemonTypeBtnTwo = document.querySelectorAll(".type-pokemon")
const pokemonTypeBtn = document.querySelector(".type-of-pokemon-btn")
const pokemonTypeBtns = document.querySelectorAll(".type-of-pokemon-btn")
const pokemonHeight = document.querySelector(".height-of-pokemon")
const pokemonImage = document.querySelector(".pokemon-image")
const pokemonName = document.querySelector(".name-of-pokemon")
const pokemonXp = document.querySelector(".pokemon-xp")
const pokemonHp = document.querySelector(".pokemon-hp")

const pokemonBasicAttack = document.querySelector(".basic-attack")
const pokemonSuperAttack = document.querySelector(".super-attack")
const pokemonCard = document.querySelector(".pokemon-card")
const errorP = document.querySelector(".error")
const allPokemonBtn = document.querySelectorAll(".all-pokemon-btn")
const shadow = document.querySelector(".shadow")
const phoneMenu = document.querySelector(".menu")
const popUp = document.querySelector(".pop-up-menu")

let testArr = []

const getPokemonDataAll = async () => {
	const urlAllPokemons = `https://pokeapi.co/api/v2/pokemon/?limit=1000&offset=0`
	const response2 = await fetch(urlAllPokemons)
	const allPokemons = await response2.json()

	showPokemon(allPokemons)
}

const getPokemonData = async query => {
	const url = `https://pokeapi.co/api/v2/pokemon/${query}`

	try {
		const response = await fetch(url)

		const pokemon = await response.json()

		pokedex(pokemon)
		colorCardChange(pokemon)

		errorP.style.display = "none"
	} catch (error) {
		console.log(error)
		if (query === 0 || query === "") {
			errorP.style.display = "none"
		} else errorP.style.display = "block"
		pokemonCard.style.display = "none"
	}
}

const colorCardChange = database => {
	if (database.types[0].type.name === "electric") {
		pokemonCard.style.backgroundColor = "var(--electric-pokemon-card)"
		pokemonCard.style.color = "var(--electric-pokemon-card-color)"
		pokemonTypeBtnTwo.forEach(btn => {
			btn.style.backgroundColor = "var(--electric-pokemon-card-color)"
		})
		pokemonTypeBtns.forEach(btn => {
			btn.style.color = "var(--electric-pokemon-card)"
		})
	} else if (database.types[0].type.name === "fire") {
		pokemonCard.style.backgroundColor = "var(--fire-pokemon-card)"
		pokemonCard.style.color = "var(--fire-pokemon-card-color)"
		pokemonTypeBtnTwo.forEach(btn => {
			btn.style.backgroundColor = "var(--fire-pokemon-card-color)"
		})
		pokemonTypeBtns.forEach(btn => {
			btn.style.color = "var(--fire-pokemon-card)"
		})
	} else if (
		database.types[0].type.name === "water" ||
		database.types[0].type.name === "ice"
	) {
		pokemonCard.style.backgroundColor = "var(--water-pokemon-card)"
		pokemonCard.style.color = "var(--water-pokemon-card-color)"
		pokemonTypeBtnTwo.forEach(btn => {
			btn.style.backgroundColor = "var(--water-pokemon-card-color)"
		})
		pokemonTypeBtns.forEach(btn => {
			btn.style.color = "var(--water-pokemon-card)"
		})
	} else if (
		database.types[0].type.name === "grass" ||
		database.types[0].type.name === "bug" ||
		database.types[0].type.name === "fairy"
	) {
		pokemonCard.style.backgroundColor = "var(--grass-pokemon-card)"
		pokemonCard.style.color = "var(--grass-pokemon-card-color)"
		pokemonTypeBtnTwo.forEach(btn => {
			btn.style.backgroundColor = "var(--grass-pokemon-card-color)"
		})
		pokemonTypeBtns.forEach(btn => {
			btn.style.color = "var(--grass-pokemon-card)"
		})
	} else if (database.types[0].type.name === "ground") {
		pokemonCard.style.backgroundColor = "var(--ground-pokemon-card)"
		pokemonCard.style.color = "var(--ground-pokemon-card-color)"
		pokemonTypeBtnTwo.forEach(btn => {
			btn.style.backgroundColor = "var(--ground-pokemon-card-color)"
		})
		pokemonTypeBtns.forEach(btn => {
			btn.style.color = "var(--ground-pokemon-card)"
		})
	} else {
		pokemonCard.style.backgroundColor = "#F4E0B9"
		pokemonCard.style.color = "#7D7463"
		pokemonTypeBtnTwo.forEach(btn => {
			btn.style.backgroundColor = "#7D7463"
		})
		pokemonTypeBtns.forEach(btn => {
			btn.style.color = "#F4E0B9"
		})
	}
}

const pokedex = database => {
	let image = database.sprites.other.dream_world.front_default
	if (image === null) {
		pokemonImage.setAttribute("src", database.sprites.front_default)
	} else {
		pokemonImage.setAttribute("src", image)
	}

	pokemonTypeBtn.textContent = database.types[0].type.name
	pokemonName.textContent = database.name
	pokemonHp.textContent = database.stats[5].base_stat
	pokemonWeight.textContent = database.weight
	pokemonHeight.textContent = database.height
	pokemonXp.textContent = database.base_experience
	pokemonBasicAttack.textContent = database.abilities[0].ability.name
	if (!database.abilities.length > 0) {
		pokemonSuperAttack.textContent = database.abilities[1].ability.name
	} else {
		pokemonSuperAttack.textContent = "???"
	}

	if (database.types.length === 1) {
		pokemonType.textContent = `${database.types[0].type.name}`
	} else {
		pokemonType.textContent = `${database.types[0].type.name} / ${database.types[1].type.name}`
	}
}

const showPokemon = database => {
	const pokemonName2 = []
	const pokemonUrl = []
	const pokemonCatalog = document.querySelector(".pokemon-catalog")

	const arrNames = database.results

	arrNames.forEach(pokemon => {
		pokemonName2.push(pokemon.name)
	})

	let pokemonBox
	let index = 0
	pokemonName2.forEach(pokemon => {
		{
			index++
			pokemonBox = document.createElement("div")
			let pokemonBoxHeader = document.createElement("h3")
			let pokemonBoxImage = document.createElement("img")
			pokemonBox.classList.add("pokemon")
			pokemonCatalog.appendChild(pokemonBox)
			pokemonBox.appendChild(pokemonBoxHeader)
			pokemonBox.appendChild(pokemonBoxImage)

			pokemonBoxHeader.textContent = pokemon
			pokemonBoxImage.setAttribute(
				"src",
				`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`
			)
		}
	})
}

const backToPokedex = () => {
	let pokemonIndexName = ""

	if (event.target.closest(`div`)) {
		pokemonIndexName = event.target.closest(`div`).firstChild.textContent

		pokemonCard.style.display = "block"
		document.body.scrollTop = 0
		document.documentElement.scrollTop = 0
		getPokemonData2(pokemonIndexName)
		errorP.style.display = "none"
	}
}
const basePokedex = () => {
	getPokemonDataAll()
	pokemonCard.style.display = "none"
	errorP.style.display = "none"

	setTimeout(() => {
		const allDivs = document.querySelectorAll(".pokemon")

		allDivs.forEach(div => {
			div.addEventListener("click", backToPokedex)
		})
	}, 1000)
}

const getPokemonData2 = async index => {
	try {
		const url = `https://pokeapi.co/api/v2/pokemon/${index}`
		const response32 = await fetch(url)
		const pokemon32 = await response32.json()

		pokedex(pokemon32)

		colorCardChange(pokemon32)
	} catch (err) {
		console.log(err)
	}
}

allPokemonBtn.forEach(pokemonbtn => {
	pokemonbtn.addEventListener("click", basePokedex, { once: true })
	pokemonbtn.addEventListener("click", () => {
		shadow.classList.remove("block")
		popUp.classList.remove("block")
	})
})

searchBtn.addEventListener("click", () => {
	getPokemonData(searchbar.value)
	pokemonCard.style.display = "block"
})

searchbar.addEventListener("keypress", function (event) {
	setTimeout(() => {
		if (event.key === "Enter") {
			event.preventDefault()
			getPokemonData(searchbar.value)
			pokemonCard.style.display = "block"
		}
	}, 1000)
})

phoneMenu.addEventListener("click", () => {
	shadow.classList.toggle("block")
	popUp.classList.toggle("block")
})

shadow.addEventListener("click", () => {
	shadow.classList.remove("block")
	popUp.classList.remove("block")
})
