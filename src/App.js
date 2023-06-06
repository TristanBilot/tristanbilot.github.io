import Header from './Components/Header'
import Background from './Components/Background'
import Competences from './Components/Competences'
import Articles from './Components/Articles'
import Contact from './Components/Contact'
import Footer from './Components/Footer'
import Interests from './Components/Interests'
import Projects from './Components/Projects'
import VisualProjects from './Components/VisualProjects'
import Tsp from './Components/projects/GeneticTSP'
import TspScript from './Components/projects/GeneticTSPScript'
import Knapsack from './Components/projects/GeneticKnapsack'
import KnapsackScript from './Components/projects/GeneticKnapsackScript'
import NavBar from './Components/NavBar'
import Publications from './Components/Publications'
import Courses from './Components/Courses'
import Course from './Components/courses/Course'

import {
  Switch,
  Route,
  HashRouter as Router
} from "react-router-dom";

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
// } from "react-router-dom";

import './App.css';
import '@fortawesome/fontawesome-free/js/brands'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/fontawesome'

function CourseRoutes() {
  const courses = [
    {
      "url": "/prerequisites",
      "course_path": "courses/prerequisites/Prerequisites.md",
      "name": "Prerequisites",
    },
    {
      "url": "/chain-rule",
      "course_path": "courses/chain-rule/ChainRule.md",
      "name": "Chain rule and computation graphs",
    },
    {
      "url": "/autodiff",
      "course_path": "courses/autodiff/Autodiff.md",
      "name": "Automatic differentiation engine from scratch",
    },
    {
      "url": "/optimization",
      "course_path": "courses/optimization/Optimization.md",
      "name": "Optimization and training",
    },
    {
      "url": "/xor-sine",
      "course_path": "courses/xor-sine/XorSine.md",
      "name": "XOR and sine problems",
    },
  ]

  let jsx_routes = []
  for (let i = 0; i < courses.length; i++) {

    let course = courses[i]
    var prev_course, next_course
    let no_course = {"course_path": ""}

    if (i == 0) {prev_course = no_course} else {prev_course = courses[i-1]}
    if (i == courses.length - 1) {next_course = no_course} else {next_course = courses[i+1]}

    jsx_routes.push(
      <Route path={course["url"]}>
        <NavBar />
        <Course 
          course_path={course["course_path"]}
          prev_course={prev_course}
          next_course={next_course}
        />
      </Route>
    )
  }
  return jsx_routes
}

function App() {
  return (
    <Router>
      <div id="app-root">
        <Switch>
          <Route path="/genetic-tsp">
            <Tsp />
            <TspScript />
          </Route>

          <Route path="/genetic-knapsack">
            <Knapsack />
            <KnapsackScript />
          </Route>

          <Route path="/phishGNN">
            <NavBar />
            <Course 
              course_path="courses/phishgnn/PhishGNN.md"
            />
          </Route>

          {CourseRoutes()}

          <Route path='/'>
            <NavBar />
            <Header />
            <Publications />
            <Courses />
            <Articles />
            {/* <Competences /> */}
            {/* <Interests /> */}
            <Projects />
            <VisualProjects />
            <Background />
            {/* <Contact /> */}
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
