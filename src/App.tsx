import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type DataTaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
}

export type TaskType = {
    data: DataTaskType[],
    filter:FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType
}

function App() {

    // let todolistID1 = v1()
    // let todolistID2 = v1()
    //
    // let [todolists, setTodolists] = useState<TodolistType[]>([
    //     {id: todolistID1, title: 'What to learn', filter: 'all'},
    //     {id: todolistID2, title: 'What to buy', filter: 'all'},
    // ])
    //
    // let [tasks, setTasks] = useState<TasksStateType>({
    //     [todolistID1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},
    //     ],
    //     [todolistID2]: [
    //         {id: v1(), title: 'Rest API', isDone: true},
    //         {id: v1(), title: 'GraphQL', isDone: false},
    //     ],
    // })


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn',},
        {id: todolistID2, title: 'What to buy',},
    ])

    let [tasks, setTasks] = useState<TasksStateType>(
        {
            [todolistID1]: {
                data: [{id: v1(), title: 'HTML&CSS', isDone: true},
                    {id: v1(), title: 'JS', isDone: true},
                    {id: v1(), title: 'ReactJS', isDone: false}],
                filter: 'all'
            },
            [todolistID2]: {
                data: [{id: v1(), title: 'Rest API', isDone: true},
                    {id: v1(), title: 'GraphQL', isDone: false}],
                filter: 'all'
            }
        }
    )

    const removeTask = (taskId: string, todolistId: string) => {
      const newToDoListTasks = {...tasks, [todolistId]:{...tasks[todolistId],data:tasks[todolistId].data.filter(task=>task.id !== taskId)}};
        console.log(newToDoListTasks)
        setTasks(newToDoListTasks)

        // const newTodolistTasks = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
        // setTasks(newTodolistTasks)
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        const newTodolistTasks = {...tasks,[todolistId]:{...tasks[todolistId],data:[newTask,...tasks[todolistId].data]}}
        setTasks(newTodolistTasks)
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        const newTodolistTasks = { ...tasks,[todolistId]: {...tasks[todolistId], data: tasks[todolistId].data.map(task=>task.id === taskId? {...task,isDone:taskStatus}:task)}};
        setTasks(newTodolistTasks)
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        const newTodolists = {...tasks,[todolistId]:{...tasks[todolistId],filter:filter}}
        setTasks(newTodolists)
    }

    const removeTodolist = (todolistId: string) => {
        const newTodolist = todolists.filter(todolist=>todolist.id !== todolistId)
        setTodolists(newTodolist)
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todolists.map((tl) => {

                const allTodolistTasks = tasks[tl.id].data
                let tasksForTodolist = allTodolistTasks

                if (tasks[tl.id].filter === 'active') {
                    tasksForTodolist =allTodolistTasks.filter(task => !task.isDone)
                }

                if (tasks[tl.id].filter === 'completed') {
                  allTodolistTasks.filter(task => task.isDone)
                }

                return <Todolist
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tasks[tl.id].filter}
                    removeTodolist={removeTodolist}
                />
            })}
        </div>
    );
}

export default App;
