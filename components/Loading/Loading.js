import { Image, Text, View } from "react-native"
import styles from "./Style"

const Loading = () => {

    const loadingTextArray = [
        "The unicorn is the national animal of Scotland", 
        "The longest wedding veil was the same length as 63.5 football fields",
        "The Amazon River once flowed in the opposite direction",
        "Pigeons can tell the difference between Picasso and Monet",
        "Vatican City is the smallest country in the world",
        "There are more than 1,000 types of bananas growing in the world"     
    ]

    const randomLoadingText = loadingTextArray[Math.floor(Math.random() * loadingTextArray.length)]

    return (
        <View style={styles.container}>
            <Image source={require("../../assets/tohru-cute.gif")} style={styles.logo}/>
            <Text>Loading...</Text>
            <Text>If you dont know. {randomLoadingText}</Text>
        </View>
    )
}

export default Loading