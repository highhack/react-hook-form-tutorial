import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Line from "./Line";

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
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      test: [{ firstName: "German", lastName: "Goldin" }],
    },
  });
  const { fields, remove, prepend, append, insert, swap, move } = useFieldArray(
    {
      name: "test",
      control,
    }
  );
  const onSubmit = (data: FormValues) => console.log(data);

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
      <div className="flex gap-3 w-[27%]">
        <button
          type="button"
          onClick={
            () =>
              append({
                firstName: "",
                lastName: "",
              })
            //   prepend({
            //     firstName: "",
            //     lastName: "",
            //   })
            //   insert(2, {
            //     firstName: "",
            //     lastName: "",
            //   })
          }
        >
          Add Field
        </button>
        <button type="button" onClick={() => swap(1, 2)}>
          Swap position
        </button>
        <button type="button" onClick={() => move(0, fields?.length - 1)}>
          Move to the end
        </button>
      </div>

      <Line />
      <p className="whitespace-pre-line w-[27%]">
        <span className="text-yellow-300  bold">Fields: </span>
        {JSON.stringify(fields, null, 2)}
      </p>
      <Line />
      <p className="whitespace-pre-line w-[27%]">
        <span className="text-yellow-300  bold">Append: </span>
        {"in the end"}
      </p>
      <Line />
      <p className="whitespace-pre-line w-[27%]">
        <span className="text-yellow-300 bold">Prepend: </span>
        {"in the beginning"}
      </p>
      <Line />
      <p className="whitespace-pre-line w-[27%]">
        <span className="text-yellow-300 bold">Insert: </span>
        {"put input by index"}
      </p>
    </form>
  );
}
