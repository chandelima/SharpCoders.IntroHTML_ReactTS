import { ChangeEvent, useRef, useState } from 'react';
import { Status, Todo } from './interfaces/todo';
import TodoCard from './todoCard';

import styles from './Todo.module.css';

const TodoComponent = () => {
    // Hooks:
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todo, setTodo] = useState<Todo>();
    const [inputData, setInputData] = useState("");
    const inputDescription = useRef<HTMLInputElement>(null);

    // Functions:
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputData(e.target.value)
    }

    const getTodos = () => {
        return todos;
    }

    const validateInput = (): boolean => {
        let stringResult: string = "";

        if(inputData.length == 0)
            stringResult += "- Você deve informar uma descrição;\n";
        if(inputData.length < 3)
            stringResult += "- A descrição deve conter pelo menos 3 caractéres;\n";

        if (stringResult == "")
            return true;

        stringResult = stringResult.substring(0, (stringResult.length - 2));
        stringResult = stringResult + ".";
        alert(stringResult);
        inputDescription.current?.focus();

        return false;
    }

    const saveTodo = () => {
        if(!validateInput())
            return;

        if(todo?.id === undefined)
            createTodo();
        else
            updateTodo();
        
        setInputData("");
        setTodo(undefined);
        inputDescription.current?.focus();
    }
    
    const createTodo = () => {
        setTodos([...todos,
            {
                id: crypto.randomUUID(),
                description: inputData,
                status: Status.Pending
            }
        ]);
    }

    const updateTodo = () => {
        if (todo?.id === undefined) {
            alert("Erro na alteração.");
            return;
        }
        
        const todosToUpdate = [...todos];
        const todoToUpdate = todosToUpdate.find(t => t.id === todo.id)!;
        todoToUpdate.description = inputData;

        setTodos(todosToUpdate);
    }

    const deleteTodo = (id: string) => {
        if(!confirm("Você tem certeza que deseja deletar a todo selecionada?"))
            return;

        const todosToChange = todos?.filter(t => t.id !== id);
        setTodos(todosToChange);
    }

    const changeTodoStatus = (id: string, status: Status) => {
        const todosTochange = [ ... todos ]
        const todo = todosTochange.find(t => t.id === id);
        
        if(todo === undefined) {
            alert("Não foi possível encontrar a Todo selecionada");
            return;
        }
        
        todo.status = status
        setTodos(todosTochange);
    }

    const preUpdateTodo = (id: string) => {
        const todoToUpdate = getTodos().find(t => t.id === id);
        
        if(todoToUpdate === undefined) {
            alert("Não foi possível encontrar a Todo selecionada.");
            return;
        }
        
        setTodo(todoToUpdate);
        setInputData(todoToUpdate.description);
        inputDescription.current?.focus();
    }

    return (
        <div>
            <header id={styles.header}>
                <h1>Meu incrível app de ToDo</h1>
            </header>
            <main id={styles.main}>
                <div id={styles.container}>
                    <div id={styles.form}>
                        <label htmlFor="description">Descrição:</label>
                        <div className={styles.inputContainer}>
                            <input onChange={handleInputChange}
                              type="text" id="description" value={inputData}
                              placeholder="Do que você quer se lembrar?" 
                              ref={inputDescription}/>
                            <button onClick={saveTodo}>Salvar</button>
                        </div>
                    </div>
                    <div className={styles.todosList}>
                        {getTodos().map((todo, i) => (
                            <TodoCard todo={todo} preUpdateTodo={preUpdateTodo}
                              changeTodoStatus={changeTodoStatus} key={i}
                              deleteTodo={deleteTodo}/>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
};

export default TodoComponent;