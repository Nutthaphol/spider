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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const theme = createTheme();

const GenusTable = (props) => {
  const { family, genus, detail, species, ToNext, id, ButtonStack } = props;

  const [selectGenus, setSelectGenus] = useState(0);

  const filterCountSpecies = (id) => {
    const genus_filter = detail
      .filter((item) => item.genus_id === id)
      .filter(
        (item, index, self) =>
          self
            .map((e) => {
              return e.species_id;
            })
            .indexOf(item.species_id) === index
      );

    const number = genus_filter.length;
    return number;
  };
  const handleOnChangeSelectGenus = (e) => {
    setSelectGenus(e.target.value);
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
                <InputLabel id="Type-Of-Genus" size="small">
                  Genus
                </InputLabel>
                <Select
                  label="Genus"
                  labelId="Type-Of-Genus"
                  onChange={(e) => handleOnChangeSelectGenus(e)}
                  value={selectGenus}
                  size="small"
                >
                  {genus &&
                    genus
                      .filter((item) => item.family_id == id)
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
              Family: {family && family.find((item) => item.id == id).name}
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
                  <TableCell>Genus</TableCell>
                  <TableCell align="left">Author</TableCell>
                  <TableCell align="left"> # species</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {console.log("detail", detail)}
                {detail &&
                  detail
                    // unique genus type
                    .filter(
                      (item, index, self) =>
                        self
                          .map((e) => {
                            return e.genus_id;
                          })
                          .indexOf(item.genus_id) === index
                    )
                    // filter genus of family
                    .filter((item) => item.family_id === id)
                    .filter((item) =>
                      selectGenus != 0 ? item.genus_id == selectGenus : true
                    )
                    .map((val, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <i>{val.genus}</i>
                        </TableCell>
                        <TableCell align="left">{val.author}</TableCell>
                        <TableCell align="left">
                          {filterCountSpecies(val.genus_id)}
                        </TableCell>
                        <TableCell>
                          <Link
                            sx={{
                              cursor: "pointer",
                            }}
                            onClick={() => ToNext("species", val.genus_id)}
                            underline="hover"
                          >
                            species
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledEngineProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default GenusTable;
