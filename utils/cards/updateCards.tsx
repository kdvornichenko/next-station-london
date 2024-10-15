import { getCardComponentByName } from './getCardComponentByName'

export const updateCards = (
	usedCards: string[],
	setSelectedCards: React.Dispatch<React.SetStateAction<JSX.Element[]>>,
	setAvailableCards: React.Dispatch<React.SetStateAction<JSX.Element[]>>,
	allCardNames: string[]
) => {
	const mappedCards = usedCards
		.map(getCardComponentByName)
		.filter((card): card is JSX.Element => card !== null) // Фильтруем null значения

	setSelectedCards(mappedCards)

	const availableCardNames = allCardNames.filter(
		cardName => !usedCards.includes(cardName)
	)
	const availableCards = availableCardNames
		.map(getCardComponentByName)
		.filter((card): card is JSX.Element => card !== null) // Фильтруем null значения

	setAvailableCards(availableCards)
}
