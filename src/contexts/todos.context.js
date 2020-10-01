import React, { createContext, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { v4 as uuidv4 } from "uuid";
// import cloneDeep from 'lodash.cloneDeep' <-- use if your objects get complex

export const TodosContext = createContext({
  // fetchTodos: () => [],
  addTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
  error: null,
  todos: [],
});

export const TodosProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const { addToast } = useToasts();

  const addTodo = (formData) => {
    let newTodo = {
      ...formData,
      _id: uuidv4(),
    };
    setTodos([...todos, newTodo]);
    addToast(`Saved ${newTodo.title}`, {
      appearance: "success",
    });
  };

  const updateTodo = async (id, updates) => {

      // Get index
      const index = todos.findIndex((todo) => todo._id === id);

      if (index === -1) {
        addToast(
          `Error: Failed to update ${updates.firstName} ${updates.lastName}`,
          {
            appearance: "error",
          }
        );
        return;
      }

      // Get actual Todo
      const oldTodo = todos[index];

      // Merge with updates
      const newTodo = {
        // legit use of 'var', so can be seen in catch block
        ...oldTodo,
        ...updates, // order here is important for the override!!
      };
      // recreate the Todos array
      const updatedTodos = [
        ...todos.slice(0, index),
        newTodo,
        ...todos.slice(index + 1),
      ];
      setTodos(updatedTodos);
      addToast(`Updated ${newTodo.title}`, {
        appearance: "success",
      });
  };

  const deleteTodo = async (id) => {

      // Get index
      const index = todos.findIndex((todo) => todo._id === id);
      const deletedTodo = todos[index];

      if (index === -1) {
        addToast(
          `Error: Failed to delete todo id: ${id}`,
          {
            appearance: "error",
          }
        );
        return;
      }
      // recreate the Todos array without that Todo
      const updatedTodos = [
        ...todos.slice(0, index),
        ...todos.slice(index + 1),
      ];
      setTodos(updatedTodos);
      addToast(`Deleted ${deletedTodo.title}`, {
        appearance: "success",
      });
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        error,
        addTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};
