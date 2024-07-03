import { useState, useEffect } from "react";
import "./styles.css"
import typeColors from "./typeColors.js";

const PokemonDetails = ({ pokemon, capitalizeName, getNumber, shiny }) => {
    const [description, setDescription] = useState("")


    useEffect(() => {
        getPokemonDetails();
    }, [])

    const getPokemonDetails = async () => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`)
        const data = await res.json()
        const entry = data.flavor_text_entries.find((entry) => {
            return entry.language.name === "en" && entry.version.name === "shield"
        })
        setDescription(entry.flavor_text.replace("\f", " ").replace("POKéMON", "Pokémon"))
    }

    if (!pokemon || !description) return null;

    return (
        <div className="details">
            <div className="details-title">
                <h2>{capitalizeName(pokemon.name)} <span className="number">{getNumber(pokemon.id)}</span></h2>
            </div>
            <img src={
                    shiny
                    ? pokemon.sprites.other["official-artwork"].front_shiny
                    : pokemon.sprites.other["official-artwork"].front_default
                }
                className="image"
            />
            <h4>Description</h4>
            <text className="description">{description}</text>
            <h4>Types</h4>
            <div>
                {pokemon.types.map((type) => <span style={{color: typeColors[type.type.name] || "#FFFFF"}}>{capitalizeName(type.type.name) + " "}</span>)}
            </div>
        </div>
    )
}

export default PokemonDetails;