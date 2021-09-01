import React, { useState } from 'react';
import firebase from "firebase/app";
import { ListItem, TextField, Grid } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { db } from './firebase';
import styles from './TaskItem.module.css';
/* "rafce" と入力するとテンプレートを利用できる */

/* collection「tasks」の各 task を map 関数を用いてコンポーネント「TaskItem」に入れる */
/* 各 task はフィールドとして id と　title を持っている */
interface PROPS {
    id: string;
    title: string;
}


const TaskItem: React.FC<PROPS> = (props) => {
    const [title,setTitle] = useState(props.title);

    const editTask = () => {
        /* タイトルの属性だけを書き換えたいので　merge 属性を true にする */
        db.collection("tasks").doc(props.id).set({title: title}, {merge: true});
    };

    const deleteTask = () => {
        db.collection("tasks").doc(props.id).delete();
    };

    return (
       <ListItem>
            <h2>{props.title}</h2>

            <Grid container justifyContent="flex-end">
                <TextField
                    InputLabelProps={{
                        shrink: true,
                    }}
                    label="Edit task"
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        setTitle(e.target.value)
                    }
                />
            </Grid>
            
            <button className={styles.taskitem__icon} onClick={editTask}>
                <EditOutlinedIcon />    
            </button>
            <button className={styles.taskitem__icon} onClick={deleteTask}>
                <DeleteOutlineOutlinedIcon />
            </button>

        </ListItem>
    
        
    );
};

export default TaskItem;
