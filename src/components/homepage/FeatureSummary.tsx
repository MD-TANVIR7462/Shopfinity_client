import card from '../../assets/images/CreditCard.png';
import support from '../../assets/images/Headphones.png';
import packaging from '../../assets/images/Package.png';
import trophy from '../../assets/images/Trophy.svg';

const FeatureSummary = () => {
  return (
    <div
      className="mt-14 lg:mt-20 border border-gray-100 rounded-md w-full grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 md:justify-items-center lg:justify-items-start gap-y-8 py-6 px-6 md:px-0 lg:p-6"
      data-aos="fade-down"
      data-aos-duration="1500"
    >
      {/* feature 1 */}
      <div className="flex space-x-4 col-span-12 md:col-span-6 lg:col-span-3">
        <img
          src={packaging}
          alt="packaging"
          className="object-contain w-10 h-10 col-span-6"
        />
        <div className="col-span-6">
          <h2 className="text-sm font-semibold text-custom-black uppercase">
            Faster Delivery
          </h2>
          <p className="text-sm  text-graish font-thin">Delivery in 24/4</p>
        </div>
      </div>
      {/* feature 2 */}
      <div className="flex space-x-4 col-span-12 md:col-span-6 lg:col-span-3">
        <img
          src={trophy}
          alt="packaging"
          className="object-contain w-10 h-10 col-span-6"
        />
        <div className="col-span-6">
          <h2 className="text-sm font-semibold text-custom-black uppercase">
            24 hours return
          </h2>
          <p className="text-sm  text-graish font-thin">
            100% money back guarantee
          </p>
        </div>
      </div>
      {/* feature 3 */}
      <div className="flex space-x-4 col-span-12 md:col-span-6 lg:col-span-3">
        <img
          src={card}
          alt="packaging"
          className="object-contain w-10 h-10 col-span-6"
        />
        <div className="col-span-6">
          <h2 className="text-sm font-semibold text-custom-black uppercase">
            Secure Payment
          </h2>
          <p className="text-sm  text-graish font-thin">Your money is safe</p>
        </div>
      </div>
      {/* feature 4 */}
      <div className="flex space-x-4 col-span-12 md:col-span-6 lg:col-span-3 md:-ml-8 lg:ml-0">
        <img
          src={support}
          alt="packaging"
          className="object-contain w-10 h-10 col-span-6"
        />
        <div className="col-span-6">
          <h2 className="text-sm font-semibold text-custom-black uppercase">
            Support 24/7
          </h2>
          <p className="text-sm  text-graish font-thin">
            Live contact / message
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureSummary;
