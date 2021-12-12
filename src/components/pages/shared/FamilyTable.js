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

const FamilyTable = (props) => {
  const { family, detail, genus, ToNext, ButtonStack } = props;

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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" component={`div`}>
              Filter type
            </Typography>
            <Box sx={{ flexGrow: 0.02 }} />
            <Box sx={{ width: 160 }}>
              <FormControl fullWidth>
                <InputLabel id="Type-Of-Family" size="small">
                  Family
                </InputLabel>
                <Select
                  label="Family"
                  labelId="Type-Of-Family"
                  onChange={(e) => handleOnChangeSelectFamily(e)}
                  value={selectFamily}
                  size="small"
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
          </Box>

          <br />
          <br />
          <Box display="flex" alignItems="center" sx={{ marginBottom: "10px" }}>
            <Typography variant="h5">Family : List</Typography>
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
                  <TableCell>Family</TableCell>
                  <TableCell align="left">Author</TableCell>
                  <TableCell align="left"> # genera</TableCell>
                  <TableCell align="left">Action</TableCell>
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
                        <TableCell>{val.family}</TableCell>
                        <TableCell align="left">{val.author}</TableCell>
                        <TableCell align="left">
                          {filterCountGenus(val.family_id)}
                        </TableCell>
                        <TableCell align="left">
                          {" "}
                          <Link
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                              ToNext("genus", val.family_id);
                            }}
                            underline="hover"
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
          </TableContainer>
        </StyledEngineProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default FamilyTable;
