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
import { useAuth } from '../../AuthContext';
import { useSettings } from '../../SettingsContext';

function createData(id, serviceName, trigger, reaction, type, status, imageSrc) {
    return { id, serviceName, trigger, reaction, type, status, imageSrc };
}

const rows = [
    createData('1', 'Discord Spotify skipper', 'Discord', 'Running'),
    createData('2', 'Ya un tweet', 'Twitter', 'Paused'),
    createData('3', 'Sardoche est en live', 'Twitch', 'Idle'),
    createData('4', 'Service 4', 'Platform', 'Status'),
    createData('5', 'Service 5', 'Platform', 'Status'),
    createData('6', 'Service 6', 'Platform', 'Status'),
    createData('7', 'Service 7', 'Platform', 'Status'),
    createData('8', 'Service 8', 'Platform', 'Status'),
    createData('9', 'Service 9', 'Platform', 'Status'),
    createData('10', 'Service 10', 'Platform', 'Status'),
    createData('11', 'Service 11', 'Platform', 'Status'),
    createData('12', 'Service 12', 'Platform', 'Status'),
    createData('13', 'Service 13', 'Platform', 'Status'),
];

export default function ServicesDash() {
    const { t } = useSettings();
    const [tableData, setTableData] = useState(rows);
    const { getAllServices, getAutomations, deleteAutomation } = useAuth();

    useEffect(() => {
        const getAllAutomations = async () => {
            try {
                const result = await getAllServices();
                const userAutomations = await getAutomations();

                const automationsMap = {};

                userAutomations.forEach(automation => {
                    const triggerService = result.find(service => service.id === automation.trigger_service_id);
                    const reactionService = result.find(service => service.id === automation.reaction_service_id);

                    const trigger = triggerService.triggers.find(trigger => trigger.id === automation.trigger_id)?.name || 'Unknown Trigger';
                    const reaction = reactionService.reactions.find(reaction => reaction.id === automation.reaction_id)?.name || 'Unknown Reaction';

                    const automationData = createData(
                        automation.id,
                        triggerService.name,
                        trigger,
                        reaction,
                        'Automation',
                        'Status',
                        triggerService.icon
                    );
                    automationsMap[automation.id] = automationData;
                });
                const newData = Object.values(automationsMap);
                setTableData(newData);
            } catch (error) {
                console.error('Error fetching automations:', error);
            }
        };
        getAllAutomations();
    }, [getAllServices, getAutomations]);

    const handleDeleteAutomation = async (id) => {
        try {
            await deleteAutomation(id);
            const updatedTableData = tableData.filter(row => row.id !== id);
            setTableData(updatedTableData);
        } catch (error) {
            console.error('delete automation failed:', error);
        }
    };

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
                        <TableCell>{t("ID")}</TableCell>
                        <TableCell>{t("Services name")}</TableCell>
                        <TableCell>{t("Trigger")}</TableCell>
                        <TableCell>{t("Reaction")}</TableCell>
                        <TableCell>{t("Status")}</TableCell>
                        <TableCell>{t("Actions")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell {...TableCellChildrends}>{row.id}</TableCell>
                            <TableCell {...TableCellChildrends}>
                                <img
                                  src={process.env.REACT_APP_API_URL + row.imageSrc}
                                  alt="GitHub Logo"
                                  height="32"
                                  width="32"
                                  style={{ verticalAlign: 'middle', marginRight: '8px' }}
                                />
                                {row.serviceName}
                            </TableCell>
                            <TableCell {...TableCellChildrends}>{row.trigger}</TableCell>
                            <TableCell {...TableCellChildrends}>{row.reaction}</TableCell>
                            <TableCell {...TableCellChildrends}>{row.status}</TableCell>
                            <TableCell {...TableCellChildrends}>
                                <IconButton style={{ color: TableCell.defaultProps.style.color }} aria-label="play">
                                    <PlayCircleOutlineIcon />
                                </IconButton>
                                <IconButton style={{ color: TableCell.defaultProps.style.color }} aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteAutomation(row.id)} style={{ color: TableCell.defaultProps.style.color }} aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div style={{ height: '100px' }}></div>
        </TableContainer>
    );
}