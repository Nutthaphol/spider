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

const useStyles = makeStyles(() => ({
  textFilter: {
    fontWeight: "600",
  },
  fieldFilter: {
    "& .MuiOutlinedInput-notchedOutline": {
      border: "2px solid #000",
    },
    "& .Mui-focused.MuiOutlinedInput-notchedOutline": {
      borderColor: "#000",
    },
    backgroundColor: "#ED7044",
    color: "#fff",
    "&:hover": {
      background: "#fff",
      backgroundColor: "#ED7044",
      color: "#fff",
    },
    "& .MuiSvgIcon-root": {
      color: "#fff",
    },
    textAlign: "center",
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
                Genus: {genus && genus.find((item) => item.id == id).name}
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
                  className={classes.fieldFilter}
                >
                  {species &&
                    species
                      .filter((item) => item.genus_id == id)
                      .map((val, index) => (
                        <MenuItem key={index} value={val.id}>
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
                    Species
                  </TableCell>
                  <TableCell className={classes.headerText} align="center">
                    Author
                  </TableCell>
                  <TableCell className={classes.headerText} align="center">
                    Location
                  </TableCell>
                  <TableCell className={classes.headerText} align="center">
                    Action
                  </TableCell>
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
                        <TableCell
                          className={classes.cellTable}
                          sx={{
                            backgroundColor:
                              index % 2 == 0
                                ? "rgba(237, 112, 68, 0.2)"
                                : "transparent",
                          }}
                          align="center"
                        >
                          <i>{`${val.genus} ${val.species}`}</i>
                        </TableCell>
                        <TableCell
                          className={classes.cellTable}
                          sx={{
                            backgroundColor:
                              index % 2 == 0
                                ? "rgba(237, 112, 68, 0.2)"
                                : "transparent",
                          }}
                          align="center"
                        >
                          {val.author}
                        </TableCell>
                        <TableCell
                          className={classes.cellTable}
                          sx={{
                            backgroundColor:
                              index % 2 == 0
                                ? "rgba(237, 112, 68, 0.2)"
                                : "transparent",
                          }}
                          align="center"
                        >
                          {location &&
                            location.find((item) => item.detail_id == val.id)
                              .locality}
                        </TableCell>
                        <TableCell
                          className={classes.cellTable}
                          sx={{
                            backgroundColor:
                              index % 2 == 0
                                ? "rgba(237, 112, 68, 0.2)"
                                : "transparent",
                          }}
                          align="center"
                        >
                          <Link
                            href={"detail/" + val.id}
                            sx={{
                              cursor: "pointer",
                            }}
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
          </Paper>
        </StyledEngineProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default SpeciesTable;
