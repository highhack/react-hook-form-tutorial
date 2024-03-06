import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm, useController } from "react-hook-form";
import { FormFields } from "../page";
import { RerenderCounter } from "./RerenderCounter";
import { on } from "events";
import Line from "./Line";

type PropsType = {
  title: string;
};

export const FormExample4 = ({ title }: PropsType) => {
  const { control, handleSubmit } = useForm<FormFields>();
  const { field, fieldState } = useController({
    name: "shadecnemail",
    control,
    defaultValue: "ui component",
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

  const [value, setValue] = useState(field.value);

  return (
    <form
      className="m-10 gap-5  flex flex-col   justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <RerenderCounter />
      <div className="text-[36px]">{title}</div>
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

      <Line />
      <p className="whitespace-pre-line w-[27%]">
        <span className="text-yellow-300 bold">Value: </span>
        {value}
      </p>
    </form>
  );
};
