export default function Button({
  className = "",
  size = "default",
  children,
  ...props
}) {
  const baseClasss =
    "relative overflow-hidden rounded-full font-medium focus:outline-none focus-visible:ring-2  focus-visible:ring-primary bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25";
  const buttonSizes = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  const classes = `${baseClasss} ${buttonSizes[size]} ${className}`;
  return (
    <button {...props} className={classes}>
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
