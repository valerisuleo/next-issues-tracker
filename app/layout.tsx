import AuthProvider from './auth/context/provider';
import NavbarComponent from './common/navbar/navbar';
import './global.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <NavbarComponent></NavbarComponent>
                    <main
                        className="container py-5"
                        style={{ minHeight: '100vh' }}
                    >
                        {children}
                    </main>
                </AuthProvider>
            </body>
        </html>
    );
}
