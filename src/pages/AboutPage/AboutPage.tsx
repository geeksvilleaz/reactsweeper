import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page page">
      <h2>About</h2>

      <p>Thanks for checking out our app! Our team built this app to learn the concepts for

        <ul>
          <li>React</li>
          <li>Redux</li>
          <li>React Router</li>
          <li>TypeScript</li>
          <li>React Hooks</li>
        </ul>
      </p>

      <p>
        <strong>Team B-Nazty&trade;</strong> is a group of engineers varying in experience and skill levels. We meet weekly to discuss current trends and to share ideas and concepts.
        And more importantly, we meet to work on projects together. Fun projects, like unneccesarily rewriting minesweeper in React JS. No one asked for it,
        but here it is. You are welcome.
      </p>
    </div>
  );
};

export default AboutPage;
