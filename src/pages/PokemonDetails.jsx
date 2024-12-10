import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios";
import pokeSearchGif from "../assets/images/pikachu-poke.gif"
import ClipLoader from "react-spinners/ClipLoader";
import { BarLoader } from "react-spinners";

function PokemonDetails() {

    const [pokemon, setPokemon] = useState(null);

    const dynamicParams = useParams();
    // console.log(dynamicParams);

    const navigate = useNavigate();

    // 1. el componentDidMount que llamará a la API
    useEffect(() => {

        setPokemon(null); // esto va a forzar la animación de loading a aparecer
        // mientras se busca la nueva

        // 2. un fetch para la llamada
            // descargamos e importamos "axios" para sustituir el fetch y no tener que volver a hacer la estructura enorme
            // que siempre se tiene que hacer cuando utilizamos fetch

            //.get es para directamente obtener la data
        axios.get(`https://pokeapi.co/api/v2/pokemon/${dynamicParams.pokemonName}`)
        .then((response) => {
            // console.log(response) // toda la información data que recibimos de axios no es la data de la API en sí. La data
            // que queremos está dentro de todo el response que nos entrega el .get de axios, en la propiedad "data". Eso
            //es lo que nos entrega el API

            // 3. almacenamos la data en un estado
            setPokemon(response.data); //solo lo que viene de la API
            // se puede hacer un setTimeOut para poder generar el efecto de carga
        })
        .catch((error) => {
            console.log(error);
            // gestores de error 500 (error del servidor)
            // lo redirijimos a la página de tipo error
            navigate("/error")
        })

        // lo usamos como componentDidMount y como componentDidUpdate de parametro dinamico
    }, [dynamicParams.pokemonName])

    // 4. ???
    // el paso 4 (misterioso) es para efectos de espera de carga (loading);
        // mientras el estado sea null, no vamos a renderizar nada, sino un pequeño efecto de carga:
    if (pokemon === null) {
        return(
            <div>
                <img src={pokeSearchGif} /> <br />
                <BarLoader  width={"100%"} height={10} color={"red"}/>
            </div>
        )
    }

  return (
    <div>

    {/* 5. imprimimos la data */}
      <h2>Detalles de Pokemon</h2>

      <h3>Nombre: {pokemon.name}</h3>
      <img src={pokemon.sprites.front_default} alt="imagen-pokemon" />
      <p>weight: {pokemon.weight}</p>
      <p>height: {pokemon.height}</p>


    </div>
  );
}

export default PokemonDetails;
