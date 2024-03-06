import { SubmitHandler, set, useForm } from "react-hook-form";
import { FormFields } from "../page";
import Line from "./Line";
import { RerenderCounter } from "./RerenderCounter";
import { useState } from "react";

type PropsType = {
  title: string;
};

export const FormExample7 = ({ title }: PropsType) => {
  const [data, setData] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm<FormFields>({
    defaultValues: {
      password: "",
    },
    mode: "onChange",
    // mode: "onBlur",
    // mode: "onTouched",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log("data", data);
  };

  return (
    <form
      className="m-10 gap-5  flex flex-col   justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <RerenderCounter />
      <div className="text-[36px]">{title}</div>

      <input
        {...register("email", {
          maxLength: { value: 5, message: "max 5 letters" },
        })}
        type="text"
        placeholder="email"
        className="w-[34%]"
      />
      {errors?.email?.message && (
        <p className="text-red-500"> {errors?.email?.message}</p>
      )}

      <input
        {...register("password")}
        type="password"
        placeholder="password"
        className="w-[34%]"
      />

      <input
        {...register("firstName", {
          required: true,
        })}
        type="text"
        placeholder="required"
        className="w-[34%]"
      />

      <button type="button" onClick={() => console.log(getValues())}>
        Set
      </button>

      <button className="w-[34%]" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </button>

      <p className="whitespace-pre-line">
        <span className="text-yellow-300 text-xl bold">
          data from getValue:{" "}
        </span>{" "}
        {JSON.stringify(getValues(), null, 2)}
      </p>
      <Line />
    </form>
  );
};
