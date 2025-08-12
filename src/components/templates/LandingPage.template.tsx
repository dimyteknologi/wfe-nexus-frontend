interface ILandingPageTemplate {
  children: React.ReactNode;
}

const LandingPageTemplate = ({ children }: ILandingPageTemplate) => {
  return <main className="font-sans h-screen">{children}</main>;
};

export default LandingPageTemplate;
