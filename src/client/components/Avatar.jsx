function Avatar({ name }) {
  const initial = name?.charAt(0).toUpperCase();

  return (
    <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">
      {initial}
    </div>
  );
}
