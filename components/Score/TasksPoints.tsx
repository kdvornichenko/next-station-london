import { useScoreStore } from '@/store/score.store'
import React from 'react'
import { CheckIcon } from '../icons'

const TasksPoints = () => {
	const { tasksPoints, setTaskPoint, totalTasksScore } = useScoreStore()

	const checkbox = {
		size: 27,
		x: 136,
		y: 714,
	}

	return (
		<>
			{Array.from({ length: 2 }, (_, i) => (
				<foreignObject
					width={checkbox.size}
					height={checkbox.size}
					x={checkbox.x}
					y={checkbox.y + 51 * i}
					key={i}
				>
					<input
						type='checkbox'
						checked={tasksPoints[i] === 10}
						onChange={e => setTaskPoint(i, e.target.checked)}
						className='task-input hidden'
						id={`task + ${i}`}
					/>
					<label
						className='transition-all w-full h-full cursor-pointer'
						htmlFor={`task + ${i}`}
					>
						<CheckIcon size={checkbox.size} />
					</label>
				</foreignObject>
			))}
			<foreignObject width={40} height={40} x={130} y={822}>
				<div className='score-field pointer-events-none select-none'>
					{totalTasksScore}
				</div>
			</foreignObject>
		</>
	)
}

export default TasksPoints
