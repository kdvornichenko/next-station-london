// cardsUtils.ts
export const getCardComponentByName = (cardName: string, Card: any): JSX.Element | null => {
    const [color, type] = cardName.includes('.') ? cardName.split('.') : [cardName, null]

    switch (color) {
        case 'Branch':
            return <Card.Branch/>
        case 'Blue': {
            if (type && type in Card.Blue) {
                const Component = Card.Blue[type as keyof typeof Card.Blue]
                return <Component />
            } else {
                console.error(`Неизвестный тип карты для Blue: ${type}`)
                return null
            }
        }
        case 'Red': {
            if (type && type in Card.Red) {
                const Component = Card.Red[type as keyof typeof Card.Red]
                return <Component data-card-red />
      } else {
                console.error(`Неизвестный тип карты для Red: ${type}`)
                return null
            }
        }
        default:
            console.error(`Неизвестное имя карты: ${cardName}`)
            return null
    }
}


