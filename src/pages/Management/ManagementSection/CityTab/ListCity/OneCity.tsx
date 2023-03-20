import { Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import BaseAccordion from "../../../../../components/BaseAccordion/StepperAccordion";
import { MainButton } from "../../../../../components/styled-components/StyledButton";
import { IGetCityResponse } from "../../../../../redux/store/rtk-api/city-rtk/city.type";
import {
  useDeleteAreaMutation,
  useDeleteCityMutation,
  useGetCityQuery,
} from "../../../../../redux/store/rtk-api/city-rtk/cityEndpoints";

import CreateCity from "../CreateCity";

interface Props {
  data: IGetCityResponse;
}

const OneCity: FC<Props> = ({ data }) => {
  const { data: cities } = useGetCityQuery(data.id);

  const [deleteArea] = useDeleteAreaMutation();
  const [deleteCity] = useDeleteCityMutation();

  const handleDeleteArea = () => {
    deleteArea({ id: data.id });
  };

  const handleDeleteCity = (id: number) => {
    deleteCity({ id: id });
  };

  return (
    <BaseAccordion summary={data.value}>
      <Stack spacing={2}>
        <MainButton
          onClick={handleDeleteArea}
          sx={{ width: "225px", alignSelf: "center", height: "100px" }}
        >
          Удалить {data.value}
        </MainButton>

        <CreateCity id={data.id} />

        <Stack>
          {cities &&
            cities.map((row) => (
              <Stack
                key={row.id}
                direction="row"
                justifyContent="space-between"
                spacing={2}
              >
                <Stack>
                  <Stack direction="row" spacing={1}>
                    <Typography>Артикул: </Typography>
                    <Typography>{row.id}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Typography>Название: </Typography>
                    <Typography>{row.value}</Typography>
                  </Stack>
                </Stack>

                <MainButton
                  onClick={() => handleDeleteCity(row.id)}
                  sx={{ width: "90px" }}
                >
                  Удалить
                </MainButton>
              </Stack>
            ))}
        </Stack>
      </Stack>
    </BaseAccordion>
  );
};

export default OneCity;
