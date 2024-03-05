import { SubmitHandler, set, useForm } from "react-hook-form";
import { FormFields } from "../page";
import Line from "./Line";

type PropsType = {
  title: string;
};

export const FormExample23 = ({ title }: PropsType) => {
  const { register, handleSubmit, formState, watch, setError, clearErrors } =
    useForm<FormFields>({
      defaultValues: {
        email: "test@email.com",
        password: "",
        firstName: "",
      },
    });

  const { isSubmitting, errors } = formState;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("data", data);
      throw new Error();
    } catch (error) {
      setError("root.serverError", {
        message: "This email is already taken",
      });
    }
  };

  return (
    <form
      className="m-10 gap-5  flex flex-col   justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-[36px]">{title}</div>
      <div>
        setErrors - The function allows you to manually set one or more errors.
      </div>

      <input
        {...register("email")}
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
      {errors?.password?.message && (
        <p className="text-red-500"> {errors?.password?.message}</p>
      )}

      <input
        {...register("firstName", {
          maxLength: {
            value: 5,
            message: "max length is 5",
          },
        })}
        type="text"
        placeholder="firstName"
        className="w-[34%]"
      />
      {errors?.firstName && (
        <p className="text-red-500"> {errors?.firstName?.message}</p>
      )}

      <button
        className="w-[34%]"
        type="button"
        onClick={() => {
          setError("password", {
            type: "manual",
            message: "Dont Forget Your Password Should Be Cool!",
          });
        }}
      >
        Set error for password field
      </button>
      <button
        className="w-[34%]"
        type="button"
        onClick={() => {
          const inputs = [
            {
              type: "manual",
              name: "email",
              message: "Double Check This",
            },
            {
              type: "manual",
              name: "firstName",
              message: "Triple Check This",
            },
          ] as const;

          inputs.forEach(({ type, name, message }) => {
            return setError(name, { type, message });
          });
        }}
      >
        Set error for email and firstName
      </button>

      <button className="w-[34%]" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
      {errors?.root && (
        <p className="text-red-500"> {errors?.root?.serverError.message}</p>
      )}

      <button
        className="w-[34%]"
        type="button"
        onClick={() => clearErrors("firstName")}
      >
        Clear First Name Errors
      </button>
      <button
        className="w-[34%]"
        type="button"
        onClick={() => clearErrors(["firstName", "email"])}
      >
        Clear first name and email Errors
      </button>
      <button className="w-[34%]" type="button" onClick={() => clearErrors()}>
        Clear All
      </button>

      {/* descriptions */}
      <p className="whitespace-pre-line">
        <span className="text-yellow-300 text-xl bold">data</span>{" "}
        {JSON.stringify(watch(), null, 2)}
      </p>
      <Line />
      {["email", "password", "firstName"].map((item) => (
        <p key={item} className="whitespace-pre-line">
          <span className="text-yellow-300 text-xl bold">{`errors.${item}: `}</span>
          {errors?.[item as keyof typeof errors]?.message}
        </p>
      ))}
      <Line />
      <p className="whitespace-pre-line">
        <span className="text-yellow-300 text-xl bold">
          errors.root.serverErrors:
        </span>{" "}
        {JSON.stringify(errors.root?.serverError, null, 2)}
      </p>
    </form>
  );
};
