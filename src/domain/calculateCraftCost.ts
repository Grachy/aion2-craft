import { CalculationNode, CalculationResult, CraftingProfile, PriceMap, Recipe } from './types'

function round(value: number): number {
  return Math.round(value * 100) / 100
}

interface RecipeIndex {
  [outputItemId: string]: Recipe
}

function buildNode(
  itemId: string,
  name: string,
  quantity: number,
  prices: PriceMap,
  recipeIndex: RecipeIndex,
): CalculationNode {
  const craftableRecipe = recipeIndex[itemId]

  if (!craftableRecipe) {
    const unitCost = prices[itemId] ?? 0
    return {
      itemId,
      name,
      requiredQuantity: quantity,
      unitCost,
      totalCost: round(unitCost * quantity),
      source: 'market',
      children: [],
    }
  }

  const recipeRuns = quantity / craftableRecipe.outputQuantity
  const children = craftableRecipe.ingredients.map((ingredient) =>
    buildNode(
      ingredient.itemId,
      ingredient.name,
      ingredient.quantity * recipeRuns,
      prices,
      recipeIndex,
    ),
  )

  const childrenCost = children.reduce((sum, child) => sum + child.totalCost, 0)
  const goldFee = craftableRecipe.goldFee * recipeRuns
  const totalCost = round(childrenCost + goldFee)

  return {
    itemId,
    name,
    requiredQuantity: quantity,
    unitCost: round(totalCost / quantity),
    totalCost,
    source: 'crafted',
    children,
  }
}

export function calculateCraftCost(
  recipe: Recipe,
  allRecipes: Recipe[],
  prices: PriceMap,
  requestedCrafts: number,
  profile: CraftingProfile,
): CalculationResult {
  const recipeIndex = Object.fromEntries(allRecipes.map((entry) => [entry.outputItemId, entry]))
  const adjustedOutputQuantity = recipe.outputQuantity * profile.averageYieldMultiplier * requestedCrafts

  const tree = recipe.ingredients.map((ingredient) =>
    buildNode(
      ingredient.itemId,
      ingredient.name,
      ingredient.quantity * requestedCrafts,
      prices,
      recipeIndex,
    ),
  )

  const materialCost = round(tree.reduce((sum, node) => sum + node.totalCost, 0))
  const goldFee = round(recipe.goldFee * requestedCrafts)
  const totalCost = round(materialCost + goldFee)
  const costPerUnit = adjustedOutputQuantity > 0 ? round(totalCost / adjustedOutputQuantity) : 0

  return {
    recipe,
    requestedCrafts,
    outputUnits: round(adjustedOutputQuantity),
    materialCost,
    goldFee,
    totalCost,
    costPerUnit,
    tree,
  }
}
