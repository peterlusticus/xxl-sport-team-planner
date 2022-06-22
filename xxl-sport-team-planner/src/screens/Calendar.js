import {React} from "react";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import {Alert, StyleSheet, View, TouchableOpacity, day} from 'react-native';
import {Agenda, DateData, AgendaEntry, AgendaSchedule,CalendarList } from 'react-native-calendars';


export default (navigation) =>{
  const { isDarkmode } = useTheme()
  return (
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
      <View>
        <Text>hallo</Text>
      </View>
      <Agenda>
          items={items}
          loadItemsForMonth={loadItems}
          selected={'2022-05-23'}
          renderItem={renderItem}
          renderEmptyDate={renderEmptyDate}
          rowHasChanged={rowHasChanged}
          showClosingKnob={true}
          renderDay={(day) => (<Text>{day ? day.day: 'item'}</Text>)}
        </Agenda>
    </Layout>
)}

const items={
  '2022-05-22': [{ name: 'item 1 - any js object' }],
  '2022-05-23': [{ name: 'item 2 - any js object', height: 80 }],
  '2022-05-24': [],
  '2022-05-25': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
}
function loadItems(date) { 
  const items = this.state.items;
}

function setTimeout () { 
  for (let i = -15; i < 85; i++){
    const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    const strTime = this.timeToString(time);}

    if (!items[strTime]) {
      items[strTime] = [];
      
      const numItems = Math.floor(Math.random() * 3 + 1);
      for (let j = 0; j < numItems; j++) {
        items[strTime].push({
          name: 'Item for ' + strTime + ' #' + j,
          height: Math.max(50, Math.floor(Math.random() * 150)),
          day: strTime})}
    }
  setState = {items, newItem}}


function newItems () {
  Object.keys(items).forEach(key => {
  newItems[key] = items[key]})
  this.setState({items: newItems});
  }

function renderItem(isFirst) {
  const reservation =AgendaEntry
  const fontSize = isFirst ? 16 : 14;
  const color = isFirst ? 'black' : '#43515c';

  return (
    <TouchableOpacity
      testID={testIDs.agenda.ITEM}
      style={[styles.item, {height: reservation.height}]}
      onPress={() => Alert.alert(reservation.name)}
    >
      <Text style={{fontSize, color}}>hakki{reservation.name}</Text>
    </TouchableOpacity>
  );
}

function renderEmptyDate() { 
  return (
    <View style={styles.emptyDate}>
      <Text>This is empty date!</Text>
    </View>
  )}


function rowHasChanged(r1= AgendaEntry, r2= AgendaEntry) {
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
    paddingTop: 30}
    });