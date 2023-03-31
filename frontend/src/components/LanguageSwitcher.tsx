import React, { useState } from "react";
import { useIntl, IntlProvider } from "react-intl";
import messages from "../strings";

interface LanguageSwitcherProps {
    defaultLanguage: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
    defaultLanguage,
}: LanguageSwitcherProps) => {
    const [language, setLanguage] = useState<string>(defaultLanguage);
    const intl = useIntl();
    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage);
    };

    return (
        <div>
            <button onClick={() => handleLanguageChange("en")}>
                {intl.formatMessage({ id: "english" })}
            </button>
            <button onClick={() => handleLanguageChange("pt")}>
                {intl.formatMessage({ id: "portuguese" })}
            </button>
            <IntlProvider
                locale={language}
                messages={messages[language as keyof typeof messages]}
            >
                <h1>{intl.formatMessage({ id: "title" })}</h1>
            </IntlProvider>
        </div>
    );
};

export default LanguageSwitcher;
