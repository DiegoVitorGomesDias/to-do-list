const getAllTasks = async () =>
{
    const result = await fetch 
    (
        "http://localhost:3333/tasks",
        { 
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        },
    )
    .then((res) => res.json())
    .then((date) => {return date})
    .catch (res => { console.log(res); });

    return await result;
}

const addTask = async(title) =>
{
    const result = await fetch 
    (
        "http://localhost:3333/tasks", 
        { 
            method: "POST", 
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({"title": `${title.trim()}`}) 
        }
    )
    .then((res) => res.json())
    .then((date) => { return date })
    .catch (res => { console.log(res); });

    return await result;
}

const updateTask = async(id, title, status) =>
{
    const result = await fetch 
    (
        "http://localhost:3333/tasks/"+id, 
        { 
            method: "PUT", 
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(
                {
                    "title": `${title.trim()}`,
                    "status": `${status.trim()}`
                }) 
        }
    )
    return result;
}

const deleteTask = async(id) =>
{
    const result = await fetch 
    (
        "http://localhost:3333/tasks/"+id.trim(), 
        { 
            method: "DELETE", 
            mode: 'cors',
            cache: 'default'
        }
    );
    return result;
}

const deleteAllTasks = async() =>
{
    const result = await fetch 
    (
        "http://localhost:3333/tasks/all", 
        { 
            method: "DELETE", 
            mode: 'cors',
            cache: 'default'
        }
    )
    return result;
}

export { getAllTasks, addTask, updateTask, deleteTask, deleteAllTasks  }