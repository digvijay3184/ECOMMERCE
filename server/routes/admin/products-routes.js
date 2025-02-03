const express = require('express');

const {
    handleImageUpload,
    addProduct,
    fetchAllProducts,
    editProduct,
    deleteProduct,
    deleteAllProducts
} = require('../../controllers/admin/product-controller');

const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post('/add',addProduct);
router.put('/edit/:id',editProduct);
router.delete('/delete/:id',deleteProduct);
router.get('/get',fetchAllProducts);
router.delete('/deleteAll',deleteAllProducts);
module.exports = router;