'use client'

import React, { useState, useEffect } from 'react'
import { TarotApiService, TarotCard } from '@/app/api/tarotApi'
import { RefreshCw, Loader2 } from 'lucide-react'
import styles from './TarotCardDisplay.module.scss'
import { useTranslations, useLocale } from 'next-intl'

interface TarotCardDisplayProps {
    autoDraw?: boolean
    showDetails?: boolean
    className?: string
}

const TarotCardDisplay: React.FC<TarotCardDisplayProps> = ({
                                                               autoDraw = false,
                                                               showDetails = true,
                                                               className = ''
                                                           }) => {
    const t = useTranslations('cardOfDay')
    const cards = useTranslations()
    const locale = useLocale()
    const [card, setCard] = useState<TarotCard | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const drawCard = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const newCard = await TarotApiService.getRandomCard()

            if (newCard) {
                const translatedCard = await translateCardData(newCard)
                setCard(translatedCard)
            } else {
                setError(t('error'))
            }
        } catch (err) {
            setError(t('apiError'))
            console.error('Error drawing card:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const translateCardData = async (card: TarotCard): Promise<TarotCard> => {
        if (locale === 'ru') {

            const cardTranslations = cards.raw('cards') as Record<string, any>

            if (cardTranslations) {

                const cardKey = Object.keys(cardTranslations).find(key => {
                    const translation = cardTranslations[key]
                    console.log('cardTranslations', cardTranslations)
                    console.log('translation', translation)
                    return translation?.name_short === card.name_short ||
                        translation?.name?.toLowerCase() === card.name.toLowerCase()
                })

                if (cardKey && cardTranslations[cardKey]) {
                    const translation = cardTranslations[cardKey]
                    return {
                        ...card,
                        name: translation.name || card.name,
                        name_short: translation.name_short || card.name_short,
                        meaning_up: translation.meaning_up || card.meaning_up,
                        meaning_rev: translation.meaning_rev || card.meaning_rev,
                        desc: translation.desc || card.desc
                    }
                }
            }

            return card
        }

        return card
    }

    const resetCard = () => {
        setCard(null)
        setError(null)
    }

    useEffect(() => {
        if (autoDraw && !card) {
            drawCard()
        }
    }, [autoDraw])

    if (error) {
        return (
            <div className={`${styles.container} ${className}`}>
                <div className={styles.error}>
                    <p> {t('notFound')}</p>
                    <button onClick={drawCard} className={styles.retryButton}>
                        {t('tryAgain')}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={`${styles.container} ${className}`}>
            {card ? (
                <div className={`${styles.card} ${card.reversed ? styles.reversed : ''}`}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardEmoji}>
                            {TarotApiService.getCardImage(card)}
                        </div>
                        <div className={styles.cardTitle}>
                            <h3 className={styles.cardName}>{card.name}</h3>

                        </div>
                    </div>

                    {showDetails && (
                        <div className={styles.cardDetails}>
                            <div className={styles.meaningSection}>
                                <h4>{t('meaning')}:</h4>
                                <p className={styles.meaningText}>
                                    {card.reversed ? card.meaning_rev : card.meaning_up}
                                </p>
                            </div>

                            <div className={styles.descriptionSection}>
                                <h4>{t('description')}:</h4>
                                <p className={styles.descriptionText}>{card.desc}</p>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.cardPlaceholder}>
                    <div className={styles.placeholderContent}>
                        <div className={styles.tarotSymbol}>🔮</div>
                    </div>
                </div>
            )}

            <div className={styles.controls}>
                {card ? (
                    <>
                        <button
                            onClick={drawCard}
                            disabled={isLoading}
                            className={styles.drawButton}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className={styles.spinner} />
                                    {t('cardLoading')}
                                </>
                            ) : (
                                <>
                                    <RefreshCw className={styles.buttonIcon} />
                                    {t('getNewCard')}
                                </>
                            )}
                        </button>
                        <button
                            onClick={resetCard}
                            className={styles.resetButton}
                        >
                            {t('resetCard')}
                        </button>
                    </>
                ) : (
                    <button
                        onClick={drawCard}
                        disabled={isLoading}
                        className={styles.drawButton}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className={styles.spinner} />
                                {t('cardLoading')}
                            </>
                        ) : (
                            <>
                                <div className={styles.buttonIcon}>🃏</div>
                                {t('getCard')}
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    )
}

export default TarotCardDisplay