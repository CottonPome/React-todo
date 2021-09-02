
import React, { useState, useEffect} from "react";
import { FormControl, List, TextField } from "@material-ui/core";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import { makeStyles } from "@material-ui/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { db } from "./firebase";
import { auth } from "./firebase";
import TaskItem from "./TaskItem";
import styles from "./App.module.css";
import { AccessibleForwardTwoTone, AlternateEmailRounded } from "@material-ui/icons";

const useStyles = makeStyles({
  field: {
    marginTop: 30,
    marginBottom: 20,
  },
  list:{
    margin: "auto",
    width: "60%",
  },
});

const App: React.FC = (props: any) => {
  const [tasks, setTasks] = useState([{id: "", title: ""}]);
  const [input, setInput] = useState("");
  const classess = useStyles();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.push("login");
    });
    return () => unSub();
  });

  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map( (doc)=> ({id: doc.id, title: doc.data().title}) )
      );
    });
    return () => unSub();
  }, []);

  /* e: onClick の型 */
  const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    db.collection("tasks").add({title: input});  /* inputState の文字列 */
    setInput(""); /* inputState を初期化 */
  };
 
  return ( 
    <div className={styles.app__root}>
      <h1>Todo App by React/Firebase</h1>

      <button className={styles.app__logout}
        onClick={
          async () => {
            try {await auth.signOut();
              props.history.push("login");
            } catch (error: any){
              alert(error.message);
            }
          }}>
            <ExitToAppIcon />
      </button>

      <br />
      <FormControl>
        <TextField
          className={classess.field}
          InputLabelProps={{
            shrink: true,
          }}
          label="New task ?"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setInput(e.target.value)
          }
        />
      </FormControl>
      
      <button  className={styles.app__icon} disabled={!input} onClick={newTask}>
        <AddToPhotosIcon />
      </button>

      <List className={classess.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title}/>
        ))}
      </List>


    </div>
  );
};

export default App;
