import React from "react";
import { Formik, Form, Field, withFormik } from "formik";

const Form = () => {
  return (
    <div className="form">
      <h1>Fill out form!</h1>
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        <Field type="email" name="email" placeholder="Email" />
        <Field type="password" name="password" placeholder="Password" />
        <Field type="checkbox" name="tos" checked={""} />
        <Field type="text" name="name" placeholder="Name" />
        <button>Submit</button>
      </Form>
    </div>
  );
};

export default Form;
