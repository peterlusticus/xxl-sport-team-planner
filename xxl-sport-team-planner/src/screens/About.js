import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, } from 'react-native';
import { Layout, Text, Section, SectionContent, TopNav, themeColor , Avatar , SectionImage} from 'react-native-rapi-ui';
import componentColors from 'react-native-rapi-ui/constants/componentColors';


export default function ({ navigation }) {
    return ( 
        <Layout>
            <TopNav middleContent="Übungen"/>
            <View >
            <ScrollView>
                <Section style={styles.modalView}>
                    <SectionContent >
                    <SectionImage source={require('./../../assets/uebungen/pushup.png')} />
                    <Text style={styles.exercise}>Liegestütze</Text>
                    </SectionContent>
                </Section>

               
                <Section style={styles.modalView}>
                    <SectionContent>
                        <SectionImage source={require('./../../assets/uebungen/hampelmann.png')} />
                        <Text style={styles.exercise}>Hampelmänner</Text>
                    
                    </SectionContent>
                </Section>
                
                <Section style={styles.modalView}>
                    <SectionContent>
                        <SectionImage source={require('./../../assets/uebungen/oneArmPlank.png')} />
                        <Text style={styles.exercise}>Schulter Kraft</Text>
                    </SectionContent>
                </Section>
                
                <Section style={styles.modalView}>
                    <SectionContent>
                        <SectionImage source={require('./../../assets/uebungen/Supermann.png')} />
                        <Text style={styles.exercise}>Fallschirm Springer</Text>
                    </SectionContent>
                </Section>
                <Section style={styles.modalView}>
                    <SectionContent>
                        <SectionImage source={require('./../../assets/uebungen/burpee.png')} />
                        <Text style={styles.exercise}>Burpee</Text>
                    </SectionContent>
                </Section>
                <Section style={styles.modalView}>
                    <SectionContent>
                        <SectionImage source={require('./../../assets/uebungen/sidePlank.png')} />
                        <Text style={styles.exercise}>Seitlicher Stütze</Text>
                    </SectionContent>
                </Section>
                <Section style={styles.modalView}>
                    <SectionContent>
                        <SectionImage source={require('./../../assets/uebungen/situp.png')} />
                        <Text style={styles.exercise}>Sit Up</Text>
                    </SectionContent>
                </Section>
                
                <Section style={styles.modalView}>
                    <SectionContent>
                        <SectionImage source={require('./../../assets/uebungen/Bergsteiger.png')} />
                        <Text style={styles.exercise}>Bergsteiger</Text>
                    </SectionContent>
                </Section>

                <Section style={styles.modalView}>
                    <SectionContent>
                    <SectionImage source={require('./../../assets/uebungen/plank.png')} />
                    <Text style={styles.exercise}>Plank</Text>
                    
                    </SectionContent>
                </Section>
                
            </ScrollView>
            </View>
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
    })

