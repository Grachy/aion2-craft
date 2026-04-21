import { useMemo, useState } from 'react'
import { PriceEditor } from './components/PriceEditor'
import { RecipeTree } from './components/RecipeTree'
import { defaultPrices, profiles, recipes } from './data/sampleData'
import { calculateCraftCost } from './domain/calculateCraftCost'

export function App() {
  const [recipeId, setRecipeId] = useState(recipes[1].id)
  const [profileId, setProfileId] = useState(profiles[0].id)
  const [requestedCrafts, setRequestedCrafts] = useState(1)
  const [prices, setPrices] = useState(defaultPrices)

  const recipe = recipes.find((entry) => entry.id === recipeId)!
  const profile = profiles.find((entry) => entry.id === profileId)!

  const result = useMemo(
    () => calculateCraftCost(recipe, recipes, prices, requestedCrafts, profile),
    [recipe, prices, requestedCrafts, profile],
  )

  return (
    <main className="layout">
      <header className="hero">
        <p className="eyebrow">Open-source starter</p>
        <h1>Aion crafting calculator</h1>
        <p>
          A clean starter repository with recursive recipe cost calculation, batch planning,
          and mastery profiles.
        </p>
      </header>

      <section className="card controls">
        <label className="field">
          <span>Recipe</span>
          <select value={recipeId} onChange={(event) => setRecipeId(event.target.value)}>
            {recipes.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.name}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Mastery profile</span>
          <select value={profileId} onChange={(event) => setProfileId(event.target.value as typeof profileId)}>
            {profiles.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.label}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Craft runs</span>
          <input
            type="number"
            min="1"
            step="1"
            value={requestedCrafts}
            onChange={(event) => setRequestedCrafts(Number(event.target.value))}
          />
        </label>
      </section>

      <section className="summary-grid">
        <article className="card metric">
          <span>Material cost</span>
          <strong>{result.materialCost.toFixed(2)}</strong>
        </article>
        <article className="card metric">
          <span>Gold fee</span>
          <strong>{result.goldFee.toFixed(2)}</strong>
        </article>
        <article className="card metric">
          <span>Total cost</span>
          <strong>{result.totalCost.toFixed(2)}</strong>
        </article>
        <article className="card metric">
          <span>Cost per unit</span>
          <strong>{result.costPerUnit.toFixed(2)}</strong>
        </article>
      </section>

      <PriceEditor prices={prices} onChange={setPrices} />
      <RecipeTree nodes={result.tree} />
    </main>
  )
}
