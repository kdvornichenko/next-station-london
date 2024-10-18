import { supabase } from '@/utils/supabase/client'
import { getCardComponentByName } from './getCardComponentByName'

// Функция сброса карт и раунда
export const refreshCards = async (
	roomName: string | null,
	roundsCounter: number,
	allCardNames: string[],
	addConsoleMessage: (message: JSX.Element) => void,
	setSelectedCards: React.Dispatch<React.SetStateAction<JSX.Element[]>>,
	setAvailableCards: React.Dispatch<React.SetStateAction<JSX.Element[]>>,
	setRedCardsCounter: React.Dispatch<React.SetStateAction<number>>,
	setIsRoundOver: React.Dispatch<React.SetStateAction<boolean>>,
	setRoundsCounter: React.Dispatch<React.SetStateAction<number>>,
	Card: any
) => {
	if (!roomName || roundsCounter === undefined) return

	const newRound = roundsCounter + 1

	const { error } = await supabase
		.from('rooms')
		.update({
			round: newRound,
			used_cards: [],
			red_cards_count: 0,
		})
		.eq('name', roomName)

	if (error) {
		addConsoleMessage(
			<span className='text-danger'>
				Ошибка обновления раунда и сброса карт: {error.message}
			</span>
		)
		return
	}

	// Обновляем локальные состояния
	setSelectedCards([])
	setAvailableCards(
		allCardNames
			.map(cardName => getCardComponentByName(cardName))
			.filter((card): card is JSX.Element => card !== null)
	)
	setRedCardsCounter(0) // сброс локального счётчика красных карт
	setIsRoundOver(false)

	addConsoleMessage(<span>Раунд {newRound} начался </span>)
	setRoundsCounter(newRound)
}
