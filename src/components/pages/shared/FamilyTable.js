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

const FamilyTable = ({ family, detail, genus, ToNext }) => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <Typography variant="h5">Family : List</Typography>
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
                  <TableCell align="center">Author</TableCell>
                  <TableCell align="center"> # genera</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {family &&
                  family
                    .filter(
                      (item) =>
                        detail && detail.find((val) => val.family_id == item.id)
                    )
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
                          {console.log(
                            "genus ",
                            genus.filter((item) => item.family_id == val.id)
                          )}
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
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledEngineProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default FamilyTable;
