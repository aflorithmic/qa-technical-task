export type PokemonStat = {
    name: string;
    baseStat: number;
    effort: number;
}

export type Pokemon = {
    name: string;
    pokedexIndex: number;
    stats: PokemonStat[];
    types: string[];
    weight: number;
}