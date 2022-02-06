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
import themplates from "./theme";

const theme = createTheme(themplates);

const useStyles = makeStyles(() => ({
  textFilter: {
    fontWeight: "600",
  },

  table: {
    boxShadow: "none",
    borderRadius: "4px",
    border: "1px solid #AEAEAE",
  },
  paperTable: {
    boxShadow: "none",
    padding: "1rem",
    position: "relative",
    overflow: "scroll",
  },
  headerText: {
    fontWeight: "600",
    fontSize: "18px",
    borderBottom: "none",
  },
  cellTable: {
    borderBottom: "none",
  },
}));

const SpeciesTable = ({
  genus,
  species,
  detail,
  id,
  location,
  ButtonStack,
  province,
  district,
}) => {
  const [selectSpecies, setSelectSpecies] = useState(0);
  const classes = useStyles();

  const handleOnChangeSelectSpecies = (e) => {
    setSelectSpecies(e.target.value);
  };
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <Box
            sx={{
              width: "100%",
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h4"
                component={`div`}
                className={classes.textFilter}
              >
                Genus:{" "}
                <Box component="span" sx={{ fontStyle: "italic" }}>
                  {genus && genus.find((item) => item.id == id).name}
                </Box>
              </Typography>
            </Box>
            <Box
              sx={{
                width: 160,
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Box sx={{ margin: "0 8px" }}>
                <Typography>FILTER SPECIES</Typography>
              </Box>
              <FormControl fullWidth sx={{ maxWidth: 240 }}>
                <Select
                  onChange={(e) => handleOnChangeSelectSpecies(e)}
                  value={selectSpecies}
                  size="small"
                  color="secondary"
                  sx={{
                    bgcolor: "secondary.main",
                    textAlign: "center",
                    color: "secondary.contrastText",
                  }}
                  variant="outlined"
                >
                  {species &&
                    species
                      .filter((item) => item.genus_id == id)
                      .map((val, index) => (
                        <MenuItem key={index} value={val.id} color="secondary">
                          {val.name}
                        </MenuItem>
                      ))}
                  <MenuItem value={0}>ALL</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <br />
          <Paper className={classes.paperTable}>
            {/* <Box
              display="flex"
              alignItems="center"
              sx={{ marginBottom: "10px" }}
            >
              <Typography variant="h5">
                Genus: {genus && genus.find((item) => item.id == id).name}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <ButtonStack />
            </Box> */}
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.headerText} align="center">
                    SPECIES
                  </TableCell>
                  <TableCell className={classes.headerText} align="center">
                    AUTHOR
                  </TableCell>
                  <TableCell className={classes.headerText} align="center">
                    LOCATIONS
                  </TableCell>
                  <TableCell className={classes.headerText} align="center">
                    ACTION
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detail &&
                  detail
                    .filter(
                      (item, index, self) =>
                        self
                          .map((e) => {
                            return e.species_id;
                          })
                          .indexOf(item.species_id) === index
                    )
                    .filter((item, index, self) => item.genus_id === id)
                    .filter((item) =>
                      selectSpecies != 0
                        ? item.species_id == selectSpecies
                        : true
                    )
                    .map((val, index) => (
                      <TableRow key={index}>
                        <TableCell
                          className={classes.cellTable}
                          sx={{
                            bgcolor:
                              index % 2 == 0
                                ? "secondary.lighter"
                                : "transparent",
                          }}
                          align="center"
                        >
                          <i>{`${val.genus} ${val.species}`}</i>
                        </TableCell>
                        <TableCell
                          className={classes.cellTable}
                          sx={{
                            bgcolor:
                              index % 2 == 0
                                ? "secondary.lighter"
                                : "transparent",
                          }}
                          align="center"
                        >
                          {val.author}
                        </TableCell>
                        <TableCell
                          className={classes.cellTable}
                          sx={{
                            bgcolor:
                              index % 2 == 0
                                ? "secondary.lighter"
                                : "transparent",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          align="center"
                        >
                          {location &&
                            location
                              .filter((item) => item.detail_id == val.id)
                              .map((val, index) => {
                                return index == 0
                                  ? val.locality
                                  : ", " + val.locality;
                              })}
                        </TableCell>
                        <TableCell
                          className={classes.cellTable}
                          sx={{
                            bgcolor:
                              index % 2 == 0
                                ? "secondary.lighter"
                                : "transparent",
                          }}
                          align="center"
                        >
                          <Link
                            href={"detail/" + val.id}
                            sx={{
                              cursor: "pointer",
                              color: "info.main",
                            }}
                          >
                            detail
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </Paper>
        </StyledEngineProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default SpeciesTable;
