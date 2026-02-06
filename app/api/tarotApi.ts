export interface TarotCard {
    name: string
    name_short: string
    value: string
    value_int: number
    suit: 'major' | 'cups' | 'wands' | 'swords' | 'pentacles'
    type: 'major' | 'minor'
    meaning_up: string
    meaning_rev: string
    desc: string
    reversed?: boolean
}

export interface TarotResponse {
    cards: TarotCard[]
}

export class TarotApiService {

private static API_URL = process.env.NEXT_PUBLIC_TAROT_API_URL

    static async getRandomCard(): Promise<TarotCard | null> {
        try {
            console.log('Fetching random tarot card...')
            const response = await fetch(`${this.API_URL}/cards/random`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`)
            }

            const data: TarotResponse = await response.json()

            if (!data.cards || data.cards.length === 0) {
                throw new Error('No cards received from API')
            }

            const card = data.cards[0]
            console.log('Card received:', card.name)

            return {
                ...card,
                reversed: Math.random() > 0.5
            }
        } catch (error) {
            console.error('Error fetching tarot card:', error)
            return null
        }
    }

    static getCardImage(card: TarotCard): string {

        const emojiMap: Record<TarotCard['suit'], string> = {
            'major': '🔮',
            'cups': '💧',
            'wands': '🔥',
            'swords': '⚔️',
            'pentacles': '💰'
        }

        return emojiMap[card.suit] || '🃏'
    }
}