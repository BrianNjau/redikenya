const HeaderData = [
    {
        title: 'Search',
        link:"/search"
    },
   
    {
        title: 'Research',
        megamenu: [
            {
                title: <> 
                <span className="text-[15px]"><i className="solid-icon-Target mr-[1rem]"></i>Analyze</span>
                </>,
                dropdown: [
                    {
                        title:  <> 
                        <><i className="line-icon-Tactic mr-[1rem]"></i>Analyze ft</>
                        </>,
                        link: '#'
                    },
                    {
                        title:  <> 
                        <><i className="line-icon-Tactic mr-[1rem]"></i>Analyze ft</>
                        </>,
                        link: '#'
                    },
                    
                ],
            },
            {
                title: <> 
               <span className="text-[15px]" ><i className="solid-icon-Telescope mr-[1rem]"></i>Insights</span>
                </>,
                dropdown: [
                    {
                        title: <> 
                        <><i className="line-icon-Telescope mr-[1rem]"></i>Insight ft</>
                        </>,
                        link: '#',
                    },
                    {
                        title: <> 
                        <><i className="line-icon-Telescope mr-[1rem]"></i>Insights ft</>
                        </>,
                        link: '#',
                    },
                  
                ],
            },
           
            
        ]
    },
    {
        title: 'Invest',
        link:"/invest"
    },
    // {
    //     title: 'Locations',
    //     link:"/locations"
    // },
    // {
    //     title: 'Pipeline',
    //     link:"/pipeline"
    // },
    {
        title: 'Economics',
     link:"/economics"
    },
    {
        title: 'About',
        dropdown: [
            {
                title: 'About Us',
               link:'/about-us'
            },
            {
                title: 'Our Data Sources',
                link: '/data-sources'
            },
            {
                title: 'Contact',
                dropdown: [
                    {
                        title: 'Get in touch',
                        link: '#'
                    },
                   
                ]
            },
       
        ]
    },
 
]

export default HeaderData