'use client';
import {Fieldset, Flex, Input, Stack} from "@chakra-ui/react";
import {Field} from "@/components/ui/field";
import {NativeSelectField, NativeSelectRoot} from "@/components/ui/native-select";
import {getPokemonDetails, StarterPokemon} from "@/api";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {PokemonDetails} from "@/components/PokemonDetails";
import {Pokemon} from "@/api/types/Pokemon";
import { Toaster, toaster } from "@/components/ui/toaster"

export const RegisterForm = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [name, setName] = useState<string>("");
    const [starter, setStarter] = useState<Pokemon  | undefined> (undefined);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isNameInputValid, setIsNameInputValid] = useState<boolean>(true);
    const [isSelectValid, setIsSelectValid] = useState<boolean>(true);

    const onStarterSelect = async (value: string) => {
        if (value === '') {
            return;
        }

        try {
            const pokemon = await getPokemonDetails(value as StarterPokemon);
            setStarter(pokemon);
        } catch (e) {
            console.error(e);
        }
    }

    const validateForm = () => {
        let formIsValid = true;

        // if (name === '') {
        //     setIsNameInputValid(false);
        //     formIsValid = false;
        // }

        if (starter === undefined) {
            setIsSelectValid(false);
            formIsValid = false;
        }

        return formIsValid;
    }

    const onSubmit = () => {
        if (validateForm()) {
            toaster.create({
                title: "Registration Successful",
                description: "Welcome to the Pokemon League!"
            })
        }
    }

    return (
        <>
            <Toaster />
            <Flex gap={4}>
                <Fieldset.Root size='lg' maxW='md'>
                    <Stack>
                        <Fieldset.Legend>Pokemon Trianer Details</Fieldset.Legend>
                        <Fieldset.HelperText>Please provide your Pokemon trainer details below.</Fieldset.HelperText>
                    </Stack>
                    <Fieldset.Content>
                        <Field
                            label="Name"
                            required
                            invalid={!isNameInputValid}
                        >
                            <Input name="name"  onChange={e => setName(e.currentTarget.value)}/>
                        </Field>
                        <Field
                            label="Starter Pokemon"
                            required
                            invalid={!isSelectValid}
                        >
                            <NativeSelectRoot>
                                <NativeSelectField
                                    name="starter_pokemon"
                                    placeholder="Select your starter"
                                    onChange={e => onStarterSelect(e.currentTarget.value)}
                                >
                                    <option value={StarterPokemon.BULBASAUR}>{StarterPokemon.BULBASAUR}</option>
                                    <option value={StarterPokemon.CHARMANDER}>{StarterPokemon.CHARMANDER}</option>
                                    <option value={StarterPokemon.SQUIRTLE}>{StarterPokemon.SQUIRTLE}</option>
                                    <option value={"asdf"}>Pikachu</option>
                                </NativeSelectField>
                            </NativeSelectRoot>
                        </Field>
                    </Fieldset.Content>
                    <Button type="submit" alignSelf="flex-start" w={"100%"} mt={"2em"} onClick={onSubmit}>
                        Submit
                    </Button>
                </Fieldset.Root>
                {starter && (
                    <PokemonDetails
                        pokemon={starter}
                    />
                )}
            </Flex>
        </>
    )
}