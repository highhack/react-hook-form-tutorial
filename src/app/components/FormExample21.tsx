import { Control, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { FormFields } from "../page";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Line from "./Line";
import { RerenderCounter } from "./RerenderCounter";

type PropsType = {
  title: string;
};

const WatchInput = ({ control }: { control: Control<FormFields, any> }) => {
  const notes = useWatch({ control, name: "notes" });

  return (
    <p className="whitespace-pre-line w-[50%] p-2 border-2 border-yellow-900">
      <h2>Inner Component</h2>
      <span className="text-yellow-300 bold">
        {"Inner component with using:"}
        <p>{"useWatch({ name: 'notes' })"}</p>
      </span>
      {JSON.stringify(notes, null, 2)}
    </p>
  );
};

export const FormExample21 = ({ title }: PropsType) => {
  const [value, setValue] = useState("");
  const { register, handleSubmit, formState, watch, control } =
    useForm<FormFields>({
      defaultValues: {
        email: "test@email.com",
      },
    });

  const { errors, isSubmitting } = formState;

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      setValue(JSON.stringify({ value, name, type }, null, 2))
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log("data", data);
  };

  return (
    <form
      className="m-10 gap-5  flex flex-col   justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <RerenderCounter />
      <div className="text-[36px]">{title}</div>
      <p>
        watch: This method will watch specified inputs and return their values.
        It is useful to render input value and for determining what to render by
        condition.
      </p>
      <p>
        useWatch: Behaves similarly to the watch API, however, this will isolate
        re-rendering at the custom hook level and potentially result in better
        performance for your application.
      </p>
      <p>
        The only difference between useWatch and watch is at the root (useForm)
        level or the custom hook level update.
      </p>

      <div className="flex flex-col gap-3 w-[50%]">
        <input
          {...register("email")}
          type="text"
          placeholder="email"
          className={clsx("flex-1 ")}
        />
        <input
          {...register("password")}
          type="password"
          placeholder="password"
          className={clsx("flex-1 ")}
        />
        <input
          {...register("notes")}
          type="text"
          placeholder="notes"
          className={clsx("flex-1 ")}
        />
      </div>

      <button className="w-[50%]" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
      {errors?.root && (
        <div className="text-red-500">{errors.root.message}</div>
      )}

      <Line />
      <p className="whitespace-pre-line w-[50%]">
        <span className="text-yellow-300 bold">{"watch():"} </span>
        {JSON.stringify(watch(), null, 2)}
      </p>

      <Line />
      <p className="whitespace-pre-line w-[50%]">
        <span className="text-yellow-300 bold">{"watch('email'):"} </span>
        {JSON.stringify(watch("email"), null, 2)}
      </p>

      <Line />
      <p className="whitespace-pre-line w-[50%]">
        <span className="text-yellow-300 bold">
          {"watch(['email', 'notes']):"}{" "}
        </span>
        {JSON.stringify(watch(["email", "notes"]), null, 2)}
      </p>
      <Line />
      <p className="whitespace-pre-line w-[50%]">
        <span className="text-yellow-300 bold">
          {"Callback watch((value, { name, type }) => { value, name, type }:"}{" "}
        </span>
        {value}
      </p>

      <Line />
      <WatchInput control={control} />
    </form>
  );
};
