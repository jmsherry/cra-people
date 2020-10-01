import React from "react";
import PageFrame from "../../components/page-frame/page-frame";
import Header from "../../components/header/header";
import TodoForm from '../../components/forms/todo-form/todo-form';

function AddPeople() {
  return (
    <div className="App">
      <Header />
      <main>
        <PageFrame>
          <h1>Add Todos</h1>
          <TodoForm />
        </PageFrame>
      </main>
    </div>
  );
}

export default AddPeople;
