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
import { ChangeEvent, KeyboardEvent, useState } from "react";

interface Item {
  id: string;
  name: string;
}

interface Props {
  placeholder?: string;
  addButtonLabel?: string;
  knownItemNames?: string[];
  onSelectedItemsChange?: (allItems: string[]) => void;
}

export default function AutocompleteList(props: Props) {
  const { placeholder, addButtonLabel, knownItemNames, onSelectedItemsChange } =
    props;
  const [newItem, setNewItem] = useState<string>("");
  const [itemsList, setItemsList] = useState<Item[]>([]);
  const [matchingKnownItemsList, setMatchingKnownItemsList] = useState<
    string[]
  >([]);

  const handleNewItemChange = (event: ChangeEvent<HTMLInputElement>) => {
    const itemName = event.target.value;
    setNewItem(itemName);

    let matchingKnownItems: string[] = [];
    if (itemName && knownItemNames?.length) {
      const sanitizedItemName = itemName.trim().toLocaleLowerCase();
      matchingKnownItems = knownItemNames.filter((ki) =>
        ki.includes(sanitizedItemName)
      );
    }
    setMatchingKnownItemsList(matchingKnownItems);
  };

  const handleNewItemKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addItem(newItem);
    }
  };

  const addItemToList = (name: string) => {
    const newItem: Item = {
      id: Date.now().toString(),
      name: name,
    };
    const newList = [...itemsList, newItem];
    setItemsList(newList);
    triggerOnChange(newList);
  };

  const handleRemoveItemClick = (itemId: string) => {
    const itemIndex = itemsList.findIndex((value) => value.id === itemId);
    const newItemsList = [
      ...itemsList.slice(0, itemIndex),
      ...itemsList.slice(itemIndex + 1),
    ];
    setItemsList(newItemsList);
    triggerOnChange(newItemsList);
  };

  const handleAddItemButtonClick = () => {
    addItem(newItem);
  };

  const handleKnownItemClick = (itemName: string) => {
    addItemToList(itemName);
  };

  const addItem = (name: string) => {
    addItemToList(name);
    setNewItem("");
    setMatchingKnownItemsList([]);
  };

  const triggerOnChange = (items: Item[]) => {
    if (onSelectedItemsChange) {
      onSelectedItemsChange(items.map((x) => x.name));
    }
  };

  return (
    <VStack>
      <Box flexWrap={"wrap"}>
        {itemsList.map((ingredient) => (
          <Tag key={ingredient.id} margin={"2px"}>
            <TagLabel>{ingredient.name}</TagLabel>
            <TagCloseButton
              onClick={() => handleRemoveItemClick(ingredient.id)}
            />
          </Tag>
        ))}
      </Box>
      <HStack>
        <Input
          placeholder={placeholder}
          value={newItem}
          type="search"
          onChange={handleNewItemChange}
          onKeyUp={handleNewItemKeyUp}
        />
        <Button onClick={handleAddItemButtonClick}>
          {addButtonLabel ?? "Add"}
        </Button>
      </HStack>
      <Box>
        {matchingKnownItemsList.map((tag) => (
          <Tag
            key={tag}
            cursor="pointer"
            margin={"2px"}
            onClick={() => handleKnownItemClick(tag)}
          >
            {tag}
          </Tag>
        ))}
      </Box>
    </VStack>
  );
}
