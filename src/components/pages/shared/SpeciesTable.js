import React, { useState, useEffect } from "react";

import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";

import makeStyles from "@mui/styles/makeStyles";

import {
  Box,
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const theme = createTheme();

const SpeciesTable = ({
  genus,
  species,
  detail,
  id,
  location,
  ButtonStack,
}) => {
  const [selectSpecies, setSelectSpecies] = useState(0);

  const handleOnChangeSelectSpecies = (e) => {
    setSelectSpecies(e.target.value);
  };
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" component={`div`}>
              Filter type
            </Typography>
            <Box sx={{ flexGrow: 0.02 }} />
            <Box sx={{ width: 160 }}>
              <FormControl fullWidth>
                <InputLabel id="Type-Of-Species" size="small">
                  Species
                </InputLabel>
                <Select
                  label="Species"
                  labelId="Type-Of-Species"
                  onChange={(e) => handleOnChangeSelectSpecies(e)}
                  value={selectSpecies}
                  size="small"
                >
                  {species &&
                    species
                      .filter((item) => item.genus_id == id)
                      .map((val, index) => (
                        <MenuItem key={index} value={val.id}>
                          {val.name}
                        </MenuItem>
                      ))}
                  <MenuItem value={0}>All</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <br />
          <br />
          <Box display="flex" alignItems="center" sx={{ marginBottom: "10px" }}>
            <Typography variant="h5">
              Genus: {genus && genus.find((item) => item.id == id).name}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <ButtonStack />
          </Box>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "none",
              border: "1px solid #B3B6B7",
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Species</TableCell>
                  <TableCell align="left">Author</TableCell>
                  <TableCell align="left">Location</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detail &&
                  detail
                    .filter((item) => item.genus_id === id)
                    .filter((item) =>
                      selectSpecies != 0
                        ? item.species_id == selectSpecies
                        : true
                    )
                    .map((val, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <i>{`${val.genus} ${val.species}`}</i>
                        </TableCell>
                        <TableCell align="left">{val.author}</TableCell>
                        <TableCell align="left">
                          {location &&
                            location.find((item) => item.detail_id == val.id)
                              .locality}
                        </TableCell>
                        <TableCell align="left">
                          <Link
                            href={"detail/" + val.id}
                            sx={{
                              cursor: "pointer",
                            }}
                            underline="hover"
                          >
                            detail
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                {/* {species &&
                  species
                    .filter((item) => item.genus_id == id)
                    .map((val, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <i>
                            {genus && genus.find((item) => item.id == id).name}{" "}
                            {val.name}
                          </i>
                        </TableCell>
                        <TableCell align="center">
                          {detail &&
                            detail
                              // .slice(0, 1)
                              .find(
                                (item) =>
                                  item.species_id == val.id &&
                                  item.genus_id == id
                              ).author}
                        </TableCell>

                        <TableCell align="center">
                          <Link
                            href={`detail/${val.id}`}
                            sx={{
                              cursor: "pointer",
                            }}
                          >
                            detail
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledEngineProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default SpeciesTable;
