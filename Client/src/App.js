// import logo from "./logo.svg";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import ChatMessage from "./ChatMessage";

function App() {
  const [query, setQuery] = useState("");
  const [chatlog, setChatLog] = useState([]);

  const [models, setModels] = useState([]);

  const [currModel, setCurrModel] = useState("text-davinci-003");

  const [loading, setLoading] = useState(true);

  const aside = useRef(null);
  useEffect(() => {
    console.log("inside useEffect");
    console.log(loading);

    getModelEngines();

    console.log(models);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userLog = [...chatlog, { user: "me", message: `${query}` }];
    console.log(userLog);

    setChatLog(userLog);

    setQuery("");

    console.log(chatlog);

    //fetching from local beckend server..
    const response = await fetch("https://codex-g6zg.onrender.com/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `${query}`,

        //passing curr modle as well
        model: `${currModel}`,

        //join() is used to return an arr as a String...not used any more
      }),
    });

    const data = await response.json();
    // console.log(data.data); //data. data because i set data in res.json in backend
    setChatLog([...userLog, { user: "bot", message: `${data.data}` }]);
  };

  function clearChat() {
    setChatLog([]);
  }
  //getting models ...
  const getModelEngines = () => {
    fetch("https://codex-g6zg.onrender.com/models")
      .then((res) => res.json())
      .then((data) => {
        setModels(data.models);
        setLoading(false);
      });
  };
  console.log(loading);
  return (
    <div className="App">
      <aside className="side-menu" ref={aside}>
        <div className="side-menu-btn" onClick={clearChat}>
          <span>
            <b>+ </b>
          </span>
          New chat
        </div>
        <div className="models">
          <h2>Models</h2>
          <select onChange={(e) => setCurrModel(e.target.value)}>
            {/* showing loading first */}
            {loading ? <option> Fetching Models... </option> : null}
            {models.map((model, i) => (
              <option key={model.id} selected={model.id === "text-davinci-003"}>
                {model.id}
              </option>
            ))}
          </select>
        </div>
      </aside>

      <section className="chat-box">
        <h3>
          You are using Default Model : <u>text-davinci-003</u>
        </h3>
        <div className="chat-log">
          {chatlog.map((chat) => (
            <ChatMessage chat={chat} />
          ))}
        </div>
        <div className="chat-input">
          <form onSubmit={handleSubmit}>
            <input
              className="chat-input-textarea"
              placeholder="Ask me Anything.."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
