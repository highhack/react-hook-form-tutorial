import { SubmitHandler, set, useForm } from "react-hook-form";
import { FormFields } from "../page";
import { useEffect, useState } from "react";
import clsx from "clsx";

type PropsType = {
  title: string;
};

export const FormExample1 = ({ title }: PropsType) => {
  const [data, setData] = useState({});

  const { register, handleSubmit, unregister, formState, watch } =
    useForm<FormFields>({
      defaultValues: {
        checkboxUnregistered: true,
        checkboxDisabled: false,
      },
    });

  const registered = watch("checkboxUnregistered");
  const disabled = watch("checkboxDisabled");

  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (!registered) {
      unregister("inputUnregistered");
    }
  }, [unregister, registered]);

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
        This method allows you to unregister a single input or an array of
        inputs. It also provides a second optional argument to keep state after
        unregistering an input.
      </div>

      <div className="flex  gap-3 w-[500px]">
        <input
          {...register("inputDisabled", {
            disabled: disabled,
          })}
          type="text"
          placeholder="inputDisabled"
          className={clsx("flex-1 ", {
            "border-2 border-gray-200": disabled,
          })}
        />

        <label htmlFor="checkboxDisabled">register is disabled</label>
        <input
          type="checkbox"
          id="checkboxDisabled"
          {...register("checkboxDisabled")}
          className="w-7 "
        />
      </div>

      <div className="flex  gap-3 w-[500px]">
        {registered && (
          <input
            {...register("inputUnregistered")}
            type="text"
            placeholder="inputUnregistered"
            className={clsx("flex-1 ", {
              "border-2 border-yellow-200": registered,
            })}
          />
        )}

        <label htmlFor="checkboxUnregistered">registered</label>
        <input
          type="checkbox"
          id="checkboxUnregistered"
          {...register("checkboxUnregistered")}
          className="w-7 "
        />
      </div>

      <button className="w-[500px]" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
      {errors?.root && (
        <div className="text-red-500">{errors.root.message}</div>
      )}

      <p className="whitespace-pre-line">{JSON.stringify(data, null, 2)}</p>
    </form>
  );
};
