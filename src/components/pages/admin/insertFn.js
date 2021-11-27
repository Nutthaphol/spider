import familyService from "../../../services/family.service";
import genusService from "../../../services/genus.service";
import speciesService from "../../../services/species.service";
import detailService from "../../../services/detail.service";
import locationService from "../../../services/location.service";
import addressService from "../../../services/address.service";
import paperService from "../../../services/paper.service";
import imageService from "../../../services/image.service";

const postFamilyFn = (name) => {
  return familyService.postFamily(name).then((res) => {
    return res.insertId;
  });
};

const postGenusFn = async (family_id, name) => {
  return genusService.postGenus({ family_id, name }).then((res) => {
    return res.insertId;
  });
};

const postSpeciesFn = async (genus_id, name) => {
  return speciesService.postSpecies({ genus_id, name }).then((res) => {
    return res.insertId;
  });
};

const postDetailFn = async (detail) => {
  return detailService.postDetail(detail).then((res) => {
    return res.insertId;
  });
};

const postLocationFn = async (location, detail_id) => {
  location["detail_id"] = detail_id;
  return locationService.postLocation(location).then((res) => {
    return res.insertId;
  });
};

const postAddressFn = async (address, locationId) => {
  address["location_id"] = locationId;
  address.latitude = parseFloat(address.latitude);
  address.longitude = parseFloat(address.longitude);
  return addressService.postAddress(address).then((res) => {
    return res.insertId;
  });
};

const postPaperFn = async (paper, detail_id) => {
  paper.detail_id = detail_id;
  console.log("check paper", paper);
  return paperService.postPaper(paper).then((res) => {
    return res.insertId;
  });
};

const postImageFn = async (files) => {
  return imageService.postImage(files).then((res) => {
    return res.insertId;
  });
};

export {
  postFamilyFn,
  postGenusFn,
  postSpeciesFn,
  postDetailFn,
  postLocationFn,
  postAddressFn,
  postPaperFn,
  postImageFn,
};
