import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

type PropsType = {
  title: string;
};

export default function FormExample5({ title }: PropsType) {
  const methods = useForm();
  const { handleSubmit, formState, register, watch } = methods;
  const { isSubmitting } = formState;
  const onSubmit = (data: any) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form
        className="m-10 gap-5  flex flex-col  justify-center items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-[36px]">{title}</div>
        <div>
          This custom hook allows you to access the form context. useFormContext
          is intended to be used in deeply nested structures, where it would
          become inconvenient to pass the context as a prop.
        </div>
        <div className="border-2 gap-5 border-yellow-900 w-full p-4 flex flex-col  justify-center items-center">
          <h2 className="w-full">Parent Component</h2>
          <input
            {...register("email")}
            type="text"
            placeholder="email"
            className="w-[50%]"
          />
          <NestedInput />
          <button className="w-[50%]" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
          <p className="whitespace-pre-line w-[50%]">
            <span className="text-yellow-300 text-xl bold ">Watch</span>{" "}
            {JSON.stringify(watch(), null, 2)}
          </p>
        </div>
      </form>
    </FormProvider>
  );
}

function NestedInput() {
  const {
    register,
    formState: { isSubmitting },
    watch,
  } = useFormContext(); // retrieve all hook methods

  return (
    <div className="flex flex-col gap-3 w-[50%] p-4 border-2 border-yellow-900">
      <h2 className="w-full">Nested Component</h2>
      <input
        {...register("password")}
        type="password"
        placeholder="password"
        className="w-full"
      />
      <button className="w-full" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Inner Submit"}
      </button>
      <p className="whitespace-pre-line">
        <span className="text-yellow-300 text-xl bold ">Inner Watch</span>{" "}
        {JSON.stringify(watch(), null, 2)}
      </p>
    </div>
  );
}
