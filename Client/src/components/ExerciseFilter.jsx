import React from 'react'
import { useState } from 'react'

const ExerciseFilter = (props) => {
  const [isSelected, setIsSelected] = useState(props.muscleGroup)

  const handleSelect = (event) => {
    // console.log(event.target.textContent)
    if (!isSelected.includes(event.target.textContent)) {
      setIsSelected([...isSelected, event.target.textContent])
    } else {
      setIsSelected(isSelected.filter((item) => item !== event.target.textContent))
    }
  }
  props.setMuscleGroup(isSelected)
  // console.log(isSelected)
  return (
    <div className='text-white p-2'>
      <button onClick={handleSelect} className={props.muscleGroup.includes('All')?'text-green-500 p-2' : 'text-zinc-500 p-2'}>All</button>
      <button onClick={handleSelect} className={props.muscleGroup.includes('Chest')?'text-green-500 p-2' : 'text-zinc-500 p-2'}>Chest</button>
      <button onClick={handleSelect} className={props.muscleGroup.includes('Back')?'text-green-500 p-2' : 'text-zinc-500 p-2'}>Back</button>
      <button onClick={handleSelect} className={props.muscleGroup.includes('Shoulders')?'text-green-500 p-2' : 'text-zinc-500 p-2'}>Shoulders</button>
      <button onClick={handleSelect} className={props.muscleGroup.includes('Triceps')?'text-green-500 p-2' : 'text-zinc-500 p-2'}>Triceps</button>
      <button onClick={handleSelect} className={props.muscleGroup.includes('Biceps')?'text-green-500 p-2' : 'text-zinc-500 p-2'}>Biceps</button>
      <button onClick={handleSelect} className={props.muscleGroup.includes('Quads')?'text-green-500 p-2' : 'text-zinc-500 p-2'}>Quads</button>
      <button onClick={handleSelect} className={props.muscleGroup.includes('Hamstrings')?'text-green-500 p-2' : 'text-zinc-500 p-2'}>Hamstrings</button>
      <button onClick={handleSelect} className={props.muscleGroup.includes('Calves')?'text-green-500 p-2' : 'text-zinc-500 p-2'}>Calves</button>
      <button onClick={handleSelect} className={props.muscleGroup.includes('Glutes')?'text-green-500 p-2' : 'text-zinc-500 p-2'}>Glutes</button>
    </div>
  )
}

export default ExerciseFilter
