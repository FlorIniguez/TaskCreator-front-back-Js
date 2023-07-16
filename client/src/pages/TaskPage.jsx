import { useEffect } from 'react'
import { useTasks } from '../context/TaskContext'
import TaskCard from '../components/TaskCard'
import './taskPage.css';
const TaskPage = () => {

const {getTasks, tasks} = useTasks();

useEffect(() => {
getTasks();
}, []);
if (tasks.length === 0) return (<h1>No task</h1>)
  return (
    <div className="task-grid">
      {
      tasks.map((task) => (
        <TaskCard task={task}  key={task._id}/>
        ))}
    </div>
  )
}

export default TaskPage