"use client";

import Loader from "@/components/common/Loader";
import CheckRoleAndLogout from "@/hooks/CheckRoleAndLogout";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { useGetSingleProductQuery, useUpdateProductMutation } from "@/redux/api/productApi";
import { TProductWithVendorDetails } from "@/types/commonTypes";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const UpdateProduct = () => {
  CheckRoleAndLogout("vendor");
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading: isProductToBeUpdatedLoading } = useGetSingleProductQuery(id);
  const product: TProductWithVendorDetails = data?.data;

  const [productTitle, setProductTitle] = useState<string>(product?.title);
  const [productPrice, setProductPrice] = useState<number>(product?.price);
  const [productStock, setProductStock] = useState<number>(product?.stock);
  const [productBrand, setProductBrand] = useState<string>(product?.brand);
  const [productCategory, setProductCategory] = useState<string>(product?.category);
  const [productDisplayImage, setProductDisplayImage] = useState<any>("" as any);
  const [productDisplayImageUploadOngoing, setProductDisplayImageUploadOngoing] = useState<boolean>(false);
  const [productDescription, setProductDescription] = useState<string>(product?.description);

  const { data: profileData } = useGetProfileQuery(undefined);
  const userProfileFromDb = profileData?.data;

  const [updateProduct] = useUpdateProductMutation();

  // handle product image upload
  const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userProfileFromDb?.email === "demovendor@gmail.com" && product?.releaseDate === "2023-01-01") {
      toast.error(
        "Admin has set restrictions to update this product to maintain integrity of the system. Please create your own product to test this feature.",
        {
          position: "top-right",
          duration: 3000,
          icon: "🔒",
        }
      );
      return;
    }

    const productData = {
      id: id,
      title: productTitle,
      price: productPrice,
      stock: productStock,
      brand: productBrand,
      category: productCategory,
      displayImage: productDisplayImage,
      description: productDescription,
    };

     const preset_key = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const formData = new FormData();

    if (productPrice && (productPrice < 1 || isNaN(productPrice))) {
      setProductDisplayImageUploadOngoing(false);
      toast.error("Price must be number and greater than or equl 1.", {
        position: "top-right",
        duration: 1500,
        icon: " ❌",
      });
      return;
    }
    if (productDescription && productDescription !== "") {
      if (productDescription?.length < 400) {
        toast.error("Description must be at least 400 characters.", {
          position: "top-right",
          duration: 1500,
          icon: " ❌",
        });
        return;
      }
    }
    if (productTitle && productTitle?.length < 3) {
      toast.error("Product name must be at least 3 characters.", {
        position: "top-right",
        duration: 1500,
        icon: " ❌",
      });
      return;
    }
    if (
      productDisplayImage === "" &&
      productTitle === "" &&
      productPrice === 0 &&
      productBrand === "" &&
      productCategory === "" &&
      productDescription === "" &&
      productStock === 0
    ) {
      setProductDisplayImageUploadOngoing(false);
      toast.error("Which field you want to update?", {
        position: "top-right",
        duration: 1500,
        icon: " ❌",
      });
      return;
    }

    // if image is selected, upload it to cloudinary and update the product
    if (productDisplayImage) {
      if (productDisplayImage.size > 1024 * 1024) {
        setProductDisplayImageUploadOngoing(false);
        toast.error("Image size must be less than 1MB", {
          position: "top-right",
          duration: 1500,
          icon: " ❌",
        });
        return;
      } else if (
        productDisplayImage.type !== "image/jpeg" &&
        productDisplayImage.type !== "image/jpg" &&
        productDisplayImage.type !== "image/png"
      ) {
        setProductDisplayImageUploadOngoing(false);
        toast.error("We accept only jpg, jpeg and png type images", {
          position: "top-right",
          duration: 1500,
          icon: " ❌",
        });
        return;
      } else {
        formData.append("file", productDisplayImage);
        formData.append("upload_preset", preset_key!);
        setProductDisplayImageUploadOngoing(true);

        await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then(async (data) => {
            if (data?.secure_url) {
              productData.displayImage = data.secure_url;
              const response = await updateProduct(productData).unwrap();

              if (response?.statusCode === 200) {
                toast.success("Product updated successfully.", {
                  position: "top-right",
                  duration: 1500,
                });
                setProductDisplayImageUploadOngoing(false);
                setProductTitle("");
                setProductPrice(0);
                setProductBrand("");
                setProductCategory("");
                setProductDisplayImage("");
                setProductDescription("");
                navigate("/dashboard/vendor/manage-products");
              } else {
                toast.error("Failed to update product, please try again.", {
                  position: "top-right",
                  duration: 1500,
                });
                setProductDisplayImageUploadOngoing(false);
              }
            }
          })
          .catch(() => {
            toast.error("something went wrong, please try again", {
              position: "top-right",
              duration: 1500,
            });
            setProductDisplayImageUploadOngoing(false);
          });
      }
    } else {
      // if image is not selected, update the product without image
      const response = await updateProduct(productData).unwrap();

      if (response?.statusCode === 200) {
        toast.success("Product updated successfully.", {
          position: "top-right",
          duration: 1500,
        });
        setProductDisplayImageUploadOngoing(false);
        setProductTitle("");
        setProductPrice(0);
        setProductBrand("");
        setProductCategory("");
        setProductDisplayImage("");
        setProductDescription("");
        navigate("/dashboard/vendor/manage-products");
      } else {
        toast.error("Failed to update product, please try again.", {
          position: "top-right",
          duration: 1500,
        });
        setProductDisplayImageUploadOngoing(false);
      }
    }
  };
  if (!product) return <Loader />;
  console.log(product)
  return (
    <div className="main-container pb-16 px-4 sm:px-6 lg:px-8">
      <h3 className="text-center mt-10 lg:mt-14 text-2xl font-semibold text-gray-800">
        Update Product: <span className="text-orange-500">{product?.title}</span>
      </h3>
      <p className="text-center text-sm text-gray-600 mt-2 max-w-3xl mx-auto">
        Welcome, {userProfileFromDb?.name}! Use the form below to update product details. Ensure all data is accurate
        and relevant.
      </p>

      <div className="bg-white shadow-md rounded-2xl mt-10 p-6 md:p-10 max-w-6xl mx-auto">
        <form onSubmit={handleUpdateProduct} className="grid gap-6 md:grid-cols-2">
          {/* Image Upload */}
          <div>
            <label htmlFor="productImage" className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <input
              type="file"
              name="productImage"
              id="productImage"
              className="block w-full text-sm bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:ring-orange-400 focus:border-orange-400"
              onChange={(e) => {
                const selectedFile = e.target.files && e.target.files[0];
                if (selectedFile) setProductDisplayImage(selectedFile);
              }}
            />
          </div>

          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full text-sm bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:ring-orange-400 focus:border-orange-400"
              minLength={3}
              maxLength={255}
              value={product?.title}
              onChange={(e) => setProductTitle(e.target.value)}
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              className="block w-full text-sm bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:ring-orange-400 focus:border-orange-400"
              min={1}
              value={product?.price}
              onChange={(e) => setProductPrice(Number(e.target.value))}
            />
          </div>

          {/* Brand */}
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
              Brand Name
            </label>
            <input
              type="text"
              name="brand"
              id="brand"
              className="block w-full text-sm bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:ring-orange-400 focus:border-orange-400"
              minLength={3}
              maxLength={50}
              value={product?.brand}
              onChange={(e) => setProductBrand(e.target.value)}
            />
          </div>

          {/* Stock */}
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
              Product Stock
            </label>
            <input
              type="number"
              name="stock"
              id="stock"
              className="block w-full text-sm bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:ring-orange-400 focus:border-orange-400"
              value={product?.stock}
              onChange={(e) => setProductStock(Number(e.target.value))}
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Product Category
            </label>
            <select
              id="category"
              className="block w-full text-sm bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:ring-orange-400 focus:border-orange-400"
              value={product?.category}
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <option value="" disabled defaultValue={product?.category}>
                {product?.category || "Select a category"}
              </option>
              <option value="desktop">Desktop</option>
              <option value="laptop">Laptop</option>
              <option value="smartphone">Smartphone</option>
              <option value="watch">Watch</option>
              <option value="headphone">Headphone</option>
              <option value="fashion">Fashion</option>
              <option value="accessories">Accessories</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Product Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={8}
              className="block w-full text-sm bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:ring-orange-400 focus:border-orange-400"
              minLength={400}
              maxLength={600}
              value={product?.description}
              onChange={(e) => setProductDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={productDisplayImageUploadOngoing}
              className="bg-orange-500 hover:bg-green-600 transition-colors duration-300 text-white font-semibold px-6 py-2 rounded-lg shadow disabled:opacity-50"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
