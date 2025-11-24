import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Markdown from './MarkDown'
import '../../Styles/courses.sass';

var markdown = null
var counter = null

const Course = (props) => {
    const [content, setContent] = useState("");

    function fetch_markdown() {
      fetch(props.course_path)
        .then((res) => res.text())
        .then((text) => {
          markdown = text
          setContent(text)
        });
    }

    function fetch_counter() {
      const suffix = props.course_path.split("/").pop()
      const key = 'hasViewed' + suffix
      var method = null

      // Stores in the user's browser that he already viewed this page.
      if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, true)
        method = "hit"
      }
      else {
        method = "get"
      }
        
      fetch("https://api.countapi.xyz/" + method + "/tristanbilot.me/" + suffix)
        .then((res) => res.json())
        .then((text) => {
          counter = text["value"]
          setContent(text)
        });
    }

    useEffect(() => {
      fetch_markdown()
      fetch_counter()
    }, []);

    function buttons() {
      if (!("prev_course" in props && "next_course" in props))
        return
        
      let btns = []

      if (props.prev_course["course_path"] !== "") {
        btns.push(
          <div className="float-start" key="prev">
            <i className="fas fa-chevron-left"></i>
            <a
              href={`#${props.prev_course["url"]}`}   // note the '#' for HashRouter
              className="ms-1"
              onClick={() => {
                // force a full reload after navigation
                // small timeout ensures the hash updates first
                setTimeout(() => window.location.reload(), 0)
              }}
            >
              {props.prev_course["name"]}
            </a>
          </div>
        )
      }

      if (props.next_course["course_path"] !== "") {
        btns.push(
          <div className="float-end" key="next">
            <a
              href={`#${props.next_course["url"]}`}   // again, hash URL
              onClick={() => {
                setTimeout(() => window.location.reload(), 0)
              }}
            >
              {props.next_course["name"]}
            </a>
            <i className="fas fa-chevron-right ms-1"></i>
          </div>
        )
      }

      return btns
    }

    function viewCounts() {
      if (counter == null)
        return <div class="counter"></div>
      return <div class="counter">
          <i class="fas fa-eye"></i> {counter} views
        </div>
    }

    return (
      <div class="course-background">
        <div class="container course-container">
          <div class="row">
            <div class="col-sm-7 mx-auto">
              <div class="course-buttons">
                {buttons()}
              </div>
              {viewCounts()}
              <Markdown content={markdown} />
              {/* <div class="course-buttons mt-4 mb-5">
                {buttons()}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }

export default Course;
