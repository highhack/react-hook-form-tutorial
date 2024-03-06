import { Controller, SubmitHandler, set, useForm } from "react-hook-form";
import { FormFields } from "../page";
import { useState } from "react";
import Line from "./Line";
import { RerenderCounter } from "./RerenderCounter";

type PropsType = {
  title: string;
};

export const FormExampleRerender = ({ title }: PropsType) => {
  const [data, setData] = useState({});

  const { register, handleSubmit, control, setError } = useForm<FormFields>({
    defaultValues: {
      email: "test@email.com",
      password: "",
      required: "",
      validate: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log("onSubmit", data);
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
      <RerenderCounter />
      <div className="text-[36px]">{title}</div>
      <div>
        This object contains information about the entire form state. It helps
        you to keep on track with the users interaction with your form
        application.
      </div>

      <input
        {...register("email")}
        type="text"
        placeholder="email"
        className="w-[34%]"
      />

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

      <Controller
        name="validate"
        rules={{
          required: true,
          maxLength: {
            value: 5,
            message: "max length is 3 letters",
          },
          minLength: {
            value: 3,
            message: "min length is 3 letters",
          },
        }}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            {error && <p className="text-red-500"> {error.message}</p>}
            <input
              {...field}
              type="text"
              placeholder="validate"
              className="w-[34%]"
            />
            {/* {error && <>validate error</>}  */}
          </>
        )}
      />
      <input type="submit" />
    </form>
  );
};
