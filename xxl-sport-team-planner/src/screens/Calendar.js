import React, { useContext, useEffect, useState } from 'react';
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Button,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { Alert, StyleSheet, View, TouchableOpacity, day } from 'react-native';
import { Agenda, DateData, AgendaEntry, AgendaSchedule, CalendarList } from 'react-native-calendars';
import { Modal, Portal, Button, Provider } from 'react-native-paper';
import { getAuth } from 'firebase/auth';
import { onValue, ref, set } from "firebase/database";
import { db } from "../navigation/AppNavigator";

const items = {
  '2022-05-22': [{ name: 'item 1 - any js object' }],
}
const State = {
  items: AgendaSchedule
}


export default (navigation, Component) => {
  const [events, setEvents] = useState({});
  const [eventModalData, setEventModalData] = useState([]);

  const { currentUser } = getAuth()
  console.log(currentUser.uid)
  useEffect(() => {
    if (currentUser) {
      const eventsRef = ref(db, "events");
      onValue(eventsRef, (snapshot) => {
        if (snapshot.exists()) {
          var data = snapshot.val();
          console.log(data)
          //Get all events for logged in user and formate it
          setEvents({
            '2012-05-16': {selected: true, marked: true, selectedColor: 'blue'},
            '2012-05-17': {marked: true},
          });
        }
      });
    }
  }, [currentUser]);

  const [visible, setVisible] = useState(false);

  function showModal(date) {
    console.log(date)
    //Get clicked event data
    setEventModalData(events[1]) 
    setVisible(true)
  }
  const hideModal = () => setVisible(false);
  const { isDarkmode } = useTheme()
  return (
    <Provider>
      <Layout>
        <TopNav
          middleContent="Team Kalender"
          leftContent={
            <Ionicons
              name="chevron-back"
              size={20}
              color={isDarkmode ? themeColor.white100 : themeColor.black}
            />
          }
          leftAction={() => navigation.goBack()}
        />
        <CalendarList
          onVisibleMonthsChange={(months) => { console.log('now these months are visible', months); }}
          pastScrollRange={50}
          futureScrollRange={50}
          scrollEnabled={true}
          showScrollIndicator={true}
          onDayPress={(date) => showModal(date)}
          markedDates={events}
        />
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Text>Datum:</Text>
            <Text>Uhrzeit:</Text>
            <Text>Beschreibung:</Text>
            <Text>Trainer:</Text>
            <Text>Info:</Text>
            <Text>{eventModalData[0]}</Text>
            <Button onPress={declineTraining(eventModalData[0])} text="Training absagen"></Button>
          </Modal>
        </Portal>
      </Layout>
    </Provider>

  )
}

function declineTraining(date){
  console.log(date)
}

function loadItems(day = DateData) {
  const items = this.state.items || {};

  setTimeout(() => {
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);

      if (!items[strTime]) {
        items[strTime] = [];

        const numItems = Math.floor(Math.random() * 3 + 1);
        for (let j = 0; j < numItems; j++) {
          items[strTime].push({
            name: 'Item for ' + strTime + ' #' + j,
            height: Math.max(50, Math.floor(Math.random() * 150)),
            day: strTime
          });
        }
      }
    }

    const newItems = (AgendaSchedule) = {};
    Object.keys(items).forEach(key => {
      newItems[key] = items[key];
    });
    this.setState({
      items: newItems
    });
  }, 1000);
}
function renderItem(isFirst) {
  const reservation = AgendaEntry
  const fontSize = isFirst ? 16 : 14;
  const color = isFirst ? 'black' : '#43515c';

  return (
    <View>
      testID={testIDs.agenda.ITEM}
      style={[styles.item, { height: reservation.height }]}
      onPress={() => Alert.alert(reservation.name)}
      <Text style={{ fontSize, color }}>hakki{reservation.name}</Text>
    </View>
  );
}

function renderEmptyDate() {
  return (
    <View>
      <Text>This is empty date!</Text>
    </View>
  )
}


function rowHasChanged(r1 = AgendaEntry, r2 = AgendaEntry) {
  return r1.name !== r2.name;
};

function timeToString(time) {
  const date = new Date(time)
  return date.toISOString().split('T')[0]
}


const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});

const containerStyle = { backgroundColor: 'white', padding: 20 };
