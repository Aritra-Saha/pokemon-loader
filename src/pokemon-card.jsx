import { useState } from "react";
import "./styles.css"
import typeColors from "./typeColors.js";

const PokemonCard = ({ elem, shiny, handlePokemonClick, handlePokemonLike, capitalizeName, getNumber, curLiked }) => {
    const [liked, setLiked] = useState(curLiked);

    const handleLike = () => {
        handlePokemonLike(elem)
        setLiked(!liked);
    }

    return (
        <div>
            <div className="pokemon" onClick={() => handlePokemonClick(elem)}>
                <img
                    src={
                        shiny
                        ? elem.sprites.other["official-artwork"].front_shiny
                        : elem.sprites.other["official-artwork"].front_default
                    }
                    className={liked && "liked"}
                />
                <text className="number">{getNumber(elem.id)}</text>
                <div className="name">{capitalizeName(elem.name)}</div>
                <div>
                    {elem.types.map((type) => <span style={{color: typeColors[type.type.name] || "#FFFFF"}}>{capitalizeName(type.type.name) + " "}</span>)}
                </div>
            </div>
            <button onClick={handleLike} style={{marginTop: "15px"}}>Like</button>
        </div>
    )
}

export default PokemonCard;