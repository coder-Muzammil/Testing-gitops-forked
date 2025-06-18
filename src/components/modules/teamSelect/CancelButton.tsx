function CancelButton({ closerFn }: { closerFn: () => void }) {
  return (
    <div className="w-20">
      <button
        type="button"
        onClick={closerFn}
        className="block h-6 w-full rounded-md text-sm text-red-500 2xl:h-8"
      >
        <div className="flex items-center justify-center gap-2">Cancel</div>
      </button>
    </div>
  );
}
export default CancelButton;
