import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    Button,
    SafeAreaView,
    ScrollView
} from "react-native";

import {
    useNavigation,
    useTheme
} from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSettings } from "../Contexts/Settings";
import TextInput from "../Components/TextInput";
import { getUserInfos, updateUser } from "../Core/ServerCalls";

function MyTextInput({ label, value, onChangeText, password = false }) {
    return (
        <TextInput
            label={label}
            returnKeyType="next"
            value={value}
            onChangeText={onChangeText}
            error={false}
            errorText={null}
            autoCapitalize="none"
            autoCompleteType="name"
            textContentType="name"
            secureTextEntry={password}
        />
    );

}

export default function ModifyAccount() {
    const navigation = useNavigation();
    const { settings, setSettings, t } = useSettings();
    const { colors } = useTheme();
    const [userInfos, setUserInfos] = useState({});
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const fecthUserInfos = async () => {
            const user = await getUserInfos(settings.apiBaseUrl);
            setUserInfos(user);
        }
        fecthUserInfos();
    }, []);

    const handleSave = async () => {
        try {
            if (confirmPassword !== newPassword || (confirmPassword == "" && newPassword != "") || (confirmPassword != "" && newPassword == "")) {
                setError(t("Please confirm your password"));
                return;
            }
            await updateUser(settings.apiBaseUrl, userInfos.firstname, userInfos.lastname, userInfos.email, confirmPassword);
            navigation.goBack();
        } catch (error) {
            console.error('Update user failed:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={{ color: colors.text, textAlign: "center", fontSize: 32, fontWeight: "bold" }}>{t("Account")}</Text>
                <MyTextInput label={t("Firstname")} value={userInfos.firstname} onChangeText={(text) => setUserInfos({ ...userInfos, firstname: text })} />
                <MyTextInput label={t("Lastname")} value={userInfos.lastname} onChangeText={(text) => setUserInfos({ ...userInfos, lastname: text })} />
                <MyTextInput label={t("Email")} value={userInfos.email} onChangeText={(text) => setUserInfos({ ...userInfos, email: text })} />
                <MyTextInput label={t("New password")} value={newPassword} onChangeText={setNewPassword} password={true} />
                <MyTextInput label={t("Confirm password")} value={confirmPassword} onChangeText={setConfirmPassword} password={true} />
                <TouchableOpacity onPress={handleSave} style={[styles.button, { backgroundColor: colors.primary }]}>
                    <Text style={styles.textBtn}>{t("Save")}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        padding: 10,
    },
    button: {
        borderRadius: 10,
        padding: 10,
        margin: 20,
        textAlign: "center",
    },
    textBtn: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
    },
});

