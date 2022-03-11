import React, { useState } from "react";

const RDV = ({ createRdv }) => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    createRdv({ title, comment, date });
    setTitle("");
    setComment("");
    setDate("");
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h2>Nouveau RDV</h2>
        <label htmlFor="title">Titre du rdv</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="comment">Commentaires pour le rdv</label>
        <textarea
          name="comment"
          id="comment"
          cols="30"
          rows="10"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <label htmlFor="date">Date du rdv</label>
        <input
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Ajouter le rdv</button>
      </form>
    </section>
  );
};

export default RDV;
