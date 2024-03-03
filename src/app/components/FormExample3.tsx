import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";

type FormValues = {
  test: {
    firstName: string;
    lastName: string;
  }[];
};

type PropsType = {
  title: string;
};

export default function FormExample3({ title }: PropsType) {
  const { register, control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      test: [{ firstName: "German", lastName: "Goldin" }],
    },
  });
  const { fields, remove, append } = useFieldArray({
    name: "test",
    control,
  });
  const onSubmit = (data: FormValues) => console.log(data);

  // important to fill defaultValue with fields, so when input
  // get removed next render will return updated fields value
  console.log(watch("test"));
  console.log("fields", fields);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-10 gap-5  flex flex-col   justify-center items-center"
    >
      <div className="text-[36px]">{title}</div>
      <div>
        Custom hook for working with Field Arrays (dynamic form). The motivation
        is to provide better user experience and performance.
        <p>
          {" "}
          useFieldArray automatically generates a unique identifier named id
          which is used for key prop.
        </p>
      </div>

      {fields.map((field, index) => {
        return (
          <div key={field.id} className="flex gap-3">
            <input
              {...register(`test.${index}.firstName`)}
              defaultValue={field.firstName}
              type="text"
              placeholder="firstName"
              className="w-[200px]"
            />
            <input
              {...register(`test.${index}.lastName`)}
              defaultValue={field.lastName}
              type="text"
              placeholder="lastName"
              className="w-[200px]"
            />
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        );
      })}
      <button
        type="button"
        onClick={() =>
          append({
            firstName: "",
            lastName: "",
          })
        }
      >
        Add Field
      </button>

      <div className="bg-yellow-300 w-[500px] h-1" />
      <p className="whitespace-pre-line">
        <span className="text-yellow-300 text-xl bold">Fields: </span>
        {fields?.length > 0 ? JSON.stringify(fields, null, 2) : ""}
      </p>
    </form>
  );
}
