import { FaArrowRightLong } from 'react-icons/fa6';
import { toast } from 'sonner';
import calendar from '../../assets/images/CalendarBlank.png';
import comment from '../../assets/images/ChatCircleDots.png';
import user from '../../assets/images/UserCircle.png';
import blog1 from '../../assets/images/blog1.png';
import blog2 from '../../assets/images/blog2.png';
import blog3 from '../../assets/images/blog3.png';

const blogs = [
  {
    id: 1,
    image: blog1,
    name: 'Jalal uddin',
    date: '19 Dec, 2023',
    comments: 453,
    title:
      'Cras nisl dolor, accumsan et metus sit amet, vulputate condimentum dolor.',
    content:
      'Maecenas scelerisque, arcu quis tempus egestas, ligula diam molestie lectus, tincidunt malesuada arcu metus posuere metus.',
  },
  {
    id: 2,
    image: blog2,
    name: 'Akib',
    date: '14 Jan, 2024',
    comments: 234,
    title:
      'Cras nisl dolor, accumsan et metus sit amet, vulputate condimentum dolor.',
    content:
      'Maecenas scelerisque, arcu quis tempus egestas, ligula diam molestie lectus, tincidunt malesuada arcu metus posuere metus.',
  },
  {
    id: 3,
    image: blog3,
    name: 'Tanvir',
    date: '23 Mar, 2024',
    comments: 345,
    title:
      'Cras nisl dolor, accumsan et metus sit amet, vulputate condimentum dolor.',
    content:
      'Maecenas scelerisque, arcu quis tempus egestas, ligula diam molestie lectus, tincidunt malesuada arcu metus posuere metus.',
  },
];

const handleBlogClick = () => {
  toast.error('This feature is not available yet.', {
    position: 'top-right',
    duration: 1500,
    icon: '🚫',
  });
};

const Blog = () => {
  return (
    <div className="mt-14 lg:mt-20 py-8 lg:py-20 bg-offwhite">
      <h3 className="text-2xl lg:text-3xl font-semibold text-center text-custom-black mb-6 lg:mb-10">
        Latest News
      </h3>
      <div className="main-container grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 justify-items-center">
        {blogs.map((blog) => (
          <div
            className="bg-white p-6 md:py-3 md:px-2 lg:p-6 rounded-sm"
            key={blog.id}
            data-aos="fade-down"
            data-aos-duration="1500"
          >
            <img
              src={blog.image}
              alt="blog1"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            {/* blog header */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <img
                  src={user}
                  alt="user"
                  className="w-5 h-5 object-contain rounded-full"
                />
                <p className="text-graish text-sm">{blog.name}</p>
              </div>
              <div className="flex items-center space-x-1">
                <img
                  src={calendar}
                  alt="calendar"
                  className="w-5 h-5 object-contain rounded-full"
                />
                <p className="text-graish text-sm">{blog.date}</p>
              </div>
              <div className="flex md:hidden lg:flex items-center space-x-1 ">
                <img
                  src={comment}
                  alt="chat"
                  className="w-5 h-5 object-contain rounded-full"
                />
                <p className="text-graish text-sm">{blog.comments}</p>
              </div>
            </div>
            {/* blog content */}
            <h4 className="text-custom-black text-sm lg:text-[18px] font-semibold mt-2.5">
              {blog.title}
            </h4>
            <p className="text-sm text-offgray my-3">{blog.content}</p>
            <button
              className="border-2 border-orange-400 py-2 lg:py-2.5 px-3 lg:px-6 rounded text-orange lg:font-semibold flex items-center gap-x-2 hover:bg-orange-400 hover:text-white transition-all duration-300 ease-in-out"
              onClick={() => handleBlogClick()}
            >
              Read More <FaArrowRightLong />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
