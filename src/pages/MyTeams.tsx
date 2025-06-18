import OutletMainContainer from "../components/modules/Auth/OutletMainContainer";

function MyTeams() {
  return (
    <OutletMainContainer>
      <div className="grid grid-cols-3 content-start gap-4 2xl:grid-cols-4">
        <SingleTeamCard />
        <SingleTeamCard />
        <SingleTeamCard />
        <SingleTeamCard />
        <SingleTeamCard />
        <SingleTeamCard />
      </div>
    </OutletMainContainer>
  );
}
export default MyTeams;

function SingleTeamCard() {
  return (
    <div className="space-y-2 rounded-md border-4 border-lavender-400 bg-lavender-500 px-4 py-8 text-white shadow-md">
      <h3 className="text-lg font-semibold">Team 1</h3>
      <p className="text-sm">Altaf Hussain</p>
      <p className="text-sm">9 members</p>
    </div>
  );
}
