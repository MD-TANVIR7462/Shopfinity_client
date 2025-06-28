import member1 from '../../assets/images/about/Image (1).png';
import member2 from '../../assets/images/about/Image (2).png';
import member3 from '../../assets/images/about/Image (3).png';
import member4 from '../../assets/images/about/Image (4).png';
import member5 from '../../assets/images/about/Image (5).png';
import member6 from '../../assets/images/about/Image (6).png';
import member7 from '../../assets/images/about/Image (7).png';

const coreTeamMemberOptions = [
  {
    id: 1,
    img: member1,
    name: 'Babul Akter',
    position: 'CEO & Founder',
  },
  {
    id: 2,
    img: member2,
    name: 'John Doe',
    position: 'Chief Marketing Officer',
  },
  {
    id: 3,
    img: member3,
    name: 'Jane Doe',
    position: 'Chief Financial Officer',
  },
  {
    id: 4,
    img: member4,
    name: 'Kevin Doe',
    position: 'Head of Sales',
  },
  {
    id: 5,
    img: member5,
    name: 'Katherine Doe',
    position: 'Accountant Officer',
  },
  {
    id: 6,
    img: member1,
    name: 'Robiul Awal',
    position: 'Marketing Officer',
  },
  {
    id: 7,
    img: member6,
    name: 'Mia Diaz',
    position: 'Graphics Designer',
  },
  {
    id: 8,
    img: member7,
    name: 'Diya Devin',
    position: 'Web Developer',
  },
];

const CoreTeamMember = () => {
  return (
    <div className=" mt-8 lg:mt-20">
      <div
        className="main-container"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        <h3 className="text-custom-black font-semibold text-2xl lg:text-3xl mt-5 md:text-center">
          Our core team member
        </h3>
        <div className="mt-5 lg:mt-10 grid grid-cols-12 md:grid-cols-12 gap-x-6 gap-y-5">
          {coreTeamMemberOptions.map(
            (option: {
              id: number;
              img: string;
              name: string;
              position: string;
            }) => (
              <div
                key={option.id}
                className="col-span-12 md:col-span-4 lg:col-span-3 border border-gray-200 p-3 lg:p-6 rounded-md"
              >
                <div className="flex justify-start items-center space-x-3">
                  <img
                    src={option.img}
                    alt={option.name}
                    className="object-contain"
                  />
                  <div className="flex flex-col space-y-1">
                    <p className="text-custom-black font-semibold">
                      {option.name}
                    </p>
                    <p className="text-pure-gray text-sm">{option.position}</p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CoreTeamMember;
