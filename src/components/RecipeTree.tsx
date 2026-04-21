import { CalculationNode } from '../domain/types'

interface RecipeTreeProps {
  nodes: CalculationNode[]
}

function TreeNode({ node }: { node: CalculationNode }) {
  return (
    <li>
      <div className="tree-node">
        <strong>{node.name}</strong>
        <span>{node.requiredQuantity.toFixed(2)} pcs</span>
        <span>{node.totalCost.toFixed(2)} kinah</span>
        <span className={`badge ${node.source}`}>{node.source}</span>
      </div>
      {node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <TreeNode key={`${child.itemId}-${child.name}`} node={child} />
          ))}
        </ul>
      )}
    </li>
  )
}

export function RecipeTree({ nodes }: RecipeTreeProps) {
  return (
    <section className="card">
      <h2>Craft tree</h2>
      <ul className="tree-root">
        {nodes.map((node) => (
          <TreeNode key={`${node.itemId}-${node.name}`} node={node} />
        ))}
      </ul>
    </section>
  )
}
