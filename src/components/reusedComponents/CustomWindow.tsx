import React, {useEffect} from "react";
import {Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import CustomAlert from "./CustomAlert";
import {setComplainedStatus} from "../../redux/store/reducers/complaint/complaint.slice";
import {useDispatch} from "react-redux";

type PropsType = {
    label?:string
    isWindowOpen:boolean,
    isLoading:boolean,
    isError:boolean,
    isSuccess:boolean,
    closeWindow():void,
    submitData?():void,
    blockUser?(id:number):void,
    blockUserId?:number | null,
    complaintStatus?:string,
    complaintId?:number | null,
    changeComplaint?(data:any):void,
    updateProfile?():void
}


const CustomWindow:React.FC<PropsType> = ({isWindowOpen,isLoading,isError,isSuccess,closeWindow,submitData, label="",blockUser,blockUserId, complaintStatus, complaintId, changeComplaint,updateProfile}) => {

    let data = {}

    if (complaintStatus&&complaintId&&changeComplaint){
        data = {
            id:complaintId,
            status:complaintStatus
        }
    }
    const dispatch = useDispatch()

    useEffect(()=>{
        if (isSuccess&&blockUser&&blockUserId&&changeComplaint){
            data = {
                id:complaintId,
                status:"COMPLETED"
            }
            changeComplaint(data)
            dispatch(setComplainedStatus("COMPLETED"))
        }
    },[isSuccess])

    // if (isSuccess&&blockUser&&blockUserId&&changeComplaint){
    //     data = {
    //         id:complaintId,
    //         status:"COMPLETED"
    //     }
    //     changeComplaint(data)
    // }

    // const handleBlockUser = () => {
    //
    // }



    return(
        <Dialog
            open={isWindowOpen}
            sx={{width:"1000px", color:"red"}}
        >
            {isLoading && <CircularProgress/>}
            {isError &&<CustomAlert title="Ошибка" status="error"
                                               message={"Возникла неизвестная ошибка!"}/>}{ isSuccess && <CustomAlert title="Успешно" status="success" message="Операция успешно выполнено"/>}

            <DialogTitle id="alert-dialog-title">
                <CloseIcon sx={{float: 'right', cursor: 'pointer'}} onClick={closeWindow}/>

            </DialogTitle>

            <DialogContent sx={{textAlign: 'center', overflow:"hidden"}}>
                <Typography sx={{marginBottom: 3, fontWeight: 'bold'}}>{label}</Typography>
                <form>

                    <Box sx={{textAlign: 'center', marginBottom: '50px'}}>


                        {submitData&&<Button variant="contained"
                                 color="primary"
                                 size="large"
                                 sx={{width: 100, height: 30, marginTop: 1, textTransform: 'lowercase'}}
                                 onClick={submitData}
                        >
                            Ок
                        </Button>}
                        {blockUser&&blockUserId&&<Button variant="contained"
                                             color="primary"
                                             size="large"
                                             sx={{width: 150, height: 30, marginTop: 1, textTransform: 'lowercase'}}
                                             onClick={()=>{blockUser(blockUserId)}}>
                            Заблокировать
                        </Button>}
                        {complaintStatus&&complaintId&&changeComplaint&&<Button variant="contained"
                                                         color="primary"
                                                         size="large"
                                                         sx={{width: 150, height: 30, marginTop: 1, textTransform: 'lowercase'}}
                                                         onClick={()=>{changeComplaint(data)}}>
                            Отклонить
                        </Button>}
                        {updateProfile&&<Button variant="contained"
                                             color="primary"
                                             size="large"
                                             sx={{width: 100, height: 30, marginTop: 1, textTransform: 'lowercase'}}
                                             onClick={updateProfile}
                        >
                            Ок
                        </Button>}
                        <Button variant="contained"
                                color="inherit"
                                size="large"
                                sx={{width: 100, height: 30, marginTop: 1, textTransform:'lowercase', marginLeft:"10px"}}
                                onClick={closeWindow}
                        >
                            Отмена
                        </Button>
                    </Box>
                </form>


            </DialogContent>


        </Dialog>
    )
}

export default CustomWindow