import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useIntl } from "react-intl";
import { fetchPositions } from "../services/positionsService";
import { UserPositionData } from "../types/UserPositionDataType";
import { formatCurrency } from "@/utils/formatCurrency";

interface Props {
    userId: number;
}

interface Column {
    id: keyof UserPositionData["positions"][0];
    label: string;
    align?: "right";
}

export default function PositionsList({ userId = 1 }: Props) {
    const [data, setData] = useState<UserPositionData | null>(null);
    const intl = useIntl();

    const columns: Column[] = [
        { id: "symbol", label: intl.formatMessage({ id: "symbol" }) },
        { id: "amount", label: intl.formatMessage({ id: "amount" }) },
        {
            id: "currentPrice",
            label: intl.formatMessage({ id: "currentPrice" }),
        },
    ];

    useEffect(() => {
        const getData = async () => {
            const positionsData = await fetchPositions(userId);
            setData(positionsData);
        };
        getData();
    }, [userId]);

    const handleDelete = (index: number) => {
        setData((prevData) => {
            if (!prevData) {
                return null;
            }
            const newData = { ...prevData };
            newData.positions.splice(index, 1);
            return newData;
        });
    };

    if (!data) {
        return <div>{intl.formatMessage({ id: "loading" })}...</div>;
    }

    return (
        <div>
            <h1>{intl.formatMessage({ id: "userPositionTitle" })}</h1>
            <p>
                {`${intl.formatMessage({
                    id: "checkingAccountAmount",
                })}: ${formatCurrency(data.checkingAccountAmount)}`}
            </p>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align}>
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell align="right">
                                {intl.formatMessage({ id: "action" })}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.positions.map((position, index) => (
                            <TableRow key={position.symbol}>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                    >
                                        {column.id === "currentPrice"
                                            ? formatCurrency(
                                                  position[column.id]
                                              )
                                            : position[column.id]}
                                    </TableCell>
                                ))}
                                <TableCell align="right">
                                    <IconButton
                                        onClick={() => handleDelete(index)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br></br>
            <Typography variant="subtitle1">
                <strong>{`${intl.formatMessage({
                    id: "consolidated",
                })}: `}</strong>
                {formatCurrency(data.consolidated)}
            </Typography>
        </div>
    );
}
