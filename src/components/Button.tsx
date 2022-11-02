import { Button as ButtonNativeBase, Text, IButtonProps} from 'native-base';

interface Props extends IButtonProps {
	title: string;
	type?: 'PRIMARY' | 'DANGER';
}

export function Button( {title, type = 'PRIMARY', ...rest }: Props){
	return (
		<ButtonNativeBase
			w="full"
			h={14}
			rounded="sm"
			fontSize="md"
			textTransform="uppercase"
			bg={type === 'DANGER' ? 'red.500' : 'yellow.500'}
			_pressed={{
				bg: type === 'DANGER' ? 'red.600' : 'green.600'
			}}
			_loading={{
				_spinner: { color: 'black'}
			}}
		{...rest}>
			<Text
				fontSize="sm"
				fontFamily="heading"
				color={type === 'DANGER' ? 'white' : 'black'}
			>
				{title}
			</Text>
		</ButtonNativeBase>
	);
};