import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { useParams } from "react-router-dom";

import { TodosContext } from "../../../contexts/todos.context";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  formRow: {
    margin: theme.spacing(1),
    minWidth: 120,
    display: "flex",
    justifyContent: "center",
  },
}));

const schema = yup.object().shape({
  title: yup.string().required().min(2).max(50),
});

const emptyValues = {
  title: "",
};

function TodoForm({ initialValues }) {
  const classes = useStyles();
  let { id } = useParams();
  const [populated, setPopulated] = useState(false);

  const { addTodo, updateTodo } = useContext(TodosContext);
  const { handleSubmit, errors, control, reset, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  if (initialValues && !populated) {
    reset(initialValues);
    setPopulated(true);
  }

  // console.log("errors", errors);
  const onSubmit = (formValues) => {
    console.log("formValues", formValues);

    if (populated) {
      const updates = {};
      for (const key in initialValues) {
        if (initialValues.hasOwnProperty(key)) {
          if (initialValues[key] !== formValues[key] && key[0] !== "_") {
            updates[key] = formValues[key];
          }
        }
      }
      console.log("updates", updates);
      updateTodo(id, updates);
    } else {
      addTodo(formValues);
    }
    reset(emptyValues);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.formRow}>
        <Controller
          as={TextField}
          error={!!errors.title}
          helperText={errors.title && errors.title.message}
          id="title"
          name="title"
          label="Title"
          control={control}
          rules={{ required: true }}
        />
      </div>
      <div className={classes.formRow}>
        <Button
          onClick={() =>
            reset(emptyValues)
          }
        >
          Reset
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={!formState.isValid}
        >
          {populated ? "Update" : "Add"} Todo
        </Button>
      </div>
    </form>
  );
}

export default TodoForm;
