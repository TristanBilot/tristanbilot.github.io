import React, { Component } from 'react';
import '../../Styles/projects/global.sass'

class GeneticKnapsackScript extends Component {
  importScript(path) {
    const script = document.createElement("script");
    script.src = path;
    script.async = true;
    document.body.appendChild(script);
  }

  componentDidMount () {
    this.importScript("https://cdn.jsdelivr.net/npm/p5@0.10.2/lib/p5.js");
    this.importScript("/projects/genetic-knapsack/sketch.js");
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default GeneticKnapsackScript;
