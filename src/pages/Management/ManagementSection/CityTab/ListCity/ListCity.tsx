import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MainButton } from "../../../../../components/styled-components/StyledButton";
import { useGetAreaQuery } from "../../../../../redux/store/rtk-api/city-rtk/cityEndpoints";
import OneCity from "./OneCity";

const ListCity = () => {
  const { data, isSuccess, isLoading, isFetching, refetch } =
    useGetAreaQuery("");

  const handleRefetch = () => {
    refetch();
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Typography>Список Регионов</Typography>
        <MainButton onClick={handleRefetch} sx={{ width: "100px" }}>
          Обновить
        </MainButton>
      </Stack>

      {isLoading
        ? "Загрузка..."
        : isSuccess
        ? data.map((row) => <OneCity key={row.id} data={row} />)
        : "Ошибка при загрузки"}
    </Stack>
  );
};

export default ListCity;
