import React from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const App = () => {
  const onSubmit = (data) => console.log(data);

  let schema = Yup.object().shape({
    iceCreamType: Yup.object().shape({
      label: Yup.string().required("Required"),
      value: Yup.string().required("Required"),
    }),
  });

  const { control, handleSubmit , formState:{ errors }} = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="iceCreamType"
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
      <p>{errors.iceCreamType?.message}</p>
      <input type="submit" />
    </form>
  );
};
export default App;
