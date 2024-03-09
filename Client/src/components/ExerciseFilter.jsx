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
    <div className="text-white flex flex-wrap justify-around">
      <button onClick={handleSelect} className={props.muscleGroup.includes('All')?'bg-orange-500 px-1 rounded m-1' : 'bg-zinc-600 px-1 rounded m-1'}>All</button>
      <button onClick={handleSelect} className={props.muscleGroup.includes('Chest')?'bg-orange-500 px-1 rounded m-1' : 'bg-zinc-600 px-1 rounded m-1'}>Chest</button>
      <button onClick={handleSelect} className={props.muscleGroup.includes('Shoulders')?'bg-orange-500 px-1 rounded m-1' : 'bg-zinc-600 px-1 rounded m-1'}>Shoulders</button>
      <button onClick={handleSelect} className={props.muscleGroup.includes('Triceps')?'bg-orange-500 px-1 rounded m-1' : 'bg-zinc-600 px-1 rounded m-1'}>Triceps</button>
      <button onClick={handleSelect} className={props.muscleGroup.includes('Back')?'bg-orange-500 px-1 rounded m-1' : 'bg-zinc-600 px-1 rounded m-1'}>Back</button>
      <button onClick={handleSelect} className={props.muscleGroup.includes('Biceps')?'bg-orange-500 px-1 rounded m-1' : 'bg-zinc-600 px-1 rounded m-1'}>Biceps</button>
      <button onClick={handleSelect} className={props.muscleGroup.includes('Quads')?'bg-orange-500 px-1 rounded m-1' : 'bg-zinc-600 px-1 rounded m-1'}>Quads</button>
      <button onClick={handleSelect} className={props.muscleGroup.includes('Hamstrings')?'bg-orange-500 px-1 rounded m-1' : 'bg-zinc-600 px-1 rounded m-1'}>Hamstrings</button>
      <button onClick={handleSelect} className={props.muscleGroup.includes('Glutes')?'bg-orange-500 px-1 rounded m-1' : 'bg-zinc-600 px-1 rounded m-1'}>Glutes</button>
      <button onClick={handleSelect} className={props.muscleGroup.includes('Calves')?'bg-orange-500 px-1 rounded m-1' : 'bg-zinc-600 px-1 rounded m-1'}>Calves</button>
    </div>
  )
}

export default ExerciseFilter
