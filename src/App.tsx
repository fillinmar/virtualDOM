import { createVNode, render } from './dom';

const app = document.querySelector<HTMLDivElement>('#app')!;

interface Todo {
    name: string;
    isDone: boolean;
}
interface Model {
    text: string;
    todos: Todo[];
}

enum Actions {
    UPDATE_TEXT = 'UPDATE_TEXT',
    ADD_TODO = 'ADD_TODO',
    CLICK_CHECKBOX='CLICK_CHECKBOX'
}

render<Model>(app, {
    model: { text: '', todos: [{name: 'Изучит JavaScript', isDone: false},
            {name: 'Создать собственный Virtual DOM', isDone: false},
            {name: 'Протестировать собственный Virtual DOM', isDone: false}]
    },
    view: function (state, dispatch) {
        return (
            <div>
                <h1> Список задач </h1>
                <div style={{display: 'flex'}}>
                    <input type={"text"} value={state?.text} placeholder="Добавьте задачу…" onInput={(e: any) =>
                        dispatch?.({ type: Actions.UPDATE_TEXT, payload: e.target.value })}/>
                    <button style={{margin: '5px 0 0 0', background: 'lightblue'}} onClick={() => dispatch?.({ type: Actions.ADD_TODO })}>
                        Добавить задачу
                    </button>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{margin: '0 10px 0 0'}}>
                        {state?.todos.map((todo) => (
                            <div class={'todo-item'}>
                                <input type={'checkbox'} onChange={() =>
                                    dispatch?.({ type: Actions.CLICK_CHECKBOX, payload: {name: todo.name, isDone: !todo.isDone}})}></input>
                                <span style={{ textDecoration: todo.isDone ? "line-through" : 'none'}}>{todo.name} </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    },
    update(state, action) {
        switch (action.type) {
            case Actions.UPDATE_TEXT:
                return { ...state, text: action.payload };
            case Actions.CLICK_CHECKBOX:
                const modifiedTodos = state.todos.map((todo)=> {
                    if (todo.name === action.payload.name) {
                        return {name: action.payload.name, isDone: action.payload.isDone}
                    }
                    return todo
                })
                return { ...state, todos: modifiedTodos};
            case Actions.ADD_TODO:
                if (!state.text) return state;
                return { ...state, text: '', todos: [...state.todos, {name: state.text, isDone: false}] };
            default:
                return state;
        }
    },
});
