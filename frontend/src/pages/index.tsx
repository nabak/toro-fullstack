import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PositionsList from "@/components/PositionsList";
import { Card, CardContent, Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import { darkTheme, lightTheme } from "../themes";
import type { FC } from "react";
import { IntlProvider } from "react-intl";
import messages from "../strings";

const themes = {
    dark: createTheme(darkTheme),
    light: createTheme(lightTheme),
};

const Home: FC = () => {
    const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");
    const [currentLanguage, setCurrentLanguage] = useState("pt");

    const toggleTheme = () => {
        setCurrentTheme(currentTheme === "light" ? "dark" : "light");
    };
    const toggleLanguage = () => {
        setCurrentLanguage(currentLanguage === "en" ? "pt" : "en");
    };

    return (
        <ThemeProvider theme={themes[currentTheme]}>
            <IntlProvider locale={currentLanguage} messages={messages[currentLanguage]}>
                <Header
                    toggleTheme={toggleTheme}
                    toggleLanguage={toggleLanguage}
                />
                <Container sx={{ mt: 4 }} maxWidth="md">
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <PositionsList userId={1} />
                        </CardContent>
                    </Card>
                </Container>
                <Footer />
            </IntlProvider>
        </ThemeProvider>
    );
};

export default Home;
