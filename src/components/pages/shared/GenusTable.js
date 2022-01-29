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

const GenusTable = (props) => {
  const { family, genus, detail, species, ToNext, id, ButtonStack } = props;
  const classes = useStyles();
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
          <Box
            sx={{
              width: "100%",
              position: "relative",
              textAlign: "center",
            }}
          >
            <Box sx={{ width: 160, position: "absolute" }}>
              <FormControl fullWidth>
                <Select
                  className={classes.fieldFilter}
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
            <Typography
              variant="h4"
              component={`div`}
              className={classes.textFilter}
            >
              Family: {family && family.find((item) => item.id == id).name}
            </Typography>
          </Box>

          <br />
          <br />
          <Paper className={classes.paperTable}>
            <Box
              display="flex"
              alignItems="center"
              sx={{ marginBottom: "10px" }}
            >
              {/* <Typography variant="h5">
                Family: {family && family.find((item) => item.id == id).name}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <ButtonStack /> */}
            </Box>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.headerText} align="center">
                    Genus
                  </TableCell>
                  <TableCell className={classes.headerText} align="center">
                    Author
                  </TableCell>
                  <TableCell className={classes.headerText} align="center">
                    {" "}
                    # species
                  </TableCell>
                  <TableCell className={classes.headerText} align="center">
                    Action
                  </TableCell>
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
                          <i>{val.genus}</i>
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
                          {filterCountSpecies(val.genus_id)}
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
                            sx={{
                              cursor: "pointer",
                            }}
                            onClick={() => ToNext("species", val.genus_id)}
                          >
                            species
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

export default GenusTable;
