import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    SafeAreaView,
    Modal,
    Button
} from "react-native";

import { useSettings } from "../Contexts/Settings";

export function ServiceCard({ service, onPress }) {
    const { settings, t } = useSettings();

    return (
        <TouchableOpacity style={[styles1.card, { backgroundColor: '#000000' }]} onPress={onPress}>
            <View style={[styles1.cardColor, { backgroundColor: `${service.color}aa` }]}>
                <Image style={styles1.image} source={{ uri: `${settings.apiBaseUrl}/${service.icon}` }} />
                <Text style={[styles1.title, { color: 'black' }]}>{service.name}</Text>
            </View>
        </TouchableOpacity>
    );
}

export function TriggerReactionCard({ elem, onPress }) {
    const { settings, t } = useSettings();
    const theme = 'dark';

    return (
        <TouchableOpacity style={[styles2.card, { backgroundColor: (theme === 'dark' ? 'white' : 'dark') }]} onPress={onPress}>
            <Text style={[styles2.title, { color: 'black' }]}>{elem.name}</Text>
            <Text style={[styles2.content, { color: (theme === 'dark' ? '#000000' : '#ffffff') }]}>{elem.description}</Text>
        </TouchableOpacity>
    );
}

export function ServiceRecap({ service, elem }) {
    const { settings, t } = useSettings();

    if (!service || !elem) {
        return null;
    }

    return (
        <View style={[styles3.card, { backgroundColor: '#000000' }]}>
            <View style={[styles3.cardColor, { backgroundColor: `${service.color}aa` }]}>
                <Image style={styles3.image} source={{ uri: `${settings.apiBaseUrl}/${service.icon}` }} />
                <View style={styles3.infoContainer}>
                    <Text style={styles3.title}>{service.name}</Text>
                    <Text style={styles3.content}>{elem.name}</Text>
                </View>
            </View>
        </View>
    );
}

const styles1 = StyleSheet.create({
    card: {
        borderRadius: 10,
        marginBottom: 10,
        width: "48%",
    },

    cardColor: {
        borderRadius: 10,
        padding: 10,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        height: 'auto',
        width: 'auto',
    },

    image: {
        marginTop: 10,
        width: 90,
        height: 90,
    },

    title: {
        marginVertical: 10,
        fontSize: 18,
        fontWeight: "bold",
    },
});

const styles2 = StyleSheet.create({
    card: {
        borderRadius: 10,
        marginBottom: 10,
        width: "48%",
        padding: 10,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        marginVertical: 10,
        fontSize: 18,
        fontWeight: "bold",
    },

    content: {
        fontSize: 14,
    },
});

const styles3 = StyleSheet.create({
    card: {
        borderRadius: 17,
        marginHorizontal: 10,
        width: "95%",
    },
    cardColor: {
        flexDirection: "row",
        borderRadius: 17,
        padding: 10,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        height: 'auto',
        width: 'auto',
    },
    image: {
        margin: 10,
        width: 100,
        height: 100,
    },
    infoContainer: {
        marginLeft: 10,
        flex: 1,
        height: 120,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    header: {
        padding: 20,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
    },
    content: {
        fontSize: 17,
        color: "#000",
    },
});
