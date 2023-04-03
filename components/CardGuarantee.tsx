import { View, StyleSheet, Text } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

const AppButton = ({ serviceNumber, client, description, dateService, dateEndGuarantee, daysRemaining } : {serviceNumber:any, client:any, description:any, dateService:any,  dateEndGuarantee:any,  daysRemaining:any}) => (
    <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    #{serviceNumber}
                </Text>   
                
                <Text style={styles.guarantee}>
                    <Ionicons
                        style={styles.icon}
                        name='ribbon-outline'
                        color='#e0bd0d'
                        size={20}
                    />{dateEndGuarantee}
                </Text>
            </View>
            
            <Text style={styles.daysRemaining}>
                    <Ionicons
                        style={styles.icon}
                        name='alarm-outline'
                        color='#4b4b4b'
                        size={18}
                    />{daysRemaining} dias restantes
            </Text>
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
    card: {
        backgroundColor: '#f0f0f0',
        width: '100%',
        borderRadius: 2,
        borderLeftWidth: 10,
        borderColor: '#969696',
        marginBottom: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    
        elevation: 2,
      },
      header:{
        flexDirection: 'row',
        fontSize: 20,
      },
      title: {
        fontSize: 20,
        alignItems: 'center',        
        width: '50%',
        fontWeight: 'bold',
        color: '#4b4b4b'
      },
      daysRemaining: {
        color: '#4b4b4b',  
        textAlign: 'right',
        width: '100%'      
      },      
      guarantee: {
        color: '#4b4b4b', 
        fontSize: 20, 
        textAlign: 'right',
        width: '50%'  
      },
      icon: {
        marginRight: 5
      },
      info: {
        fontSize: 18,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
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

     