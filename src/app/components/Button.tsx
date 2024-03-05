type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

export const Button = ({ onClick, children }: ButtonProps) => (
  <button className="w-[500px]" type="button" onClick={onClick}>
    {children}
  </button>
);
