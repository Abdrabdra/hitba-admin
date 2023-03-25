import React from 'react';
import {Box, Button, Divider, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useTypedSelector} from "./../../../redux/store";
import complaint, {
    setButtonVisibility,
    setOneUserMessageVisibility
} from "./../../../redux/store/reducers/complaint/complaint.slice";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import styled from "@emotion/styled";
import {useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";

import TableBody from "@mui/material/TableBody";
import {
    StyledBodyCellFirstStaff, StyledBodyCellLastStaff, StyledBodyCellStaff,
    StyledBodyRowStaff,
    StyledHeadCellStaff,
    StyledHeadRowStaff
} from "./StaffTable/StyledHeadStaff";
import {
    useGetMyBlockedProfilesByIdQuery,
    useGetMyBlockedProfilesQuery
} from "../../../redux/store/rtk-api/staff-rtk/staffEndpoints";
import OneUserMessage from "../../Complaints/ComplaintsSection/OneUserMessage";
// @ts-ignore
import userPhoto from "../../../assets/images/peoplePhoto.jpeg";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ComplainedData from "../../Complaints/ComplaintsSection/ComplainedData";
import Paper from "@mui/material/Paper";


const message = {
    id: 1,
    img: "",
    userName: "Asel",
    statusDescription: "была в сети 1 час назад",
    time: "12:32"
}

const StyledButton = styled(Button)({
    background: "#E4FFF9",
    color: "primary.main",
    height: "30px",
    margin: "10px auto"

});

function createData(
    user: string,
    reason: string,
) {
    return {user, reason};
}

const rows = [
    createData("Арман Есжанов", "Оскорбление пользователя не цензцрной лексикой"),
    createData("Еркын Алимов", "Оскорбление пользователя не цензцрной лексикой"),
    createData("Айнур Канатова", "Оскорбление пользователя не цензцрной лексикой"),
    createData("Алмас Арманов", "Оскорбление пользователя не цензцрной лексикой"),
    createData("Айбек Омаров", "Оскорбление пользователя не цензцрной лексикой"),


];


const BlockedUsersList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isPrevBtn = useTypedSelector(state => state.complaint.isShowPrevButton)
    const {id: workerId, position, iin} = useTypedSelector(state => state.staff)
    const {data: myBlockedUsers, isLoading, isError} = useGetMyBlockedProfilesByIdQuery(workerId as number)

    if (myBlockedUsers) {
       //  console.log(myBlockedUsers)
       //  console.log(myBlockedUsers[0]?.avatar?.image)

    }


    const hideButton = () => {
        dispatch(setButtonVisibility(false));
        dispatch(setOneUserMessageVisibility(true))
    }

    return (

        <Box sx={{backgroundColor: "#fff", margin: "20px auto", padding: "10px", height: "400px"}}>
            <Grid container alignItems="center">
                <Grid item xs={3.5}><Typography sx={{
                    color: "primary.main",
                    fontWeight: "800",
                    marginBottom: "20px"
                }}>Список заблокированных</Typography>
                </Grid>
            </Grid>
            <Box sx={{display: "flex"}}>
                {myBlockedUsers && myBlockedUsers.length > 0 ? myBlockedUsers.map((profile: any, ind: number) =>
                        // <Box sx={{backgroundColor: "primary.light",display:"flex", alignItems:"center" }} key={ind}>
                        //     <img src={"0be3da61-af4d-4804-b7e9-fbcd42d0c932.jpg"} style={{border:"1px solid black"}} alt=""/>
                        //     <Typography>{profile.firstName&&`${profile.firstName}`}</Typography>
                        //     <Typography component={"span"}>{profile.secondName&&`${profile.secondName}`}</Typography>
                        //     <Typography component={"span"}>{profile?.middleName&&`${profile.middleName}`}</Typography>
                        // </Box>
                        <TableContainer>
                            <Table sx={{minWidth: 650, backgroundColor: "primary.light", borderRadius: "10px",}}
                                   aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">№</TableCell>
                                        <TableCell align="center">Имя</TableCell>
                                        <TableCell align="center">Фамилия</TableCell>
                                        <TableCell align="center">Отчество</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{marginBottom: '10px',}}>
                                    <TableRow
                                        component={Paper}
                                        key={ind}
                                        sx={{
                                            borderBottom: "20px solid #E4FFF9",
                                            backgroundColor: "primary.light",
                                            borderRadius: "10px"
                                        }}
                                    >
                                        <TableCell align="center">
                                            <Typography sx={{
                                                color: "primary.main",
                                                fontWeight: 600
                                            }}>{ind + 1}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography sx={{
                                                color: "primary.main",
                                                fontWeight: 600
                                            }}>{profile?.firstName}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography sx={{

                                                color: "primary.main",
                                                fontWeight: 600
                                            }}>{profile?.secondName}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography sx={{
                                                color: "primary.main",
                                                fontWeight: 600
                                            }}>{profile?.middleName}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )


                    :
                    <Typography sx={{alignItems: "center"}}>Пока что нет заблокированных пользователей</Typography>}
            </Box>

            {/*Эти строки кода нужны, я пока что убрал потому что нет апишки*/}
            {/*<TableContainer component={Box} sx={{maxHeight:"350px"}}>*/}
            {/*    <Table*/}
            {/*        sx={{ minWidth: 450, boxShadow: "none", backgroundColor:"#fff" }}*/}
            {/*        aria-label="simple table"*/}
            {/*    >*/}
            {/*        <TableHead sx={{ position: "relative" }}>*/}
            {/*            <StyledHeadRowStaff>*/}
            {/*                <StyledHeadCellStaff>Пользователи</StyledHeadCellStaff>*/}
            {/*                <StyledHeadCellStaff>Причина блокирования</StyledHeadCellStaff>*/}
            {/*            </StyledHeadRowStaff>*/}
            {/*        </TableHead>*/}

            {/*        <TableBody>*/}
            {/*            {rows.map((row) => (*/}
            {/*                <StyledBodyRowStaff key={row.user}>*/}
            {/*                    <StyledBodyCellFirstStaff>{row.user}</StyledBodyCellFirstStaff>*/}
            {/*                    <StyledBodyCellStaff>{row.reason}</StyledBodyCellStaff>*/}
            {/*                    <StyledBodyCellLastStaff>*/}
            {/*                        <Button*/}
            {/*                            sx={{*/}
            {/*                                width: "140px",*/}
            {/*                                height: "40px",*/}
            {/*                                background: "#fff",*/}
            {/*                                borderRadius: "10px",*/}
            {/*                                "&:hover": {*/}
            {/*                                    background: "rgba(35, 152, 171, 1)",*/}
            {/*                                },*/}
            {/*                            }}*/}
            {/*                        >*/}
            {/*                            <Typography*/}
            {/*                                sx={{*/}
            {/*                                    color: "primary.main",*/}
            {/*                                    fontSize: "18px",*/}
            {/*                                    fontWeight: "700",*/}
            {/*                                    textTransform: "capitalize",*/}
            {/*                                }}*/}
            {/*                            >*/}
            {/*                                Подробнее*/}
            {/*                            </Typography>*/}
            {/*                        </Button>*/}
            {/*                    </StyledBodyCellLastStaff>*/}
            {/*                </StyledBodyRowStaff>*/}
            {/*            ))}*/}
            {/*        </TableBody>*/}
            {/*    </Table>*/}
            {/*</TableContainer>*/}

        </Box>
    );
};


export default BlockedUsersList;