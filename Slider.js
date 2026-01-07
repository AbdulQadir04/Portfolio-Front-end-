/** Slider.js — Accessible, configurable project slider */
const { useState, useEffect, useRef } = React;

const PROJECTS = [
  {
    title: "Portfolio Website",
    desc: "Responsive portfolio with accessible UI and React components.",
    img: "assets/portfolio mockup.png",
    url: "#"
  },
  {
    title: "E-Commerce UI",
    desc: "Product listing UI with filters and micro-interactions.",
    img: "assets/book ui.png",
    url: "#"
  },
  {
    title: "Analytics Dashboard",
    desc: "Dashboard UI with charts and responsive layout.",
    img: "assets/analytics db.png",
    url: "#"
  }
];

function Slider() {
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);
  const touchStart = useRef(0);

  useEffect(() => {
    timer.current = setInterval(
      () => setIdx(i => (i + 1) % PROJECTS.length),
      5000
    );
    return () => clearInterval(timer.current);
  }, []);

  function prev() {
    setIdx(i => (i - 1 + PROJECTS.length) % PROJECTS.length);
  }

  function next() {
    setIdx(i => (i + 1) % PROJECTS.length);
  }

  function onKeyDown(e) {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  }

  return (
    <div
      className="slider"
      tabIndex="0"
      onKeyDown={onKeyDown}
      aria-roledescription="carousel"
    >
      <div className="slider-inner">
        <div className="slider-media">
          <img
            src={PROJECTS[idx].img}
            alt={PROJECTS[idx].title}
            loading="lazy"
          />
        </div>

        <div className="slider-body">
          <h3>{PROJECTS[idx].title}</h3>
          <p>{PROJECTS[idx].desc}</p>

          <div className="slider-controls">
            <button onClick={prev} aria-label="Previous project">Prev</button>

            <div className="dots">
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  className={i === idx ? "dot active" : "dot"}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>

            <button onClick={next} aria-label="Next project">Next</button>
          </div>

          <a className="btn btn-sm" href={PROJECTS[idx].url}>
            Open project
          </a>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("sliderRoot")).render(<Slider />);
