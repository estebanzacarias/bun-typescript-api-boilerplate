import { object, string, type InferInput } from "valibot";

export const characterSchema = object({
    name: string(),
    lastName: string(),
});

export type Character = InferInput<typeof characterSchema> & {
    id: number
}

const characters: Map<number, Character> = new Map();

export const getAllCharacters = (): Character[] => {
    return Array.from(characters.values());
}

export const getCharacterById = (id: number): Character | undefined => {
    return characters.get(id);
}

export const addCharacter = (character: Character): Character => {
    const newCharacter: Character = {
        ...character,
        id: Date.now()
    }
    characters.set(newCharacter.id, newCharacter);
    return newCharacter;
}

export const updateCharacter = (id: number, updatedCharacter: Character): Character | undefined => {
    const foundCharacter = characters.get(id);
    if (!foundCharacter){
        console.error(`Character with id ${id} not found`);
        return undefined;
    } 
    characters.set(id, updatedCharacter);
    return updatedCharacter;
}

export const deleteCharacter = (id: number): boolean => {
    const foundCharacter = characters.get(id);
    if (!foundCharacter){
        console.error(`Character with id ${id} not found`);
        return false;
    }
    characters.delete(id);
    return true;
}