import { Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import { FC } from "react";
import { MainButton } from "../../../../../components/styled-components/StyledButton";
import { StyledInput } from "../../../../../components/styled-components/StyledInput";
import {
  useCreateAreaMutation,
  useCreateCityMutation,
} from "../../../../../redux/store/rtk-api/city-rtk/cityEndpoints";

interface Props {
  id?: number;
}

const CreateCity: FC<Props> = ({ id }) => {
  const [create] = useCreateAreaMutation();
  const [createCity] = useCreateCityMutation();

  return (
    <Stack>
      <Typography>Добавить {id ? "город" : "регион"}</Typography>

      <Formik
        initialValues={{ region: "" }}
        onSubmit={(values) => {
          if (id) {
            createCity({ value: values.region, areaId: id });
          } else {
            create({ value: values.region });
          }
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Stack
              direction={"row"}
              spacing={2}
              sx={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <StyledInput
                value={values.region}
                onChange={handleChange}
                name={"region"}
              />
              <MainButton sx={{ width: "120px" }} type="submit">
                Добавить
              </MainButton>
            </Stack>
          </form>
        )}
      </Formik>
    </Stack>
  );
};

export default CreateCity;
