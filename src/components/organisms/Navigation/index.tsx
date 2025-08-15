const Navigation = () => {
  return (
    <div className="h-[10dvh] flex justify-between items-center px-24 py-4 shadow-md">
      <div className="p-2 flex justify-between gap-8 ">
        <div className="w-14">
          <img src="./assets/logo-bappenas.svg" alt="Logo" />
        </div>
        <div className="w-14">
          <img src="./assets/logo-esdm.svg" alt="Logo" />
        </div>
        <div className="w-7">
          <img src="./assets/logo-undp.svg" alt="Logo" />
        </div>
      </div>
      <nav className="p-2">
        <ul className="flex justify-between gap-10">
          <li>Home</li>
          <li>About</li>
          <li>DSS Interface</li>
          <li>Account</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
