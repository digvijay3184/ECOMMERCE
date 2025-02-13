import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "@/components/ui/card";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              Rs.{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                Rs.{product?.salePrice}
              </span>
            ) : null}
          </div>
          <p className="text-sm text-muted-foreground">
            {isExpanded
              ? product?.description
              : `${product?.description.slice(0, 100)}...`}
            {product?.description.length > 100 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleReadMore();
                }}
                className="text-blue-500 ml-1"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            )}
          </p>
        </CardContent>
      </div>
      <CardFooter className="p-4">
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
