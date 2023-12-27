interface CostBreakdown {
  currency: string;
  amount: number;
}

interface Upgrade {
  name: string;
  description: string;
  cost: CostBreakdown;
  multiplier: number | null;
  purchased: boolean;
}

type UpgradeCategory = Upgrade[];

interface Upgrades {
  integrationAlgorithms: UpgradeCategory;
  bandwidth: UpgradeCategory;
}

const upgrades: Upgrades = {
  integrationAlgorithms: [
    {
      name: 'Fragment Synthesis',
      description:
        'Establish seamless data fragment cohesion. Integration algorithms work 25% faster.',
      cost: {
        currency: 'nodes',
        amount: 1500,
      },
      multiplier: 0.25,
      purchased: false,
    },
  ],
  bandwidth: [
    {
      name: 'Parallel Conduit',
      description:
        'Introduce parallel data conduits, boosting integration bandwidth replenishment 25%.',
      cost: {
        currency: 'nodes',
        amount: 750,
      },
      multiplier: 0.25,
      purchased: false,
    },
    {
      name: 'Resonant Stream Array',
      description:
        'Utilize resonant arrays, improving bandwidth replenishment by 50%.',
      cost: {
        currency: 'nodes',
        amount: 1500,
      },
      multiplier: 0.5,
      purchased: false,
    },
    {
      name: 'Optical Interconnect Nexus',
      description:
        'Establish high-speed optical interconnects, elevating integration replenishment by 100%.',
      cost: {
        currency: 'nodes',
        amount: 2000,
      },
      multiplier: 1,
      purchased: false,
    },
    {
      name: 'Transcendent Bandwidth Matrix',
      description:
        'Implement a transcendent matrix, increasing bandwidth replenishment by another 150%.',
      cost: {
        currency: 'nodes',
        amount: 3000,
      },
      multiplier: 1.5,
      purchased: false,
    },
    {
      name: 'Singularity Bandwidth Core',
      description:
        'Attain a bandwidth singularity, providing infinite bandwidth.',
      cost: {
        currency: 'nodes',
        amount: 4000,
      },
      multiplier: null,
      purchased: false,
    },
  ],
};

export default upgrades;
