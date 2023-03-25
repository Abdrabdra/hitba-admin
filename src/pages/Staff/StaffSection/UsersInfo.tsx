import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Grid, Stack, Typography} from "@mui/material";
import styled from "@emotion/styled";
// @ts-ignore
import {ReactComponent as UserPhoto} from "./../../../assets/svg/Vectorusercomplaintsava.svg";
import {useNavigate} from "react-router-dom";
import {useTypedSelector} from "../../../redux/store";
import {useBlockWorkerMutation, useGetOneStaffQuery} from "../../../redux/store/rtk-api/staff-rtk/staffEndpoints";
import {useDispatch} from "react-redux";
import {setMoreInfoForOneStaff} from "../../../redux/store/reducers/staff/staff.slice";
import CustomWindow from "../../../components/reusedComponents/CustomWindow";
import {convertDate} from "../../../components/reusedComponents/commonFunctions";


const StyledBoldTypography = styled(Typography)({
    fontSize: '15px',
    fontWeight: '800',
    color: "primary.main",

});
const StyledTypography = styled(Typography)({
    fontSize: '13px',
    color: "primary.main",

});

export const MyStyledButton = styled(Button)({
    width: "120px",
    textTransform: "capitalize",
    fontSize: "12px",
    fontWeight: "600"
});


const UsersInfo = () => {
    const navigate = useNavigate()
    const [isWindowOpen, setWindowOpen] = useState(false)
    const {id: workerId, position, iin} = useTypedSelector(state => state.staff)
    const {data: oneWorkerData, isLoading, isError, isSuccess, refetch} = useGetOneStaffQuery(workerId as number)
    const [blockWorker, {
        isLoading: blockLoading,
        isError: blockError,
        isSuccess: blockSuccess
    }] = useBlockWorkerMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        refetch()
    }, [])


    if (oneWorkerData) {
        dispatch(setMoreInfoForOneStaff(oneWorkerData))
    }

    if (oneWorkerData){
        // console.log(oneWorkerData?.block?.block)
        // console.log("oneWorkerData?.block?.block")
    }
    const texts = [
        {
            firstText: "Номер телефона",
            description: oneWorkerData ? oneWorkerData?.user?.phone : ""
        },
        {
            firstText: "Дата рожения",
            description: oneWorkerData ? convertDate(oneWorkerData?.date) : ""
        },
        {
            firstText: "должность",
            description: position === "WORKER" ? "Администратор" : ""
        },
        {
            firstText: "ID",
            description: iin ? iin : ""
        },
    ]


    return (
        <>
            {isWindowOpen &&
                <CustomWindow closeWindow={() => setWindowOpen(false)} isWindowOpen={isWindowOpen} isError={blockError}
                              isSuccess={blockSuccess} isLoading={blockLoading}
                              label={"Вы действительно хотите заблокировать сотрудника?"} blockUser={blockWorker}
                              blockUserId={workerId as number}
                />}
            {isLoading && <CircularProgress/>}
            {isError && <div>Произошла неизвестная ошибка</div>}
            <Box sx={{padding: "15px", backgroundColor: "#fff", margin: "20px auto"}}>
                <Grid container>
                    <Grid container xs={6}>
                        <Grid sx={{backgroundColor: "#E2E2E2"}}><UserPhoto
                            style={{width: 60, height: 60, color: "#fff", border: "30px solid #E2E2E2"}}/></Grid>
                        <Grid sx={{margin: '5px 20px'}}>
                            <StyledTypography>Информация о сотруднике</StyledTypography>
                            <Typography sx={{
                                margin: "10px auto",
                                fontSize: '20px',
                                color: "primary.main",
                                fontWeight: '800'
                            }}>{oneWorkerData && oneWorkerData.firstName} {oneWorkerData && oneWorkerData.secondName}</Typography>
                            <Stack direction={"row"} spacing={2} sx={{marginTop: "20px"}}>
                                {/*<MyStyledButton sx={{color: "primary.main", backgroundColor: "primary.light"}}*/}
                                {/*                onClick={() => navigate('edit')}>Редактировать</MyStyledButton>*/}
                                {(oneWorkerData && oneWorkerData?.block?.block === false) ?
                                    <MyStyledButton sx={{color: "#FD4444", backgroundColor: "#FFEFEF"}}
                                                    onClick={() => setWindowOpen(true)}>Заблокировать</MyStyledButton> :
                                    <Typography sx={{color: "red"}}>Сотрудник заблокирован!</Typography>}
                            </Stack>

                        </Grid>
                    </Grid>

                    <Grid container xs={6}>
                        {texts.map((text, ind) => <InfoBlock description={text.description}
                                                             textData={text.firstText}/>)}
                    </Grid>

                </Grid>

            </Box>
        </>

    );
};

type PropsType2 = {
    textData: string,
    description: string,

}

const InfoBlock: React.FC<PropsType2> = React.memo(({textData, description}) => {
    return (
        <Grid item xs={4}>
            <StyledTypography sx={{fontSize: '13px', color: "primary.main",}}>{textData}</StyledTypography>
            <StyledBoldTypography
                sx={{fontSize: '15px', fontWeight: '800', color: "primary.main",}}>{description}</StyledBoldTypography>
        </Grid>
    )
})


export default UsersInfo;