import { SubmitHandler, set, useForm } from "react-hook-form";
import { FormFields } from "../page";
import { useEffect, useState } from "react";
import clsx from "clsx";

type PropsType = {
  title: string;
};

export const FormExample2 = ({ title }: PropsType) => {
  const [data, setData] = useState({});

  const { register, handleSubmit, formState, setError } = useForm<FormFields>({
    defaultValues: {
      email: "test@email.com",
      password: "",
      required: "",
      validate: "",
    },
  });

  const {
    isSubmitting,
    dirtyFields,
    touchedFields,
    defaultValues,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
    isValid,
    isValidating,
  } = formState;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
    }
    console.log("data", data);
    setData(data);
  };

  return (
    <form
      className="m-10 gap-5  flex flex-col   justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-[36px]">{title}</div>
      <div>
        This object contains information about the entire form state. It helps
        you to keep on track with the user's interaction with your form
        application.
      </div>

      <input
        {...register("email")}
        type="text"
        placeholder="email"
        className="w-[500px]"
      />

      <input
        {...register("password")}
        type="password"
        placeholder="password"
        className="w-[500px]"
      />

      <input
        {...register("required", {
          required: true,
        })}
        type="text"
        placeholder="required"
        className="w-[500px]"
      />

      <input
        {...register("validate", {
          //   validate: async (value) =>
          //     await new Promise((resolve) => setTimeout(resolve, 2000)),
        })}
        type="text"
        placeholder="validate"
        className="w-[500px]"
      />

      <button className="w-[500px]" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </button>

      <p className="whitespace-pre-line">
        <span className="text-yellow-300 text-xl bold">dirtyFields: </span>{" "}
        {JSON.stringify(dirtyFields, null, 2)}
      </p>
      <div className="bg-yellow-300 w-[500px] h-1" />
      <p className="whitespace-pre-line">
        <span className="text-yellow-300 text-xl bold">touchedFields: </span>{" "}
        {JSON.stringify(touchedFields, null, 2)}
      </p>
      <div className="bg-yellow-300 w-[500px] h-1" />
      <p className="whitespace-pre-line">
        <span className="text-yellow-300 text-xl bold">defaultValues: </span>{" "}
        {JSON.stringify(defaultValues, null, 2)}
      </p>
      <div className="bg-yellow-300 w-[500px] h-1" />
      <p className="whitespace-pre-line">
        <span className="text-yellow-300 text-xl bold">isSubmitted: </span>{" "}
        {JSON.stringify(isSubmitted, null, 2)}
      </p>
      <div className="bg-yellow-300 w-[500px] h-1" />
      <p className="whitespace-pre-line">
        <span className="text-yellow-300 text-xl bold">
          isSubmitSuccessful:
        </span>{" "}
        {JSON.stringify(isSubmitSuccessful, null, 2)}
      </p>
      <div className="bg-yellow-300 w-[500px] h-1" />
      <p className="whitespace-pre-line">
        <span className="text-yellow-300 text-xl bold">isSubmitting: </span>{" "}
        {JSON.stringify(isSubmitting, null, 2)}
      </p>
      <div className="bg-yellow-300 w-[500px] h-1" />
      <p className="whitespace-pre-line">
        <span className="text-yellow-300 text-xl bold">submitCount: </span>{" "}
        {JSON.stringify(submitCount, null, 2)}
      </p>
      <div className="bg-yellow-300 w-[500px] h-1" />
      <p className="whitespace-pre-line">
        <span className="text-yellow-300 text-xl bold">isValid: </span>{" "}
        {JSON.stringify(isValid, null, 2)}
      </p>
      <div className="bg-yellow-300 w-[500px] h-1" />
      <p className="whitespace-pre-line">
        <span className="text-yellow-300 text-xl bold">isValidating: </span>
        {JSON.stringify(isValidating, null, 2)}
      </p>
    </form>
  );
};
