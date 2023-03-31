import { Card, CardContent } from "@mui/material";
import PositionsList from "./PositionsList";

export default function PositionsCard() {
    return (
        <Card sx={{ boxShadow: 4 }}>
            <CardContent>
                <PositionsList userId={1}/>
            </CardContent>
        </Card>
    );
}
