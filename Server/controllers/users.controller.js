import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import sendEmail from "../config/sendEmail.js";
import emailVerificationTemplate from "../utils/emailVerificationTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshtoken from "../utils/generateRefreshtoken.js";
import jwt from "jsonwebtoken";
import generateOtp from "../utils/genarateOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";

//user registration
export async function registerController(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide name,email,password",
        error: true,
        success: false,
      });
    }

    //checking exsiting user
    const user = await userModel.findOne({ email });
    if (user) {
      return res.json({
        message: " Already registered email",
        error: true,
        success: false,
      });
    }

    // hasing password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    const payload = {
      name,
      email,
      password: passwordHashed,
    };
    //creating new user
    const newUser = new userModel(payload);
    const save = await newUser.save();

    // verifying email after registeration using resend
    const VerifyEmailUrl = `${process.env.CLIENT_URL}/verify-email?code=${save?._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify email from Shopme",
      html: emailVerificationTemplate({
        name,
        url: VerifyEmailUrl,
      }),
    });

    return res.json({
      message: "User Register successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
//user verifcation
export async function verifyEmailController(req, res) {
  try {
    const { code } = req.body;

    const user = await userModel.findOne({ _id: code });

    if (!user) {
      return res.status(400).json({
        message: "Invalid code",
        error: true,
        success: false,
      });
    }

    //updating user-model
    const updateUser = await userModel.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );

    return res.json({
      message: "Verify email done",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: true,
    });
  }
}

//user login
export async function LoginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Provide email and password",
        error: true,
        status: false,
      });
    }

    //user  not registered excist
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email is not Registered",
        status: false,
        error: true,
      });
    }
    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Contact Admin for access",
        status: false,
        error: true,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: "Check Your password",
        status: false,
        error: true,
      });
    }

    //genrating token
    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshtoken(user._id);

    //updating user-model
    const updateUser = userModel.findByIdAndUpdate(user._id, {
      last_login_date: new Date(),
    });

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      semSite: "None",
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.json({
      message: " Login Successfull",
      status: true,
      error: false,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      status: false,
    });
  }
}

export async function LogoutController(req, res) {
  try {
    const userId = req.userId; // middleware

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      semSite: "None",
    };

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    console.log(userId);
    const removeRefreshToken = await userModel.findByIdAndUpdate(
      userId,
      {
        refresh_token: "",
      },
      { new: true }
    );
    if (removeRefreshToken) {
      console.log("Refresh token removed successfully.");
    } else {
      console.log("Failed to remove refresh token.");
    }

    return res.status(200).json({
      message: " Logout Successfull",
      status: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      status: false,
      error: true,
    });
  }
}

//refresh token controller
export async function refreshToken(req, res) {
  try {
    const token =
      req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Invalid token",
        error: true,
        status: false,
      });
    }

    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );

    if (verifyToken) {
      return res.status(401).json({
        message: "token is expired",
        error: true,
        status: false,
      });
    }

    const userId = verifyToken?._id;

    const newAccessToken = await generateRefreshtoken(userId);
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", newAccessToken, cookieOptions);

    return res.json({
      message: "New access Token Genarated",
      error: false,
      status: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      status: false,
      error: true,
    });
  }
}

//forget password
export async function ForgotPassword(req, res) {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email not available",
        status: false,
        error: true,
      });
    }

    const otp = generateOtp();
    const expireTime = new Date(Date.now() + 2 * 60 * 1000);

    const update = await userModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expried: new Date(expireTime).toISOString(),
    });

    await sendEmail({
      sendTo: email,
      subject: "Forgot passward from shopme",
      html: forgotPasswordTemplate({
        name: user.name,
        otp: otp,
      }),
    });

    return res.json({
      message: "Check your email",
      error: false,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      status: false,
      error: true,
    });
  }
}
