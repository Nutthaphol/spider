import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  data: Yup.object().shape({
    family: Yup.string().required("Please specify"),
    genus: Yup.string().required("Please specify"),
    species: Yup.string().required("Please specify"),
    author: Yup.string().required("Please specify"),
    publish_year: Yup.string().required("Please specify"),
    country: Yup.string().required("Please specify"),
    country_other: Yup.string().required("Please specify"),
    altitude: Yup.string().required("Please specify"),
    method: Yup.string().required("Please specify"),
    habitat: Yup.string().required("Please specify"),
    microhabitat: Yup.string().required("Please specify"),
    designate: Yup.string().required("Please specify"),
    location: Yup.array(
      Yup.object().shape({
        province: Yup.number().required("Please specify"),
        district: Yup.number().required("Please specify"),
        locality: Yup.string().required("Please specify"),
        address: Yup.array(
          Yup.object().shape({
            name: Yup.string().required("Please specify"),
            latitude: Yup.number().required("Please specify"),
            longitude: Yup.number().required("Please specify"),
          })
        ),
      })
    ),
    paper: Yup.array(
      Yup.object().shape({
        name: Yup.string().required("Please specify"),
      })
    ),
  }),
});

export default validationSchema;
