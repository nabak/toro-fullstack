import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LanguageIcon from "@mui/icons-material/Language";

interface Props {
    toggleTheme: () => void;
    toggleLanguage: () => void;
}

export default function Header({ toggleTheme, toggleLanguage }: Props) {
    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6">Toro Investimentos</Typography>
                <IconButton
                    color="inherit"
                    onClick={toggleTheme}
                    sx={{ ml: "auto" }}
                >
                    <Brightness4Icon />
                </IconButton>
                <IconButton color="inherit" onClick={toggleLanguage}>
                    <LanguageIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
