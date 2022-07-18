import React, { useEffect, useState } from 'react';
import { Layout, TopNav, Text, useTheme, Button } from "react-native-rapi-ui";
import { CalendarList } from 'react-native-calendars';
import { Modal, Portal, Provider } from 'react-native-paper';
import { getAuth } from 'firebase/auth';
import { onValue, ref, set } from "firebase/database";
import { db } from "../navigation/AppNavigator";
import { stringify } from '@firebase/util';

export default () => {
	const [events, setEvents] = useState({});
	const [eventsFromFirebase, setEventsFromFirebase] = useState([]);
	const [eventModalData, setEventModalData] = useState({});
	const [eventModalDataTrainerNames, setEventModalDataTrainerNames] = useState({});

	const { currentUser } = getAuth();

	useEffect(() => {
		if (currentUser) {
			const eventsRef = ref(db, "courses/0/events");
			onValue(eventsRef, (snapshot) => {
				if (snapshot.exists()) {
					var data = snapshot.val();
					//Get all events for logged in user and formate it
					let eventsObj = {}
					let eventsObjFirebase = []
					for (let i = 0; i < data.length; i++) {
						const event = data[i];
						if (event['trainer'] === currentUser.uid) {
							eventsObjFirebase.push(data[i])
							eventsObj[data[i]['start_date'].substring(0, 10)] = { marked: true };
						}
					}
					setEventsFromFirebase(eventsObjFirebase)
					setEvents(eventsObj);
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
					<Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
						<Text>Datum: {eventModalData['start_date'] === undefined ? "" : eventModalData['start_date'].substring(0, 10)}</Text>
						<Text>Uhrzeit von: {eventModalData['start_date'] === undefined ? "" : eventModalData['start_date'].substring(11)}</Text>
						<Text>Uhrzeit bis: {eventModalData['end_date'] === undefined ? "" : eventModalData['end_date'].substring(11)}</Text>
						<Text>Beschreibung: {eventModalData['text'] === undefined ? "" : eventModalData['text']}</Text>
						<Text>Trainer: {eventModalDataTrainerNames}</Text>
						<Text>Info: {eventModalData['info'] === undefined ? "" : eventModalData['info']}</Text>
						<Text></Text>
						<Button onPress={declineTraining(eventModalData === undefined ? "" : eventModalData['start_date'])} text="Training absagen" ></Button>
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