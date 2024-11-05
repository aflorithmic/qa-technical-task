import axios from 'axios';
import {Pokemon} from "@/api/types/Pokemon";

export enum StarterPokemon {
    BULBASAUR = "bulbasaur",
    CHARMANDER = 'charmander',
    SQUIRTLE = 'squirtle'
}

export const getPokemonDetails = async (pokemon: StarterPokemon): Promise<Pokemon> => {
    const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    return {
        name: data.forms[0].name,
        pokedexIndex: data.game_indices[0].game_index,
        stats: data.stats.map((stat: { base_stat: number; effort: number; stat: { name: string; }; }) => {
            return {
                baseStat: stat.base_stat,
                effort: stat.effort,
                name: stat.stat.name
            }
        }),
        types: data.types.map((type: { type: { name: string; }; }) => type.type.name),
        weight: data.weight
    }
}