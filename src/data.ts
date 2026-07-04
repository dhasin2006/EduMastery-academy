/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, ActiveCourse, RecentActivity, Certificate, Deadline, SyllabusModule } from './types';

export const COURSES_DATA: Course[] = [
  {
    id: 'analytics-ai',
    title: 'Advanced Predictive Analytics & AI',
    category: 'Data Science',
    instructor: 'Dr. Julian Vance & Dr. Sarah Chen',
    instructorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUzVCFnsRodGvAokc0H2RwAM4wvBj3qc_R4mXLA5cHoboAwxcxgqwaTQgObAfB8q5axekuK3V5Gr_rkUgAPuhtgEoNB9EixtvFeLqkgDp2JSZZU0GpmEsXL1l1B8JQZI8tIPLpfp4eY_laQ_t3I_Nn6S3XhnmpKmVNVGM4tpLMGM2GRngZ8PJ015rk4bxxTLk92eax6evS3sW67M_lGXbipP6cl-MASUO2mGj_ir6Yxmjz4CUBVrqRnt_YJsdfSQbV9X3XdzpViO0',
    level: 'Advanced',
    duration: '12 Weeks',
    durationCategory: 'Medium',
    price: 1299,
    rating: 4.9,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMKCqtixLpIa6YZIqSElwkfwKT0PIVJzt6wOojbnuPSPBjrZ86VrqghVqsLWl9Nyht0NiAtafgYsKxfwHZEe5CwlWNywQ7pYkbSOT8293ILbQSfjlY68TMko6AtdjS0vty6LGbZ5gTzMQktKAoYxA5leUPxnnuL6v4-Od7m6OcTSLgmL9GJiPRcTa20Fm-RUPbLsgBBhw45_I-H5JY1Nb8YKKC_bc1lLXsnxolxyDoZdV22PUW8Fp97BZwrCjhZk6jXFH-qkOYL6o',
    isBestseller: true,
    lessonsCount: 36,
    description: 'Master predictive modeling, deep learning architectures, and high-performance AI forecasting frameworks designed for senior data science professionals.'
  },
  {
    id: 'executive-strategy',
    title: 'Executive Strategy & Risk Mitigation',
    category: 'Business & Leadership',
    instructor: 'Marcus Aurelius Thorne',
    instructorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3-xKw2tuhb_p1D7IKp6H6K7meEmkPFbYp_shRYuYTDM12DuyBOV6hKASuMIwfVZv-hn4H2bBqjWK7BD9UZkCVNnYuyHnIKLXLdeRhVQVYBl-B1gacQ0C6tR8qo5U8q6EPsm8lffu4vw3_4B_LMsGH3mjn7eggXUfkQ-4KaT71TdMcHBGX6JPB6VKR2pYp6OK9HQfQkQjCrgUkwjuYpdPEOPscHRjV9zTt_XJKanFzBgMnaZGl8R-iV-53XNsolu9cLroKkU1rFFQ',
    level: 'Advanced',
    duration: '8 Weeks',
    durationCategory: 'Medium',
    price: 2450,
    rating: 4.8,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7CaVAwJijukc8FNEGR01FQ5x_G0Br93sMvR6YFx5TN6yPNzBDnQVzPepeEPZYy6z0YWPQ2CKBuuVN19FEbaG5ZKLAe4La6Az_NG9sbN9oeDaQFDNzEtcTZeJQuKDiBgM1Zgm6lFnm17laLrjrQJ4PMUgtUU0b8TKC3-pzOd3hQ8rHbbET8hZQxEI5RxccBx6Ob56diTslwnFOvgwDWmuYTNOyICPDrVGQwW_UpVz3GaRosmWK3-ka9DJ5w-7FW8ajSpQLlUlTNtw',
    isNew: true,
    lessonsCount: 24,
    description: 'Equip yourself with the tools to navigate high-stakes corporate leadership, corporate defense, and macroeconomic resource optimization.'
  },
  {
    id: 'cloud-native',
    title: 'Cloud-Native Distributed Systems',
    category: 'Software Engineering',
    instructor: 'Elena Rodriguez, Principal Architect',
    instructorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe1jBj2o9gxQokojjEzEbPgC_XHDnUsGkD7fs97QukkaDK91JCZRPWGw_3F19ltpsrM9tL-BKGfPFB8-wiGumlI8x3Xo7iTRMYvRL5RhvzkbiuGuYKk1GXXlBBkXOWJ3xDzEiMqhgoO6jucqWKbBIfuiwHDOp1L-A2VqJCobpvLNoNqMJQLVlTVUsT8P_bSiL48KRg32oXnQy6PEifF1ydQ7kiaM-iIoJBtR6MMZNilMOXDbTreDGggt-vx9XwajMMPw6L3LgY3y0',
    level: 'Advanced',
    duration: '16 Weeks',
    durationCategory: 'Intensive',
    price: 1890,
    rating: 5.0,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsxeyyao9vXT_reEXm_8jK87qefZ1qE8YXu32uMvxF0lngPy-FD2_DpXYzLmzAps9JF0mdZIY9Jm_40SFfN_FA_iGJxQ320AeF8lTewo2tqFyihJ-aYR3YiOHa2Jw0x0V4k3YWP6pEuMf3dSISdd5v9CPXXIH-UV4YT6u7nEZqvW667A3fMyoT493dn33LEe9DJpVvmAjPbmguimr7fI__NmIIgCRzlzavsRzKwiCq6cmfQpsl0GmtkJ7Y3ppsCYgISbbq5iU8SQw',
    lessonsCount: 48,
    description: 'Design massive-scale fault-tolerant services using Kubernetes, advanced event-driven microservices, and reactive consensus structures.'
  },
  {
    id: 'behavioral-marketing',
    title: 'Behavioral Economics in Marketing',
    category: 'Digital Marketing',
    instructor: 'Professor Simon Sterling',
    instructorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP00RYmQ89HfbbLsysiKjX1x7T1Re54rBfRf_9ndPna_VH0nEOippENkKQUFq5kJnaoWmT1YTsEF0dELHKZ_CpdSWvxMSuY30w-q7Yte7pUUFWaBPlGhs7CsfPJFmumP2EcqtH2701RYA4YBguWOVU4hccI66DHKE3_uUqRzEtNMMrMcEWixeFBt00YxH58L4FVKlMn51xFXwu7435V2TYhwkiXLOawGWpNn59M8zNXCB-P7qduY0g8eHqkGuF24I09UYt66kQJcE',
    level: 'Intermediate',
    duration: '6 Weeks',
    durationCategory: 'Short',
    price: 850,
    rating: 4.7,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM3Q0yIKezF7OJ7CUfgl-1qpl3sqMpeBegrSHXwMo9sTu_mKtYNZVgBgRjwomDceMyLe8-ci50TZZbvGQWyN4jGT0aYTV8G6TO_wvmeYL-gRD7OJyXff9x2_KEQb4gi6QaojMmj_EUDB7Bn1ifaG1zGZZtIx3inTOAi3LehQHZVATbebSUFd6KhgMwWe8t3HQ2kqsu_GNO7vvseoRcMz9qYVC5ToIVBt2jfqtG_bCxprxpEiQECI_qd8impWBLcQ-694zFTm4gqMI',
    lessonsCount: 18,
    description: 'Bridge cognitive science and performance marketing. Understand customer heuristics to optimize campaign conversion funnels and branding loops.'
  },
  {
    id: 'algorithmic-trading',
    title: 'Algorithmic Trading & Quantitative Finance',
    category: 'Finance',
    instructor: 'Jameson K. Finch, Hedge Fund Manager',
    instructorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDu68KHpp_iub7Pa7swUEHdTsNwnh3FdYTfj2i2ysj1_fAjCZIxUhxVNr5hDi-2BPv4krsoHQA5cH_vs0uG-DCETzv1mjsUEThjzYUdaQVFDxvE5o-GMNo6MXpAjOOohvMrBwg9wW-IwqfuTc0zNJN2qPBDq8xQM3t35IbiZIhCJ-0HiUIfgPwurBxkCPkZfr3UuhCzEkd-XJQBcnTCmsu9J5i3BdFYqJdDH0xcbM3KtIfHR3u1XDEYEQ60Jt54EAJCZ6-9UPruZAo',
    level: 'Advanced',
    duration: '14 Weeks',
    durationCategory: 'Intensive',
    price: 3100,
    rating: 4.9,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZhOgaty0lTIPTunmWig-g4Pq6i98Gati1aLSdGPgFEBMWN-5Z_rj90jtXokvucGkPf6y7HNpe2QLXo87cV5YfGSPgbPNwS8ll3pIWXTOh4dt6oMYuImKMtVsGaNdCRMEmez5pbysEkbEenNkhhRvlWCGhtZ7a5NIODyCjBJognMpjBzQhtpORK0bpB9IUE3AlWTYEsg_xaOuBnPbTNLT8yFflseXCShe-kwMNtpwo-NId9tGAV2J6z8QG-spnr5UhW94LCTAXI74',
    lessonsCount: 42,
    description: 'Formulate, backtest, and deploy high-frequency quantitative systems using advanced statistical arbitrage, mean reversion, and reinforcement learning.'
  },
  {
    id: 'sustainable-arch',
    title: 'Sustainable Urban Architecture',
    category: 'Design',
    instructor: 'Maya Isadora, AIA',
    instructorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjkUfrLB87IG9L28Vn6tJxOJ_izWtTFD9O5U5pqM_iDtR3l8_jAIZnHx8e0ekbGQMHYY9mTOWxflPwf3WvujOOHtra3MWOcFmG0agFiUB7HBf-nYfXNq4cxGbWNMaS23ZAaLs-9w50KvJFf1DEA_Be1PI8wCMXkSx9Yfz5Xgjjy7kYNF4FpgAsTlkh2-gi9g7TB8jzD2nYC3gTQ6rStnKwa3p-YsGA1Qoc8qBZIfiqOtt3Gv2OYmMAqQm5HuDGXHz93nzFu4k0S6M',
    level: 'Advanced',
    duration: '10 Weeks',
    durationCategory: 'Medium',
    price: 1550,
    rating: 4.6,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRTYo0eicomNUpW62RBqfbirIDZYee1Mt_Bbe6mmMt-mO22eFoKE-gdxFIP9-V2gNLgLzUeBGMQAdSIlzGBbZG7nxsBp63pqWJAJPnzdE9NJF1u2V9MXTWrXWYdlyqmIlvxnpLoof6jZUE68DWxz88X5Us4b8OOdP7cU882CBzFgWDxAqKeW0v2RzG2yrECwAJiPD6vxcbivvL1MdiwwYdGUiMBeXEg_yeKRmoixVTRu6YEWTOzolGGEMICBO9iMQu6P_6LW_7Ka0',
    lessonsCount: 30,
    description: 'Learn modern principles of low-impact structural design, passive solar systems, dynamic ventilations, and local smart-grid material integration.'
  },
  {
    id: 'quant-analysis',
    title: 'Advanced Quantitative Analysis & Forecasting',
    category: 'Data Science',
    instructor: 'Dr. Sarah Chen',
    instructorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUzVCFnsRodGvAokc0H2RwAM4wvBj3qc_R4mXLA5cHoboAwxcxgqwaTQgObAfB8q5axekuK3V5Gr_rkUgAPuhtgEoNB9EixtvFeLqkgDp2JSZZU0GpmEsXL1l1B8JQZI8tIPLpfp4eY_laQ_t3I_Nn6S3XhnmpKmVNVGM4tpLMGM2GRngZ8PJ015rk4bxxTLk92eax6evS3sW67M_lGXbipP6cl-MASUO2mGj_ir6Yxmjz4CUBVrqRnt_YJsdfSQbV9X3XdzpViO0',
    level: 'Advanced',
    duration: '12 Weeks',
    durationCategory: 'Medium',
    price: 199,
    rating: 4.9,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFjJK-OqY1t7GHX04qPLlz7XU-kOlzsHnAc1Y1wmyeueQt0MiihftgW7oMIHVx4TjczLI5awuu3dCwW69XX6R0Gm0rIk_Bpaj2DWg61INI7_EEb3aUGLZHJJcm5DK8evq3vCbYHQgiEMnNXF5z98UfzQH-AxOSy4UL-bTFskoTI_hktxyKLEiRJO2cBa5-bLgd4XmvzTlkDczSyHt2zosb14iYcX34WAXbw4DVzCcI47bf_plUugfanKhKeVQfaBPHesFaWXb-0fc',
    isBestseller: true,
    lessonsCount: 24,
    description: 'A mathematical masterclass focusing on high-accuracy timeseries analysis, non-linear forecasting structures, and modern stochastic calculus.'
  },
  {
    id: 'global-ops',
    title: 'Strategic Executive Management & Global Ops',
    category: 'Business & Leadership',
    instructor: 'Marcus Sterling',
    instructorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3-xKw2tuhb_p1D7IKp6H6K7meEmkPFbYp_shRYuYTDM12DuyBOV6hKASuMIwfVZv-hn4H2bBqjWK7BD9UZkCVNnYuyHnIKLXLdeRhVQVYBl-B1gacQ0C6tR8qo5U8q6EPsm8lffu4vw3_4B_LMsGH3mjn7eggXUfkQ-4KaT71TdMcHBGX6JPB6VKR2pYp6OK9HQfQkQjCrgUkwjuYpdPEOPscHRjV9zTt_XJKanFzBgMnaZGl8R-iV-53XNsolu9cLroKkU1rFFQ',
    level: 'Advanced',
    duration: '10 Weeks',
    durationCategory: 'Medium',
    price: 249,
    rating: 4.7,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsDGzanK0HG_9jiRiTm4tUVR80SrOXccjeSHlP7jyeV_qwdBvNW9ke-Fwjj7_vYFmXktKU-vHqA2oXta-v0BbF5ABGapB9amKqyr5s-h-qPLWhQ9M7uQc4mu7Dqpp_hyrA2y8Q5lONjLmuIUD4G0u02ODQFxKMXZI4pgANUQL2PUAoEb7mh4Ie1JaeI5KUrBFU3flBriRURymA6B5YiF-Y4c9s-0sMDRSljrljxcxsiuFiZCUCGfQwkehKHs1yhFSloP4PyEarcMI',
    isNew: true,
    lessonsCount: 18,
    description: 'Learn modern operations metrics, distributed supply networks, enterprise expansion design, and multi-national governance structures.'
  },
  {
    id: 'psych-ux',
    title: 'The Psychology of UX: Design for High-Conversion',
    category: 'Design',
    instructor: 'Elena Rossi',
    instructorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjkUfrLB87IG9L28Vn6tJxOJ_izWtTFD9O5U5pqM_iDtR3l8_jAIZnHx8e0ekbGQMHYY9mTOWxflPwf3WvujOOHtra3MWOcFmG0agFiUB7HBf-nYfXNq4cxGbWNMaS23ZAaLs-9w50KvJFf1DEA_Be1PI8wCMXkSx9Yfz5Xgjjy7kYNF4FpgAsTlkh2-gi9g7TB8jzD2nYC3gTQ6rStnKwa3p-YsGA1Qoc8qBZIfiqOtt3Gv2OYmMAqQm5HuDGXHz93nzFu4k0S6M',
    level: 'Intermediate',
    duration: '16 Weeks',
    durationCategory: 'Intensive',
    price: 149,
    rating: 5.0,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcI7eFwK-PHi7R8IdBrcI9C726JPXd0RtIwNi6X0sxzzd6JJIxRj4yoVdj30GOVXG5mDZ-WKM1jIfRf2M5r8qLlxcudfC67grdtDqkG28blH9yAzkLcL_WxoNqfHww4q3akX9H8fC-qDI0l3Lsmo7Qg4fMdTpADpfvhzKwN_GtAn6Su675DKIx8TC1tU5UWtsfzWQS3maZnZ4nEW8VWgBvjq3hF4Lq7oZzDcm9YoN_KldFJoAxFrUHYVuq9RVcr5QKQp9dQeZFN0g',
    lessonsCount: 32,
    description: 'Deconstruct visual attention patterns, user cognitive load constraints, micro-delight mechanics, and conversions design fundamentals.'
  },
  {
    id: 'intro-leadership',
    title: 'Principles of Modern Team Management',
    category: 'Business & Leadership',
    instructor: 'Marcus Aurelius Thorne',
    instructorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3-xKw2tuhb_p1D7IKp6H6K7meEmkPFbYp_shRYuYTDM12DuyBOV6hKASuMIwfVZv-hn4H2bBqjWK7BD9UZkCVNnYuyHnIKLXLdeRhVQVYBl-B1gacQ0C6tR8qo5U8q6EPsm8lffu4vw3_4B_LMsGH3mjn7eggXUfkQ-4KaT71TdMcHBGX6JPB6VKR2pYp6OK9HQfQkQjCrgUkwjuYpdPEOPscHRjV9zTt_XJKanFzBgMnaZGl8R-iV-53XNsolu9cLroKkU1rFFQ',
    level: 'Beginner',
    duration: '4 Weeks',
    durationCategory: 'Short',
    price: 499,
    rating: 4.5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBihvQpEcvgR9bEzoTeSBUl3e9v88eJbX-TNvfu6Aaa-kYrky-nTgOUFts_m_NSDR6P9PdZH1f4unDXK9i_yKvioMRZlRfjfgeYPM9sKndkbkDkSAbyRFkY3LBWYMv0epLB7Mb2EFEp9lLxZ16bOlldywpv2XVgqpQbTc611DZaMy5Eh1ISkY14izw7C-uv261IPuYCORMYCfAMtp0m8sPw3QvKTqpMyoyBUESZsbpbvWbHmk7w1y3HTxcf6UmecBX0Rkl6qmSihHo',
    lessonsCount: 12,
    description: 'Establish foundational communication standards, clear performance metrics, task assignment architectures, and team dynamic baselines.'
  }
];

