
export default function ModulePage({ title, description }: any) {
  return (
    <div className="min-h-screen bg-white py-16 text-center">
      <h1 className="text-4xl font-bold">{title || "Module"}</h1>
      <p className="mt-4 text-gray-500">{description || "Content coming soon."}</p>
    </div>
  );
}
export { ModulePage };
