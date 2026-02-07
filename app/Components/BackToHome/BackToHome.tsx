import {ArrowLeft} from "lucide-react";
import {Link} from "@/i18n/navigation";
import styles from './BackToHome.module.scss'

interface BackToHomeProps {
    t: (key: string) => string; // тип для функции перевода
}

export default function BackToHome ({t}: BackToHomeProps){
    return (<Link href="/" className={styles.backButton}>
        <ArrowLeft />
        {t('backToHome')}
    </Link>
    )
}