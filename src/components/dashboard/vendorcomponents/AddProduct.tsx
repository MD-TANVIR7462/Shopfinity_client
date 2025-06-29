'use client';

import CheckRoleAndLogout from '@/hooks/CheckRoleAndLogout';
import { useGetProfileQuery } from '@/redux/api/authApi';
import { useCreateProductMutation } from '@/redux/api/productApi';
import { TReview } from '@/types/commonTypes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AddProduct = () => {
  CheckRoleAndLogout('vendor');
  const navigate = useNavigate();

  const [productTitle, setProductTitle] = useState<string>('');
  const [productPrice, setProductPrice] = useState<number>(0);
  const [productReviews, setProductReviews] = useState<TReview[]>([]);
  const [productBrand, setProductBrand] = useState<string>('');
  const [productCategory, setProductCategory] = useState<string>('');
  const [productPhotos, setProductPhotos] = useState<string[]>([]);
  const [productDisplayImage, setProductDisplayImage] = useState<any>(
    '' as any
  );
  const [productDescription, setProductDescription] = useState<string>('');
  const [productRunningDiscount, setProductRunningDiscount] =
    useState<number>(0);
  const [productReleaseDate, setProductReleaseDate] = useState<string>('');
  const [
    productDisplayImageUploadOngoing,
    setProductDisplayImageUploadOngoing,
  ] = useState<boolean>(false);

  const { data: profileData } = useGetProfileQuery(undefined);
  const userProfileFromDb = profileData?.data;

  const [createProduct] = useCreateProductMutation();

  // handle product image upload
  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productData = {
      title: productTitle,
      price: productPrice,
      // minimum 20 and maximum 70 random static stock
      stock: Math.floor(Math.random() * (70 - 20 + 1) + 20),
      reviews: productReviews,
      brand: productBrand,
      category: productCategory,
      photos: productPhotos,
      displayImage: productDisplayImage,
      description: productDescription,
      vendor: userProfileFromDb?.email,
      runningDiscount: productRunningDiscount,
      releaseDate: productReleaseDate,
    };

    const preset_key = "tanvir7462";
    const cloud_name = "dsmbm1bvy";

    const formData = new FormData();

    if (!productDisplayImage) {
      setProductDisplayImageUploadOngoing(false);
      toast.error('Please select product image.', {
        position: 'top-right',
        duration: 1500,
        icon: ' ❌',
      });
      return;
    }
    if (productPrice < 1 || isNaN(productPrice)) {
      setProductDisplayImageUploadOngoing(false);
      toast.error('Price must be number and greater than or equl 1.', {
        position: 'top-right',
        duration: 1500,
        icon: ' ❌',
      });
      return;
    }
    if (productDescription?.length < 400) {
      toast.error('Description must be at least 400 characters.', {
        position: 'top-right',
        duration: 1500,
        icon: ' ❌',
      });
      return;
    }
    if (productTitle?.length < 3) {
      toast.error('Product name must be at least 3 characters.', {
        position: 'top-right',
        duration: 1500,
        icon: ' ❌',
      });
      return;
    }
    if (
      productTitle === '' ||
      productBrand === '' ||
      productCategory === '' ||
      productReleaseDate === ''
    ) {
      setProductDisplayImageUploadOngoing(false);
      toast.error('Please fill all the fields.', {
        position: 'top-right',
        duration: 1500,
        icon: ' ❌',
      });
      return;
    }

    // check if image size is less than 1MB and type is jpg, jpeg or png
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
      }
    }

    setProductDisplayImageUploadOngoing(true);

    await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (data?.secure_url) {
          productData.displayImage = data.secure_url;
          const response = await createProduct(productData).unwrap();

          if (response?.statusCode === 201) {
            toast.success('Product created successfully.', {
              position: 'top-right',
              duration: 1500,
            });
            setProductDisplayImageUploadOngoing(false);
            setProductTitle('');
            setProductPrice(0);
            setProductReviews([]);
            setProductBrand('');
            setProductCategory('');
            setProductPhotos([]);
            setProductDisplayImage('');
            setProductDescription('');
            setProductRunningDiscount(0);
            setProductReleaseDate('');
            navigate('/dashboard/vendor/manage-products');
          } else {
            toast.error('Failed to create new product, please try again.', {
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
  };

  return (
    <div className="main-container pb-8">
      <h3 className="text-center mt-10 lg:mt-14 text-2xl">Add New Product</h3>
      <p className="text-center lg:mt-2 md:text-md lg:w-2/3 lg:mx-auto">
        Welcome, {userProfileFromDb?.name}! Here you can add a new product to
        your store. Please fill in the details below. Make sure to provide
        accurate information. You can always edit the product later.
      </p>
      {/* Add Product Form */}
      <div className="lg:w-10/12 lg:mx-auto shadow px-4 py-4 lg:px-10 md:pt-12 md:pb-8 rounded mt-6">
        <form onSubmit={handleAddProduct}>
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
                required
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
                placeholder="e.g. Samsung Galaxy S24 Ultra 5G"
                minLength={3}
                maxLength={255}
                required
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
                placeholder="e.g. 499.99"
                required
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
                placeholder="e.g. Samsung"
                minLength={3}
                maxLength={50}
                required
                value={productBrand}
                onChange={(e) => setProductBrand(e.target.value)}
              />
            </div>
            {/* release date */}
            <div className="col-span-12 md:col-span-6">
              <label
                htmlFor="releaseDate"
                className="block mb-2 text-sm font-semibold"
              >
                Release Date
              </label>

              <input
                type="date"
                name="releaseDate"
                id="releaseDate"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                placeholder="e.g. January 28, 2024"
                required
                value={productReleaseDate}
                onChange={(e) => setProductReleaseDate(e.target.value)}
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
                required
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
              >
                <option value="" defaultValue="">
                  select
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
                placeholder="e.g. The Samsung Galaxy S24 Ultra 5G is the latest flagship smartphone from Samsung. It comes with a 6.8-inch Super AMOLED display, Exynos 2200 chipset, 108MP camera, and 5000mAh battery."
                minLength={400}
                maxLength={600}
                rows={8}
                required
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
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
