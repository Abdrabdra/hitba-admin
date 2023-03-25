import {Box, Button, CircularProgress, Grid, IconButton, ListItem, ListItemText, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React, {FC, useEffect, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import {
    useDeleteHadithMutation,
    useGetHadithesListQuery
} from "../../../../../redux/store/rtk-api/hadis-rtk/hadithEndpoints";
import {IHadithesListResponse} from "../../../../../redux/store/rtk-api/hadis-rtk/hadith.type";
import RemoveWindow from "../../HobbyTab/ListHobby/RemoveWindow";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";


const HadithList = () => {
    const navigate = useNavigate()
    const {hadithId} = useParams()
    const {
        data: hadithes,
        isLoading: isLoading,
        isError: isError,
        refetch
    } = useGetHadithesListQuery(hadithId ? +hadithId : 1)
    const [deleteHadith, {
        isLoading: removeLoading,
        isError: removeError,
        isSuccess: removeSuccess,
        error: removeErrorMessage
    }] = useDeleteHadithMutation()
    const [isOpen, setOpen] = useState(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [isAlert, setAlert] = useState(false)
    const handleDelete = () => {
        setAlert(true)
        deleteId && deleteHadith(deleteId).then((res: any) => {
            refetch()
        })
    }
    useEffect(() => {
        refetch()
    })

    return (
        <>
            {isLoading && <CircularProgress/>}
            {isError && <div>Произошла ошибка!</div>}
            {isOpen && <RemoveWindow closeWindow={() => {
                setOpen(false)
                setAlert(false)
            }} isWindowOpen={isOpen} isSuccess={removeSuccess}
                                     isLoading={removeLoading}
                                     isError={removeError} label={`Вы действительно хотите удалить хадис?`}
                                     handleFunction={handleDelete} error={
                // @ts-ignore
                removeErrorMessage?.data?.message} isAlert={isAlert}/>}
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Typography sx={{fontSize: "20px", mb: "5px", color: "primary.main", fontWeight: 400}}>Список
                    всех хадисов</Typography>
                <Button
                    variant="contained"
                    sx={{width: "160px", height: "45px", fontSize: "12px"}}
                    endIcon={<AddIcon/>}
                    onClick={() => {
                        navigate(`/app/management/hadith/create`, {
                            state: {
                                id: hadithId
                            }
                        })
                    }}

                >
                    Создать хадис
                </Button>
            </Box>
            <Grid container direction={"column"}>
                {hadithes && hadithes.map((item: IHadithesListResponse, ind: number) => {
                    return <Grid item key={ind} sx={{width: "500px", borderBottom: "1px solid #2398AB"}}>
                        <ListItem
                            secondaryAction={
                                <>
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon onClick={() => {
                                            setOpen(true)
                                            setDeleteId(item.id)
                                        }} sx={{color: "primary.main", mr: "20px"}}
                                        />
                                    </IconButton>
                                    <Button
                                        sx={{
                                            width: "100px",
                                            height: "30px",
                                            background: "rgba(35, 152, 171, 0.3)",
                                            borderRadius: "5px",
                                            "&:hover": {
                                                background: "rgba(35, 152, 171, 1)",
                                            },
                                        }}
                                        onClick={() => navigate(`/app/management/hadith/description/${item.id}`)}
                                    >
                                        <Typography
                                            sx={{
                                                color: "#fff",
                                                fontSize: "14px",
                                                fontWeight: "700",
                                                textTransform: "capitalize"
                                            }}
                                        >
                                            Подробнее
                                        </Typography>
                                    </Button>

                                </>
                            }
                        >
                            <ListItemText
                                primary={`${ind + 1}. ${item.title}`}
                                sx={{color: "primary.main", fontSize: "20px", fontWeight: 400,}}
                            />
                        </ListItem>
                    </Grid>
                })}
            </Grid>
        </>

    );
};

export default HadithList;
