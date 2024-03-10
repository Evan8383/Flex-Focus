import React from 'react'
import { useState } from 'react'

const ExerciseFilter = (props) => {

  const [isSelected, setIsSelected] = useState([])
  // const handleSelect = (event) => {
  //   // console.log(event.target.textContent)
  //   if (!isSelected.includes(event.target.textContent)) {
  //     setIsSelected([...isSelected, event.target.textContent])
  //   } else {
  //     setIsSelected(isSelected.filter((item) => item !== event.target.textContent))
  //   }
  // }
  const handleSelect = (event) => {
    // console.log(event.target.textContent)
    if (!props.muscleGroup.includes(event.target.textContent)) {
      props.setMuscleGroup([...props.muscleGroup, event.target.textContent])
    } else {
      props.setMuscleGroup(props.muscleGroup.filter((item) => item !== event.target.textContent))
    }
  }
  // props.setMuscleGroup()
  // console.log(isSelected)
  return (
    <div key={123} className="text-white flex flex-wrap justify-around">
      <button key={1} onClick={handleSelect} className={props.muscleGroup.includes('All')?'bg-orange-500 px-1 rounded m-1' : 'bg-zinc-600 px-1 rounded m-1'}>All</button>
      <button key={2} onClick={handleSelect} className={props.muscleGroup.includes('Chest')?'bg-orange-500 px-1 rounded m-1' : 'bg-zinc-600 px-1 rounded m-1'}>Chest</button>
      <button key={3} onClick={handleSelect} className={props.muscleGroup.includes('Shoulders')?'bg-orange-500 px-1 rounded m-1' : 'bg-zinc-600 px-1 rounded m-1'}>Shoulders</button>
      <button key={4} onClick={handleSelect} className={props.muscleGroup.includes('Triceps')?'bg-orange-500 px-1 rounded m-1' : 'bg-zinc-600 px-1 rounded m-1'}>Triceps</button>
      <button key={5} onClick={handleSelect} className={props.muscleGroup.includes('Back')?'bg-orange-500 px-1 rounded m-1' : 'bg-zinc-600 px-1 rounded m-1'}>Back</button>
      <button key={6} onClick={handleSelect} className={props.muscleGroup.includes('Biceps')?'bg-orange-500 px-1 rounded m-1' : 'bg-zinc-600 px-1 rounded m-1'}>Biceps</button>
      <button key={7} onClick={handleSelect} className={props.muscleGroup.includes('Quads')?'bg-orange-500 px-1 rounded m-1' : 'bg-zinc-600 px-1 rounded m-1'}>Quads</button>
      <button key={8} onClick={handleSelect} className={props.muscleGroup.includes('Hamstrings')?'bg-orange-500 px-1 rounded m-1' : 'bg-zinc-600 px-1 rounded m-1'}>Hamstrings</button>
      <button key={9} onClick={handleSelect} className={props.muscleGroup.includes('Glutes')?'bg-orange-500 px-1 rounded m-1' : 'bg-zinc-600 px-1 rounded m-1'}>Glutes</button>
      <button key={0} onClick={handleSelect} className={props.muscleGroup.includes('Calves')?'bg-orange-500 px-1 rounded m-1' : 'bg-zinc-600 px-1 rounded m-1'}>Calves</button>
    </div>
  )
}

export default ExerciseFilter
