import React, { useState, useEffect } from 'react';
import { Button, FormControl, TextField, Typography } from "@material-ui/core";
import{ auth } from "./firebase";
import styles from "./Login.module.css";

const Login: React.FC = (props: any) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            user && props.history.push("/");
        });
    },[props.history]);
    
    return (
        <div className={styles.login__root}>
            <h1>{isLogin ? "Login" : "Register"}</h1>
            <br/>
            <FormControl>
                <TextField
                    InputLabelProps={{
                        shrink: true,
                    }}
                    name="email"
                    label="E-mail"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(e.target.value);
                    }}
                />
            </FormControl>
            <br/>

            <FormControl>
                <TextField
                    InputLabelProps={{
                        shrink: true,
                    }}
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.target.value);
                    }} 
                />
            </FormControl>
            <br/>
            <Button variant="contained" color="primary" size="small" onClick={
                isLogin ? async () => {
                    try{
                        await auth.signInWithEmailAndPassword(email,password);
                        props.history.push("/");
                    } catch(error: any){
                        alert(error.message);
                    }
                } : async () => {
                    try {
                        await auth.createUserWithEmailAndPassword(email,password);
                        props.history.push("/");
                    } catch (error: any) {
                        alert(error.message);
                    }
                }
            }>
                {isLogin ? "login" : "register"}
            </Button>

            <br/>
            <Typography align="center">
                <span onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Create new account ?" : "Back to login"}
                </span>
            </Typography>

        </div>
    );
};

export default Login;