export const ACTIVE_COURSES_DATA: ActiveCourse[] = [
  {
    id: 'active-1',
    courseId: 'analytics-ai',
    title: 'Advanced Leadership Strategy',
    progress: 65,
    instructor: 'Dr. Sarah Williams',
    category: 'Strategic',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDin3skF1Ykmh_aQCp3daTFikTqSo8JNIx1nslrxW0AlHConpw5zi0zKgk5QQqxBdEFAtXYBqMCzIuIdmhmt4Z7RVkb152jtGJSWSZdVNcqHi85g2OtJNu_dMStX6zMzfoE0zBkBZsdowDXpKo7cCzhsvNuoG5olsT8QLZ4R8mdbjNy1HZtCCQ_GTGtGit8t6DBV9BqdmReTFmQh1nTi6MKm-ROUxw0wqgj6_kR7QjofDUvUWzjKqeAhByxqBGJ8e4ywGVaWpaHl2M',
    currentModule: 'Module 2: Advanced Strategy',
    currentLesson: '2.1 Leadership Dynamics'
  },
  {
    id: 'active-2',
    courseId: 'algorithmic-trading',
    title: 'Global Economics & Trade',
    progress: 32,
    instructor: 'Prof. Marcus Chen',
    category: 'Economics',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzfjdcCyjvyJR5do55zDS9d2I1M2Oh71jdfNaBeRS5KLmjwklF7FG9KVfo7vxHUFGislHpTV3Z3FZK4iBzndTD89VWdi56J7L9UKH9CJFsRSdjlAOWWgjMFHzo94D6nerAIDBbsnv3UMfPyV0p5iO0s8gvmCyzN0s0XC8np-BVNw0Rmxn0BAcvyODzq9ic3S8lGy7fDeFslMC3fF3b2_QyMXxKeS0s6BVEAATtLScjT2MQyEifPbclaBu036llZ-9YqMDf6ZgoFsg',
    currentModule: 'Module 1: Foundations',
    currentLesson: '1.2 Macro Factors'
  }
];

