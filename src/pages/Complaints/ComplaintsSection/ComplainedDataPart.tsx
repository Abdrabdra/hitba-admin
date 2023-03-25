import {IComplaint} from "../../../redux/store/rtk-api/complaint-rtk/complaint.type";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import {Button, Grid, Typography} from "@mui/material";
// @ts-ignore
import userPhoto from "../../../assets/images/peoplePhoto.jpeg";
import styled from "@emotion/styled";
import {useDispatch} from "react-redux";
import {setComplainedUserData} from "../../../redux/store/reducers/complaint/complaint.slice";

type PropsType = {
    complaint: IComplaint
    activeValue: string
}

const StyledButton1 = styled(Button)({

    width: '160px',
    height: '35px',
    borderRadius: '5px',
    color: "#fff",
    backgroundColor: "primary.main",
    '&:hover': {
        border: "1px solid #2398AB",
        color: "primary.main"
    },
    textTransform: "lowercase"
});

const StyledButton2 = styled(Button)({

    width: '160px',
    height: '35px',
    borderRadius: '5px',
    color: "red",
    border: "1px solid red",
    '&:hover': {
        backgroundColor: "red",
        color: "#fff"
    },
    textTransform: "lowercase"
});

const colors = {
    NEW: "black",
    CANCELED: "red",
    COMPLETED: "green",
    MODERATION: "blue"
}

const complaintStatus = {
    NEW: "Не просмотрено",
    MODERATION: "В процессе",
    COMPLETED: "Завершено",
    CANCELED: "Откланено"
}

const ComplainedDataPart: React.FC<PropsType> = ({complaint, activeValue}) => {


//     const {data: userData, isLoading, isError} = useGetOneProfileQuery(String(complaint?.culprit?.id ))
    return (
        <>
            {
                activeValue === "Не обработанные" && complaint.status === "NEW" &&
                <ComplaintListPart complaint={complaint} activeValue={activeValue}/>
            }
            {
                activeValue === "Обработанные" && complaint.status !== "NEW" &&
                <ComplaintListPart complaint={complaint} activeValue={activeValue}/>
            }
            {
                activeValue === "Весь список" &&
                <ComplaintListPart complaint={complaint} activeValue={activeValue}/>
            }
        </>


    )
}

type PropsType2 = {
    complaint: IComplaint
    activeValue: string
}

const ComplaintListPart: React.FC<PropsType2> = ({complaint}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleSetUserData = (data: IComplaint) => {
        if (data && data.culprit) {
            dispatch(setComplainedUserData(data))
        }
        navigate('user')
    }

    return <TableRow
        component={Paper}
        key={complaint.culprit.id}
        sx={{borderBottom: "20px solid #E4FFF9"}}
    >
        <TableCell align="left">
            <Grid container alignItems="center">
                {/*<Grid><img src={userPhoto} alt="user" style = {{width:'50px', height:'50px'}}/></Grid>*/}
                <Grid><Typography sx={{
                    marginLeft: "5px",
                    color: "primary.main",
                    fontWeight: 600
                }}>{`${complaint.culprit.firstName} ${complaint.culprit.secondName}`}</Typography></Grid>
            </Grid>
        </TableCell>
        <TableCell align="left">
            {complaint.status !== "NEW" ? <div style={{
                    display: "flex", color: "white", width: "180px",
                    height: "40px",
                    borderRadius: "5px",
                    backgroundColor: "#2398AB",
                    border: "1px solid #2398AB", alignItems: "center", justifyContent: "center"
                }}>Обработан
                </div> :
                <div style={{
                    display: "flex", color: "red", width: "180px",
                    height: "40px",
                    borderRadius: "5px",
                    border: "1px solid #F40000", alignItems: "center", justifyContent: "center"
                }}>Не обработан
                </div>}

        </TableCell>
        <TableCell align="left"><Typography
            sx={{color: "primary.main"}}>{complaint.text}</Typography></TableCell>
        <TableCell align="right" sx={{
            color: (colors as any)[complaint.status],
            fontSize: '16px'
        }}>{(complaintStatus as any)[complaint.status]}
        </TableCell>
        <TableCell align="right">
            <Grid container spacing={0.5}>
                <Grid item xs={12}><StyledButton1 variant="contained" onClick={() => {
                    handleSetUserData(complaint)
                }}>Подробнее</StyledButton1></Grid>
            </Grid>
        </TableCell>
    </TableRow>
}

export default ComplainedDataPart