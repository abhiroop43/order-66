import type {Metadata} from 'next';
import {Montserrat, Fira_Mono} from 'next/font/google';
import './globals.css';
import {Providers} from './providers';
import Header from "@/components/header";

const montserrat = Montserrat({
    variable: '--font-montserrat',
    subsets: ['latin'],
});

const firaMono = Fira_Mono({
    variable: '--font-fira-mono',
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
    title: 'Order 66',
    description: 'A simple Task Management App for your next projects',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="light">
        <body className={`${montserrat.variable} ${firaMono.variable} antialiased`}>
        <Providers>
            <Header/>
            <div className="container mx-auto px-4 max-w-6xl">
                {children}
            </div>
        </Providers>
        </body>
        </html>
    );
}
