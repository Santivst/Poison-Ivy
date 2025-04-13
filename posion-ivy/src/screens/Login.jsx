import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useDispatch } from 'react-redux';

import { colors } from "../constants/colors.js";
import InputForm from '../components/InputForm/InputForm'
import SubmitButton from '../components/SubmitButton/SubmitButton'
import { useSignInMutation } from '../services/authService';
import { setUser } from '../features/user/userSlice';
import { useDB } from '../hooks/useDB';




const Login = ({ navigation }) => {
    const dispatch = useDispatch();

    const [triggerSignIn, result] = useSignInMutation()
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { insertSession } = useDB();

    useEffect(() => {
        if (result.isSuccess) {
            (async () => {
                try {
                    const response = await insertSession({
                        email: result.data.email,
                        localId: result.data.localId,
                        token: result.data.idToken
                    })
                    dispatch(
                        setUser({
                            email: result.data.email,
                            idToken: result.data.idToken,
                            localId: result.data.localId,
                        })
                    );
                } catch (err) {
                    console.log(err)
                }
            })()
        }
    }, [result]);  

    const onSubmit = () => {
        triggerSignIn({ email, password });
    };


    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.title}>Login to start</Text>
                <InputForm label={"email"} onChange={setEmail} error={""} />
                <InputForm
                    label={"password"}
                    onChange={setPassword}
                    error={""}
                    isSecure={true}
                />
                <SubmitButton onPress={onSubmit} title="Send" />
                <Text style={styles.sub}>Not have an account?</Text>
                <Pressable onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.subLink}>Sign up</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default Login

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "90%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
        gap: 15,
        paddingVertical: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 22,
        fontFamily: "Josefin",
    },
    sub: {
        fontSize: 14,
        color: "black",
    },
    subLink: {
        fontSize: 14,
        color: "blue",
    },
});