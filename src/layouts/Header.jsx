import React from "react";

export default function Header({ user, setUser }) {
  return (
    <header className="header">
      <h1 className="header__title">
        <a href="/"> AGORASTATES</a>
      </h1>
      <section className="btnList">
        {!user ? (
          <>
            <button className="btnList__signIn">SIGN IN</button>
            <button className="btnList__signIn">SIGN UP</button>
          </>
        ) : (
          <button className="btnList__signIn">LOG OUT</button>
        )}
      </section>
    </header>
  );
}
