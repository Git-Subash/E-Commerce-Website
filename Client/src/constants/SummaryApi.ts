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
  logout: {
    url: "/api/user/logout",
    method: "get",
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
  upload_avatar: {
    url: "api/user/upload-avatar",
    method: "put",
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
  update_address_status: {
    url: "api/address/update-stauts",
    method: "put",
  },
  delete_address: {
    url: "api/address/delete",
    method: "delete",
  },
};
