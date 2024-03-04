import { Input } from "@/components/ui/input";
import React from "react";
import { useForm, useController } from "react-hook-form";
import { FormFields } from "../page";

type PropsType = {
  title: string;
};

export const FormExample4 = ({ title }: PropsType) => {
  const { control, handleSubmit, register } = useForm<FormFields>();
  const { field, fieldState } = useController({
    name: "shadecnemail",
    control,
    defaultValue: "test@email.com",
    rules: {
      required: "Email is required",
      maxLength: {
        value: 5,
        message: "max length is 5 letters",
      },
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  console.log("field", field);

  return (
    <form
      className="m-10 gap-5  flex flex-col   justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label>Username:</label>
      {/* Use your custom Input component */}
      <Input
        {...field}
        placeholder="Enter your email" // Adding placeholder
        autoFocus // Autofocus the input
        disabled={false} // Allowing to disable the input
        className="w-[500px] bg-black" // Adding custom class name
      />
      {fieldState.error && (
        <p className="text-red-500"> {fieldState?.error?.message}</p>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};
