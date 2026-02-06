'use client'

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTransition } from 'react';
import styles from './LanguageSwitcher.module.scss';
import { Globe, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
] as const;

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);

    const currentLanguage = languages.find(lang => lang.code === locale);

    const handleLanguageChange = (langCode: string) => {
        startTransition(() => {
            router.replace(pathname, { locale: langCode });
        });
        setIsOpen(false);
    };

    return (
        <div className={styles.languageSwitcher}>
            <button
                className={styles.switcherButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Switch language"
                aria-expanded={isOpen}
                disabled={isPending}
            >
                <Globe className={styles.globeIcon} />
                <span className={styles.languageText}>
          {currentLanguage?.flag} {currentLanguage?.name}
        </span>
                <ChevronDown className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div
                        className={styles.dropdownBackdrop}
                        onClick={() => setIsOpen(false)}
                    />
                    <div className={styles.dropdown}>
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                className={`${styles.dropdownItem} ${locale === lang.code ? styles.active : ''}`}
                                onClick={() => handleLanguageChange(lang.code)}
                            >
                                <span className={styles.flag}>{lang.flag}</span>
                                <span className={styles.name}>{lang.name}</span>
                                {locale === lang.code && (
                                    <div className={styles.checkmark}>✓</div>
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}