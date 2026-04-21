export type Profession =
  | 'Blacksmithing'
  | 'Armorsmithing'
  | 'Handicrafting'
  | 'Alchemy'
  | 'Cooking'

export type Grade = 'Common' | 'Rare' | 'Epic' | 'Unique' | 'Heroic'

export interface Ingredient {
  itemId: string
  name: string
  quantity: number
}

export interface Recipe {
  id: string
  name: string
  profession: Profession
  grade: Grade
  outputItemId: string
  outputQuantity: number
  goldFee: number
  ingredients: Ingredient[]
}

export interface PriceMap {
  [itemId: string]: number
}

export interface CraftingProfile {
  id: 'beginner' | 'expert' | 'master'
  label: string
  averageYieldMultiplier: number
}

export interface CalculationNode {
  itemId: string
  name: string
  requiredQuantity: number
  unitCost: number
  totalCost: number
  source: 'market' | 'crafted'
  children: CalculationNode[]
}

export interface CalculationResult {
  recipe: Recipe
  requestedCrafts: number
  outputUnits: number
  materialCost: number
  goldFee: number
  totalCost: number
  costPerUnit: number
  tree: CalculationNode[]
}
