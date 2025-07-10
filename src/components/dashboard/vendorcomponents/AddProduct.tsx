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

        const preset_key = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

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
      if (productDisplayImage.size > 2048 * 2048) {
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
        formData.append('upload_preset', preset_key!);
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
  <div className="main-container pb-10 px-4 lg:px-0">
  <h3 className="text-center mt-10 lg:mt-14 text-3xl font-semibold text-green-600">Add New Product</h3>
  <p className="text-center mt-2 text-gray-600 max-w-2xl mx-auto">
    Welcome, {userProfileFromDb?.name}! Please provide the necessary details below to add a new product. Ensure the information is accurate—you can always edit later.
  </p>

  {/* Form Container */}
  <div className="bg-white shadow-md rounded-xl mt-10 p-6 lg:p-10 max-w-5xl mx-auto">
    <form onSubmit={handleAddProduct}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div>
          <label htmlFor="productImage" className="block text-sm font-medium text-gray-700 mb-1">
            Product Image
          </label>
          <input
            type="file"
            id="productImage"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-gray-50"
            required
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
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
            id="name"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            placeholder="e.g. iPhone 15 Pro Max"
            minLength={3}
            maxLength={255}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-gray-50"
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            value={productPrice}
            onChange={(e) => setProductPrice(Number(e.target.value))}
            min={1}
            required
            placeholder="e.g. 999.99"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-gray-50"
          />
        </div>

        {/* Brand */}
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            value={productBrand}
            onChange={(e) => setProductBrand(e.target.value)}
            minLength={2}
            maxLength={50}
            required
            placeholder="e.g. Apple"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-gray-50"
          />
        </div>

        {/* Release Date */}
        <div>
          <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700 mb-1">
            Release Date
          </label>
          <input
            type="date"
            id="releaseDate"
            value={productReleaseDate}
            onChange={(e) => setProductReleaseDate(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-gray-50"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-gray-50"
          >
            <option value="">Select a category</option>
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
      </div>

      {/* Description */}
      <div className="mt-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Product Description
        </label>
        <textarea
          id="description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          rows={6}
          minLength={100}
          maxLength={600}
          required
          placeholder="Provide a detailed description of the product..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-gray-50"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={productDisplayImageUploadOngoing}
          className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {productDisplayImageUploadOngoing ? "Uploading..." : "Add Product"}
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default AddProduct;
