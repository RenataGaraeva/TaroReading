'use client'

import React from 'react'
import {Link} from '@/i18n/navigation'
import { Sparkles, Heart, DollarSign, Briefcase } from 'lucide-react'
import styles from './NavButtons.module.scss'
import { useDispatch } from 'react-redux'
import { setSelectedCategory } from '../../store/store'
import { useTranslations } from 'next-intl'

const NavButtons = () => {
    const dispatch = useDispatch()
    const t = useTranslations('nav');

    const handleButtonClick = (category: string) => {
        dispatch(setSelectedCategory(category))
    }

    const buttons = [
        {
            title: t('cardOfDay.title'),
            path: "/card-of-day",
            icon: Sparkles,
            description: t('cardOfDay.description'),
        },
        {
            title: t('love.title'),
            path: "/love",
            icon: Heart,
            description: t('love.description'),
        },
        {
            title: t('money.title'),
            path: "/money",
            icon: DollarSign,
            description: t('money.description'),
        },
        {
            title: t('career.title'),
            path: "/career",
            icon: Briefcase,
            description: t('career.description'),
        }
    ]

    return (
        <div className={styles.navButtons}>
            {buttons.map((button) => {
                const Icon = button.icon
                return (
                    <Link
                        key={button.title}
                        href={button.path}
                        className={styles.navButton}
                        onClick={() => handleButtonClick(button.title)}
                    >
                        <div className={styles.buttonContent}>
                            <Icon className={styles.icon} />
                            <h3 className={styles.buttonText}>{button.title}</h3>
                            <p className={styles.description}>{button.description}</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default NavButtons