import SectionHeader from "./components/header-section";

const PagesComponent = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full flex-col">
        <SectionHeader text={"Pages"} add="pages" />
        <hr className="border w-full" />
        <div className="w-full flex items-center justify-center mt-2">
          <h1>Pages List</h1>
        </div>
      </div>
    </>
  );
};

export default PagesComponent;
PagesComponent.auth = true;
