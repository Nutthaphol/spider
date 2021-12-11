import React, { useState, useEffect } from "react";

import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";

import makeStyles from "@mui/styles/makeStyles";

import {
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
} from "@mui/material";

const theme = createTheme();

const FamilyTable = (props) => {
  const { family, detail, genus, ToNext } = props;

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
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
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
