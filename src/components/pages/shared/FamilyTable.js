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
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
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
    // padding: "1rem",
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

const FamilyTable = (props) => {
  const { family, detail, genus, ToNext, ButtonStack } = props;
  const classes = useStyles();

  const [selectFamily, setSelectFamily] = useState(0);

  const filterCountGenus = (id) => {
    const family_filter = detail
      .filter((item) => item.family_id === id)
      .filter(
        (item, index, self) =>
          self
            .map((e) => {
              return e.genus_id;
            })
            .indexOf(item.genus_id) === index
      );

    const number = family_filter.length;
    return number;
  };

  const handleOnChangeSelectFamily = (e) => {
    setSelectFamily(e.target.value);
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
              [theme.breakpoints.down("sm")]: {
                display: "flex",
                flexDirection: "column-reverse",
              },
            }}
          >
            <Box
              sx={{
                width: 160,

                [theme.breakpoints.up("sm")]: { position: "absolute" },
                [theme.breakpoints.down("sm")]: {
                  position: "relative",
                  width: "100%",
                  textAlign: "center",
                  height: "100%",
                  margin: "16px 0",
                },
              }}
            >
              <FormControl fullWidth>
                <Select
                  onChange={(e) => handleOnChangeSelectFamily(e)}
                  value={selectFamily}
                  size="small"
                  variant="outlined"
                  className={classes.fieldFilter}
                >
                  {family &&
                    family.map((val, index) => (
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
              FAMILY LIST
            </Typography>
          </Box>

          <br />
          <br />
          <Paper className={classes.paperTable}>
            {/* <Box
              display="flex"
              alignItems="center"
              sx={{ marginBottom: "10px" }}
            >
              <Typography variant="h5" sx={{ fontWeight: "600" }}>
                Family : List
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <ButtonStack />
            </Box> */}
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.headerText} align="center">
                    FAMILY
                  </TableCell>
                  <TableCell className={classes.headerText} align="center">
                    AUTHOR
                  </TableCell>
                  <TableCell className={classes.headerText} align="center">
                    GENERA
                  </TableCell>
                  <TableCell className={classes.headerText} align="center">
                    ACTION
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detail &&
                  detail
                    // unique family type
                    .filter(
                      (item, index, self) =>
                        self
                          .map((e) => {
                            return e.family_id;
                          })
                          .indexOf(item.family_id) === index
                    )
                    .filter((item) =>
                      selectFamily != 0 ? item.family_id == selectFamily : true
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
                          {val.family}
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
                          {filterCountGenus(val.family_id)}
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
                          {" "}
                          <Link
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                              ToNext("genus", val.family_id);
                            }}
                            // underline="hover"
                          >
                            Genera
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                {/* {family &&
                  family
                    // .filter(
                    //   (item) =>
                    //     detail && detail.find((val) => val.family_id == item.id)
                    // )
                    .map((val, index) => (
                      <TableRow key={index}>
                        <TableCell>{val.name}</TableCell>
                        <TableCell align="center">
                          {detail &&
                            detail
                              // .slice(0, 1)
                              .find((item) => item.family_id == val.id).author}
                        </TableCell>
                        <TableCell align="center">
                          {
                            genus.filter((item) => item.family_id == val.id)
                              .length
                          }
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ cursor: "pointer" }}
                          onClick={() => ToNext("genus", val.id)}
                        >
                          <Link
                            sx={{ cursor: "pointer" }}
                            onClick={() => ToNext("genus", val.id)}
                          >
                            genera
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

export default FamilyTable;
