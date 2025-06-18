import SearchbarSearchParams from "../MyClips/SearchbarSearchParams";

function CollagesHeader() {
  return (
    <div>
      <h1 className="text-center text-xl font-bold tracking-wider text-lavender-500 underline ">
        My Collages
      </h1>
      <div className="w-1/3">
        <SearchbarSearchParams />
      </div>
    </div>
  );
}

export default CollagesHeader;
