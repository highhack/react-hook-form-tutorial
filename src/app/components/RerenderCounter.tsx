import { useEffect, useState } from "react";

let counter = 0;

export function RerenderCounter() {
  counter++;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return <div>{counter}</div>;
}
