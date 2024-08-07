import React from "react";
import { createRoot } from "react-dom/client";
import Message from "./message";
import Filter from "./filter";
import Word from "./word";

// Button component to render buttons
export class Button extends React.Component<{ word: Word }> {
  private inMessage: boolean = false;

  getInMessage(): boolean {
    return this.inMessage;
  }

  handleMessageAdd = () => {
    let copy: Button = new Button(this.props);
    copy.inMessage = true;
    const added = Message.getInstance().add(copy);
    if (added) {
      Filter.refilter();
    }
  };

  handleMessageRemove = () => {
    const removed = Message.getInstance().remove(this);
    if (removed) {
      Filter.refilter();
    }
  };

  render() {
    const word = this.props.word;
    return (
      <button
        key={word.toString()}
        onClick={this.inMessage ? this.handleMessageRemove : this.handleMessageAdd}
        title={this.inMessage ? `Remove "${word.text}"` : `Add "${word.text}"`}
        style={{
          background: "linear-gradient(to right, transparent, #2c2a23, transparent)", // Gradient background
          padding: "5px 25px",
          margin: "7px",
          fontFamily: "body-text",
          borderRadius: "0px",
          lineHeight: "normal",
          border: "none", // Remove border if necessary
          color: "white", // Text color
          position: "relative", // Ensure proper stacking
          overflow: "hidden", // Hide overflow if needed
        }}
      >
        {word.text}
        <span
          style={{
            fontSize: "10px",
            fontFamily: "body-text",
            color: "grey",
            display: "block",
            marginTop: "0px",
          }}
        >
          {word.category}
        </span>
      </button>
    );
  }
}

// WordBank component to contain buttons
class WordBank extends React.Component<{ words: Word[] }> {
  render() {
    const { words } = this.props;
    return (
      <div id="wordBank">
        {words.map((obj, index) => (
          <Button key={obj.toString()} word={obj} />
        ))}
      </div>
    );
  }
}

// ButtonRenderer class to render the buttons
export class ButtonRenderer {
  static root: any; // Declare a static variable to store the root

  static renderButtons(words: Word[]): void {
    const wordBank = document.getElementById("wordBank");

    if (!wordBank) {
      console.error("Button container not found");
      return;
    }

    if (!ButtonRenderer.root) {
      // If root doesn't exist, create it
      ButtonRenderer.root = createRoot(wordBank);
    }
    ButtonRenderer.root.render(<WordBank words={words} />);
  }
}
