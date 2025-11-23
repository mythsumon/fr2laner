"use client";

import { ForFreelancersHero } from "./ForFreelancersHero";
import { ForFreelancersBenefits } from "./ForFreelancersBenefits";
import { ForFreelancersHowItWorks } from "./ForFreelancersHowItWorks";
import { ForFreelancersStats } from "./ForFreelancersStats";
import { ForFreelancersCTA } from "./ForFreelancersCTA";

export const ForFreelancersPage = () => {
  return (
    <main className="bg-white">
      <ForFreelancersHero />
      <ForFreelancersBenefits />
      <ForFreelancersHowItWorks />
      <ForFreelancersStats />
      <ForFreelancersCTA />
    </main>
  );
};





