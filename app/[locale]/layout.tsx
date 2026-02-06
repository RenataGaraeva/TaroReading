import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.scss'
import StoreProvider from '../store/provider'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Эзотерический Оракул',
    description: 'Гадания и предсказания в современном стиле',
}

type Props = {
    children: React.ReactNode;
    params: { locale: string };
};

export default async function RootLayout({
                                             children,
                                             params: { locale }
                                         }: Props) {
    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body className={inter.className}>
        <StoreProvider>
            <NextIntlClientProvider messages={messages}>
                {children}
            </NextIntlClientProvider>
        </StoreProvider>
        </body>
        </html>
    )
}