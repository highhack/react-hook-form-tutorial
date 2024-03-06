import { SubmitHandler, set, useForm } from "react-hook-form";
import { FormFields } from "../page";
import { useEffect, useState } from "react";
import Line from "./Line";
import { RerenderCounter } from "./RerenderCounter";

type PropsType = {
  title: string;
};

export const FormExample22 = ({ title }: PropsType) => {
  const {
    register,
    handleSubmit,
    formState,
    reset,
    watch,
    resetField,
    setError,
  } = useForm<FormFields>({
    defaultValues: {
      email: "test@email.com",
      password: "",
      firstName: "",
    },
  });

  const {
    isSubmitting,
    errors,
    dirtyFields,
    touchedFields,
    isSubmitSuccessful,
  } = formState;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      reset();
      console.log("data", data);
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  console.log("errors", errors);

  return (
    <form
      className="m-10 gap-5  flex flex-col   justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <RerenderCounter />
      <div className="text-[36px]">{title}</div>
      <div>
        Reset the entire form state, fields reference, and subscriptions. There
        are optional arguments and will allow partial form state reset.
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
        {...register("firstName", {
          maxLength: {
            value: 5,
            message: "max length is 5",
          },
        })}
        type="text"
        placeholder="firstName"
        className="w-[500px]"
      />
      {errors?.firstName && (
        <p className="text-red-500"> {errors?.firstName?.message}</p>
      )}

      <button className="w-[500px]" onClick={() => reset()}>
        Reset All
      </button>
      <button
        className="w-[500px]"
        onClick={() => reset({ email: "newTest@email.com" })}
      >
        Replace email and reset all
      </button>
      <button className="w-[500px]" onClick={() => resetField("password")}>
        Reset password
      </button>
      <button
        type="button"
        className="w-[500px]"
        onClick={() => resetField("firstName", { keepError: true })}
      >
        Reset firstName keep error
      </button>
      <button
        type="button"
        className="w-[500px]"
        onClick={() => resetField("firstName", { keepTouched: true })}
      >
        Reset keep touched fields
      </button>
      <button
        type="button"
        className="w-[500px]"
        onClick={() => resetField("firstName", { keepDirty: true })}
      >
        Reset keep dirty fields
      </button>
      <button
        type="button"
        className="w-[500px]"
        onClick={() => resetField("firstName", { defaultValue: "New" })}
      >
        update defaultValue
      </button>

      <button className="w-[500px]" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </button>

      {/* descriptions */}
      <p className="whitespace-pre-line">
        <span className="text-yellow-300 text-xl bold">data</span>{" "}
        {JSON.stringify(watch(), null, 2)}
      </p>
      <Line />
      <p className="whitespace-pre-line">
        <span className="text-yellow-300 text-xl bold">errors</span>{" "}
        {JSON.stringify(errors?.firstName?.message, null, 2)}
      </p>
      <Line />
      <p className="whitespace-pre-line">
        <span className="text-yellow-300 text-xl bold">touched fields</span>{" "}
        {JSON.stringify(touchedFields, null, 2)}
      </p>
      <Line />
      <p className="whitespace-pre-line">
        <span className="text-yellow-300 text-xl bold">dirty fields</span>{" "}
        {JSON.stringify(dirtyFields, null, 2)}
      </p>
    </form>
  );
};
