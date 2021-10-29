import {
  Container,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Button,
  FormControl,
  Select,
  InputLabel,
  Divider,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllFamily } from "../../../actions/family";
import { getAllGenus } from "../../../actions/genus";
import { getAllSpecies } from "../../../actions/species";
import MapView from "../shared/MapView";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(10, 0),
  },
}));

let listYear = [];

const FormInsert = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const formRef = useRef();
  const { result: allFamily } = useSelector((state) => state.family);
  const { result: allGenus } = useSelector((state) => state.genus);
  const { result: allSpecies } = useSelector((state) => state.species);
  const [familyInsert, setFamilyInsert] = useState(false);
  const [genusInsert, setGenusInsert] = useState(false);
  const [speciesInsert, setSpeciesInsert] = useState(false);
  // const { result: allFamily } = useSelector((state) => state.family);

  const [detail, setDetail] = useState({
    family_id: null,
    genus_id: null,
    species_id: null,
    author: "",
    publish_year: listYear[0],
    country: "Thailand",
    country_other: "",
    altitude: "",
    method: "",
    habtat: "",
    microhabtat: "",
    designate: "",
  });
  const [location, setLocation] = useState({
    de_id: null,
    province: "",
    district: "",
    locality: "",
  });
  const [position, setPosition] = useState([
    {
      lo_id: null,
      name: "",
      lat: null,
      long: null,
    },
  ]);

  const [paper, setPaper] = useState({
    de_id: null,
    pe_name: "",
  });

  const [file, setFile] = useState([]);

  useEffect(() => {
    dispatch(getAllFamily());
    dispatch(getAllGenus());
    dispatch(getAllSpecies());

    const addYear = () => {
      const date = new Date();
      let year = date.getFullYear();
      for (let i = year; i > year - 100; i--) {
        listYear.push(i);
      }
      console.log(listYear);
    };

    addYear();
  }, []);

  const handleDetailOnChange = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  return (
    <div className={`page`}>
      <Container maxWidth="lg">
        <Paper style={{ padding: "20px" }}>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Typography variant="h5" component="div">
                Spider of Thailand
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Grid container spacing={2}>
                <Grid item md={10}>
                  <Typography variant="subtitle1">Author</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    placeholder="Author"
                    value={detail.author}
                    onChange={(e) =>
                      setDetail({
                        ...detail,
                        author: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item md={2}>
                  <FormControl variant="outlined" fullWidth size="small">
                    <Typography variant="subtitle1">Year</Typography>
                    <Select
                      placeholder="Publish year"
                      name="publish_year"
                      value={detail.publish_year || ""}
                      onChange={(e) => handleDetailOnChange(e)}
                    >
                      {listYear &&
                        listYear.map((val, index) => (
                          <MenuItem key={index} value={val}>
                            {val}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={5}>
                  <Typography variant="subtitle1">Country</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    placeholder="Country"
                    value={detail.country}
                    disabled={true}
                  />
                </Grid>
                <Grid item md={7}>
                  <Typography variant="subtitle1">Other country</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    placeholder="Other country"
                    value={detail.country_other}
                    onChange={(e) =>
                      setDetail({
                        ...detail,

                        country_other: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item md={4}>
                  <Typography variant="subtitle1">Province</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    placeholder="Province"
                    value={location.province}
                    onChange={(e) =>
                      setLocation({
                        ...location,
                        province: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item md={4}>
                  <Typography variant="subtitle1">District</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    placeholder="District"
                    value={location.district}
                    onChange={(e) =>
                      setLocation({
                        ...location,

                        district: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item md={4}>
                  <Typography variant="subtitle1">Locality</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    placeholder="Locality"
                    value={location.locality}
                    onChange={(e) =>
                      setLocation({
                        ...location,
                        locality: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Divider
                style={{ marginTop: "20px", marginBottom: "20px" }}
                spacing={classes.divider}
              />

            </Grid>
            <Grid item md={6}>
              <MapView listPosition={null} height="50vh" zoom={5} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default FormInsert;
