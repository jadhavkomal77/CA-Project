import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "./apis/adminApi";
import adminReducer from "./slices/adminSlice";
import { heroApi } from "./apis/heroApi";
import { aboutApi } from "./apis/aboutApi";
import { serviceApi } from "./apis/serviceApi";
import { navbarApi } from "./apis/navbarApi";
import { projectApi } from "./apis/projectApi";
import { pricingApi } from "./apis/pricingApi";
import { contactApi } from "./apis/contactApi";
import { footerApi } from "./apis/footerApi";
import { settingApi } from "./apis/settingApi";
import { calculatorApi } from "./apis/calculatorApi";

const reduxStore = configureStore({
  reducer: {
    
    [adminApi.reducerPath]: adminApi.reducer,
    [heroApi.reducerPath]: heroApi.reducer,
    [aboutApi.reducerPath]: aboutApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [navbarApi.reducerPath]: navbarApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [pricingApi.reducerPath]: pricingApi.reducer,
     [contactApi.reducerPath]: contactApi.reducer,
      [footerApi.reducerPath]: footerApi.reducer,
      [settingApi.reducerPath]: settingApi.reducer,
       [calculatorApi.reducerPath]: calculatorApi.reducer,

    admin: adminReducer,
  },

  middleware: (def) =>
    def().concat(adminApi.middleware,
      heroApi.middleware,
      navbarApi.middleware,
      aboutApi.middleware,
      serviceApi.middleware,
      projectApi.middleware,
      pricingApi.middleware,
      contactApi.middleware,
      footerApi.middleware,
      settingApi.middleware,
      calculatorApi.middleware,
    ),

});

export default reduxStore;
