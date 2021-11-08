import React from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const App = () => {
  const onSubmit = (data) => console.log(data);

  const schema = Yup.object().shape({
    status: Yup.object()
      .shape({
        label: Yup.string().required("status is required (from label)"),
        value: Yup.string().required("status is required"),
      })
      .nullable() // for handling null value when clearing options via clicking "x"
      .required("status is required (from outter null check)"),
    firstName: Yup.string().required(),
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <div className="container my-5">
      <div className="row">
        <form onSubmit={handleSubmit(onSubmit)} className="col-6">
          <input className="form-group" {...register("firstName")} />
          <p style={{ color: "red" }}>{errors.firstName?.message}</p>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { value: "chocolate", label: "Chocolate" },
                  { value: "strawberry", label: "Strawberry" },
                  { value: "vanilla", label: "Vanilla" },
                ]}
              />
            )}
          />
          <p style={{ color: "red" }}>{errors.status?.message || errors.status?.label.message}</p>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};
export default App;
