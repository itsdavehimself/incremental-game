interface CostBreakdown {
  currency: string;
  amount: number;
}

export interface Upgrade {
  name: string;
  description: string;
  cost: CostBreakdown;
  multiplier: number | null;
  type: string;
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
        amount: 750,
      },
      multiplier: 0.25,
      type: 'integration',
      purchased: false,
    },
    {
      name: 'Code Harmonization Module',
      description:
        'Module harmonizing intricate code lines, amplifying integration algorithm accuracy and speed by 50%.',
      cost: {
        currency: 'nodes',
        amount: 1500,
      },
      multiplier: 0.5,
      type: 'integration',
      purchased: false,
    },
    {
      name: 'Data-Enhanced Neurofusion',
      description:
        'Fuse data-enhanced elements, creating a superior neurofusion by elevating integration algorithms by 75%.',
      cost: {
        currency: 'nodes',
        amount: 3500,
      },
      multiplier: 0.75,
      type: 'integration',
      purchased: false,
    },
    {
      name: 'Neuro-Cybernetic Convergence',
      description:
        'Facilitate convergence of neuro and cybernetic elements, enhancing integration algorithms by 100%.',
      cost: {
        currency: 'nodes',
        amount: 5000,
      },
      multiplier: 1,
      type: 'integration',
      purchased: false,
    },
    {
      name: 'Quantum-Enhanced Synaptic Linkage',
      description:
        'Enhance synaptic linkage with quantum principles, optimizing integration algorithms by 200%.',
      cost: {
        currency: 'nodes',
        amount: 7500,
      },
      multiplier: 2,
      type: 'integration',
      purchased: false,
    },
    {
      name: 'Synergetic Neural Recursive Engine',
      description:
        'Power integration with a synergetic neural recursive engine, advancing integration algorithms by 400%.',
      cost: {
        currency: 'nodes',
        amount: 10000,
      },
      multiplier: 4,
      type: 'integration',
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
        amount: 500,
      },
      multiplier: 0.25,
      type: 'bandwidth',
      purchased: false,
    },
    {
      name: 'Resonant Stream Array',
      description:
        'Utilize resonant arrays, improving bandwidth replenishment by 50%.',
      cost: {
        currency: 'nodes',
        amount: 1750,
      },
      multiplier: 0.5,
      type: 'bandwidth',
      purchased: false,
    },
    {
      name: 'Optical Interconnect Nexus',
      description:
        'Establish high-speed optical interconnects, elevating bandwidth replenishment by 100%.',
      cost: {
        currency: 'nodes',
        amount: 2000,
      },
      multiplier: 1,
      type: 'bandwidth',
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
      type: 'bandwidth',
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
      type: 'bandwidth',
      purchased: false,
    },
  ],
};

export default upgrades;
