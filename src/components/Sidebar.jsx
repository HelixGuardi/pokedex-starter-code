import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

function Sidebar() {

  const [pokemonList, setPokemonList] = useState([])

  useEffect(() => {

    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      // console.log(data.results);
      setPokemonList(data.results)
    })
    .catch((error) => {
      console.log(error)
    })

  }, [])

  const urlCheck = (status) => {
    // console.log(status);
    if (status.isActive) {
      return "link-active"
    } else {
      return "link-inactive"
    }
  }

  return (
    <nav className="sidebar">
      
      {/* example of 3 links */}
      {/* <Link to={"/"}>bulbasaur</Link>
      <Link to={"/"}>charmander</Link>
      <Link to={"/"}>squirtle</Link> */}

      {/* aqui queremos tener todos los nombres de pokemons */}
      {pokemonList.map((eachPokemon, index) => {
        return(
          <NavLink className={urlCheck}key={index} to={`/poke/${eachPokemon.name}`}>{eachPokemon.name}</NavLink>
        )
      })}

    </nav>
  )
}

export default Sidebar 

// BRAINSTORMING
  // en que momento hacemos la llamada? ComponentDidMount
  // fetch para acceder a la API "https://pokeapi.co/api/v2/pokemon"
  // como recibimos la data de la API? resolvemos la promesa con then/catch o asyn await
  // donde almacenamos la data? en un estado
  // .map() para listar todos los links con los  nombres