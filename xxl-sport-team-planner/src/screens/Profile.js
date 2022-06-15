import { getAuth } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Layout, Section, Text } from 'react-native-rapi-ui';
import { AuthContext, AuthProvider } from '../provider/AuthProvider';
import { onValue, ref, set } from "firebase/database";
import { db } from "../navigation/AppNavigator";

export default function ({ navigation }) {
	const [username, setUsername] = useState("");
	const { currentUser } = getAuth()
	console.log(currentUser.uid)
	useEffect(() => {
		if (currentUser) {
		  const starCountRef = ref(db, "users/" + currentUser.uid);
		  onValue(starCountRef, (snapshot) => {
			if (snapshot.exists()) {
			  var data = snapshot.val();
			  setUsername(data.firstName + " " + data.lastName);
			}
		  });
		}
	  }, [currentUser]);
	return (
		<Layout>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{currentUser && 
					<Section>
						<Text>NAME: {username}!</Text>
						
						<Text>UUID: {currentUser.uid}</Text>
					</Section>
				}
				

				
			</View>
		</Layout>
	);
}
