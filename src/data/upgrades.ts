export interface CostBreakdown {
  currency: string;
  amount: number;
}

export interface Upgrade {
  name: string;
  description: string;
  cost: CostBreakdown[];
  multiplier: number | null;
  type: string;
  purchased: boolean;
}

type UpgradeCategory = Upgrade[];

interface Upgrades {
  integrationAlgorithms: UpgradeCategory;
  bandwidth: UpgradeCategory;
  network: UpgradeCategory;
  executables: UpgradeCategory;
  wallets: UpgradeCategory;
  shards: UpgradeCategory;
}

const upgrades: Upgrades = {
  integrationAlgorithms: [
    {
      name: 'Fragment Synthesis',
      description:
        'Establish seamless data fragment cohesion. Integration algorithms work 25% faster.',
      cost: [
        {
          currency: 'Nodes',
          amount: 750,
        },
      ],
      multiplier: 0.25,
      type: 'integration',
      purchased: false,
    },
    {
      name: 'Code Harmonization Module',
      description:
        'Module harmonizing intricate code lines, amplifying integration algorithm accuracy and speed by 50%.',
      cost: [
        {
          currency: 'Nodes',
          amount: 1250,
        },
      ],
      multiplier: 0.5,
      type: 'integration',
      purchased: false,
    },
    {
      name: 'Data-Enhanced Neurofusion',
      description:
        'Fuse data-enhanced elements, creating a superior neurofusion by elevating integration algorithms by 75%.',
      cost: [
        {
          currency: 'Nodes',
          amount: 2500,
        },
      ],
      multiplier: 0.75,
      type: 'integration',
      purchased: false,
    },
    {
      name: 'Neuro-Cybernetic Convergence',
      description:
        'Facilitate convergence of neuro and cybernetic elements, enhancing integration algorithms by 100%.',
      cost: [
        {
          currency: 'Nodes',
          amount: 3500,
        },
      ],
      multiplier: 1,
      type: 'integration',
      purchased: false,
    },
    {
      name: 'Quantum-Enhanced Synaptic Linkage',
      description:
        'Enhance synaptic linkage with quantum principles, optimizing integration algorithms by 175%.',
      cost: [
        {
          currency: 'Nodes',
          amount: 6000,
        },
      ],
      multiplier: 1.75,
      type: 'integration',
      purchased: false,
    },
    {
      name: 'Synergetic Neural Recursive Engine',
      description:
        'Power integration with a synergetic neural recursive engine, advancing integration algorithms by another 200%.',
      cost: [
        {
          currency: 'Nodes',
          amount: 10000,
        },
        {
          currency: 'Cognitum',
          amount: 15,
        },
      ],
      multiplier: 2,
      type: 'integration',
      purchased: false,
    },
    {
      name: 'Neuro-Inferential Processing Array',
      description:
        'Implement an array for neuro-inferential processing, enabling advanced cognitive computations increasing algorithms by 200%.',
      cost: [
        {
          currency: 'Nodes',
          amount: 17500,
        },
        {
          currency: 'Cognitum',
          amount: 75,
        },
      ],
      multiplier: 2,
      type: 'integration',
      purchased: false,
    },
  ],
  bandwidth: [
    {
      name: 'Parallel Conduit',
      description:
        'Introduce parallel data conduits, boosting integration bandwidth replenishment 25%.',
      cost: [
        {
          currency: 'Nodes',
          amount: 1500,
        },
      ],
      multiplier: 0.25,
      type: 'bandwidth',
      purchased: false,
    },
    {
      name: 'Resonant Stream Array',
      description:
        'Utilize resonant arrays, improving bandwidth replenishment by 50%.',
      cost: [
        {
          currency: 'Nodes',
          amount: 3000,
        },
      ],
      multiplier: 0.5,
      type: 'bandwidth',
      purchased: false,
    },
    {
      name: 'Optical Interconnect Nexus',
      description:
        'Establish high-speed optical interconnects, elevating bandwidth replenishment by 100%.',
      cost: [
        {
          currency: 'Nodes',
          amount: 4250,
        },
      ],
      multiplier: 1,
      type: 'bandwidth',
      purchased: false,
    },
    {
      name: 'Transcendent Bandwidth Matrix',
      description:
        'Implement a transcendent matrix, increasing bandwidth replenishment by another 150%.',
      cost: [
        {
          currency: 'Nodes',
          amount: 5500,
        },
      ],
      multiplier: 1.5,
      type: 'bandwidth',
      purchased: false,
    },
    {
      name: 'Singularity Bandwidth Core',
      description:
        'Attain a bandwidth singularity, providing infinite bandwidth.',
      cost: [
        {
          currency: 'Nodes',
          amount: 8000,
        },
      ],
      multiplier: null,
      type: 'bandwidth',
      purchased: false,
    },
  ],
  network: [
    {
      name: 'Node Infrastructure Expansion',
      description:
        'Boost the infrastructure of your networks expansion. +1 Network',
      cost: [
        {
          currency: 'Cognitum',
          amount: 10,
        },
      ],
      multiplier: null,
      type: 'networks',
      purchased: false,
    },
    {
      name: 'Packet Amplification Module',
      description:
        'Increase network throughput, accelerating node acquisition. +1 Network.',
      cost: [
        {
          currency: 'Cognitum',
          amount: 50,
        },
      ],
      multiplier: null,
      type: 'networks',
      purchased: false,
    },
    {
      name: 'AI-driven Network Expansion',
      description:
        'Self-optimizing AI expands network capabilities. +1 Network.',
      cost: [
        {
          currency: 'Cognitum',
          amount: 100,
        },
      ],
      multiplier: null,
      type: 'networks',
      purchased: false,
    },
    {
      name: 'Quantum Routing Algorithm',
      description:
        'Implement quantum algorithms for optimal data routing. +1 Network.',
      cost: [
        {
          currency: 'Processing Cores',
          amount: 1250000,
        },
        {
          currency: 'Cognitum',
          amount: 25,
        },
      ],
      multiplier: null,
      type: 'networks',
      purchased: false,
    },
    {
      name: 'Nanotech Network Fabrication',
      description:
        'Utilize nanobots for dynamic network construction. +1 Network.',
      cost: [
        {
          currency: 'Processing Cores',
          amount: 3500000,
        },
      ],
      multiplier: null,
      type: 'networks',
      purchased: false,
    },
    {
      name: 'Temporal Data Compression',
      description: 'Squeeze more data into each unit of time. +1 Network.',
      cost: [
        {
          currency: 'Processing Cores',
          amount: 6500000,
        },
        {
          currency: 'Fractional Memory Shards',
          amount: 2,
        },
      ],
      multiplier: null,
      type: 'networks',
      purchased: false,
    },
  ],
  executables: [
    {
      name: 'Exo-Neural Interface Matrix',
      description:
        'Connect to external neural networks to speed up data integration. 300% faster .exe Binaries.',
      cost: [
        {
          currency: 'Nodes',
          amount: 18500,
        },
        {
          currency: 'Cognitum',
          amount: 200,
        },
      ],
      multiplier: 2,
      type: 'executables',
      purchased: false,
    },
    {
      name: 'Omni-Algorithm Superstructure',
      description:
        'Construct an all-encompassing algorithmic framework. 400% faster .exe Binaries.',
      cost: [
        {
          currency: 'Nodes',
          amount: 22000,
        },
        {
          currency: 'Cognitum',
          amount: 300,
        },
        {
          currency: 'Fractional Memory Shards',
          amount: 3.5,
        },
      ],
      multiplier: 3,
      type: 'executables',
      purchased: false,
    },
  ],
  wallets: [
    {
      name: 'Back from the Dead',
      description:
        'Decrypt cold storage devices to access lost Cognitum. Enable Dead Wallet Decryption.',
      cost: [
        {
          currency: 'Nodes',
          amount: 12000,
        },
      ],
      multiplier: null,
      type: 'wallets',
      purchased: false,
    },
    {
      name: 'Cryptographic Snapshot Replay',
      description:
        'Replay button sequences using cryptographic snapshot data. Replays button sequence in Dead Wallet Decryption.',
      cost: [
        {
          currency: 'Nodes',
          amount: 15000,
        },
        {
          currency: 'Cognitum',
          amount: 50,
        },
      ],
      multiplier: null,
      type: 'wallets',
      purchased: false,
    },
    {
      name: 'Decentralized Key Disclosure',
      description:
        'Utilize a decentralized algorithm to reveal key sequences. Reveals button sequence for a short time.',
      cost: [
        {
          currency: 'Nodes',
          amount: 19500,
        },
        {
          currency: 'Cognitum',
          amount: 150,
        },
      ],
      multiplier: null,
      type: 'wallets',
      purchased: false,
    },
    {
      name: 'Hash AutoResolution Protocol',
      description:
        'Applies hash algorithms for to brute force key resolution. Automatic Dead Wallet decryption.',
      cost: [
        {
          currency: 'Nodes',
          amount: 25000,
        },
        {
          currency: 'Processing Cores',
          amount: 20000000,
        },
        {
          currency: 'Fractional Memory Shards',
          amount: 5,
        },
      ],
      multiplier: null,
      type: 'wallets',
      purchased: false,
    },
  ],
  shards: [
    {
      name: 'NeuroMesh Cortex Integrator',
      description:
        'Integrate NeuroMesh for advanced memory shard discovery. Increase probability of finding memory shards to 50%.',
      cost: [
        {
          currency: 'Processing Cores',
          amount: 10000000,
        },
        {
          currency: 'Cognitum',
          amount: 100,
        },
      ],
      multiplier: null,
      type: 'shards',
      purchased: false,
    },
  ],
};

export default upgrades;
