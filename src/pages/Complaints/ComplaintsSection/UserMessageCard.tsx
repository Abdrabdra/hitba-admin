import React, {useEffect, useState} from "react";
import {Box, Button, Divider, Grid, Stack, Typography} from "@mui/material";
// @ts-ignore
import userPhoto from "../../../assets/images/peoplePhoto.jpeg";
import {useNavigate} from "react-router-dom";
import OneUserMessage from "./OneUserMessage";
import {
    setOneUserMessageVisibility
} from "../../../redux/store/reducers/complaint/complaint.slice";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../../redux/store";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";

import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {StyledBodyCell, StyledBodyCellFirst, StyledBodyRow} from "../../Users/MainUser/ListUser/ListUser.style";

interface IMessage {
    id: number,
    img: string,
    userName: string,
    statusDescription: string,
    time: string
}


const UserMessageCard = React.memo(() => {


    const complaintData = useTypedSelector(state => state.complaint)

    const rows = [
        {
            text: 'Кто подал жалобу:',
            description: complaintData ? `${complaintData.reporter.firstName!==null?complaintData?.reporter?.firstName:''} ${complaintData.reporter.secondName!==null?complaintData?.reporter?.secondName:''} ${complaintData.reporter.middleName!==null?complaintData?.reporter?.middleName:''}` : ""
        },
        {
            text: 'Сообщение на которое было подана жалоба:',
            description: complaintData ? complaintData?.messageText : ""
        },
        {
            text: 'Комментарий к жалобе:',
            description: complaintData ? complaintData?.comment : ""
        }
    ]

    // const isHideOneMessage = useTypedSelector(state => state.complaint.isOneUserMessage)
    //
    // const navigate = useNavigate()
    // const bottomRef = React.useRef<HTMLDivElement>(null);
    //
    // const [messageData, setMessageData] = useState<IMessage>()
    //
    // const dispatch = useDispatch()

    // useEffect(()=>{
    //     dispatch(setOneUserMessageVisibility(true))
    // },[])


    // const showMessagePageWithData = (message: IMessage) => {
    //     setMessageData(message)
    //     dispatch(setOneUserMessageVisibility(false))
    //
    // }
    //
    // const scrollToBottom = () => {
    //     if (bottomRef.current) {
    //         bottomRef.current.scrollIntoView({
    //             behavior: "smooth",
    //             block: "start",
    //         });
    //     }
    //
    // };
    //
    //
    // useEffect(() => {
    //     scrollToBottom()
    // }, [])


    return (
        <>
            {/*{*/}
            {/*    !isHideOneMessage&&messageData ? <OneUserMessage message={messageData}/> :*/}
            {/*        <Box sx={{*/}
            {/*            backgroundColor: "primary.light",*/}
            {/*            overflowY: 'scroll',*/}
            {/*            scrollBehavior: 'smooth',*/}
            {/*            height: "94%"*/}
            {/*        }}>*/}
            {/*            {messages.map(message => {*/}
            {/*                    if (isHideOneMessage) {*/}

            {/*                        return <Grid container key={message.id} sx={{border: "5px solid #fff", cursor:"pointer", '&:hover': {*/}
            {/*                                // border: "1px solid black",*/}


            {/*                            },}}*/}
            {/*                                     onClick={() => showMessagePageWithData(message)}>*/}
            {/*                            <Grid item xs={1.8}><img src={message.img ? message.img : userPhoto}*/}
            {/*                                                     alt="user avatar"*/}
            {/*                                                     style={{*/}
            {/*                                                         width: "60px",*/}
            {/*                                                         height: "60px",*/}
            {/*                                                         border: "10px solid #E4FFF9"*/}
            {/*                                                     }}*/}
            {/*                            /></Grid>*/}
            {/*                            <Grid item xs={9.2} sx={{padding: "10px 0px"}}>*/}
            {/*                                <Typography*/}
            {/*                                    sx={{*/}
            {/*                                        fontSize: "20px",*/}
            {/*                                        fontWeight: "800",*/}
            {/*                                        marginTop: "5px"*/}
            {/*                                    }}>{message.userName}</Typography>*/}
            {/*                                <Typography sx={{*/}
            {/*                                    fontSize: "12px",*/}
            {/*                                    fontWeight: "200",*/}
            {/*                                    marginTop: "5px",*/}
            {/*                                    color: "#B1B1B1"*/}
            {/*                                }}>{message.statusDescription}</Typography>*/}
            {/*                            </Grid>*/}
            {/*                            <Grid item xs={1} sx={{*/}
            {/*                                fontSize: "12px",*/}
            {/*                                fontWeight: "600",*/}
            {/*                                marginTop: "15px",*/}
            {/*                                color: "#999999"*/}
            {/*                            }}>{message.time}</Grid>*/}

            {/*                        </Grid>*/}
            {/*                    }*/}


            {/*                }*/}
            {/*            )}*/}
            {/*            <div ref={bottomRef}></div>*/}
            {/*        </Box>*/}
            {/*}*/}

            {/*<Box>*/}
            {/*    <Typography sx={{fontSize: '20px', fontWeight: '400', color: "primary.main", marginBottom: "10px"}}>*/}
            {/*        Кто подал жалобу:*/}
            {/*        <b>{complaintData && `${complaintData?.reporter?.firstName} ${complaintData?.reporter?.secondName} ${complaintData?.reporter?.middleName}`}</b></Typography>*/}

            {/*    <Typography sx={{fontSize: '20px', fontWeight: '400', color: "primary.main", marginBottom: "10px"}}>Сообщение на которое было подана жалоба: <b>{complaintData && complaintData.messageText}</b></Typography>*/}

            {/*    <Typography sx={{fontSize: '20px', fontWeight: '400', color: "primary.main",}}>Комментарий к*/}
            {/*        жалобе: <b>{complaintData && complaintData.comment}</b></Typography>*/}
            {/*</Box>*/}

            <TableContainer component={Box}>
                <Table
                    sx={{minWidth: 650, boxShadow: "none"}}
                    aria-label="simple table"
                >
                    <TableHead sx={{position: "relative"}}>
                        <Divider
                            sx={{
                                ml: "17px",
                                position: "absolute",
                                width: "calc(100% - 32px)",
                                backgroundColor: "primary.main",
                            }}
                        />
                    </TableHead>

                    <TableBody sx={{backgroundColor: "red"}}>
                        {/* .filter(name => name.includes(search)) */}
                        {/* .filter(name => name.match(new RegExp(search, "i"))) */}
                        {/* .filter((row) =>
              Object.values(row).some(
                (val) => typeof val === "string" && val.includes(`${search}`)
              )
            ) */}
                        {rows.map((row) => (
                            <StyledBodyRow key={row.description}>
                                <StyledBodyCellFirst>{row.text}</StyledBodyCellFirst>
                                <StyledBodyCell>{row.description}</StyledBodyCell>
                                {/*<StyledBodyCell>{row.status}</StyledBodyCell>*/}
                                {/*<StyledBodyCell>{row.complains}</StyledBodyCell>*/}
                                {/*<StyledBodyCellLast>*/}
                                {/*    */}
                                {/*</StyledBodyCellLast>*/}
                            </StyledBodyRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{backgroundColor: "primary.light", width: "100%", height: "20px"}}></Box>


        </>

    )
})

export default UserMessageCard