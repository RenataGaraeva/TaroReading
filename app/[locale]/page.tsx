'use client'

import NavButtons from '../Components/NavButtons/NavButtons'
import styles from '../page.module.scss'
import LanguageSwitcher from "@/app/Components/LanguageSwitcher/LanguageSwitcher";
import {useEffect, useState} from "react";
import { useTranslations, useLocale } from 'next-intl';

const Home = () => {
    const t = useTranslations('home');
    const locale = useLocale();
    const [mounted, setMounted] = useState(false);

    console.log('Current locale:', locale);
    console.log('Translation for title:', t('title'));
    console.log('Translation for sectionDescription:', t('sectionDescription'));

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className={styles.homePage}>
                <header className={styles.header}>
                    <div className="container">
                        <div className={styles.titleContainer}>
                            <h1 className={styles.title}>
                                <span className={styles.titleMain}>Эзотерический</span>
                                <span className={styles.titleSub}>Оракул</span>
                            </h1>
                        </div>
                    </div>
                </header>
            </div>
        );
    }

    return (
        <div className={styles.homePage}>
            <header className={styles.header}>
                <div className="container">
                    <div className={styles.headerTop}>
                        <LanguageSwitcher/>
                    </div>
                    <h1 className={styles.title}>{t('title')}</h1>
                    <p className={styles.subtitle}>{t('tagline')}</p>
                </div>
            </header>

            <main className="main-content">
                <div className="container">
                    <div className={styles.welcomeSection}>
                        <h2 className={styles.sectionTitle}>{t('sectionTitle')}</h2>
                        <p className={styles.sectionDescription}>
                            {t('sectionDescription')}
                        </p>
                        <NavButtons />
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                <div className="container">
                    <p>{t('footer')}</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;