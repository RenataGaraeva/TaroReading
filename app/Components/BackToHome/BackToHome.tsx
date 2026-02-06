import {ArrowLeft} from "lucide-react";
import {Link} from "@/i18n/navigation";
import styles from './BackToHome.module.scss'
export default function BackToHome ({t}){
    return (<Link href="/" className={styles.backButton}>
        <ArrowLeft />
        {t('backToHome')}
    </Link>
    )
}