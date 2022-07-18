import React, { useEffect, useState } from 'react';
import { Layout, TopNav, Text, useTheme, Button } from "react-native-rapi-ui";
import { CalendarList } from 'react-native-calendars';
import { Modal, Portal, Provider } from 'react-native-paper';
import { getAuth } from 'firebase/auth';
import { onValue, ref, set } from "firebase/database";
import { db } from "../navigation/AppNavigator";
import { stringify } from '@firebase/util';
import { View, StyleSheet } from 'react-native';


export default () => {
	const [events, setEvents] = useState({});
	const [eventsFromFirebase, setEventsFromFirebase] = useState([]);
	const [eventModalData, setEventModalData] = useState({});
	const [eventModalDataTrainerNames, setEventModalDataTrainerNames] = useState({});

	const { currentUser } = getAuth();


	/*const moment = require('moment');
	let now = moment().format('dddd Do MMMM');
	console.log(now);
	let Datum = moment().format('Do MMMM YYYY');
	let UhrzeitVon = moment().format(' h:mm:ss a');
	let UhrzeitBis = moment().format(' h:mm:ss a');
	var Beschreibung = "Kindertraining";
	var Trainer = "";
	var info = "lore ipsum denn die welt geht auf scherben"*/


	useEffect(() => {
		if (currentUser) {
			const eventsRef = ref(db, "courses");
			onValue(eventsRef, (snapshot) => {
				if (snapshot.exists()) {
					var data = snapshot.val();
					for (const key in data) {
						if (Object.hasOwnProperty.call(data, key)) {
							const cours = data[key];
							//Get all events for logged in user and formate it
							let eventsObj = {}
							let eventsObjFirebase = []
							for (const key in cours.events) {
								if (Object.hasOwnProperty.call(cours.events, key)) {
									const event = cours.events[key];
									if (event['trainer'] === currentUser.uid) {
										eventsObjFirebase.push(event)
										eventsObj[event['start_date'].substring(0, 10)] = { marked: true };
										console.log(event)
									}
								}
								setEventsFromFirebase(eventsObjFirebase)
								setEvents(eventsObj);
							}
						}
					}
					
					
				}
			});
		}
	}, [currentUser]);

	const [visible, setVisible] = useState(false);

	function showModal(date) {
		if (searchEventByDate(date.dateString)) {
			setEventModalData(searchEventByDate(date.dateString))
			let trainer = "Du"
			const userRef = ref(db, "users");
			onValue(userRef, (snapshot) => {
				if (snapshot.exists()) {
					var data = snapshot.val();
					trainer = data[eventModalData['trainer']] === undefined ? "" : data[eventModalData['trainer']]['vorname']
				}
			});
			setEventModalDataTrainerNames(trainer)
			setVisible(true)
		}
		else {
		}


	}

	function searchEventByDate(date) {
		for (var i = 0; i < eventsFromFirebase.length; i++) {
			if (eventsFromFirebase[i]['start_date'].startsWith(date)) {
				return eventsFromFirebase[i];
			}
		}
	}

	const hideModal = () => setVisible(false);
	const { isDarkmode } = useTheme()
	return (
		<Provider>
			<Layout>
				<TopNav
					middleContent="Team Kalender"
				/>
				<CalendarList
					pastScrollRange={50}
					futureScrollRange={50}
					scrollEnabled={true}
					showScrollIndicator={true}
					onDayPress={(date) => showModal(date)}
					markedDates={events}
				/>


				<Portal>
					<Modal visible={visible} onDismiss={hideModal}>
						<View style={styles.modalView}>
							<View style={styles.Text}>
								<Text>Datum: {eventModalData['start_date'] === undefined ? "" : eventModalData['start_date'].substring(0, 10)}</Text>
							</View>
							<View >
								<Text size='h1'>{eventModalData['text'] === undefined ? "" : eventModalData['text']}</Text>
							</View>
							
							<View>
							<Text></Text>
								<Text>Von: {eventModalData['start_date'] === undefined ? "" : eventModalData['start_date'].substring(11)}</Text>
								<Text>Bis: {eventModalData['end_date'] === undefined ? "" : eventModalData['end_date'].substring(11)}</Text>
							</View>
							<View>
							<Text></Text>
								<Text>Info: {eventModalData['info'] === undefined ? "" : eventModalData['info']}</Text>
								<Text></Text>

							</View>
							<View>
								<Button onPress={declineTraining(eventModalData === undefined ? "" : eventModalData['start_date'])} text="Training absagen" ></Button>
							</View>
						</View>

					</Modal>
				</Portal>
			</Layout>
		</Provider>
	)
}

function declineTraining(date) {
	//console.log(date)
	//searchEventByDate(date)
	//firebase flag beim event einfügen oder neues objekt "offene termine" erstellen 
}

const containerStyle = { backgroundColor: 'white', padding: 20 };

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	},
});