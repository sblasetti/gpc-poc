import Head from "next/head";
import {
  Box,
  Button,
  HStack,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";

interface Ingredient {
  id: string;
  name: string;
}

export default function Home() {
  const [ingredient, setIngredient] = useState<string>("");
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);

  const handleNewIngredientChange = (event: ChangeEvent<HTMLInputElement>) =>
    setIngredient(event.target.value);

  const handleNewIngredientKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addIngredient();
    }
  };

  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: ingredient,
    };
    setIngredientsList((list) => [...list, newIngredient]);
    setIngredient("");
  };

  const handleIngredientRemoveClick = (ingredientId: string) => {
    const ingredientIndex = ingredientsList.findIndex(
      (value) => value.id === ingredientId
    );
    const newIngredientsList = [
      ...ingredientsList.slice(0, ingredientIndex),
      ...ingredientsList.slice(ingredientIndex + 1),
    ];
    setIngredientsList(newIngredientsList);
  };

  return (
    <>
      <Head>
        <title>Recipes</title>
        <meta name="description" content="Recipes app created with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <VStack>
          <Box flexWrap={"wrap"}>
            {ingredientsList.map((ingredient) => (
              <Tag key={ingredient.id} margin={"2px"}>
                <TagLabel>{ingredient.name}</TagLabel>
                <TagCloseButton
                  onClick={() => handleIngredientRemoveClick(ingredient.id)}
                />
              </Tag>
            ))}
          </Box>
          <HStack>
            <Input
              placeholder="Type an ingredient..."
              value={ingredient}
              onChange={handleNewIngredientChange}
              onKeyUp={handleNewIngredientKeyUp}
            />
            <Button onClick={addIngredient}>Add</Button>
          </HStack>
        </VStack>
      </main>
    </>
  );
}
