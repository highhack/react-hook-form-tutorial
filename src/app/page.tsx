"use client";

import "./index.css";
import { FormExample } from "./components/FormExample";
import { FormExample1 } from "./components/FormExample1";
import { FormExample2 } from "./components/FormExample2";
import FormExample3 from "./components/FormExample3";
import { FormExample4 } from "./components/FormExample4";
import { FormExample21 } from "./components/FormExample21";
import { FormExample22 } from "./components/FormExample22";
import { FormExample23 } from "./components/FormExample23";
import FormExample5 from "./components/FormExample5";
import { FormExample6 } from "./components/FormExample6";

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
      {/* <FormExample22 title="reset and resetField:" />; */}
      {/* <FormExample23 title="setError and clearErrors:" />; */}
      {/* <FormExample3 title="useFieldArray" />; */}
      {/* <FormExample4 title="useController" />; */}
      {/* <FormExample5 title="useFormContext" />; */}
      <FormExample6 title="Zod Validation" />;
    </>
  );
}