export const RECENT_ACTIVITIES: RecentActivity[] = [
  {
    id: 'act-1',
    title: 'Watched: Macro Trends 2024',
    type: 'video',
    time: 'Yesterday, 4:30 PM'
  },
  {
    id: 'act-2',
    title: 'Quiz Passed: Org Theory',
    type: 'quiz',
    time: 'May 12, 10:15 AM'
  },
  {
    id: 'act-3',
    title: 'Downloaded: Resource Kit',
    type: 'download',
    time: 'May 11, 2:40 PM'
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Data Science for Execs',
    issueDate: 'Issued April 2024'
  },
  {
    id: 'cert-2',
    title: 'Digital Transformation',
    issueDate: 'Issued March 2024'
  }
];

export const DEADLINES: Deadline[] = [
  {
    id: 'dl-1',
    title: 'Final Case Study',
    date: '18',
    month: 'MAY',
    daysLeft: 2
  },
  {
    id: 'dl-2',
    title: 'Economic Theory Quiz',
    date: '02',
    month: 'JUN',
    daysLeft: 16
  }
];

export const SYLLABUS_MODULES: SyllabusModule[] = [
  {
    id: 'mod-1',
    title: 'Module 1: Foundations',
    isLocked: false,
    lessons: [
      {
        id: '1.1',
        title: '1.1 Introduction to Leadership',
        type: 'video',
        duration: '12:05',
        isCompleted: true,
        content: 'Overview of modern leadership theory, personal accountability, and core high-performing behaviors.'
      },
      {
        id: '1.2',
        title: '1.2 History of Management',
        type: 'reading',
        duration: '15 mins',
        isCompleted: true,
        content: 'Evolution from industrial management schemas to fluid, remote, event-driven team governance models.'
      }
    ]
  },
  {
    id: 'mod-2',
    title: 'Module 2: Advanced Strategy',
    isLocked: false,
    lessons: [
      {
        id: '2.1',
        title: '2.1 Leadership Dynamics',
        type: 'video',
        duration: '38:20',
        isCompleted: false,
        isCurrent: true,
        content: 'In this comprehensive module, we dive deep into the psychological underpinnings of corporate leadership. We\'ll explore how to navigate complex organizational structures while maintaining high levels of team engagement and professional integrity. This lesson covers key strategies used by Fortune 500 executives to foster innovation and resilience.'
      },
      {
        id: '2.2',
        title: '2.2 Strategic Forecasting',
        type: 'video',
        duration: '45:10',
        isCompleted: false,
        content: 'Learn to use probabilistic modeling, scenarios validation, and threat assessments in volatile markets.'
      },
      {
        id: '2.3',
        title: '2.3 Module Quiz',
        type: 'quiz',
        duration: '10 Questions',
        isCompleted: false,
        content: 'Assess your comprehension of decision framework models, risk indicators, and response design parameters.'
      }
    ]
  },
  {
    id: 'mod-3',
    title: 'Module 3: Global Operations',
    isLocked: true,
    lessons: [
      {
        id: '3.1',
        title: '3.1 Supply Chain Risk Resilience',
        type: 'video',
        duration: '28:15',
        isCompleted: false,
        content: 'Strategies for geodistributed supply chain optimization, redundancy designs, and logistics compliance.'
      },
      {
        id: '3.2',
        title: '3.2 Corporate Governance Frameworks',
        type: 'video',
        duration: '35:40',
        isCompleted: false,
        content: 'Ensuring alignment across international boards, compliance parameters, and strategic stakeholder loops.'
      }
    ]
  }
];
