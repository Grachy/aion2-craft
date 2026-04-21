import { PriceMap } from '../domain/types'

interface PriceEditorProps {
  prices: PriceMap
  onChange: (next: PriceMap) => void
}

export function PriceEditor({ prices, onChange }: PriceEditorProps) {
  return (
    <section className="card">
      <h2>Ingredient prices</h2>
      <div className="price-list">
        {Object.entries(prices).map(([itemId, value]) => (
          <label key={itemId} className="field">
            <span>{itemId}</span>
            <input
              type="number"
              min="0"
              step="1"
              value={value}
              onChange={(event) =>
                onChange({
                  ...prices,
                  [itemId]: Number(event.target.value),
                })
              }
            />
          </label>
        ))}
      </div>
    </section>
  )
}
