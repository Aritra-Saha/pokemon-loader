// You can retrieve the pokemons by calling the following API
// Make sure to replace limit and offset with the appropriate values
// https://pokeapi.co/api/v2/pokemon?limit=5&offset=0

import { useState, useEffect, useRef } from "react";
import PokemonDetails from "./pokemon-details";
import Modal from "./modal";
import "./styles.css";
import PokemonCard from "./pokemon-card";
import Filters from "./filters";

const PokemonList = () => {
    const [pokemon, setPokemon] = useState([]);
    const [page, setPage] = useState(0);
    const [shiny, setShiny] = useState(false);
    const [isBaby, setIsBaby] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [curPokemon, setCurPokemon] = useState({});
    const [likedPokemon, setLikedPokemon] = useState(JSON.parse(localStorage.getItem("likedPokemon")) || []);
    const total = useRef(0);

    useEffect(() => {
        getPokemon(page);
    }, [page])

    const getPokemon = async (page) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${page*5}&limit=5`)
        const { count, results } = await res.json()
        total.current = count

        const fullResults = await Promise.all(results.map((elem) =>
            fetch(elem.url)
            .then(res => res.json())
        ))

        const fullResultDetails = await Promise.all(results.map((elem) => 
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${elem.name}`)
            .then(res => res.json())
        ))

        const completeResults = fullResults.map((elem, idx) => {
            return {...elem, ...fullResultDetails[idx]}
        })

        setPokemon([...pokemon, completeResults]);
    }

    const handlePokemonClick = (pokemon) => {
        setCurPokemon(pokemon);
        setModalOpen(true);
    }

    const handlePokemonLike = (pokemon) => {
        if (likedPokemon.includes(pokemon.id)) {
            const newLikedPokemon = likedPokemon.filter((elem) => elem !== pokemon.id)
            localStorage.setItem("likedPokemon", JSON.stringify(newLikedPokemon))
            setLikedPokemon(newLikedPokemon)
        }
        else {
            localStorage.setItem("likedPokemon", JSON.stringify([...likedPokemon, pokemon.id]))
            setLikedPokemon([...likedPokemon, pokemon.id])
        }
    }

    const capitalizeName = (name) => name.charAt(0).toUpperCase() + name.slice(1);

    const getNumber = (number) => {
        const len = String(number).length;
        let zeros = "";
        for (let i = 0; i < 4 - len; i++) {
            zeros += "0"
        }
        return "#" + zeros + number
    }

    return (
        <div className="page">
            <h1 className="title">Pokédex</h1>
            <Filters shiny={shiny} setShiny={() => setShiny(!shiny)} isBaby={isBaby} setIsBaby={() => setIsBaby(!isBaby)} />
            {pokemon.map((res) =>
                <div className="list">
                    {res
                    .filter((elem) => {
                        if (!isBaby) {
                            return true
                        } else {
                            return elem.is_baby === true
                        }
                    })
                    .map((elem) => {
                        return <PokemonCard
                            elem={elem}
                            shiny={shiny}
                            handlePokemonClick={handlePokemonClick}
                            handlePokemonLike={handlePokemonLike}
                            capitalizeName={capitalizeName}
                            getNumber={getNumber}
                            curLiked={likedPokemon.includes(elem.id)}
                        />
})}
                </div>
            )}
            <Modal isOpen={modalOpen} closeModal={() => setModalOpen(false)}>
                <PokemonDetails shiny={shiny} pokemon={curPokemon} capitalizeName={capitalizeName} getNumber={getNumber}></PokemonDetails>
            </Modal>
            <div className="bottom-div">
                <span style={{marginBottom: "10px"}}>Displaying {(page + 1) * 5} of {total.current} results</span>
                <button onClick={() => setPage(page + 1)}>Load More</button>
            </div>
        </div>
    )
};

export default PokemonList;
