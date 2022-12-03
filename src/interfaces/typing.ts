export interface PokemonList {
    count: number;
    next: string;
    previous: string;
    results: Result[];
}

export interface Result {
    name: string;
    url: string;
}

export interface Pokemon {
    id: number;
    name: string;
    stats: Stat[];
    abilities: Ability[];
    moves: Move[];
    sprites: Sprites;
    base_experience: number;
    types: Type[];
}

export interface Type {
    slot: number;
    type: Species;
}

export interface Stat {
    base_stat: number;
    effort: number;
    stat: Species;
}

export interface Ability {
    ability: Species;
    is_hidden: boolean;
    slot: number;
}

export interface Move {
    move: Species;
}

export interface Species {
    name: string;
    url:  string;
}

export interface Sprites {
    other?: Other;
}

export interface Other {
    "official-artwork": OfficialArtwork;
}

export interface OfficialArtwork {
    front_default: string;
}