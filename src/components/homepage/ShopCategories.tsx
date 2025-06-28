import { categoriesData } from '@/utils/demoDataForHome';

const ShopCategories = () => {
  return (
    <div
      className="mt-14 lg:mt-20"
      data-aos="fade-down"
      data-aos-duration="1500"
    >
      <h3 className="text-center text-custom-black text-3xl font-bold mb-10">
        We Proudly Sell
      </h3>
      <div className="grid grid-cols-12 gap-4">
        {categoriesData?.map((category) => {
          return (
            <div
              key={category.id}
              className="col-span-6 lg:col-span-2 flex justify-center items-center flex-col gap-y-4 border border-gray-100 py-3 px-4"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-20 h-20 object-cover"
              />
              <p className="text-center text-sm font-semibold">
                {category.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopCategories;
