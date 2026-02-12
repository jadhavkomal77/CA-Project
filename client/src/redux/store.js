import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "./apis/adminApi";
import adminReducer from "./slices/adminSlice";
import { heroApi } from "./apis/heroApi";
import { aboutApi } from "./apis/aboutApi";
import { serviceApi } from "./apis/serviceApi";
import { navbarApi } from "./apis/navbarApi";
import { projectApi } from "./apis/projectApi";
import { bookingApi } from "./apis/bookingApi";
import { pricingApi } from "./apis/pricingApi";
import { contactApi } from "./apis/contactApi";
import { footerApi } from "./apis/footerApi";
import { settingApi } from "./apis/settingApi";

const reduxStore = configureStore({
  reducer: {
    
    [adminApi.reducerPath]: adminApi.reducer,
    [heroApi.reducerPath]: heroApi.reducer,
    [aboutApi.reducerPath]: aboutApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [navbarApi.reducerPath]: navbarApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [pricingApi.reducerPath]: pricingApi.reducer,
     [contactApi.reducerPath]: contactApi.reducer,
      [footerApi.reducerPath]: footerApi.reducer,
      [settingApi.reducerPath]: settingApi.reducer,

    admin: adminReducer,
  },

  middleware: (def) =>
    def().concat(adminApi.middleware,
      heroApi.middleware,
      navbarApi.middleware,
      aboutApi.middleware,
      serviceApi.middleware,
      projectApi.middleware,
      bookingApi.middleware,
      pricingApi.middleware,
      contactApi.middleware,
      footerApi.middleware,
      settingApi.middleware,
    ),

});

export default reduxStore;
