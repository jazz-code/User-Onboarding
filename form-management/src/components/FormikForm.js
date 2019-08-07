import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const FormikForm = ({ errors, touched, values, status }) => {
  const [userForm, setUserForm] = useState([]);

  useEffect(() => {
    if (status) {
      setUserForm([...userForm, status]);
    }
  }, [status]);
  return (
    <div className="form">
      <h1>Fill out this form</h1>
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
          <span className="checkmark" />
        </label>

        <Field
          component="textarea"
          type="text"
          name="notes"
          placeholder="Notes"
        />
        {touched.notes && errors.notes && (
          <p className="error">{errors.notes}</p>
        )}
        <button type="submit">Submit</button>
      </Form>
      {/* </Formik> */}
      {userForm.map(users => {
        return (
          <div>
            <h3>Username</h3>
            <p key={users.id}>{users.name}</p>
          </div>
        );
      })}
    </div>
  );
};

const NewFormikForm = withFormik({
  mapPropsToValues({ name, email, password, tos, notes }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false,
      notes: notes || ""
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
  //get setStatus
  handleSubmit(values, { resetForm, setErrors, setStatus }) {
    console.log("Form", values);
    if (values.email === "waffle@syrup.com") {
      setErrors({ email: "That email is already taken" });
    } else {
      axios
        .post(`https://reqres.in/api/users/`, values)
        .then(res => setStatus(res.data));
      resetForm();
    }
  }
})(FormikForm);

export default NewFormikForm;
