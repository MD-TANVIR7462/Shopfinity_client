/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Loader from "@/components/common/Loader";
import CheckRoleAndLogout from "@/hooks/CheckRoleAndLogout";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { useDeleteProductMutation, useGetAllProductsOfAVendorToManageQuery } from "@/redux/api/productApi";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const VendorManageProducts = () => {
  CheckRoleAndLogout("vendor");

  const { data: profileData, isLoading } = useGetProfileQuery(undefined);
  const userProfileFromDb = profileData?.data;

  const [searchProductByTitle, setSearchProductByTitle] = useState<string>("");
  const [page, setPage] = useState<string>("1");
  const limit = "15";

  const allFilters = {
    page,
    limit,
    search: searchProductByTitle,
  };

  const createQueryString = (obj: any) => {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join("&");
  };

  let queryParams = createQueryString(allFilters);

  useEffect(() => {
    if (searchProductByTitle !== "" && Number(page) > 1) {
      setPage("1");
    }
    queryParams = createQueryString({
      page,
      limit,
      searchProductByTitle,
    });
  }, [page, limit, searchProductByTitle]);

  const { data: allProducts, isLoading: isProductsLoading } = useGetAllProductsOfAVendorToManageQuery(queryParams);

  const totalItems = allProducts?.data?.meta?.total || 0;
  const totalPages = Math.ceil(Number(totalItems) / Number(limit));

  const handlePageChange = (page: number) => {
    setPage(page.toString());
  };

  const [deleteProduct] = useDeleteProductMutation();

  const handleDeleteProduct = async (productId: string) => {
    const allow = window.confirm("Are you sure you want to delete this product?");

    if (!allow) {
      toast.error("Product deletion cancelled", {
        position: "top-right",
        duration: 1500,
      });
      return;
    } else {
      const productToDelete = allProducts?.data?.data?.find((product: any) => product._id === productId);

      if (userProfileFromDb?.email === "demovendor@gmail.com" && productToDelete?.releaseDate === "2023-01-01") {
        toast.error(
          "Admin has set restrictions to delete this product to maintain integrity of the system. Please create your own product to test this feature.",
          {
            position: "top-right",
            duration: 3000,
            icon: "🔒",
          }
        );
        return;
      }

      const response = await deleteProduct(productId).unwrap();

      if (response?.statusCode === 200) {
        toast.success("Product deleted successfully", {
          position: "top-right",
          duration: 1500,
        });
      } else {
        toast.error("Product deletion failed", {
          position: "top-right",
          duration: 1500,
        });
      }
    }
  };

  if (isLoading || isProductsLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h3 className="text-center mt-10 lg:mt-14 text-3xl font-bold text-green-700">Manage Products</h3>
      <p className="text-center text-gray-600 lg:mt-2 md:text-md lg:w-2/3 lg:mx-auto">
        Welcome, {userProfileFromDb?.name}! Here you can manage all your products. Add, edit, delete and view your
        products to monitor your sales and visibility.
      </p>

      <div className="lg:w-11/12 lg:mx-auto">
        <div className="flex flex-col space-y-3 lg:flex-row justify-between items-center mt-8">
          <Link to="/dashboard/vendor/manage-products/add-product">
            <div className="bg-green-600 rounded-md px-4 py-2 cursor-pointer text-white hover:bg-green-700 transition-colors duration-300 ease-in-out flex items-center space-x-2 mt-3">
              <IoIosAddCircleOutline style={{ fontSize: "18px" }} /> <span>Add Product</span>
            </div>
          </Link>

          <div>
            <input
              type="search"
              id="search"
              className="text-sm rounded-md w-full sm:w-4/6 md:w-full lg:w-[320px] pl-10 p-2 focus:outline-none bg-gray-100 border border-green-300 h-[44px]"
              placeholder="Search product by Name"
              value={searchProductByTitle}
              onChange={(e) => setSearchProductByTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-10 lg:mb-24 lg:mt-8 shadow-md rounded-md py-5 px-6 bg-white">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-white uppercase bg-green-600">
                <tr>
                  <th className="px-6 py-3">Product Name</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Release Date</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {isProductsLoading ? <Loader /> : null}

                {!isLoading && allProducts?.data?.data?.length === 0 ? (
                  <tr>
                    <td className="text-red-400 font-semibold py-8 pl-12" colSpan={5}>
                      No Product Found
                    </td>
                  </tr>
                ) : null}

                {!isLoading &&
                  allProducts?.data?.data?.length > 0 &&
                  allProducts?.data?.data?.map((product: any) => (
                    <tr className="bg-white border-b hover:bg-green-50" key={product._id}>
                      <th className="px-6 py-6 font-medium text-gray-700 whitespace-nowrap">{product?.title}</th>
                      <td className="px-6 py-6">{`$${product?.price}`}</td>
                      <td className="px-6 py-6">{product?.category}</td>
                      <td className="px-6 py-6">{product?.releaseDate}</td>
                      <td className="px-6 py-6 flex space-x-4 items-center">
                        <Link to={`/product/${product?._id}`} target="_blank">
                          <button className="text-lg text-green-700 hover:text-green-900" title="View product">
                            <IoEyeOutline />
                          </button>
                        </Link>
                        <Link to={`/dashboard/vendor/manage-products/update-product/${product._id}`}>
                          <button className="text-lg text-yellow-500 hover:text-yellow-600" title="Edit product">
                            <CiEdit />
                          </button>
                        </Link>
                        <button
                          className="text-lg text-red-600 hover:text-red-700"
                          title="Delete product"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          <AiOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* Pagination */}
            {!isLoading && allProducts?.data?.data?.length > 0 && (
              <div className={`flex justify-end my-5 ${allProducts?.data?.data?.length < 5 ? "mt-[200px]" : "mt-4"}`}>
                <button
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-green-200 disabled:cursor-not-allowed disabled:hover:bg-gray-200 mr-2"
                  onClick={() => handlePageChange(Number(page) - 1)}
                  disabled={Number(page) === 1}
                >
                  Prev
                </button>
                {[...Array(Math.min(totalPages, 5)).keys()].map((index) => {
                  const pageNumber = Number(page) - 2 + index;
                  if (pageNumber > 0 && pageNumber <= totalPages) {
                    return (
                      <button
                        key={pageNumber}
                        className={`mx-2 px-3 py-1 ${
                          Number(page) === pageNumber
                            ? "bg-green-600 text-white font-bold"
                            : "bg-gray-200 text-gray-700 hover:bg-green-200"
                        } rounded`}
                        onClick={() => handlePageChange(pageNumber)}
                        disabled={Number(page) === pageNumber}
                      >
                        {pageNumber}
                      </button>
                    );
                  }
                  return null;
                })}
                <button
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-green-200 disabled:cursor-not-allowed disabled:hover:bg-gray-200"
                  onClick={() => handlePageChange(Number(page) + 1)}
                  disabled={Number(page) === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorManageProducts;
