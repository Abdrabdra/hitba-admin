import { Box, Button, Stack, Typography } from "@mui/material";
import CreateCity from "./CreateCity";
import ListCity from "./ListCity";

const CityTab = () => {
  return (
    <Box>
      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontSize: "25px",
            mb: "15px",
            color: "primary.main",
            fontWeight: 600,
          }}
        >
          Город
        </Typography>
      </Stack>

      <Stack spacing={2}>
        <CreateCity />
        <ListCity />
      </Stack>
    </Box>
  );
};

export default CityTab;
