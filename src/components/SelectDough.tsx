import React from 'react'
import { DoughType } from '../App'

type SelectDoughProps = {
  doughType: DoughType
  setDoughType: (dough: DoughType) => void
  onNext: () => void
  onBack: () => void
}

{/* React.FC (Functional Component). It is a TypeScript generic type that helps type-check React functional components.*/ }
const SelectDough: React.FC<SelectDoughProps> = ({
  doughType,
  setDoughType,
  onNext,
  onBack,
}) => {
  const doughOptions: DoughType[] = ['thin', 'thick', 'sour']

  return (
    <div>
      <h2>Select Your Dough</h2>
      <ul>
        {/* iterates over each dough option d and returns a list item (<li>) containing a radio button and label for that option. */}
        {doughOptions.map((d) => (
          <li key={d}> {/*React requires a unique key prop for list items to efficiently track and update elements. */}
            <label>
              <input
                type="radio"
                name="doughType"
                value={d}
                checked={doughType === d}
                onChange={() => setDoughType(d)}
              />
              {d}
            </label>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={onBack} style={{ marginRight: '1rem' }}>
          Back
        </button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  )
}

export default SelectDough
