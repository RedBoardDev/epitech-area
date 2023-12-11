import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { PauseCircleOutline } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function createData(id, name, type, status) {
    return { id, name, type, status };
}

const rows = [
    createData('1', 'Discord Spotify skipper', 'Discord', 'Running'),
    createData('2', 'Ya un tweet', 'Twitter', 'Paused'),
    createData('3', 'Sardoche est en live', 'Twitch', 'Idle'),
];

export default function ServicesDash() {
    const [tableData, setTableData] = useState(rows);

    useEffect(() => {
        // Ici, nous allons mettre à jour le tableau avec les données de l'API
        // Mettons à jour les données de la table ici
        // setTableData(newData);
    }, []);

    TableCell.defaultProps = {
        style: { fontSize: '1.2rem', color: '#4B4E6D' }
    };

    let TableCellChildrends = {
        style: { fontSize: '1rem', color: 'black' }
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell {...TableCellChildrends}>{row.id}</TableCell>
                            <TableCell {...TableCellChildrends}>{row.name}</TableCell>
                            <TableCell {...TableCellChildrends}>{row.type}</TableCell>
                            <TableCell {...TableCellChildrends}>{row.status}</TableCell>
                            <TableCell {...TableCellChildrends}>
                                <IconButton style={{ color: TableCell.defaultProps.style.color }} aria-label="play">
                                    <PlayCircleOutlineIcon />
                                </IconButton>
                                <IconButton style={{ color: TableCell.defaultProps.style.color }} aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                                <IconButton style={{ color: TableCell.defaultProps.style.color }} aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}