import { View, StyleSheet, Text } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

const AppButton = ({ serviceNumber, client, description, date } : {serviceNumber:any, client:any, description:any, date:any}) => (
    <View style={styles.cardServico}>
            <Text style={styles.title}>
                #{serviceNumber}
            </Text>   
            <View style={styles.info}>
                <Text style={styles.date}>
                    <Ionicons
                        style={styles.icon}
                        name='calendar-outline'
                        color='#448bfc'
                        size={18}
                    />{date}
                </Text>

                <Text style={styles.status}>
                    <Ionicons
                        name='checkmark'
                        color='#fff'
                        size={18}
                    />
                </Text>
            </View>  
        <Text>
                    <Ionicons
                        style={styles.icon}
                        name='people-circle-outline'
                        color='#4b4b4b'
                        size={18}
                    />{client}
        </Text>
        <Text style={styles.description}>
            {description}
        </Text>
    </View>
);

export default AppButton

const styles = StyleSheet.create({
    cardServico: {
        backgroundColor: '#f0f0f0',
        width: '100%',
        borderRadius: 2,
        borderLeftWidth: 10,
        borderColor: '#969696',
        marginBottom: 5,
      },
      header:{
        flexDirection: 'row',
      },
      title: {
        fontSize: 20,
        alignItems: 'center',        
        width: '50%',
        fontWeight: 'bold',
        color: '#448bfc'
      },
      date: {
        color: '4b4b4b',
        width: '100%',
      },
      icon: {
        marginRight: 5
      },
      info: {
        fontSize: 18,
        flexDirection: 'row'
      }, 
      status: {
        backgroundColor: '#51b06a',
        color: '#fff',
        padding: 4,
        marginEnd: 2,
        borderRadius: 10,
        borderColor: '#43b060'
      },
      description: {
        padding: 2,
        marginTop: 5,
        textAlign: 'justify',
        color: '#7a7a7a'
      }
});

     