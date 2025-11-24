import { Component } from 'react';
import '../Styles/publications.sass';

class Bio extends Component {

  render() {
    return (
      <div id="bio" className="header">
        <div className="container-fluid">
          <div className="row">
          <div className="small-vertical-space"></div>
            <div className="col-sm-3 col-0"></div>
            <div className="col-sm-6 col-12">
                <div className="block">
                    <div className="vertical-space-only-mobile"></div>
                    <h1 className="title  fadeInUp">Research</h1>
                    <div className="very-small-vertical-space"></div>
                    <div className="row animatable fadeInUp">
                        <div className="col-md-12">

                        I am currently an Applied Scientist Intern within the <span className='accent-color'>Security Analytics and AI Research (SAAR)</span> team at <span className='accent-color'><a href="https://aws.amazon.com/">Amazon Web Services (AWS)</a></span> in New York, and a PhD graduate from <span className='accent-color'><a href="https://www.universite-paris-saclay.fr/">Université Paris-Saclay</a></span>.
                        My work spans at the intersection of AI and security.
                        My PhD research focused on exploiting the full potential of AI for detecting advanced attacks such as APTs at the network and system levels through self-supervised graph learning.

                        <br/><br/>

                        My research interests include intrusion detection, anomaly detection, graph neural networks (GNNs), temporal graph learning, self-supervised learning, LLM fine-tuning for security applications, and injection attacks in agentic systems.

      <br/><br/>

                        Alongside my research, I enjoy building frameworks that simplify experimentation for the community and my research teams, and that promote more consistent evaluation across publications. 
                        I developed <span className='accent-color'><a href="https://github.com/ubc-provenance/PIDSMaker">PIDSMaker</a></span>, a machine learning framework for designing provenance-based intrusion detection systems (PIDSs) that integrates many state-of-the-art approaches. 
                        I also created <span className='accent-color'><a href="https://github.com/mlx-graphs/mlx-graphs">mlx-graphs</a></span> for running GPU-acceleated GNNs on Apple Silicon, and <span className='accent-color'><a href="https://github.com/TristanBilot/mlx-benchmark">mlx-benchmark</a></span> to compare the performance of Apple chips and NVIDIA GPUs across PyTorch and Apple MLX operations. 
                        I am currently working on a framework for evaluating multi-agent system security at AWS.
                        </div>

                    </div>
                </div>
            </div>
            <div className="col-sm-3 col-0"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Bio;
