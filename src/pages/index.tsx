import Head from "next/head";
import AutocompleteList from "@/components/autocomplete-list/autocomplete-list.component";
import { useState } from "react";

const knownIngredients = [
  "tomato",
  "potato",
  "garlic",
  "onion",
  "chicken",
  "pork",
  "fish",
  "beef",
];

export default function Home() {
  const [ingredients, setIngredients] = useState<string[]>([]);

  const handleIngredientsChange = (items: string[]) => setIngredients(items);

  return (
    <>
      <Head>
        <title>Recipes</title>
        <meta name="description" content="Recipes app created with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AutocompleteList
          placeholder="Type an ingredient..."
          knownItemNames={knownIngredients}
          onSelectedItemsChange={handleIngredientsChange}
        />
        <ul>
          {ingredients.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </main>
    </>
  );
}
