import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <div className="flex items-center flex-col mt-40 mb-10">
        <span className="font-bold mb-2">Desenvolvido por</span>
        <ul className="text-center md:flex md:gap-4">
          <li className="hover:underline">
            <a href="https://www.linkedin.com/in/oelinton/">Oelinton Araujo</a>
          </li>
          <li className="hover:underline">
            <a href="https://www.linkedin.com/in/rafael-bechstedt/">Rafael Bechstedt</a>
          </li>
          <li className="hover:underline">
            <a href="https://www.linkedin.com/in/thiago-chagas-8b641a240/">Thiago Chagas</a>
          </li>
          <li className="hover:underline">
            <a href="https://www.linkedin.com/in/vinicius-bortoletto/">Vinicius Bortoletto</a>
          </li>
        </ul>
      </div>
    );
  }
}
