"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import "./index.css";
import { FormExample } from "./components/FormExample";
import { FormExample1 } from "./components/FormExample1";
import { FormExample2 } from "./components/FormExample2";
import FormExample3 from "./components/FormExample3";
import { FormExample4 } from "./components/FormExample4";
import { FormExample21 } from "./components/FormExample21";
import { FormExample22 } from "./components/FormExample22";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  registerTest: z.string(),
});

// export type FormFields = z.infer<typeof schema>;
export type FormFields = {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  notes: string;
  required: string;
  maxLength: string;
  minLength: string;
  max: string;
  pattern: string;
  validate: string;
  valueAsNumber: number;
  inputDisabled: string;
  checkboxDisabled: boolean;
  inputUnregistered: string;
  checkboxUnregistered: boolean;
  shadecnemail: string;
};

export default function Home() {
  return (
    <>
      {/* <FormExample title="Register" />; */}
      {/* <FormExample1 title="Unregister" />; */}
      {/* <FormExample2 title="FormState" />; */}
      {/* <FormExample21 title="watch and useWatch:" />; */}
      <FormExample22 title="reset and resetField:" />;
      {/* <FormExample3 title="useFieldArray" />; */}
      {/* <FormExample4 title="useController" />; */}
    </>
  );
}
