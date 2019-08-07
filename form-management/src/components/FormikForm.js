import React from "react";
import axios from "axios";
import { Formik, Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const FormikForm = ({ errors, touched, values }) => {
  return (
    <div className="form">
      <h1>Fill out form!</h1>
      {/* <Formik> */}
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}
        <Field type="email" name="email" placeholder="Email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <label className="checkbox-container">
          Terms Of Service
          <Field type="checkbox" name="tos" checked={values.tos} />
        </label>
        <button type="submit">Submit</button>
      </Form>
      {/* </Formik> */}
    </div>
  );
};

const NewFormikForm = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    };
  },
  // .email("Email not valid") / .name()
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .min(6, "Password must contain 6 characters")
      .required("Password is required"),
    tos: Yup.bool().oneOf([true], "Terms of Service is required")
  }),

  handleSubmit(values) {
    console.log("Form", values);

    axios
      .post(`https://reqres.in/api/users/`, values)
      .then(res => console.log(res));
  }
})(FormikForm);

export default NewFormikForm;
