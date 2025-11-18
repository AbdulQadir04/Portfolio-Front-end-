/** Slider.js — React component (autoplay, swipe, accessible) */
const { useState, useEffect, useRef } = React;

function Slider() {
  const projects = [
    {
      title: "Portfolio Website",
      desc: "Modern responsive portfolio with animations and React components.",
      img: "assets/portfolio mockup.png",
      url: "#"
    },
    {
      title: "E-Commerce UI",
      desc: "Product listing UI with filters & micro-interactions.",
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

  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);
  const touchStart = useRef(null);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  function startAuto() {
    stopAuto();
    timerRef.current = setInterval(() => {
      setIdx(i => (i + 1) % projects.length);
    }, 5000);
  }
  function stopAuto() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }
  function prev() { setIdx((idx - 1 + projects.length) % projects.length); }
  function next() { setIdx((idx + 1) % projects.length); }

  function handleTouchStart(e) { touchStart.current = e.touches[0].clientX; stopAuto(); }
  function handleTouchEnd(e) {
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (dx > 40) prev();
    else if (dx < -40) next();
    startAuto();
  }

  return (
    <div className="slider" onMouseEnter={stopAuto} onMouseLeave={startAuto}
         onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} aria-roledescription="carousel">
      <div className="slider-inner">
        <div className="slider-media" aria-hidden="true">
          <img src={projects[idx].img} alt={projects[idx].title} loading="lazy" />
        </div>

        <div className="slider-body">
          <h3>{projects[idx].title}</h3>
          <p>{projects[idx].desc}</p>

          <div className="slider-controls">
            <button onClick={prev} aria-label="Previous project">Prev</button>

            <div className="dots" role="tablist" aria-label="Project dots">
              {projects.map((p, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === idx}
                  className={i === idx ? "dot active" : "dot"}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>

            <button onClick={next} aria-label="Next project">Next</button>
          </div>

          <div style={{ marginTop: 12 }}>
            <a className="btn btn-sm" href={projects[idx].url}>Open project</a>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('sliderRoot')).render(<Slider />);
