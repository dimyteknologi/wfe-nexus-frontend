const Navigation = () => {
  return (
    <div className="h-1/12 flex justify-between items-center px-24 py-4 shadow-[0_8px_6px_-1px_rgba(0,0,0,0.2),0_2px_4px_-1px_rgba(0,0,0,0.06)]">
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
