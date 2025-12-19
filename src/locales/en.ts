export const en = {
  navigation: {
    home: "Home",
    about: "About",
    dssInterface: "DSS Interface",
    siteSpecific: "Site Specific",
    contextSpecific: "Context Specific",
    login: "Login",
    logout: "Logout",
  },
  dssModal: {
    tabs: {
      about: "ABOUT",
      relatedAssumption: "RELATED ASSUMPTION",
      scenarioBuilding: "SCENARIO BUILDING",
    },
    about: {
      title: "About the DSS Tool",
      p1: "The Decision Support System (DSS) Tool is developed through an interlinkages-based approach, emphasizing the interactions among the water–food–energy sectors under dynamic social and economic conditions as key drivers of regional development performance.",
      p2: "Using a systems thinking perspective and system dynamics modeling approach (Forester, 1961; Vennix, 1996; Senge, 2000; Sterman, 2000; Morecroft, 2015), the DSS Tool is designed to illustrate the impacts of demand scenarios for the economic sector (industry and services), agriculture production (rice, livestock, and inland fisheries), and population growth on the local capacity to meet water, food, and energy needs.",
      p3: "It also incorporates sector-specific scenarios such as the development of recharge areas for water production (artificial ponds, conservation measures), solar PV deployment, and agricultural productivity improvements, with the aim of enhancing local water, energy, and food resilience in the future.",
      p4: "The conceptual framework of the sectoral interlinkages within the DSS Tool is illustrated as follows:",
      conceptDiagramAlt: "DSS Conceptual Framework",
      conceptFramework: "Conceptual framework of sectoral interlinkages",
      p5: "The diagram above illustrates the interconnected dynamics within the Water–Energy–Food (WEF) Nexus, emphasizing the feedback relationships between resource availability, consumption, and production. Each component influences the others through reinforcing and balancing loops, shaping sustainability outcomes over time. The modules including:",
      p6: "Several assumptions related to resource needs (water, energy, food) within a region include:",
      modules: {
        food: {
          title: "1. Food Module",
          components: "Components: Local food production (rice, livestock, fish, etc.), food availability, Self-Sufficiency Level (SSL), and Availability per Person (APP).",
          dependencies: "Dependencies: Food production depends on water availability for irrigation and energy for pumping, processing, and transportation."
        },
        water: {
          title: "2. Water Module",
          components: "Components: Water storage, irrigation supply, domestic and industrial demand.",
          linkages: "Linkages: Water supply gives availability for economy and population to grow."
        },
        energy: {
          title: "3. Energy Module",
          components: "Components: Energy supply (including renewables), consumption by agricultural and water sectors.",
          interactions: "Interactions: Energy generation often requires water (e.g., hydropower, cooling systems), creating interdependencies across modules."
        },
        economy: {
          title: "4. Economy Module",
          components: "Components: GDRP for manufacture, agriculture, and others.",
          interactions: "Interactions: As driver for resources (food, water, energy) demand and feedback in terms of availability for growing economy."
        },
        population: {
          title: "5. Population Module",
          components: "Components: Population and its growth.",
          interactions: "Interactions: As driver for resources (food, water, energy) demand for population and feedback in terms of availability for growing economy that affect the population growth."
        }
      },
      p7: "The interaction among the sectors will form the loop between each module, including:",
      tableLoops: {
        loop: "Loop",
        involvedModule: "Involved Module",
        description: "Description",
        rows: [
          { id: "B1", module: "Economy ➔ Water ➔ Economy", desc: "GDRP affects water demand; water supply in turn affects the economy`s capacity to grow." },
          { id: "B2", module: "Economy ➔ Energy ➔ Economy", desc: "GDRP affects energy demand; energy supply in turn affects the economy`s capacity to grow." },
          { id: "B3", module: "Food ➔ Water ➔ Food", desc: "Food production volume affects water demand for irrigation; water supply affects food production capacity." },
          { id: "B4", module: "Food ➔ Energy ➔ Food", desc: "Food production volume affects energy demand for production; energy supply affects food production capacity." },
          { id: "R1", module: "Population", desc: "Population and its own growth acts as a reinforcing loop." },
          { id: "B5", module: "Population ➔ Water ➔ Population", desc: "Population affects water demand; water supply sufficiency and quality affect population growth." },
          { id: "B6", module: "Population ➔ Food ➔ Population", desc: "Population affects food demand; food supply affects population growth due to sufficiency." }
        ]
      },
      sectoralScopeTitle: "Sectoral Scope and Boundaries",
      tableScope: {
        sector: "Sector",
        scope: "Scope and Boundary",
        rows: [
          { sector: "Economy", scope: "17 GRDP economic sectors with deeper focus on the agricultural sector" },
          { sector: "Agriculture", scope: ["Rice as the main staple food, with extensive land use", "Livestock as staple food support", "Inland fisheries as staple food support"] },
          { sector: "Demography", scope: ["Total Population", "Population growth rate"] },
          { sector: "Water", scope: ["General: Total calculation of local water demand and supply", "Demand: Domestic, Economy (Industrial), Urban system", "Supply: Surface Water, Ground Water, Regional supply"] },
          { sector: "Energy", scope: ["General: Only cover electricity—due to data limitation", "Demand: Domestic, Economy (Industrial)", "Supply: Local production, Regional supply"] },
          { sector: "Food", scope: ["General: Covers only staple food (rice)", "Demand: Domestic, Economy (Industrial and or services)", "Supply: Local production, Production surplus or deficit"] }
        ]
      },
      p8: "The use of the DSS begins with inputting a dataset of regional conditions, followed by configuring the assumptions and trends of the model in the area, mapping these assumptions and trends into model scenarios, and validating historical behavior."
    },
    aboutContext: {
      title: "About the DSS Tool",
      p1: "The Decision Support System (DSS) Tool is developed using an interlinkages-based approach, emphasizing the interconnections among the water–energy–food sectors for agricultural areas characterized by abundant surface water resources, challenges in water transportation, the availability of renewable energy sources (RES) such as solar energy for micro-scale applications, and geothermal energy for regional power generation. These resources are sourced from the Samosir and Ulubelu areas in Lampung.",
      p2: "In a specific context, users can define agricultural land area, solar power plant capacity, and geothermal power plant capacity as the main input variables that determine agricultural performance and microeconomic outcomes. Solar power generation reduces reliance on fossil fuel–based water pumps, while geothermal energy contributes to reducing energy consumption for post-harvest drying processes. Both interventions directly affect farmers’ income and profit performance. In addition, the financial sustainability of operating solar power plants is also considered, in order to assess the extent to which local communities or regions are capable of managing the long-term operation of solar power plants and water pumping systems.",
      p3: "Using a systems thinking perspective and a system dynamics modeling approach (Forrester, 1961; Vennix, 1996; Senge, 2000; Sterman, 2000; Morecroft, 2015), the DSS Tool is designed to illustrate the impacts of demand scenarios in the agricultural sector (particularly rice farming), as well as in the water and energy resource sectors. The energy sector includes geothermal and solar photovoltaic (PV) systems for agricultural water pumping, while the water sector includes surface water and transported water supplied through fossil fuel–based pumps and solar PV–based pumps.",
      conceptTitle: "The conceptual framework of sectoral interlinkages within the DSS Tool is illustrated as follows:",
      conceptDiagramAlt: "DSS Conceptual Framework",
      conceptFramework: "Conceptual framework of sectoral interlinkages",
      scopeIntro: "The DSS concept is developed at the micro level by considering local agricultural dynamics and characteristics (productivity, land, and practical management), water resources (surface water and groundwater), and energy sources (fossil-based and renewable), within the following scope:",
      sectoralScopeTitle: "Sectoral Scope and Boundaries",
      table: {
          sector: "Sector",
          scope: "Scope and Boundary",
          agriculture: {
              name: "Agriculture",
              items: ["Area", "Productivity", "Production"]
          },
          demography: {
              name: "Demography",
              items: ["Total Population", "Rice demand"]
          },
          water: {
              name: "Water",
              general: "General: Total calculation of local water demand and supply",
              demand: "Demand:",
              demandItems: ["Agriculture demand", "Agricultural demand", "Geothermal demand (applied only when using surface water)"],
              supply: "Supply:",
              supplyItems: ["Rainfall water", "Transported water using pumps (fossil fuel–based or solar PV–based)"]
          },
          energy: {
              name: "Energy",
              general: "General: Limited to agriculture purposes",
              demand: "Demand:",
              demandItems: ["Agriculture demand"],
              supply: "Supply:",
              supplyItems: ["Fossil fuel supply", "Solar PV", "Excess steam from geothermal"]
          },
          food: {
              name: "Food",
              general: "General: Rice only",
              demand: "Demand:",
              demandItems: ["Domestic demand"],
              supply: "Supply:",
              supplyItems: ["Local production", "Production surplus or deficit"]
          }
      },
      diagramAlt: "DSS Conceptual Framework"
    },
    relatedAssumption: {
      title: "Related Assumptions",
      intro: "Several assumptions related to resource needs (water, energy, food) within a region include:",
      items: [
        "Water demand per capita [liters/capita/day]",
        "Water demand per unit of industrial production [m³/billion IDR]",
        "Water demand for agricultural land [mm/day/ha]",
        "Water demand for inland fisheries [mm/day/ha]",
        "Water demand for livestock [mm/day/head]",
        "Water demand for urban land [% of domestic demand]",
        "Rate of agricultural and forest land conversion [%/year]",
        "Food demand per capita [kg/capita/year]",
        "Energy demand per capita [kWh/capita/year]",
        "Rice shrinkage ratio from unhulled rice (GKG) [%]",
        "Energy intensity for the economy [kWh/billion IDR]",
      ]
    },
    relatedAssumptionContext: {
        title: "Related Assumptions",
        intro: "Several assumptions related to resource needs (water, energy, food) for context specific:",
        items: [
            "Water demand for agricultural land [mm/day/ha]",
            "Food demand per capita [kg/capita/year]",
            "Energy demand for food production [MJ/ha/season]",
            "Seed yield [ton/ha]",
            "Cropping intensity [1/year]",
            "Rainfall [mm/year]",
            "Water transported by water pump [m3/KWh]",
            "Solar intensity in the area [W/m2]",
            "Solar duration per day [h/day]",
            "Panel efficiency [%]"
        ]
    },
    scenarioBuilding: {
      title: "Scenario Building",
      intro: "Scenarios related to demand and supply, for each resource sector, include:",
      table: {
        sector: "Sector",
        scope: "Scope and Boundary",
        rows: [
          { sector: "Industry", items: ["Industrial growth"] },
          { sector: "Food", items: ["Agriculture growth", "Agriculture land conversion", "Agriculture productivity"] },
          { sector: "Water", items: ["Artificial pond percentage in industrial area", "Artificial pond percentage in housing area", "Domestic water demand unit", "Industrial water demand unit"] },
          { sector: "Energy", items: ["Solar PV Area Percentage on industrial", "Solar PV Area Percentage on Housing", "Industrial Energy efficiency rate", "Domestic electricity consumption increase rate"] },
          { sector: "Population", items: ["Population growth rate"] }
        ]
      }
    },
    scenarioBuildingContext: {
        title: "Scenario Building",
        intro: "For the specific context, the case examined focuses on villages/districts dominated by agricultural land within a small-island ecosystem that has abundant water resources (lakes) but faces difficulties in water transportation, as well as possessing geothermal potential that can be utilized for electricity generation and direct use. The available scenario setups to be simulated include:",
        table: {
        sector: "Sector",
        scope: "Scope and Boundary",
        rows: [
          { sector: "Food Demand Side", items: [ "Population initial", "Population growth", "Rice demand per kapita", "Conversion factor GKP to GKG", "Conversion factor GKG to rice"] },
          { sector: "Agriculture Production", items: ["Agriculture land", "Land conversion growth", "Base yield", "Cropping intensity target", "Water intensity input"] },
          { sector: "Diesel Pump", items: ["Capacity", "Water head unit"] },
          { sector: "Fertilizer", items: ["Percentage of chemical fertilizer", "Ratio organic to chemical mass"] },
          { sector: "Rainfall", items: ["Rainfall", "Rainfall intensity per year", "Day of rain within a year"]},
          { sector: "Solar PV Water Pump", items: ["Solar PV installed capacity", "Solar PV Fee (Charged to farmers)"] },
          { sector: "Geothermal", items: ["Geothermal", "Capacity", "Utilization of excess steam"]}
        ]
      }
    }
  },
  login: {
    title: "Sign in to your account",
    emailLabel: "Email Address",
    emailPlaceholder: "name@domain.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter password",
    rememberMe: "Remember me",
    submitButton: "Sign In",
    processingButton: "Processing...",
    authError: "Authentication failed",
  },
  landing: {
    hero: {
      title1: "WEF NEXUS",
      title2: "Decision Support System",
      subtitle: "Transforming Water-Energy-Food Nexus thinking into actionable insights and policies for sustainable development.",
      cta: "Get Started",
      joinText: "Join",
      joinCount: "500+",
      joinSuffix: "organizations using our platform",
      collaboration: "Collaboration Simulation",
      activeUser: "Active User",
      collaboratedWith: "Collaborated with government leading organizations"
    },
    features: {
      badge: "Powerful Features",
      title: "Everything You Need for Informed Decisions",
      subtitle: "Our platform provides comprehensive tools to analyze and optimize the Water-Energy-Food Nexus",
      items: {
         analytics: { title: "Advanced Analytics", desc: "Leverage context and site analytics to gain deep insights into nexus interdependencies and impacts." },
         modeling: { title: "Scenario Modeling", desc: "Create and compare multiple scenarios to evaluate policy decisions under different conditions." },
         simulation: { title: "Real-time Simulation", desc: "Simulation key indicators in real-time with dynamic visualization." },
         collaboration: { title: "Stakeholder Collaboration", desc: "Enable seamless collaboration between multiple stakeholders with role-based access." },
         reporting: { title: "Comprehensive Reporting", desc: "Generate detailed reports with visualizations in multiple formats for decision makers." },
         security: { title: "Data Security", desc: "Enterprise-grade security with encryption and compliance with global data protection standards." }
      }
    },
    howItWorks: {
       badge: "How It Works",
       title: "From Data to Decisions in Four Steps",
       subtitle: "A streamlined process to transform complex data into actionable insights",
       steps: {
          step1: { title: "Data Integration", desc: "Connect your data sources or use our sample datasets to get started quickly." },
          step2: { title: "Model Configuration", desc: "Configure models based on your specific context and policy questions." },
          step3: { title: "Analysis & Simulation", desc: "Run simulations and analyze results through interactive visualizations." },
          step4: { title: "Implementation", desc: "Implement evidence-based policies with confidence and monitoring." }
       }
    },
    cta: {
       title: "Ready to Transform Your Decision-Making?",
       subtitle: "Join hundreds of organizations using WEF Nexus to create sustainable policies and practices",
       button: "Get Started"
    }
  },
  footer: {
     tagline: "Transforming WEF Nexus thinking into actionable insights and policies.",
     product: {
        title: "Product",
        features: "Features",
        caseStudies: "Case Studies",
        testimonials: "Testimonials"
     },
     resources: {
        title: "Resources",
        blog: "Blog",
        documentation: "Documentation",
        support: "Support",
        api: "API"
     },
     company: {
        title: "Company",
        about: "About",
        contact: "Contact",
        partners: "Partners"
     },
     copyright: "© 2025 WEF Nexus. All rights reserved."
  }
};
