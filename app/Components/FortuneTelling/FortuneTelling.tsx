'use client'

import React, { useState, useEffect } from 'react'
import {Heart, DollarSign, Briefcase, Sparkles, Coins, Target, TrendingUp, Award, X } from 'lucide-react'
import styles from './FortuneTelling.module.scss'
import { useTranslations } from 'next-intl'
import BackToHome from "@/app/Components/BackToHome/BackToHome";

export type TarotTheme = 'money' | 'love' | 'career'

interface TarotPageProps {
    theme: TarotTheme
}

const FortuneTelling: React.FC<TarotPageProps> = ({ theme }) => {
    const t = useTranslations(`${theme}`)
    const commonT = useTranslations('common')
    const [isStarted, setIsStarted] = useState(false)
    const [showPrediction, setShowPrediction] = useState(false)
    const [elements, setElements] = useState<Array<{id: number; x: number; y: number}>>([])
    const [prediction, setPrediction] = useState('')

    const predictions = t.raw('predictions') as string[]

    const getThemeConfig = () => {
        switch (theme) {
            case 'money':
                return {
                    title: t('title'),
                    subtitle: t('subtitle'),
                    backgroundElements: '💰',
                    flyingElements: '💰',
                    backgroundCount: 15,
                    flyingCount: 20,
                    themeIcon: <DollarSign />,
                    predictionIcon: <TrendingUp />,
                    symbols: [
                        <Coins key="coins1" />,
                        <DollarSign key="dollar" />,
                        <TrendingUp key="trend" />,
                        <Coins key="coins2" />
                    ]
                }
            case 'love':
                return {
                    title: t('title'),
                    subtitle: t('subtitle'),
                    backgroundElements: '❤️',
                    flyingElements: '❤️',
                    backgroundCount: 20,
                    flyingCount: 15,
                    themeIcon: <Heart />,
                    predictionIcon: <Sparkles />,
                    symbols: [
                        <span key="heart1">♡</span>,
                        <span key="moon">☾</span>,
                        <span key="sun">☼</span>,
                        <span key="heart2">♡</span>
                    ]
                }
            case 'career':
                return {
                    title: t('title'),
                    subtitle: t('subtitle'),
                    backgroundElements: '⭐',
                    flyingElements: '⭐',
                    backgroundCount: 25,
                    flyingCount: 15,
                    themeIcon: <Briefcase />,
                    predictionIcon: <Award />,
                    symbols: [
                        <Briefcase key="briefcase" />,
                        <Target key="target" />,
                        <TrendingUp key="trend" />,
                        <Award key="award" />
                    ]
                }
            default:
                return {} as any
        }
    }

    const config = getThemeConfig()

    const generateElements = () => {
        const newElements = []
        for (let i = 0; i < config.flyingCount; i++) {
            newElements.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100
            })
        }
        setElements(newElements)
    }

    const handleStart = () => {
        setIsStarted(true)
        generateElements()

        setTimeout(() => {
            const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)]
            setPrediction(randomPrediction)
            setShowPrediction(true)
        }, 2000)
    }

    const handleReset = () => {
        setIsStarted(false)
        setShowPrediction(false)
        setElements([])
        setPrediction('')
    }

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isStarted && !showPrediction) {
            const animationSpeed = theme === 'money' ? 1 : theme === 'love' ? 0.5 : 0.75
            interval = setInterval(() => {
                setElements(prev => prev.map(element => ({
                    ...element,
                    x: (element.x + Math.random() * 2 - 1) % 100,
                    y: (element.y + animationSpeed) % 100
                })))
            }, 100)
        }
        return () => clearInterval(interval)
    }, [isStarted, showPrediction, theme])

    const getButtonIcon = () => {
        switch (theme) {
            case 'money': return <Coins className={styles.buttonIcon} />
            case 'love': return <Heart className={styles.buttonIcon} />
            case 'career': return <Target className={styles.buttonIcon} />
        }
    }

    const getStartButtonText = () => {
        switch (theme) {
            case 'money': return commonT('openTreasure')
            case 'love': return commonT('startReading')
            case 'career': return commonT('startJourney')
        }
    }

    const getShareButtonText = () => {
        switch (theme) {
            case 'money': return commonT('savePrediction')
            case 'career': return commonT('saveGoal')
            case 'love': return commonT('copyPrediction')
        }
    }

    return (
        <div className={styles.tarotPage} data-theme={theme}>
            <div className={styles.backgroundElements}>
                {Array.from({ length: config.backgroundCount }).map((_, i) => (
                    <div
                        key={i}
                        className={styles.backgroundElement}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            transform: `scale(${0.3 + Math.random() * 0.7})`
                        }}
                    >
                        {config.backgroundElements}
                    </div>
                ))}
            </div>

            {isStarted && elements.map(element => (
                <div
                    key={element.id}
                    className={styles.flyingElement}
                    style={{
                        left: `${element.x}%`,
                        top: `${element.y}%`,
                        animationDelay: `${Math.random() * 2}s`
                    }}
                >
                    {config.flyingElements}
                </div>
            ))}

            <header className={styles.header}>
                <div className="container">
                    <BackToHome t={commonT} />
                    <div className={styles.titleContainer}>
                        <h1 className={styles.pageTitle}>
                            {config.themeIcon}
                            {config.title}
                        </h1>
                        <p className={styles.pageSubtitle}>{config.subtitle}</p>
                    </div>
                </div>
            </header>

            <main className={styles.mainContent}>
                <div className="container">
                    <div className={styles.tarotSection}>
                        <div
                            className={`${styles.tarotCard} ${isStarted ? styles.cardActive : ''} ${showPrediction ? styles.cardGlowing : ''}`}
                        >
                            <div className={styles.cardContent}>
                                {showPrediction ? (
                                    <>
                                        <div className={styles.predictionHeader}>
                                            {config.predictionIcon}
                                            <h3>{t('predictionTitle')}</h3>
                                        </div>
                                        <p className={styles.predictionText}>{prediction}</p>
                                        <div className={styles.symbolsContainer}>
                                            {config.symbols.map((symbol: string, index: number) => (
                                                <div key={index} className={styles.symbol}>
                                                    {symbol}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className={styles.cardSymbol}>
                                            {config.backgroundElements}
                                        </div>
                                        <h3 className={styles.cardTitle}>{t('cardTitle')}</h3>
                                        <p className={styles.cardInstruction}>
                                            {isStarted ? t('cardLoading') : t('cardInstruction')}
                                        </p>
                                    </>
                                )}
                            </div>

                            <div className={styles.cardGlow}></div>
                            <div className={styles.cardEffects}>
                                {Array.from({ length: theme === 'money' ? 12 : theme === 'love' ? 8 : 3 }).map((_, i) => (
                                    <div key={i} className={styles.effect}></div>
                                ))}
                            </div>
                        </div>

                        {!isStarted ? (
                            <button
                                onClick={handleStart}
                                className={styles.startButton}
                            >
                                {getButtonIcon()}
                                {getStartButtonText()}
                            </button>
                        ) : (
                            <div className={styles.actions}>
                                <button
                                    onClick={handleReset}
                                    className={styles.resetButton}
                                >
                                    {theme === 'love' ? (
                                        <>
                                            <X className={styles.resetIcon} />
                                            {commonT('tryAgain')}
                                        </>
                                    ) : commonT('newPrediction')}
                                </button>

                                {showPrediction && (
                                    <button
                                        onClick={() => navigator.clipboard.writeText(prediction)}
                                        className={styles.shareButton}
                                    >
                                        {getShareButtonText()}
                                    </button>
                                )}
                            </div>
                        )}

                        <div className={styles.tipsSection}>
                            <h3>
                                <Sparkles />
                                {t('tipsTitle')}
                            </h3>
                            <ul>
                                {t.raw('tips')?.map((tip: string, index: number) => (
                                    <li key={index}>{tip}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                <div className="container">
                    <p>{t('footer')}</p>
                </div>
            </footer>
        </div>
    )
}

export default FortuneTelling