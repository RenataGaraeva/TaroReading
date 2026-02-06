'use client'

import React, { useState, useEffect } from 'react'
import {Sparkles, Calendar, Clock, Sun } from 'lucide-react'
import TarotCardDisplay from '@/app/Components/TarotCardDisplay/TarotCardDisplay'
import styles from './page.module.scss'
import { useTranslations, useLocale } from 'next-intl'
import BackToHome from "@/app/Components/BackToHome/BackToHome";

const CardOfDayPage = () => {
    const t = useTranslations('cardOfDay')
    const commonT = useTranslations('common')
    const locale = useLocale()

    const getCurrentDate = () => {
        const now = new Date()
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
        return now.toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', options)
    }

    return (
        <div className={styles.cardOfDayPage}>
            <div className={styles.backgroundElements}>
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className={styles.floatingSymbol}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`
                        }}
                    >
                        {['✨', '🔮', '⭐', '☀️', '🌙'][i % 5]}
                    </div>
                ))}
            </div>

            <header className={styles.header}>
                <div className="container">
                    <BackToHome t={commonT} />
                    <div className={styles.titleContainer}>
                        <h1 className={styles.pageTitle}>
                            <Sparkles className={styles.titleIcon} />
                            {t('title')}
                        </h1>
                        <p className={styles.pageSubtitle}>{t('subtitle')}</p>

                        <div className={styles.dateInfo}>
                            <div className={styles.dateItem}>
                                <Calendar className={styles.dateIcon} />
                                <span>{getCurrentDate()}</span>
                            </div>
                            <div className={styles.dateItem}>
                                <Sun className={styles.dateIcon} />
                                <span>{t('cardTitle')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className={styles.mainContent}>
                <div className="container">
                    <div className={styles.contentWrapper}>
                        <div className={styles.tarotSection}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionTitle}>
                                    <Sparkles />
                                    {t('cardTitle')}
                                </h2>
                                <p className={styles.sectionDescription}>
                                    {t('cardInstruction')}
                                </p>
                            </div>

                            <div className={styles.cardContainer}>
                                <TarotCardDisplay
                                    autoDraw={false}
                                    showDetails={true}
                                    className={styles.tarotDisplay}
                                />
                            </div>

                            <div className={styles.instructions}>
                                <h3>
                                    <Sparkles/>
                                    {t('tipsTitle')}
                                </h3>
                                <ul>
                                    {t.raw('tips')?.map((tip: string, index: number) => (
                                        <li key={index}>{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className={styles.infoSidebar}>
                            <div className={styles.infoCard}>
                                <h4>
                                <Clock />
                                    {t('divinationTime.title')}
                                </h4>
                                <p>{t('divinationTime.description')}</p>
                            </div>

                            <div className={styles.infoCard}>
                                <h4>
                                    <Sparkles />
                                    {t('dayEnergy.title')}
                                </h4>
                                <p>{t('dayEnergy.description')}</p>
                            </div>

                            <div className={styles.infoCard}>
                                <h4>{t('dayJournal.title')}</h4>
                                <p>{t('dayJournal.description')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                <div className="container">
                    <p className={styles.footerText}>
                        {t('footer')}
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default CardOfDayPage