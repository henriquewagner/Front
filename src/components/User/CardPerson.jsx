import React from "react";

import stylePerson from "./CardPerson.module.css";

export function CardPerson({ cover, avatar, name, office, stacks }) {
  return (
    <div className={stylePerson.card}>
      <img src={cover} alt="Cover" />
      <img className={stylePerson.avatar} src={avatar} alt="Avatar" />
      <p className={stylePerson.p1}>{name}</p>
      <p className={stylePerson.p2}>{office}</p>

      <div className={stylePerson.spans}>
      <span >JavaScript</span>
      <span >HTML</span>
      <span >React</span>
      <span >TypeScript</span>
      <span >Css</span>
      <span >ReactNative</span>
      </div>
      
    </div>
  );
}
