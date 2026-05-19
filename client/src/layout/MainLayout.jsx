import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";

export default function MainLayout({ children }) {
  return (
    <div className="w-full min-h-[80svh] mt-20 md:mt-28 sm:mx-auto relative">
      <HeaderComponent />
      {/* <SearchBar /> */}
      <main className="">{children}</main>
      {window.location.pathname === "/authentication" ? (
        <></>
      ) : (
        <FooterComponent />
      )}
    </div>
  );
}
