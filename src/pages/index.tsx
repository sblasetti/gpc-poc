import Head from "next/head";
import {
  Box,
  Button,
  HStack,
  Input,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";

interface Ingredient {
  id: string;
  name: string;
}

const knownIngredients = [
  "tomato",
  "potatp",
  "garlic",
  "onion",
  "chicken",
  "pork",
  "fish",
  "beef",
];

export default function Home() {
  const [ingredient, setIngredient] = useState<string>("");
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
  const [proposedIngredientsList, setProposedIngredientsList] = useState<
    string[]
  >([]);

  const handleNewIngredientChange = (event: ChangeEvent<HTMLInputElement>) => {
    const ingredientName = event.target.value;
    setIngredient(ingredientName);

    let matchingIngredients: string[] = [];
    if (ingredientName) {
      const sanitizedIngredientName = ingredientName.trim().toLocaleLowerCase();
      matchingIngredients = knownIngredients.filter((ki) =>
        ki.includes(sanitizedIngredientName)
      );
    }
    setProposedIngredientsList(matchingIngredients);
  };

  const handleNewIngredientKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addIngredient(ingredient);
    }
  };

  const addIngredientToList = (name: string) => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: name,
    };
    setIngredientsList((list) => [...list, newIngredient]);
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

  const handleNewIngredientClick = () => {
    addIngredient(ingredient);
  };

  const handleProposedIngredientClick = (ingredientName: string) => {
    addIngredientToList(ingredientName);
  };

  const addIngredient = (name: string) => {
    addIngredientToList(name);
    setIngredient("");
    setProposedIngredientsList([]);
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
              type="search"
              onChange={handleNewIngredientChange}
              onKeyUp={handleNewIngredientKeyUp}
            />
            <Button onClick={handleNewIngredientClick}>Add</Button>
          </HStack>
          <Box>
            {proposedIngredientsList.map((tag) => (
              <Tag
                key={tag}
                cursor="pointer"
                margin={"2px"}
                onClick={() => handleProposedIngredientClick(tag)}
              >
                {tag}
              </Tag>
            ))}
          </Box>
        </VStack>
      </main>
    </>
  );
}
