import express from "express";
import isAuthenticated from "../middlewares/isAutenticate.js";
import { getCompany, getCompanyId, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router =express.Router();
  
router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyId);
router.route("/update/:id").put(isAuthenticated,singleUpload,updateCompany)

export default router;    