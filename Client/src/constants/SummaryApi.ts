export const baseURL = "http://localhost:3000";

export const SummaryApi = {
  register: {
    url: "/api/user/register",
    method: "post",
  },
  login: {
    url: "/api/user/login",
    method: "post",
  },
  verify_email: {
    url: "/api/user/verify-email",
    method: "post",
  },
  forgot_password: {
    url: "/api/user/forgot-password",
    method: "put",
  },
  forgot_password_otp_verification: {
    url: "/api/user/verify-forgot-password-otp",
    method: "put",
  },
  reset_password: {
    url: "/api/user/reset-password",
    method: "put",
  },
  refreshToken: {
    url: "api/user/refresh-token",
    method: "post",
  },
  userDetails: {
    url: "/api/user/user-details",
    method: "get",
  },
  update_user_details: {
    url: "/api/user/update-user",
    method: "put",
  },
  add_address: {
    url: "api/address/create",
    method: "post",
  },
  get_address: {
    url: "api/address/get",
    method: "get",
  },
  update_address: {
    url: "api/address/update",
    method: "put",
  },
  disable_address: {
    url: "api/address/delete",
    method: "delete",
  },
};
