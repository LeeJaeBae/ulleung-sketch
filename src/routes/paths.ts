import { kebabCase } from 'es-toolkit';

import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  components: '/components',
  docs: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
  zoneStore: 'https://mui.com/store/items/zone-landing-page/',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  freeUI: 'https://mui.com/store/items/minimal-dashboard-free/',
  figmaUrl: 'https://www.figma.com/design/cAPz4pYPtQEXivqe11EcDE/%5BPreview%5D-Minimal-Web.v6.0.0',
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id: string) => `/product/${id}`,
    demo: { details: `/product/${MOCK_ID}` },
  },
  post: {
    root: `/post`,
    details: (title: string) => `/post/${kebabCase(title)}`,
    demo: { details: `/post/${kebabCase(MOCK_TITLE)}` },
  },
  // AUTH
  auth: {
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: { signIn: `${ROOTS.AUTH}/jwt/sign-in`, signUp: `${ROOTS.AUTH}/jwt/sign-up` },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: { signIn: `${ROOTS.AUTH}/auth0/sign-in` },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },
  authDemo: {
    split: {
      signIn: `${ROOTS.AUTH_DEMO}/split/sign-in`,
      signUp: `${ROOTS.AUTH_DEMO}/split/sign-up`,
      resetPassword: `${ROOTS.AUTH_DEMO}/split/reset-password`,
      updatePassword: `${ROOTS.AUTH_DEMO}/split/update-password`,
      verify: `${ROOTS.AUTH_DEMO}/split/verify`,
    },
    centered: {
      signIn: `${ROOTS.AUTH_DEMO}/centered/sign-in`,
      signUp: `${ROOTS.AUTH_DEMO}/centered/sign-up`,
      resetPassword: `${ROOTS.AUTH_DEMO}/centered/reset-password`,
      updatePassword: `${ROOTS.AUTH_DEMO}/centered/update-password`,
      verify: `${ROOTS.AUTH_DEMO}/centered/verify`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    mail: path(ROOTS.DASHBOARD, '/mail'),
    chat: path(ROOTS.DASHBOARD, '/chat'),
    blank: path(ROOTS.DASHBOARD, '/blank'),
    kanban: path(ROOTS.DASHBOARD, '/kanban'),
    calendar: path(ROOTS.DASHBOARD, '/calendar'),
    fileManager: path(ROOTS.DASHBOARD, '/file-manager'),
    permission: path(ROOTS.DASHBOARD, '/permission'),
    general: {
      app: path(ROOTS.DASHBOARD, '/app'),
      ecommerce: path(ROOTS.DASHBOARD, '/ecommerce'),
      analytics: path(ROOTS.DASHBOARD, '/analytics'),
      banking: path(ROOTS.DASHBOARD, '/banking'),
      booking: path(ROOTS.DASHBOARD, '/booking'),
      file: path(ROOTS.DASHBOARD, '/file'),
      course: path(ROOTS.DASHBOARD, '/course'),
    },
    user: {
      root: path(ROOTS.DASHBOARD, '/user'),
      new: path(ROOTS.DASHBOARD, '/user/new'),
      list: path(ROOTS.DASHBOARD, '/user/list'),
      cards: path(ROOTS.DASHBOARD, '/user/cards'),
      profile: path(ROOTS.DASHBOARD, '/user/profile'),
      account: path(ROOTS.DASHBOARD, '/user/account'),
      edit: (id: string) => path(ROOTS.DASHBOARD, `/user/${id}/edit`),
      demo: {
        edit: path(ROOTS.DASHBOARD, `/user/${MOCK_ID}/edit`),
      },
    },
    product: {
      root: path(ROOTS.DASHBOARD, '/product'),
      new: path(ROOTS.DASHBOARD, '/product/new'),
      details: (id: string) => path(ROOTS.DASHBOARD, `/product/${id}`),
      edit: (id: string) => path(ROOTS.DASHBOARD, `/product/${id}/edit`),
      demo: {
        details: path(ROOTS.DASHBOARD, `/product/${MOCK_ID}`),
        edit: path(ROOTS.DASHBOARD, `/product/${MOCK_ID}/edit`),
      },
    },
    invoice: {
      root: path(ROOTS.DASHBOARD, '/invoice'),
      new: path(ROOTS.DASHBOARD, '/invoice/new'),
      details: (id: string) => path(ROOTS.DASHBOARD, `/invoice/${id}`),
      edit: (id: string) => path(ROOTS.DASHBOARD, `/invoice/${id}/edit`),
      demo: {
        details: path(ROOTS.DASHBOARD, `/invoice/${MOCK_ID}`),
        edit: path(ROOTS.DASHBOARD, `/invoice/${MOCK_ID}/edit`),
      },
    },
    post: {
      root: path(ROOTS.DASHBOARD, '/post'),
      new: path(ROOTS.DASHBOARD, '/post/new'),
      details: (title: string) => path(ROOTS.DASHBOARD, `/post/${title}`),
      edit: (title: string) => path(ROOTS.DASHBOARD, `/post/${title}/edit`),
      demo: {
        details: path(ROOTS.DASHBOARD, `/post/${MOCK_ID}`),
        edit: path(ROOTS.DASHBOARD, `/post/${MOCK_ID}/edit`),
      },
    },
    order: {
      root: path(ROOTS.DASHBOARD, '/order'),
      details: (id: string) => path(ROOTS.DASHBOARD, `/order/${id}`),
      demo: {
        details: path(ROOTS.DASHBOARD, `/order/${MOCK_ID}`),
      },
    },
    job: {
      root: path(ROOTS.DASHBOARD, '/job'),
      new: path(ROOTS.DASHBOARD, '/job/new'),
      details: (id: string) => path(ROOTS.DASHBOARD, `/job/${id}`),
      edit: (id: string) => path(ROOTS.DASHBOARD, `/job/${id}/edit`),
      demo: {
        details: path(ROOTS.DASHBOARD, `/job/${MOCK_ID}`),
        edit: path(ROOTS.DASHBOARD, `/job/${MOCK_ID}/edit`),
      },
    },
    tour: {
      root: path(ROOTS.DASHBOARD, '/tour'),
      new: path(ROOTS.DASHBOARD, '/tour/new'),
      details: (id: string) => path(ROOTS.DASHBOARD, `/tour/${id}`),
      edit: (id: string) => path(ROOTS.DASHBOARD, `/tour/${id}/edit`),
      demo: {
        details: path(ROOTS.DASHBOARD, `/tour/${MOCK_ID}`),
        edit: path(ROOTS.DASHBOARD, `/tour/${MOCK_ID}/edit`),
      },
    },
    ship: {
      root: path(ROOTS.DASHBOARD, '/ship'),
      new: path(ROOTS.DASHBOARD, '/ship/new'),
      list: path(ROOTS.DASHBOARD, '/ship/list'),
      details: (id: string) => path(ROOTS.DASHBOARD, `/ship/${id}`),
      edit: (id: string) => path(ROOTS.DASHBOARD, `/ship/${id}/edit`),
    },
    shipping: {
      root: path(ROOTS.DASHBOARD, '/shipping'),
      new: path(ROOTS.DASHBOARD, '/shipping/new'),
      list: path(ROOTS.DASHBOARD, '/shipping/list'),
      details: (id: string) => path(ROOTS.DASHBOARD, `/shipping/${id}`),
      edit: (id: string) => path(ROOTS.DASHBOARD, `/shipping/${id}/edit`),
    },
  },
};
