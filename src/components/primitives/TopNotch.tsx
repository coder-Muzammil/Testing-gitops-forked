function TopNotch({ onOpenCards }: { onOpenCards: () => void }) {
  return (
    <div className="flex h-5 justify-center 2xl:h-8">
      <span
        onClick={onOpenCards}
        className="flex h-full items-center justify-center rounded-b-full bg-gradient-to-b from-lavender-500 to-lavender-900 font-semibold hover:cursor-pointer 2xl:font-bold"
      >
        <p className="select-none px-6 text-xs tracking-widest text-white  2xl:text-base">
          CMU - Forbmax AI Platform
        </p>
      </span>
    </div>
  );
}
export default TopNotch;
