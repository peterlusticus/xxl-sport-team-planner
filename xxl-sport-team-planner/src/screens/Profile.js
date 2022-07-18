import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Layout, Text, Section, SectionContent, TopNav, themeColor , Avatar , SectionImage, Button} from 'react-native-rapi-ui';
import componentColors from 'react-native-rapi-ui/constants/componentColors';



export default function ({ navigation }) {
    return ( 
        <Layout>
            <TopNav middleContent="Profil"/>
            <ScrollView>
				<Section style={styles.modalView}>
					<SectionImage source={require('./../../assets/logo.png')}></SectionImage>
						<SectionContent style={styles.modalView}>
						<Text size='h3' style={styles.Text}>Hallo Trainer </Text>
					</SectionContent>
				</Section>
				<View style={styles.modalView}>
					<View style={{flex:1}}>
					
						<Text size='h3'>
							Hier kannst du deine Profil Einstellugen bearbeiten
						</Text>
					</View>
				</View>
				<View style={styles.modalView}>
					<View style={{flex:1}}>
					
						<Text>
							Das Team:
						</Text>
					</View>
					<View>
						<Text size='h3'>
							Micha Stefan Christof Camila Sindy Robert Bernd Uli Henry Uli2
						</Text>
					</View>
				</View>
				<View style={styles.modalView}>
					<View style={{flex:1}}>
					
						<Text>
							Geleistete Stunden diesen Monat
						</Text>
					</View>
					<View>
						<Text size='h3'>
							42
						</Text>
					</View>
				</View>
				<View>
					<Button text='Eistellungen'></Button>
				</View>

            </ScrollView>
        </Layout>
    );
}
const styles = StyleSheet.create({
    Section:{
        color:'grey'
    },
    exercise: {
      textAlign:'center',
      borderRadius:20,
      margin:20
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        }},
	Text:{
		textAlign: "center",
		marginBottom: 10,
	},
    })

