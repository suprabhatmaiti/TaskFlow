function Input({ label, className, mode = "input", edit = true, ...rest }) {
  const classes = `border border-gray-300 focus:border focus:border-blue-500 focus:border-2 bg-gray-100 rounded h-10 w-full focus:outline-none px-2 py-4 ${className}`;

  return (
    <div>
      {label && (
        <label className="text-md font-medium text-gray-600">{label}</label>
      )}
      {mode === "input" ? (
        <div>
          {edit ? (
            <input {...rest} className={classes} />
          ) : (
            <input
              {...rest}
              className={classes + " bg-transparent cursor-not-allowed"}
              disabled
            />
          )}
        </div>
      ) : (
        <textarea {...rest} className={classes}></textarea>
      )}
    </div>
  );
}

export default Input;
