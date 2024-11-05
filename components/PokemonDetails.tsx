import {Flex, Text} from "@chakra-ui/react";
import {Pokemon} from "@/api/types/Pokemon";

type Props = {
    pokemon: Pokemon
}

export const PokemonDetails = ({pokemon}: Props) => {
    const {
        name,
        pokedexIndex,
        stats,
        types,
        weight
    } = pokemon;

    return (
        <Flex gap={4} direction={"column"}>
            <Text textStyle="3xl">Your starter Pokemon Details</Text>
            <Flex gap={2}>
                <Text textStyle="xl">{name}</Text>
                <Text textStyle="lg">{pokedexIndex}</Text>
            </Flex>
            <Text textStyle="lg">Stats</Text>
            {stats.map((stat) => (
                <Flex gap={2} key={stat.name}>
                    <Text textStyle="md">{stat.name}</Text>
                    <Text textStyle="md">base stat: {stat.baseStat}</Text>
                    <Text textStyle="md">effort: {stat.effort}</Text>
                </Flex>
            ))}
            <Text textStyle="lg">Types</Text>
            {types.map((type) => (
                <Flex gap={2} key={type}>
                    <Text textStyle="md">{type}</Text>
                </Flex>
            ))}
            <Text textStyle="lg">Weight: {weight}</Text>
        </Flex>
    )
}