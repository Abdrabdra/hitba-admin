import * as React from 'react';
import {Button, CircularProgress, Grid, Typography} from "@mui/material";
import styled from "@emotion/styled";

// @ts-ignore
import userPhoto from "./../../../assets/images/peoplePhoto.jpeg"
import {useNavigate} from "react-router-dom";


import {
    useChangeComplaintStatusMutation,
    useGetComplaintsQuery
} from "../../../redux/store/rtk-api/complaint-rtk/complaintEndpoints";
import ComplainedDataPart from "./ComplainedDataPart";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

const StyledButton1 = styled(Button)({

    width: '160px',
    height:'35px',
    borderRadius: '5px',
    color: "#fff",
    backgroundColor: "primary.main",
    '&:hover': {
        border: "1px solid #2398AB",
        color: "primary.main"
    },
    textTransform:"lowercase"
});

const StyledButton2 = styled(Button)({

    width: '160px',
    height:'35px',
    borderRadius: '5px',
    color: "red",
    border: "1px solid red",
    '&:hover': {
        backgroundColor: "red",
        color: "#fff"
    },
    textTransform:"lowercase"
});

type Props = {
    searchedName: string
    activeValue: string
}

const ComplainedData: React.FC<Props> = React.memo(({searchedName, activeValue}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {data: complaints, isLoading, isError, refetch} = useGetComplaintsQuery("")



    // if (complaints){
    //     // eslint-disable-next-line array-callback-return
    //     complaints?.complaints.map(complaint=>{
    //         if (complaint?.culprit?.block?.block){
    //           changeComplaintStatus({id:complaint.id, status:"COMPLETED"})
    //         }
    //
    //     })
    // }
    // console.log(complaints)
    // console.log("complaints")
    // if (complaints){
    //     complaints.map((complaint,ind)=>{
    //
    //
    //     })
    // }
    useEffect(() => {
        refetch()
    }, [])


    return (
        <>
            {isLoading && <CircularProgress/>}
            {complaints && complaints?.complaints.map((complaint) => {
                    if (searchedName && complaint.culprit.firstName && complaint.culprit.firstName.toLowerCase().includes(searchedName.toLowerCase())
                        || searchedName && complaint.culprit.secondName && complaint.culprit.secondName.toLowerCase().includes(searchedName.toLowerCase())) {
                        return <ComplainedDataPart complaint={complaint} activeValue={activeValue}/>
                    } else if (!searchedName) {
                        return <ComplainedDataPart complaint={complaint} activeValue={activeValue}/>
                    } else return
                }
            )}
        </>
    );
});


export default ComplainedData;

