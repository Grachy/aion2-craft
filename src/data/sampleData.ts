import { CraftingProfile, PriceMap, Recipe } from '../domain/types'

export const profiles: CraftingProfile[] = [
  { id: 'beginner', label: 'Beginner', averageYieldMultiplier: 1 },
  { id: 'expert', label: 'Expert', averageYieldMultiplier: 1.1 },
  { id: 'master', label: 'Master', averageYieldMultiplier: 1.2 },
]

export const recipes: Recipe[] = [
  {
    id: 'bronze-ingot',
    name: 'Bronze Ingot',
    profession: 'Blacksmithing',
    grade: 'Common',
    outputItemId: 'bronze-ingot',
    outputQuantity: 1,
    goldFee: 12,
    ingredients: [
      { itemId: 'copper-ore', name: 'Copper Ore', quantity: 3 },
      { itemId: 'tin-ore', name: 'Tin Ore', quantity: 2 },
    ],
  },
  {
    id: 'apprentice-sword',
    name: 'Apprentice Sword',
    profession: 'Blacksmithing',
    grade: 'Rare',
    outputItemId: 'apprentice-sword',
    outputQuantity: 1,
    goldFee: 75,
    ingredients: [
      { itemId: 'bronze-ingot', name: 'Bronze Ingot', quantity: 4 },
      { itemId: 'polishing-stone', name: 'Polishing Stone', quantity: 2 },
    ],
  },
  {
    id: 'healing-potion',
    name: 'Healing Potion',
    profession: 'Alchemy',
    grade: 'Common',
    outputItemId: 'healing-potion',
    outputQuantity: 5,
    goldFee: 18,
    ingredients: [
      { itemId: 'fresh-herb', name: 'Fresh Herb', quantity: 4 },
      { itemId: 'clear-water', name: 'Clear Water', quantity: 2 },
    ],
  },
]

export const defaultPrices: PriceMap = {
  'copper-ore': 11,
  'tin-ore': 15,
  'polishing-stone': 40,
  'fresh-herb': 7,
  'clear-water': 3,
}
