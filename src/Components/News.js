import { Component } from 'react';
import '../Styles/publications.sass';

class News extends Component {

  render() {
    return (
      <div id="news" className="header">
        <div className="container-fluid">
          <div className="row">
          <div className="small-vertical-space"></div>
            <div className="col-sm-3 col-0"></div>
            <div className="col-sm-6 col-12">
                <div className="block">
                    <div className="vertical-space-only-mobile"></div>
                    <h1 className="title  fadeInUp">News</h1>
                    <div className="very-small-vertical-space"></div>
                    <div className="row animatable fadeInUp">
                        <div className="col-md-12">

                        <p className='span-title-comment'><b><span className='accent-color'>[02/02/2026]</span></b> 🇨🇦 - I will join the University of British Columbia (<b>UBC</b>) as a <b>Postdoctoral Fellow</b>! </p>

                        <hr></hr>

                        <p className='span-title-comment'><b><span className='accent-color'>[17/11/2025]</span></b> 🎓 - I successfully <b>defended my PhD</b> at Université Paris-Saclay</p>
                        <p className='span-title-comment'><b><span className='accent-color'>[06/10/2025]</span></b> 🇺🇸 - I've joined <b>Amazon</b> as an <b>Applied Scientist intern</b> based in <b>New York City</b>! </p>
                        <p className='span-title-comment'><b><span className='accent-color'>[27/08/2025]</span></b> 📑 - Our <b><a href="https://www.usenix.org/publications/loginonline/toward-practical-and-usable-provenance-based-intrusion-detection-systems">USENIX ;login: article</a></b> is out!</p>
                        <p className='span-title-comment'><b><span className='accent-color'>[13/08/2025]</span></b> 📑 - We have <b>two papers</b> accepted at <b>USENIX Sec'25</b>!</p>
                        <p className='span-title-comment'><b><span className='accent-color'>[05/06/2025]</span></b> 💻 - We have open-sourced <b><a href="https://github.com/ubc-provenance/PIDSMaker">PIDSMaker</a></b>, a framework for building provenance-based IDSs</p>
                        <p className='span-title-comment'><b><span className='accent-color'>[03/05/2025]</span></b> 🎤 - I gave a <b>talk</b> on "How AI protects us from cyberattacks" at the <b>GenAI Meetup Morocco</b></p>
                        <p className='span-title-comment'><b><span className='accent-color'>[18/09/2024]</span></b> 🏆 - We received the <b><a href="https://www.iwsec.org/2024/">best paper award</a></b> at IWSEC'24 for our "Few Edges Are Enough" paper</p>
                        <p className='span-title-comment'><b><span className='accent-color'>[01/02/2024]</span></b> 💻 - We have open-sourced <b><a href="https://github.com/mlx-graphs/mlx-graphs">MLX-graphs</a></b>, a library for fast GNN training on Apple Silicon</p>
                        
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

export default News;
