"use client";

import { FindTalentHero } from "./FindTalentHero";
import { FindTalentBenefits } from "./FindTalentBenefits";
import { FindTalentHowItWorks } from "./FindTalentHowItWorks";
import { FindTalentStats } from "./FindTalentStats";
import { FindTalentCTA } from "./FindTalentCTA";

export const FindTalentPage = () => {
  return (
    <main className="bg-white">
      <FindTalentHero />
      <FindTalentBenefits />
      <FindTalentHowItWorks />
      <FindTalentStats />
      <FindTalentCTA />
    </main>
  );
};





