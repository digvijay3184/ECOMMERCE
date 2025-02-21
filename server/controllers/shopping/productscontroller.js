const Product = require('../../models/Product')


const getFilterProducts = async (req, res) => {
    try {
    const { category = [], brand = [], sortBy = 'price-lowtohigh' } = req.query;

    let filter = {};
    if (category.length > 0) {
    filter.category = { $in: category.split(',') };
    }
    if (brand.length > 0) {
    filter.brand = { $in: brand.split(',') };
    }
  
      let sort = {};
      switch (sortBy) {
        case 'price-lowtohigh':
          sort = { price: 1 };
          break;
        case 'price-hightolow':
          sort = { price: -1 };
          break;
        case 'title-atoz':
          sort = { title: 1 };
          break;
        case 'title-ztoa':
          sort = { title: -1 };
          break;
        default:
          sort = { price: 1 };
          break;
      }
  
      const products = await Product.find(filter).sort(sort);
  
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching products",
        error: e.message,
      });
    }
  };


module.exports = {getFilterProducts}
