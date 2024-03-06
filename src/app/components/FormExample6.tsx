import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RerenderCounter } from "./RerenderCounter";

type PropsType = {
  title: string;
};

const schema = z
  .object({
    email: z.string().email(),
    githubUrl: z
      .string()
      .url()
      .includes("github.com", { message: "Invalid GitHub URL" }),
    yearsOfExperience: z
      .number({
        required_error: "required field",
        invalid_type_error: "Years of Experience is required",
      })
      .min(1)
      .max(10),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });

type FormFields = z.infer<typeof schema>;

export const FormExample6 = ({ title }: PropsType) => {
  const { register, handleSubmit, watch, formState } = useForm<FormFields>({
    defaultValues: {
      email: "test@email.com",
    },
    resolver: zodResolver(schema),
  });

  const { errors, isSubmitting } = formState;

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

      <div>
        Zod stands out as a schema declaration and validation library, with
        TypeScript as its primary focus. The term "schema" encompasses various
        data types, ranging from strings, numbers, and booleans to more complex
        objects.
      </div>

      <input
        {...register("email")}
        type="text"
        placeholder="email"
        className="w-[34%]"
      />
      {errors?.email && (
        <p className="text-red-500"> {errors?.email?.message}</p>
      )}

      <input
        {...register("githubUrl")}
        type="text"
        placeholder="githubUrl"
        className="w-[34%]"
      />
      {errors?.githubUrl && (
        <p className="text-red-500"> {errors?.githubUrl?.message}</p>
      )}

      <input
        {...register("yearsOfExperience", { valueAsNumber: true })}
        type="text"
        placeholder="yearsOfExperience"
        className="w-[34%]"
      />
      {errors?.yearsOfExperience && (
        <p className="text-red-500"> {errors?.yearsOfExperience?.message}</p>
      )}

      <input
        {...register("password")}
        type="text"
        placeholder="password"
        className="w-[34%]"
      />
      {errors?.password && (
        <p className="text-red-500"> {errors?.password?.message}</p>
      )}

      <input
        {...register("confirmPassword")}
        type="text"
        placeholder="confirmPassword"
        className="w-[34%]"
      />
      {errors?.confirmPassword && (
        <p className="text-red-500"> {errors?.confirmPassword?.message}</p>
      )}

      <button className="w-[34%]" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
      {errors?.root && (
        <div className="text-red-500">{errors.root.message}</div>
      )}
    </form>
  );
};
