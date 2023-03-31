import { useIntl } from "react-intl";

export function formatCurrency(value: number, language?: string): string {
    const intl = useIntl();
    const currentLanguage = language ?? intl.locale;

    const formatter = new Intl.NumberFormat(currentLanguage, {
        style: "currency",
        currency: currentLanguage === "en" ? "USD" : "BRL",
        minimumFractionDigits: 2,
    });

    let formattedValue = formatter.format(value);

    if (currentLanguage === "en") {
        const exchangeRate = 0.24;
        const valueInDollar = value * exchangeRate;
        formattedValue = formatter.format(valueInDollar);
    }

    return formattedValue;
}
