import { CoinData } from 'BitCloverV2/src/types/Home'
import React from 'react'
import { View, Text, StyleSheet, Pressable, Image } from 'react-native'

const HomeCoinInfo = ({coinInfo}: {coinInfo: CoinData}) => {
	return (
		<Pressable style={styles.horizontalFlatListContainer}>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={{uri: coinInfo.image}} />
				<Text style={styles.horizontalFlatListTitle} numberOfLines={2}>
					{coinInfo.name}
				</Text>
			</View>
			<View>
				<Text style={styles.horizontalFlatListText} numberOfLines={2}>
					{coinInfo.current_price.toFixed(2)} {coinInfo.name}
				</Text>
				<Text
					style={[styles.priceText, {color: coinInfo.price_change_24h > 0 ? 'green' : 'red'}]}>
					{coinInfo.price_change_24h > 0 ? '+' : ''}
					{coinInfo.price_change_percentage_24h.toFixed(3)}%
				</Text>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		height: 21,
		width: 21,
		marginRight: 4,
	},
	imageContainer: {
		flexDirection: 'row',
		marginRight: 5,
		height: '35%',
	},
	horizontalFlatListTitle: {
		color: 'white',
		fontSize: 15,
		fontWeight: 'bold',
		paddingLeft: 3,
		flex: 1,
	},
	horizontalFlatListContainer: {
		backgroundColor: '#495f6b',
		borderRadius: 15,
		height: 130,
		margin: 9,
		overflow: 'hidden',
		padding: 10,
		width: 130,
		elevation: 20,
	},
	horizontalFlatListText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '700',
		paddingTop: 10,
	},
	priceText: {
		fontSize: 16,
		fontWeight: '700',
	},
	sectionTitle: {
		color: 'white',
		fontSize: 23,
		fontStyle: 'italic',
		fontWeight: 'bold',
		padding: 10,
	},
})


export default HomeCoinInfo