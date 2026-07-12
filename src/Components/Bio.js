import React from 'react';
import Section from './Section';

const Bio = () => (
  <Section id="bio" title="Research">
    <div className="prose animatable fadeInUp">
      <p>
        My postdoctoral research at UBC focuses on building a foundation model for security applications. Previously, I
        worked as an Applied Scientist Intern within the Security Analytics and AI Research (SAAR) team at{' '}
        <a href="https://aws.amazon.com/" target="_blank" rel="noopener noreferrer">
          Amazon Web Services
        </a>{' '}
        in New York, focusing on multi-agent system prompt security. My PhD research focused on exploiting the full
        potential of AI for detecting advanced attacks such as APTs at the network and system levels through
        self-supervised graph learning.
      </p>

      <p>
        My research interests include intrusion detection, anomaly detection, graph neural networks (GNNs), temporal
        graph learning, self-supervised learning, LLM fine-tuning for security applications, and injection attacks in
        agentic systems.
      </p>

      <p>
        Alongside my research, I enjoy building frameworks that simplify experimentation for the community and my
        research teams, and that promote more consistent evaluation across publications. I developed{' '}
        <a href="https://github.com/ubc-provenance/PIDSMaker" target="_blank" rel="noopener noreferrer">
          PIDSMaker
        </a>
        , a machine learning framework for designing provenance-based intrusion detection systems (PIDSs) that
        integrates many state-of-the-art approaches. I also created{' '}
        <a href="https://github.com/mlx-graphs/mlx-graphs" target="_blank" rel="noopener noreferrer">
          mlx-graphs
        </a>{' '}
        for running GPU-accelerated GNNs on Apple Silicon, and{' '}
        <a href="https://github.com/TristanBilot/mlx-benchmark" target="_blank" rel="noopener noreferrer">
          mlx-benchmark
        </a>{' '}
        to compare the performance of Apple chips and NVIDIA GPUs across PyTorch and Apple MLX operations. At AWS, I
        built a framework for evaluating the security of multi-agent systems.
      </p>
    </div>
  </Section>
);

export default Bio;
