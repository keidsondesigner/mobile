import { StatusBar } from 'expo-status-bar';

import { NativeBaseProvider, Text, Center, VStack } from 'native-base';

export default function App() {
  return (
		<NativeBaseProvider>
			<Center 
				flex={1}
				bgColor="tertiary.900"
			>
				<Text color="white" fontSize={20}>
					Hello Word!
				</Text>
				<StatusBar style="auto" />
			</Center>
		</NativeBaseProvider>
  );
}