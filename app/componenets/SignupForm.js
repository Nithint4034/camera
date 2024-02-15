import React, { useState } from "react";
import { View, StyleSheet, Text, ToastAndroid } from "react-native";
import { isValidEmail, isValidObjField, updateError } from "../utils/methods";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";
import { StackActions } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import client from "../api/client";

const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(3, "Invalid name!")
    .required("Name is required!"),
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  password: Yup.string()
    .trim()
    .min(8, "Password is too short!")
    .required("Password is required!"),
  password_confirmation: Yup.string().equals(
    [Yup.ref("password"), null],
    "Password does not match!"
  ),
  mobile_number:Yup.string()
  .required("Contact Number is required!"),
  city:Yup.string()
  .required("City is required!"),
  pan_number:Yup.string()
  .required("Pan Number is required!"),
  account_number:Yup.string()
  .required("Bank A/c required!"),
  ifsc_code:Yup.string()
  .required("IFSC Code is required!"),
});

const SignupForm = ({ navigation }) => {
  const userInfo = {
    username: "",
    email: "",
    mobile_number: "",
    city: "",
    password: "",
    password_confirmation:'',
    pan_number: "",
    account_number: "",
    ifsc_code: "",
  };

  const [error, setError] = useState("");

  const {

  } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    // we will accept only if all of the fields have value
    if (!isValidObjField(userInfo))
      return updateError("Required all fields!", setError);
    // if valid name with 3 or more characters
    if (!username.trim() || username.length < 3)
      return updateError("Invalid name!", setError);
    // only valid email id is allowed
    if (!isValidEmail(email)) return updateError("Invalid email!", setError);
    // password must have 8 or more characters
    if (!password.trim() || password.length < 8)
      return updateError("Password is less then 8 characters!", setError);
    // password and confirm password must be the same
    if (password !== password_confirmation)
      return updateError("Password does not match!", setError);
    return true;
  };

  const sumbitForm = () => {
    if (isValidForm()) {
      // submit form
      console.log(userInfo);
    }
  };

  // C:\Users\Nithint\Desktop\TestProjects\AwesomeProject\app\componenets\AppForm.js

  const signUp = async (values, formikActions) => {
    // console.log("kuwdgv", values);
    const res = await client.post("/register", {
      ...values,
    });
    showToast('Registered Successful')
    if (res.data.success) {
      const signInRes = await client.post("/login", {
        email: values.email,
        password: values.password,
      });
      if (signInRes.data.success) {
        navigation.dispatch(
          StackActions.replace("ImageUpload", {
            token: signInRes.data.token,
          })
        );
      }
    }
    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  return (
    <FormContainer>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={signUp}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const {
            username,
            email,
            mobile_number,
            city,
            password,
            password_confirmation,
            pan_number,
            account_number,
            ifsc_code,
          } = values;
          return (
            <>
              <FormInput
                value={username}
                error={touched.username && errors.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                label="Full Name"
                placeholder="John Smith"
              />
              <FormInput
                value={email}
                error={touched.email && errors.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                autoCapitalize="none"
                label="Email"
                placeholder="example@gmail.com"
              />
              <FormInput
                value={mobile_number}
                error={touched.mobile_number && errors.mobile_number}
                onChangeText={handleChange("mobile_number")}
                onBlur={handleBlur("mobile_number")}
                autoCapitalize="none"
                label="Contact Number"
                placeholder="1234567890"
              />
              <FormInput
                value={city}
                error={touched.city && errors.city}
                onChangeText={handleChange("city")}
                onBlur={handleBlur("city")}
                autoCapitalize="none"
                label="City"
                placeholder="City on which you are working"
              />
              <FormInput
                value={password}
                error={touched.password && errors.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                autoCapitalize="none"
                // secureTextEntry
                label="Password"
                placeholder="********"
              />
              <FormInput
                value={password_confirmation}
                error={touched.password_confirmation && errors.password_confirmation}
                onChangeText={handleChange("password_confirmation")}
                onBlur={handleBlur("password_confirmation")}
                autoCapitalize="none"
                secureTextEntry
                label="Confirm Password"
                placeholder="********"
              />
              <FormInput
                value={pan_number}
                error={touched.pan_number && errors.pan_number}
                onChangeText={handleChange("pan_number")}
                onBlur={handleBlur("pan_number")}
                autoCapitalize="none"
                // secureTextEntry
                label="PAN Number"
                placeholder="ABCD123D"
              />
              <FormInput
                value={account_number}
                error={touched.account_number && errors.account_number}
                onChangeText={handleChange("account_number")}
                onBlur={handleBlur("account_number")}
                autoCapitalize="none"
                // secureTextEntry
                label="Bank Account Number"
                placeholder="****************"
              />
              <FormInput
                value={ifsc_code}
                error={touched.ifsc_code && errors.ifsc_code}
                onChangeText={handleChange("ifsc_code")}
                onBlur={handleBlur("ifsc_code")}
                autoCapitalize="none"
                // secureTextEntry
                label="IFSC CODE"
                placeholder="*********"
              />
              <FormSubmitButton
                submitting={isSubmitting}
                onPress={handleSubmit}
                title="Register"
              />
            </>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default SignupForm;
