'use client';

import CheckRoleAndLogout from '@/hooks/CheckRoleAndLogout';
import { useGetProfileQuery } from '@/redux/api/authApi';
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from '@/redux/api/productApi';
import { TProductWithVendorDetails } from '@/types/commonTypes';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const UpdateProduct = () => {
  CheckRoleAndLogout('vendor');
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading: isProductToBeUpdatedLoading } =
    useGetSingleProductQuery(id);
  const product: TProductWithVendorDetails = data?.data;

  const [productTitle, setProductTitle] = useState<string>(product?.title);
  const [productPrice, setProductPrice] = useState<number>(product?.price);
  const [productStock, setProductStock] = useState<number>(product?.stock);
  const [productBrand, setProductBrand] = useState<string>(product?.brand);
  const [productCategory, setProductCategory] = useState<string>(
    product?.category
  );
  const [productDisplayImage, setProductDisplayImage] = useState<any>(
    '' as any
  );
  const [
    productDisplayImageUploadOngoing,
    setProductDisplayImageUploadOngoing,
  ] = useState<boolean>(false);
  const [productDescription, setProductDescription] = useState<string>(
    product?.description
  );

  const { data: profileData } = useGetProfileQuery(undefined);
  const userProfileFromDb = profileData?.data;

  const [updateProduct] = useUpdateProductMutation();

  // handle product image upload
  const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      userProfileFromDb?.email === 'demovendor@gmail.com' &&
      product?.releaseDate === '2023-01-01'
    ) {
      toast.error(
        'Admin has set restrictions to update this product to maintain integrity of the system. Please create your own product to test this feature.',
        {
          position: 'top-right',
          duration: 3000,
          icon: '🔒',
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

    const preset_key = 'tanvir7462';
    const cloud_name = "dsmbm1bvy";

    const formData = new FormData();

    if (productPrice && (productPrice < 1 || isNaN(productPrice))) {
      setProductDisplayImageUploadOngoing(false);
      toast.error('Price must be number and greater than or equl 1.', {
        position: 'top-right',
        duration: 1500,
        icon: ' ❌',
      });
      return;
    }
    if (productDescription && productDescription !== '') {
      if (productDescription?.length < 400) {
        toast.error('Description must be at least 400 characters.', {
          position: 'top-right',
          duration: 1500,
          icon: ' ❌',
        });
        return;
      }
    }
    if (productTitle && productTitle?.length < 3) {
      toast.error('Product name must be at least 3 characters.', {
        position: 'top-right',
        duration: 1500,
        icon: ' ❌',
      });
      return;
    }
    if (
      productDisplayImage === '' &&
      productTitle === '' &&
      productPrice === 0 &&
      productBrand === '' &&
      productCategory === '' &&
      productDescription === '' &&
      productStock === 0
    ) {
      setProductDisplayImageUploadOngoing(false);
      toast.error('Which field you want to update?', {
        position: 'top-right',
        duration: 1500,
        icon: ' ❌',
      });
      return;
    }

    // if image is selected, upload it to cloudinary and update the product
    if (productDisplayImage) {
      if (productDisplayImage.size > 1024 * 1024) {
        setProductDisplayImageUploadOngoing(false);
        toast.error('Image size must be less than 1MB', {
          position: 'top-right',
          duration: 1500,
          icon: ' ❌',
        });
        return;
      } else if (
        productDisplayImage.type !== 'image/jpeg' &&
        productDisplayImage.type !== 'image/jpg' &&
        productDisplayImage.type !== 'image/png'
      ) {
        setProductDisplayImageUploadOngoing(false);
        toast.error('We accept only jpg, jpeg and png type images', {
          position: 'top-right',
          duration: 1500,
          icon: ' ❌',
        });
        return;
      } else {
        formData.append('file', productDisplayImage);
        formData.append('upload_preset', preset_key);
        setProductDisplayImageUploadOngoing(true);

        await fetch(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        )
          .then((response) => response.json())
          .then(async (data) => {
            if (data?.secure_url) {
              productData.displayImage = data.secure_url;
              const response = await updateProduct(productData).unwrap();

              if (response?.statusCode === 200) {
                toast.success('Product updated successfully.', {
                  position: 'top-right',
                  duration: 1500,
                });
                setProductDisplayImageUploadOngoing(false);
                setProductTitle('');
                setProductPrice(0);
                setProductBrand('');
                setProductCategory('');
                setProductDisplayImage('');
                setProductDescription('');
                navigate('/dashboard/vendor/manage-products');
              } else {
                toast.error('Failed to update product, please try again.', {
                  position: 'top-right',
                  duration: 1500,
                });
                setProductDisplayImageUploadOngoing(false);
              }
            }
          })
          .catch(() => {
            toast.error('something went wrong, please try again', {
              position: 'top-right',
              duration: 1500,
            });
            setProductDisplayImageUploadOngoing(false);
          });
      }
    } else {
      // if image is not selected, update the product without image
      const response = await updateProduct(productData).unwrap();

      if (response?.statusCode === 200) {
        toast.success('Product updated successfully.', {
          position: 'top-right',
          duration: 1500,
        });
        setProductDisplayImageUploadOngoing(false);
        setProductTitle('');
        setProductPrice(0);
        setProductBrand('');
        setProductCategory('');
        setProductDisplayImage('');
        setProductDescription('');
        navigate('/dashboard/vendor/manage-products');
      } else {
        toast.error('Failed to update product, please try again.', {
          position: 'top-right',
          duration: 1500,
        });
        setProductDisplayImageUploadOngoing(false);
      }
    }
  };

  return (
    <div className="main-container pb-8">
      <h3 className="text-center mt-10 lg:mt-14 text-xl mb-3 lg:text-2xl">
        Update Product :{' '}
        <span className="lg:font-semibold">{product?.title}</span>
      </h3>
      <p className="text-center lg:mt-2 md:text-md lg:w-2/3 lg:mx-auto">
        Welcome, {userProfileFromDb?.name}! You can update the product details
        here. Please make sure to provide all the required information. You can
        update the product image, name, price, brand, category, description
        here. Please keep those data relevant and accurate.
      </p>
      {/* Update Product Form */}
      <div className="lg:w-10/12 lg:mx-auto shadow px-4 py-4 lg:px-10 md:pt-12 md:pb-8 rounded mt-6">
        <form onSubmit={handleUpdateProduct}>
          <div className="grid gap-4 md:grid-cols-12 sm:gap-6">
            {/* product image */}
            <div className="col-span-12 md:col-span-6">
              <label
                htmlFor="productImage"
                className="block mb-2 text-sm font-semibold"
              >
                Product Image
              </label>

              <input
                type="file"
                name="productImage"
                id="productImage"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                onChange={(e) => {
                  const selectedFile = e.target.files && e.target.files[0];
                  if (selectedFile) {
                    setProductDisplayImage(selectedFile);
                  }
                }}
              />
            </div>
            {/* name */}
            <div className="col-span-12 md:col-span-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-semibold"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                placeholder={product?.title}
                minLength={3}
                maxLength={255}
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
              />
            </div>
            {/* price */}
            <div className="col-span-12 md:col-span-6">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-semibold"
              >
                Price
              </label>

              <input
                type="number"
                name="price"
                id="price"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                placeholder={product?.price?.toString()}
                value={productPrice}
                min={1}
                onChange={(e) => setProductPrice(Number(e.target.value))}
              />
            </div>
            {/* brand */}
            <div className="col-span-12 md:col-span-6">
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-semibold"
              >
                Brand Name
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                placeholder={product?.brand}
                minLength={3}
                maxLength={50}
                value={productBrand}
                onChange={(e) => setProductBrand(e.target.value)}
              />
            </div>
            {/* stock*/}
            <div className="col-span-12 md:col-span-6">
              <label
                htmlFor="stock"
                className="block mb-2 text-sm font-semibold"
              >
                Product Stock
              </label>

              <input
                type="number"
                name="stock"
                id="stock"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                placeholder={product?.stock?.toString()}
                value={productStock}
                onChange={(e) => setProductStock(Number(e.target.value))}
              />
            </div>
            {/* category */}
            <div className="col-span-12 md:col-span-6">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-semibold"
              >
                Product Category
              </label>
              <select
                id="category"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600 focus:outline-none"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
              >
                <option value="" defaultValue={product?.category}>
                  {product?.category}
                </option>
                <option value="desktop">Desktop</option>
                <option value="laptop">Laptop</option>
                <option value="smartphone">Smartphone</option>
                <option value="watch">Watch</option>
                <option value="headphone">Headphone</option>
                <option value="fashion">Fashiion</option>
                <option value="accessories">Accesories</option>
                <option value="others">Others</option>
              </select>
            </div>
            {/* description */}
            <div className="col-span-12">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-semibold"
              >
                Product Description
              </label>
              <textarea
                name="description"
                id="description"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600 focus:outline-none"
                placeholder={product?.description}
                minLength={400}
                maxLength={600}
                rows={8}
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end items-center">
            <button
              className="bg-orange-400 rounded-md px-4 py-2 cursor-pointer text-white hover:bg-green-700 transition-colors duration-300 ease-in-out flex items-center space-x-2 mt-8 disabled:opacity-50"
              type="submit"
              disabled={productDisplayImageUploadOngoing}
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
