import { SubmitHandler, useForm } from "react-hook-form";
import { FormFields } from "../page";
import { useState } from "react";

type PropsType = {
  title: string;
};

export const FormExample = ({ title }: PropsType) => {
  const [data, setData] = useState({});

  const { register, handleSubmit, watch, formState } = useForm<FormFields>({
    defaultValues: {
      email: "test@email.com",
      valueAsNumber: 5,
    },
  });

  const { errors, isSubmitting } = formState;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
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
        This method allows you to register an input or select element and apply
        validation rules to React Hook Form. Validation rules are all based on
        the HTML standard and also allow for custom validation methods.
      </div>

      <>
        <input
          {...register("required", {
            required: "field is empty",
          })}
          type="text"
          placeholder="requiredTest"
          className="w-[34%]"
        />
        {errors?.required && (
          <p className="text-red-500"> {errors?.required?.message}</p>
        )}

        <input
          {...register("maxLength", {
            maxLength: {
              value: 5,
              message: "max length is 5 letters",
            },
          })}
          type="text"
          placeholder="max length is 5 letters"
          className="w-[34%]"
        />
        {errors?.maxLength && (
          <p className="text-red-500"> {errors?.maxLength?.message}</p>
        )}

        <input
          {...register("minLength", {
            minLength: {
              value: 5,
              message: "min length is 3 letters",
            },
          })}
          type="text"
          placeholder="min length is 3 letters"
          className="w-[34%]"
        />
        {errors?.minLength && (
          <p className="text-red-500"> {errors?.minLength?.message}</p>
        )}

        <input
          {...register("max", {
            max: {
              value: 5,
              message: "maximum 5",
            },
          })}
          type="text"
          placeholder="maximum 5"
          className="w-[34%]"
        />
        {errors?.max && <p className="text-red-500"> {errors?.max?.message}</p>}

        <input
          {...register("pattern", {
            pattern: {
              value: /[A-Za-z]{3}/,
              message: "only words with minimum 3 letters",
            },
          })}
          type="text"
          placeholder="pattern only words with minimum 3 letters"
          className="w-[34%]"
        />
        {errors?.pattern && (
          <p className="text-red-500"> {errors?.pattern?.message}</p>
        )}

        <input
          {...register("validate", {
            validate: (value) =>
              value === "Yes" || value === "Yes" || "Yes or No only",
          })}
          type="text"
          placeholder="Yes or No only"
          className="w-[34%]"
        />
        {errors?.validate && (
          <p className="text-red-500"> {errors?.validate?.message}</p>
        )}

        <div className="flex gap-3 w-[34%]">
          <input
            {...register("valueAsNumber", {
              valueAsNumber: true,
            })}
            type="text"
            placeholder="valueAsNumber"
            className="flex-1"
          />
          <p> {watch("valueAsNumber")}</p>
        </div>
      </>

      <button className="w-[34%]" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
      {errors?.root && (
        <div className="text-red-500">{errors.root.message}</div>
      )}

      <p className="whitespace-pre-line">{JSON.stringify(data, null, 2)}</p>
    </form>
  );
};
