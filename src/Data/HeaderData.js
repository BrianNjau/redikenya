import { Link } from "react-router-dom";
import MenuImg from "../Assets/img/menuImg.png";
const HeaderData = [
  {
    title: "Products",
    megamenu: [
      {
        title: (
          <div className="font-serif container mx-auto w-full flex flex-wrap justify-between mx-2">
            <div className="w-full text-[#3EB489] mb-2">
              <h6 className="font-semi-bold text-md">
                Data-Driven Property Insights at Your Fingertips
              </h6>
              {/* <p>
                Sub-hero message, not too long and not too short. Make it just
                right!
              </p> */}
            </div>
            <div className="flex">
              <ul className="mr-1 w-[28vh] border-gray-600 border-b sm:border-r lg:border-b-0 pb-6">
                <div className="flex items-center">
                  {/* <svg
                    className="h-8 mb-3 mr-3 fill-current text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 6c0-1.1.9-2 2-2h8l4-4h2v16h-2l-4-4H5a2 2 0 0 1-2-2H1V6h2zm8 9v5H8l-1.67-5H5v-2h8v2h-2z" />
                  </svg> */}
                  <span className="font-bold text-white text-bold mb-2">
                    Buy or Rent
                  </span>
                </div>
                <p className="text-gray-100 text-sm text-balance">
                  Leverage AI- tools to uncover investment insights.
                </p>

                <div className="flex items-center py-3">
                  {/* <svg
                    className="h-6 pr-3 fill-current text-blue-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                  </svg> */}
                  <Link
                    to="/invest"
                    className="text-white bold border-b-2 border-[#3EB489] hover:text-[#3EB489]"
                  >
                    Explore
                  </Link>
                </div>
              </ul>
              <ul className="mr-1  w-[28vh] border-gray-600 border-b sm:border-r lg:border-b-0 pb-6">
                <div className="flex items-center">
                  {/* <svg
                    className="h-8 mb-3 mr-3 fill-current text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 6c0-1.1.9-2 2-2h8l4-4h2v16h-2l-4-4H5a2 2 0 0 1-2-2H1V6h2zm8 9v5H8l-1.67-5H5v-2h8v2h-2z" />
                  </svg> */}
                  <span className="font-bold text-white text-bold mb-2">
                    Area Data
                  </span>
                </div>
                <p className="text-gray-100 text-sm text-wrap">
                  Dive deep into detailed property analytics by location.
                </p>
                <div className="flex items-center py-3">
                  {/* <svg
                    className="h-6 pr-3 fill-current text-blue-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                  </svg> */}
                  <Link
                    to="/area-data"
                    className="text-white bold border-b-2 border-[#3EB489] hover:text-[#3EB489]"
                  >
                    Explore
                  </Link>
                </div>
              </ul>
              <ul className="  w-[23vh] border-gray-600 border-b sm:border-r lg:border-b-0 pb-6">
                <div className="flex items-center">
                  {/* <svg
                    className="h-8 mb-3 mr-3 fill-current text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 6c0-1.1.9-2 2-2h8l4-4h2v16h-2l-4-4H5a2 2 0 0 1-2-2H1V6h2zm8 9v5H8l-1.67-5H5v-2h8v2h-2z" />
                  </svg> */}
                  <span className="font-bold text-white text-bold mb-2">
                    Property Search
                  </span>
                </div>
                <p className="text-gray-100 text-sm text-balance">
                  Explore properties by location, with visual data charts.
                </p>
                <div className="flex items-center py-3">
                  {/* <svg
                    className="h-6 pr-3 fill-current text-blue-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                  </svg> */}
                  <Link
                    to="/search"
                    className="text-white bold border-b-2 border-[#3EB489] hover:text-[#3EB489]"
                  >
                    Explore
                  </Link>
                </div>
              </ul>
            </div>
          </div>
        ),
        dropdown: [
          {
            title: <>{/* <>Analyze ft</> */}</>,
            link: "#",
          },
          {
            title: <>{/* <>Analyze ft</> */}</>,
            // link: "#",
          },
        ],
      },
      // {
      //   title: (
      //     <>
      //       <span className="text-[15px]">
      //         <i className="solid-icon-Telescope mr-[1rem]"></i>Insights
      //       </span>
      //     </>
      //   ),
      //   dropdown: [
      //     {
      //       title: (
      //         <>
      //           <>
      //             <i className="line-icon-Telescope mr-[1rem]"></i>Insight ft
      //           </>
      //         </>
      //       ),
      //       link: "#",
      //     },
      //     {
      //       title: (
      //         <>
      //           <>
      //             <i className="line-icon-Telescope mr-[1rem]"></i>Insights ft
      //           </>
      //         </>
      //       ),
      //       link: "#",
      //     },
      //   ],
      // },
    ],
  },

  // {
  //   title: "Explore",
  //   dropdown: [
  //     {
  //       title: "Search",
  //       link: "/search",
  //     },
  //     {
  //       title: "Invest",
  //       link: "/invest",
  //     },
  //     {
  //       title: "Area",
  //       link: "/area-data",
  // dropdown: [
  //     {
  //         title: 'Get in touch',
  //         link: '#'
  //     },

  // ]
  // },
  // {
  //     title: 'Pipeline',
  //     link: '/pipeline',
  // dropdown: [
  //     {
  //         title: 'Get in touch',
  //         link: '#'
  //     },

  // ]
  // },
  //   ],
  // },

  // {
  //   title: "Economics",
  //   link: "/economics",
  // },

  {
    title: "About",
    link: "/about-us",
    // dropdown: [
    //   {
    //     title: "About Us",
    //     link: "/about-us",
    //   },
    //   {
    //     title: "Terms of Use",
    //     link: "/terms",
    //   },
    //   {
    //     title: "Contact Us",
    //     link: "/contact-us",
    // dropdown: [
    //     {
    //         title: 'Get in touch',
    //         link: '#'
    //     },

    //     // ]
    //   },
    // ],
  },

  {
    title: "Support",
    link: "/support",
  },
  // {
  //   title: "Pipeline",
  //   link: "/pipeline",
  // },
  // {
  //   title: "Pricing",
  //   link: "/pricing",
  // },
];

export default HeaderData;
